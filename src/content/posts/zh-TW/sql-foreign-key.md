---
title: 'SQL 基本觀念：外鍵(Foreign Key)約束條件'
date: 2022-10-06 10:26:00
category: '🧑‍💻 程式語言'
tags:
  - 'SQL'
  - '筆記'
cover: '/images/covers/sql-foreign-key.webp'
description: '因為受到了在關聯式資料庫設定外鍵(Foreign key)的約束，在刪除資料的時候失敗，由於自己常常忘記這基本的東西，常常每次寫完又回來改約束的設定，所以紀錄一下，增加自己的印象。'
---

因為受到了在關聯式資料庫設定外鍵(Foreign key)的約束，在刪除資料的時候失敗，由於自己常常忘記這基本的東西，常常每次寫完又回來改約束的設定，所以紀錄一下，增加自己的印象。

## 約束範圍

約束的用法在設定外鍵時後面加上 `ON UPDATE` 或 `ON DELETE`，通常都是用到 `ON DELETE` 比較多。

```sql
CREATE TABLE parent (
    id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE child (
    id INT,
    parent_id INT,
    INDEX par_ind (parent_id),
    FOREIGN KEY (parent_id)
        REFERENCES parent(id)
        ON DELETE CASCADE
);
```

## 約束規則

### RESTRICT (Mysql 預設)

當父表 update/delete 時，如有對應子表資料，則不允許 update/delete

### CASCADE

在父表上 update/delete 時，同步 update/delete 子表

### SET NULL

在父表上 update/delete 時，將子表上的欄位設為 null (要注意此外鍵不能為 not null)

### NO ACTION

與 RESTRICT 相同，功能為 **延遲檢查**，但在 Mysql 中 NO ACTION 與 RESTRICT 都是為立即檢查約束。

## 參考

- [以 MySQL 為例解釋外鍵（Foreign Key）](https://b-l-u-e-b-e-r-r-y.github.io/post/ForeignKey/)
- [13.1.20.5 FOREIGN KEY Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html)
