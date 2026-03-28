---
title: '【JS】資料型態特性 - 什麼是 Call by sharing?'
date: 2022-03-15 11:33:00
category: '🧑‍💻 程式語言'
tags:
  - 'Javascript'
  - '程式'
cover: '/images/covers/js-call-by-sharing.webp'
description: '釐清JS資料型態特性與 Call by sharing'
---

釐清JS資料型態特性與 Call by sharing

## 資料型態

在 Javascript 中資料型態分為 **原始型別(Primitive type)**、**物件型別(Object type)**

**Primitive type**

- Boolean
- Null
- Undefined
- Number
- BigInt
- String
- Symbol（於 ECMAScript 6 新定義）

**Object type**

- Object
- Function
- Array
- Set
- ...etc

## 「By Value」vs「By Reference」

> 一般來說， Primitive type 會是call by value，而 object 的行為**比較像是call by reference**

先來看一下兩個差異的範例

**Call by value**

```javascript
let a = 1;
let b = a;

b = 2;
console.log(a, b); // 1, 2
```

**Call by reference**

```javascript
let ref1 = [1];
let ref2 = ref1;

ref2.push(2);
console.log(ref1, ref2); // [1, 2] [1, 2]
```

這邊會發現 `ref2 = ref1` 的時候，傳遞的其實是**變數的位址**

## **物件(Object)的判斷(operation)**

因為 **物件(Object)** 是像call by reference，所以在operation判斷上，`==` 和 `===` 這兩種則會比較像是 call by reference而非 call by value

```javascript
// call by value
let a = 1;
let b = a;
console.log(a == b); // true
console.log(a === b); // true
console.log(a === 1); // true

// call by reference
let ref1 = [1];
let ref2 = ref1;
console.log(ref1 == ref2); // true, 相同reference
console.log(ref1 === ref2); // true, 同上
console.log(ref1 == [1]); // false, 雖相同value但不同reference
console.log(ref1 === [1]); // false, 同上
console.log([1] == [1]); // false, 同上
console.log([1] === [1]); // false, 同上
```

## **Call by sharing**

```javascript
var obj1 = {
  name: 'Alex',
  age: 30,
};
var obj2 = obj1;

obj2.age = 25; // 與obj1相同reference, 會一起更改到obj1

// 重新賦值
obj2 = {
  name: 'John',
  age: 50,
};

console.log(obj1); // { name: 'Alex', age: 25 }
console.log(obj2); // { name: 'John', age: 50 }, 重新賦值在obj2上，並不會更改obj1
```

上面跟之前的 call by reference例子看起來沒兩樣，唯一的差異是把 `obj2` 重新賦值，就代表你要讓這個 obj 指向一個新的 object，跟 call by reference 特性又不太一樣，有人把這種方式叫做 **Call by sharing**

但 Call by sharing 其實不是一個正式的名詞

## 結語

以行為來分類的話，**原始型別(Primitive type)** 是Call by value，而 **物件型別(Object type)** 是Call by reference or Call by sharing，唯一要注意的就是重新賦值這個動作造成reference改變的影響。

## 參考資料

- [JS基本觀念：call by value 還是reference 又或是 sharing?](https://medium.com/@mengchiang000/js%E5%9F%BA%E6%9C%AC%E8%A7%80%E5%BF%B5-call-by-value-%E9%82%84%E6%98%AFreference-%E5%8F%88%E6%88%96%E6%98%AF-sharing-22a87ca478fc)
- [Call By Value, Call By Reference? 談談所謂的參數引用](https://stu98832.github.io/2020/06/26/call-by-reference/)
- [JavaScript 的資料型別與資料結構](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Data_structures)
