---
title: "【Python】 Module 與 Package 不應該拿來比較"
date: 2022-08-19 09:42:00
category: "🧑‍💻 程式語言"
tags:
  - "Python"
  - "程式"
  - "學習筆記"
cover: "/images/covers/python-module-with-package.webp"
description: "網路上充斥著很多 **Module and Package** 的說明文章，會讓初學者誤以為這兩個是同層級的東西，但其實不是。"
---

網路上充斥著很多 **Module and Package** 的說明文章，會讓初學者誤以為這兩個是同層級的東西，但其實不是。
## 什麼是 Module

 一個 py 檔，宣告的 Variable、Function、Class，可以被其他檔案引用。

post.py

```python
class Post:
    # 建構式
    def __init__(self):
        self.titles = []

    # 新增文章
    def add_post(self, title):
        self.titles.append(title)

    # 刪除文章
    def delete_post(self, title):
        self.titles.remove(title)
```

about.py

```python
readme = "this is about.py"

#取得作者
def get_author():
    return "Logan"

#取得電子郵件
def get_email():
    return "iml885203@gmail.com"
```

main.py

```python
# Module
from post import Post
from about import (get_author, get_email)

new_post = Post()
new_post.add_post("Hello World")

print(new_post.titles) # ['Hello World']
print(get_author()) # Logan
print(get_email()) # iml885203@gmail.com
```

也可以用 `from ... import *` 引用模組內的所有物件，但這這樣的寫法，可能會發生命名衝突而被覆寫(overwrite)的風險。

main.py

```python
# Module
from about import *

print(readme) # this is about.py
print(get_author()) # Logan
print(get_email()) # iml885203@gmail.com
```

## Package 用法

當 Module 越來越多，需要將相似的 Module 組織為 Package，而 Package 就是一個容器(資料夾)，包含一個或多個 Module，並且擁有 `__init__.py` 的檔案。

嘗試將剛剛的兩個檔案打包成一個 Package，結構如下。

```yaml
/
├─ main.py
└─ blog/
   ├── __init__.py
   ├── about.py
   └── post.py
```

```python
# Package
from blog import post
from blog import about

new_post = post.Post()
new_post.add_post("Hello World")

print(new_post.titles) # ['Hello World']
print(about.readme) # this is about.py
print(about.get_author()) # Logan
print(about.get_email()) # iml885203@gmail.com
```

## Package 觀念

從 [官方文件](https://docs.python.org/3/tutorial/modules.html#packages) 來看，Package 是 Ｍodule 的一種用法。

> Package 是 Module 組織化的一種用法。
>

透過 `type` 印出 Module 會是一個 module 的資料型態(data type)

```python
import random
type(random)
# <class 'module'>
```

但是如果透過 `type` 印出 Package，他還是一個 Module

```python
import blog
type(blog)
# <class 'module'>
```

## Dir function

Python 提供了一個 `dir` function，用來顯示物件的屬性(Attribute)與方法(Method)

```python
from blog import about
dir(about)
# ['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'get_author', 'get_email', 'readme']
```

## Import 的各種寫法

### Module

`import [module]`

import 整個 random，可以使用 random 底下的 function

```python
import random
print(random.randint(0, 5))
```

`from [module] import [name1, name2]`

從 random 裡 import 其中的 function

```python
from random import randint
print(randint(0, 5))
```

`import [module] as [new_name]`

把 random 重新命名為 rd

```python
import random as rd
print(rd.randint(0, 5))
```

`from [module] import *`

**不推薦用法**，import random 底下的東西，會有 Overwrite 風險

```python
from random import *
print(randint(0, 5))
```
