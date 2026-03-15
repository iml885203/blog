---
title: "當 Laravel 軟刪除 (SofeDelete) 遇到 Unique 欄位"
date: 2022-11-11 17:31:40
category: "🧑‍💻 程式語言"
tags:
  - "網頁開發"
  - "Laravel"
cover: "https://images.unsplash.com/flagged/photo-1578728890856-8bbf3883aa6d?q=85&fm=jpg&w=1200&h=630&fit=crop"
description: "當 軟刪除(SoftDelete) 刪除後，遇到被軟刪除的 Unique 欄位與新的值發生衝突該怎麼辦？"
---

當 軟刪除(SoftDelete) 刪除後，遇到被軟刪除的 Unique 欄位與新的值發生衝突該怎麼辦？
## 軟刪除 (SoftDelete)

[Laravel 的 SoftDelete](https://laravel.com/docs/9.x/eloquent#soft-deleting) 在資料刪除時，不會真的刪除資料，而是在 `deleted_at` 寫入刪除的時間。

常見的問題會發生在刪除用戶資料，假設我們有一張表 `users.email` 為 unique 的

```sql
CREATE TABLE users (
	email varchar(255),
	deleted_at TIMESTAMP
);

// email 設為 unique
CREATE UNIQUE INDEX users_email_uniq on users (email);
```

遇到軟刪除時就會出現問題：

```sql
// 新增 user
INSERT INTO users values ('a@email.com', NOW());

// 新增重複 user，將出現錯誤
// Query 1 ERROR: Duplicate entry 'a@email.com' for key 'users.users_email_uniq'
INSERT INTO users values ('a@email.com', null);
```

## 解決辦法(MySQL 8+) - 複合索引與 IF

> MySQL 需要用到 [MySQL 複合索引 (Composite Index)](/2022/mysql-composite-index/) 去處理。
>

將索引改為複合索引：

```sql
CREATE UNIQUE INDEX users_email_uniq on users (
	email,
	(IF(deleted_at, NULL, 1))
);
```

由於 MySQL 的索引在欄位為 null 的時候，**不會被視為重複值**，所以要加上 IF 讓 null 變為 1。

```sql
INSERT INTO users values ('a@email.com', NOW());
INSERT INTO users values ('a@email.com', NOW());
INSERT INTO users values ('a@email.com', null);
INSERT INTO users values ('a@email.com', null); // 重複值被阻擋
```

![](/images/posts/laravel-soft-delete-with-unique-column/mysql8.png)

## 解決辦法(MySQL 5.x) - 復合索引與 unix_timestamp

複合索引裡面使用 IF，需要到 8 版本以上才能支援，那 5.x 版本的話需要從資料上處理。

根據上面可以知道 **索引欄位為 null 的時候不會被視為重複值**，那麼只要讓該欄位不要有 null 的狀況出現就好了，但因為使用 Laravel 框架，不能直接更動 `deleted_at` 這個欄位，所以要再創另一個 `deleted_at_unix`

```sql
CREATE TABLE users (
	email varchar(255),
	deleted_at TIMESTAMP,
	deleted_at_unix int(10) unsigned NOT NULL DEFAULT 0
);
```

建立復合索引

```sql
CREATE UNIQUE INDEX users_email_uniq on users (email, deleted_at_unix);
```

之後於 SoftDelete 的時候，同步更新 `deleted_at_unix` 欄位，可以用 [Observer](https://laravel.com/docs/9.x/eloquent#observers) 去實作這功能

```sql
INSERT INTO users values ('a@email.com', NOW(), UNIX_TIMESTAMP());
INSERT INTO users values ('a@email.com', NOW(), UNIX_TIMESTAMP());
INSERT INTO users values ('a@email.com', null, 0);
INSERT INTO users values ('a@email.com', null, 0); // 重複值被阻擋
```

![](/images/posts/laravel-soft-delete-with-unique-column/mysql5.png)

另外有一方法是[把 unix_timestamp 直接寫在 email 欄位上](https://dev.to/mmollick/using-unique-columns-and-soft-deletes-in-laravel-470p)，就不需要用到復合索引，概念上是一樣的事情，就看當時的使用情境去決定怎麼去使用。

## 解決辦法(PostgreSQL) - 部分索引

PostgreSQL 支援 [部分索引](https://www.postgresql.org/docs/current/indexes-partial.html)，也就是後面可以加上 `where` 語法，有這東西就可以輕鬆解決這問題：

```sql
CREATE UNIQUE INDEX users_email_uniq ON users (
  email
) WHERE deleted_at IS NULL;
```

不用像是 MySQL 那樣用複合索引再搭配一些處理去解決，使用上又更方便了，看來可以考慮試試看使用 PostgreSQL 了

## 參考

- [Unique Indexes With Some Rows Excluded](https://sqlfordevs.com/unique-index-ignore-some-rows)
- [When "Soft Delete" Meets "Unique Index”](https://blog.staynoob.cn/post/2019/05/when-soft-delete-meets-unique-index/)
- [Using Unique Columns with Soft Deletes in Laravel](https://dev.to/mmollick/using-unique-columns-and-soft-deletes-in-laravel-470p)
