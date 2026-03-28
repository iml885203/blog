---
title: "各語言 Foreach 寫法"
date: 2022-02-22 16:05:00
category: "🧑‍💻 程式語言"
tags:
  - "程式"
  - "Javascript"
  - "Python"
  - "PHP"
cover: "/images/covers/coding-foreach.webp"
description: "在寫演算法的時候，常常會用到Foreach，由於自己常常在各語言中切換使用，這邊整理一下常用的Foreach寫法"
---

在寫演算法的時候，常常會用到Foreach，由於自己常常在各語言中切換使用，這邊整理一下常用的Foreach寫法
## ❌ 不易閱讀的寫法

最基本的寫法，但也非常難閱讀

```javascript
arr = [4, 5, 6]
for( let i = 0 ; i < arr.length ; i++ ){
  console.log(i, arr[i]);
}
```

## ✅ 更好的寫法

各語言有不同用法，這邊列了幾個我常用的語言

### Javascript

`forEach`

```javascript
arr = [4, 5, 6]
arr.forEach((val, key) => console.log(key, val))

obj = {a:1, b:2, c:3}
Object.keys(obj).forEach((key) => console.log(key, objs[key]))
```

`for...of`

```javascript
arr = [4, 5, 6]
for (const [key, val] of arr.entries()) {
  console.log(key, val)
}

obj = {a:1, b:2}
for (const [key, val] of Object.entries(obj)) {
  console.log(key, val)
}
```

### PHP

```php
<?php
$arr = [4, 5, 6];
foreach($arr as $val) {
    dump("$val");
}
foreach($arr as $key => $val) {
    dump("$key, $val");
}

$obj = ['a' => 1, 'b' => 2, 'c' => 3];
foreach($obj as $val) {
    dump("$val");
}
foreach($obj as $key => $val) {
    dump("$key, $val");
}
```

### Python

```python
# array
arr = [4, 5, 6]
for val in arr:
  print(val)
for key, val in enumerate(arr):
  print(key, val)

# dict
dicts = {'a': 1, 'b': 2, 'c': 3}
for key in dicts:
  print(key, dicts[key])
for key, val in dicts.items():
  print(key, val)
```

## 參考

- [For vs forEach() vs for/in vs for/of in JavaScript](https://thecodebarbarian.com/for-vs-for-each-vs-for-in-vs-for-of-in-javascript)
- [range() vs enumerate()](https://realpython.com/lessons/range-vs-enumerate/)
