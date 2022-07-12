# 类 构造函数 实例 原型

## 什么是类？

> 定义：类是用于创建对象的模板。

类可以理解为类型或种类，基于某种类型，可以创建该类型的对象，因此类也可以看做模板。

**注意：类需要首字母大写**

```JS
// 人类
class Human {}

// 中国人
class Chinese {}

// 男人
class Man {}

// 女人
class Woman {}

// 小孩
class Kid {}
```

## 什么是实例？

> 定义：通过 `new` 关键字和某个类所创建的对象，称为这个类的实例。

```JS
class Human {}

var fangLianFeng = new Human(),
    heCheng = new Human(),
    houLi = new Human()
```

上面的三个人的对象，就是 `Human` 这个类的实例。

## 什么是实例化？

> 定义：通过 `new` 关键字和某个类创建对象的过程。

```JS
class Human {}

// 实例化
new Human()
```

实例化是一个动作，一个过程。

## 什么是构造函数？

> 定义：通过 `new` 关键字来创建对象的函数，叫做构造函数。

```JS
// 人类
function Human() {}
// 创建一个人
var human = new Human()

// 中国人
function Chinese() {}
// 创建一个中国人
var chinese = new Chinese()

// 男人
function Man() {}
// 创建一个男人
var man = new Man()

// 女人
function Woman() {}
// 创建一个女人
var woman = new Woman()

// 小孩
function Kid() {}
// 创建一个小孩
var kid = new Kid()
```

上面这些函数，除了名字的首字符大写之外，和普通函数没有任何区别。

这些函数都被用于通过 `new` 关键字来创建对象，因此所有函数都可以作为构造函数。（构造函数只是一种函数的用法，类似于回调函数）

## es5中的构造函数如何创建实例对象？

在 `es5` 时期，因为没有 `class` 关键字，因此所有的实例只能通过构造函数来创建，而不能直接使用类来创建。

```JS
// 构造函数
function Chinese(name, sex) {
    this.name = name
    this.sex = sex
    this.country = '中国'
    this.language = '中文'
    this.sayHello = function() {
        console.log(`你好，我叫${this.name}`)
    }
}

// 实例化之后进行赋值
var fangLianFeng = new Chinese('方年峰', '男')

// 获取实例属性
console.log(fangLianFeng.name); // 方年峰
console.log(fangLianFeng.sex); // 男
console.log(fangLianFeng.country); // 中国
console.log(fangLianFeng.language); // 中文

// 调用实例的方法
fangLianFeng.sayHello() // 你好，我叫方年峰

// 实例化之后进行赋值
var heCheng = new Chinese('何诚', '女')

// 获取实例属性
console.log(heCheng.name); // 何诚
console.log(heCheng.sex); // 女
console.log(heCheng.country); // 中国
console.log(heCheng.language); // 中文

// 调用实例的方法
heCheng.sayHello() // 你好，我叫何诚
```

所有实例的属性和方法，都在构造函数内部进行初始化和定义，每个被创建的实例，具有部分相同的属性和方法，但构造函数同时可以接受参数，来使每个创建的对象具有各自不用的属性。

我们可以看到，构造函数内，所有的属性和方法都写在一起，非常混乱，而 `es6` 中 `class` 的出现，就是为了解决这一问题。

## es6中的class如何创建实例对象？

在 `es6` 中，我们可以通过定义一个类，来更加优雅地创建实例对象。

```JS
// 类
class Chinese {
    name
    sex
    country = '中国'
    language = '中文'
    // 类中的构造函数，用于接受和处理实例化参数
    constructor(name, sex) {
        this.name = name
        this.sex = sex
    }
    sayHello() {
        console.log(`你好，我叫${this.name}`)
    }
}

// 实例化之后进行赋值
var fangLianFeng = new Chinese('方年峰', '男')

// 获取实例属性
console.log(fangLianFeng.name); // 方年峰
console.log(fangLianFeng.sex); // 男
console.log(fangLianFeng.country); // 中国
console.log(fangLianFeng.language); // 中文

// 调用实例的方法
fangLianFeng.sayHello() // 你好，我叫方年峰
```

这里的类 `Chinese` ，也可以实现上面构造函数 `Chinese` 的效果，并且代码更加具有逻辑性和可读性。

:::tip
**注意： `class` 只是一个语法糖。**

`class` 在被编译为 `es5` 之后，就是构造函数。
:::

## 什么是原型对象？

通过上面的类我们可以看出，所有的实例，都会预置一个相同的方法 `sayHello()` ，这些预置的方法如果存储在每个实例对象的内部，会造成内存浪费，因此 `javascript` 将这些重复的方法提取出来，放在一个公共的对象内，通过这种方法，可以大大减少内存的浪费。

具体的实现是这样：每个实例在调用某个方法时，会首先在自己的内部去寻找该方法，如果找不到，则会去公共的对象内寻找。

这里所说的公共的对象，就是所谓的 `原型对象` 。

因为所有的实例公用一个原型对象，因此对于原型对象的修改，会影响到所有的实例。

## 如何获取原型对象？

```JS
// 通过类或构造函数获取原型对象
Chinese.prototype

// 通过实例获取原型对象
fangLianFeng.__proto__

Chinese.prototype === fangLianFeng.__proto__ // true
```

类的 `prototype` 属性指向了原型对象。

实例的 `__proto__` 属性也指向了原型对象。

## 总结

|概念|表现程度|相互之间的关系|
|:-|:-:|:-:|
|实例( `instance` )|具体|子|
|构造函数( `constructor` )|抽象|父|
|类( `class` )|抽象|父|
