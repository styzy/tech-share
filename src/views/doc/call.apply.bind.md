# call() apply() bind()

`call() apply() bind()` 这三个方法，都可以改变函数运行时的上下文，即改变 `this` 关键字的指向，下面将对这三个方法的定义以及作用范围进行详细的解释。

## 定义和描述

### call(context, param1, param2[, ...param])

`call` 方法会立即执行调用函数。

`call` 方法接收多个参数，第一个参数用于设置函数执行时的 `this` 指向，其他参数则作为普通参数传递给执行函数。

### apply(context, [param1, param2, ...param])

`apply` 方法会立即执行调用函数。

`apply` 方法接收两个参数，第一个参数用于设置函数执行时的 `this` 指向，第二个参数是一个数组，数组中的每一个子元素，将作为普通参数传递给执行函数。

### bind(context, param1, param2[, ...param])

与前两个方法不同， `bind` 方法**不会**立即执行调用函数，而是会返回一个**新**的函数，并且提前设置好函数的上下文以及需要传递的参数。

`bind` 方法接收多个参数，第一个参数用于设置函数执行时的 `this` 指向，其他参数则作为普通参数传递给执行函数。

## 示例

```javascript
function demo(param1, param2) {
    console.log(this)
    console.log(param1)
    console.log(param2)
}

demo()
// window
// undefined
// undefined

demo.call('abc', 1, 2)
// 'abc'
// 1
// 2

demo.apply('abc', [1, 2])
// 'abc'
// 1
// 2

const newFn = demo.bind('abc', 1, 2)
newFn()
// 'abc'
// 1
// 2
```

## 比较

|方法|是否立即执行|参数数量|使用场景|
|-|:-:|:-|-|
| `call()` |是|1+n（上下文+普通参数）|一般用于需要改变函数 `this` 指向时。|
| `apply()` |是|1+1（上下文+普通参数数组）|一般用于需要将参数从数组展开时，目前已被扩展运算符 `...` 代替。|
| `bind()` |否|1+n（上下文+普通参数）|一般用于需要将函数调用的参数提前封装好，在需要的时候直接调用时。|
