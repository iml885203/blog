---
title: "【JS】Object Deep Copy 推薦用法比較"
date: 2022-06-23 09:35:00
category: "🧑‍💻 程式語言"
tags:
  - "Javascript"
  - "程式"
cover: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=85&fm=jpg&w=1200&h=630&fit=crop"
description: "Object 因為 Call by sharing 的特性，無法直接用 `=` 複製 Object，今天來講解 Object 的幾種複製方式。 ## 懶人包 - 正常Object(單層)： `...` - Nested Object(多層)：Lodash `cloneDeep`"
---

Object 因為 Call by sharing 的特性，無法直接用 `=` 複製 Object，今天來講解 Object 的幾種複製方式。

## 懶人包

- 正常Object(單層)： `...`
- Nested Object(多層)：Lodash `cloneDeep`

## 何謂shallow copy(淺複製)

因Javascript特性對於Object會是call by reference，直接用 `=` 會是shallow copy

```javascript
a = { b:1, c:2 }
copy = a
copy.b = 100

// shallow copy
console.log(a.b) // 100
```

## copy用法差異

| Method | Pros | Cons |
| --- | --- | --- |
| = | 直接明瞭，預設用法 | shallow copy(淺複製) |
| JSON.stringify() and JSON.parse() | deep copy nested objects(多層Object) | 不能複製物件型別(Function, Date) |
| Object.assign() | deep copy 第一層 | 不能deep copy nested objects |
| ... spread operator | 同上，語法簡單，複製單層object首選 | 不能deep copy nested objects |
| Lodash cloneDeep | 複製nested objects包含functions | 外部package依賴 |
| structuredClone() | deep copy nested objects(多層Object) | 僅支持可結構化的變數，遇到 Error 和 Function 會拋出 DOMException |

### `=`

```javascript
let john = {name: 'John', age: 28}
let ken = john
ken.name = 'ken'

// ❌ Bad: can't deep copy
console.log(john.name) // ken
```

### JSON.stringify() and JSON.parse()

```javascript
let john = {
  name: 'John',
  age: 28,
  job: () => 'Web Developer',
  address: {
    city: 'taipei'
  }
}
let ken = JSON.parse(JSON.stringify(john))
ken.name = 'ken'
ken.address.city = 'new taipei'

// ✅ Good: deep copy
console.log(john.name) // john
console.log(john.address.city) // taipei

// ❌ Bad: function missing
console.log(ken.job) // undefined
```

### Object.assign()

```javascript
let john = {
  name: 'John',
  age: 28,
  job: () => 'Web Developer',
  address: {
    city: 'taipei'
  }
}
let ken = Object.assign({}, john)
ken.name = 'ken'
ken.address.city = 'new taipei'

// ✅ Good
console.log(john.name) // john
console.log(ken.job()) // Web Developer

// ❌ Bad: can't deep copy nested objects
console.log(john.address.city) // new taipei
```

### `...` spread operator

```javascript
let john = {
  name: 'John',
  age: 28,
  job: () => 'Web Developer',
  address: {
    city: 'taipei'
  }
}
let ken = {...john}
ken.name = 'ken'
ken.address.city = 'new taipei'

// ✅ Good: deep copy
console.log(john.name) // john
console.log(ken.job()) // WebDeveloper

// ❌ Bad: not deep copy nested object
console.log(john.address.city) // new taipei
```

### Lodash `cloneDeep`

```javascript
let john = {
  name: 'John',
  age: 28,
  job: () => 'Web Developer',
  address: {
    city: 'taipei'
  }
}
let ken = _.cloneDeep(john)
ken.name = 'ken'
ken.address.city = 'new taipei'

// ✅ Good: deep copy
console.log(john.name) // john
console.log(john.address.city) // taipei
console.log(ken.job()) // WebDeveloper
```

### structuredClone()

```javascript
let john = {
  name: 'John',
  age: 28,
  birthday: new Date('2022-08-08'),
  address: {
    city: 'taipei'
  }
}
let ken = structuredClone(john)
ken.name = 'ken'
ken.address.city = 'new taipei'
ken.birthday.setDate('30')

// ✅ Good: deep copy
console.log(john.name) // john
console.log(john.address.city) // taipei
console.log(john.birthday.toDateString()) // Mon Aug 08 2022
console.log(ken.name) // ken
console.log(ken.address.city) // new taipei
console.log(ken.birthday.toDateString()) // Tue Aug 30 2022

// ❌ Bad: not support Function
let amy = {
  job: () => 'designer'
}
structuredClone(amy) // Throw DOMException

```

## 參考

- [JS 中的淺拷貝 (Shallow copy) 與深拷貝 (Deep copy) 原理與實作](https://www.programfarmer.com/articles/javaScript/javascript-shallow-copy-deep-copy)
- [The Best Way to Deep Copy an Object in JavaScript](https://code.tutsplus.com/articles/the-best-way-to-deep-copy-an-object-in-javascript--cms-39655)
- [Clone an Object in JavaScript: 4 Best Ways [Updated 2022]](https://www.codingem.com/javascript-clone-object/)
