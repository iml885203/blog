---
title: "MySQL 複合索引 (Composite Index)"
date: 2022-11-11 17:24:21
category: "🧑‍💻 程式語言"
tags:
  - "MySQL"
  - "Database"
cover: "/images/covers/mysql-composite-index.webp"
description: "簡單介紹 MySQL 復合索引用法與注意事項"
---

簡單介紹 MySQL 復合索引用法與注意事項
## 何謂複合索引 (Composite Index)

複合索引 (Composite Index) 又稱 Multiple-Column Indexes，永許你在多個欄位上建立 index。

用法：

```sql
CREATE TABLE table_name (
    c1 data_type PRIMARY KEY,
    c2 data_type,
    c3 data_type,
    c4 data_type,
    INDEX index_name (c2,c3,c4)
);
```

## 注意事項

創建完上述的 index，將在將在以下的組合具有索引搜尋功能：

```sql
(c2)
(c2,c3)
(c2,c3,c4)
```

換成 SQL 語法就是：

```sql
SELECT * FROM table_name WHERE c2 = v2;
SELECT * FROM table_name WHERE c2 = v2 AND c3 = v3;
SELECT * FROM table_name WHERE c2 = v2 AND c3 = v3 AND c4 = v4;
```

沒錯，只有這幾種組合會有索引功能，其他的組合將不會有效果，例如 (c2,c4)：

```sql
SELECT * FROM table_name WHERE c2 = v2 AND c4 = v4;
```

## EXPLAIN 驗證

可以前面加上 `EXPLAIN` 去驗證有沒有透過索引搜尋：

```sql
EXPLAIN SELECT * FROM table_name WHERE c2 = v2;
```

![](/images/posts/mysql-composite-index/explain.png)

主要看這幾個欄位即可

- possible_keys: 能在該表中使用哪些索引有助於查詢
- key: 實際使用的索引
- key_len: 索引的長度，在不損失精確性的情況下，越短越好
- ref: 索引的哪一列被使用

## 參考

- [MySQL Composite Index](https://www.mysqltutorial.org/mysql-index/mysql-composite-index/)
- [MySQL 複合索引 (Multiple-Column Indexes) 有順序性](https://medium.com/@david.liu.950627/mysql-%E8%A4%87%E5%90%88%E7%B4%A2%E5%BC%95-multiple-column-indexes-%E6%9C%89%E9%A0%86%E5%BA%8F%E6%80%A7-268b434c04e)
