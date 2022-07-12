# Promise对象 和 async/await

## 什么是Promise对象

`Promise` 对象是 `es6` 新增的特性，它的主要作用是解决 `es5` 时代回调函数 `风格混乱` 的现状，即实现回调函数风格的统一。

## 回调函数混乱的年代

在 `es5` 时期，所有的异步方法，只能通过回调函数的方式来处理，因此回调函数的写法可谓是百家争鸣，每个工具和库的作者似乎都希望自己的代码是"独一无二"的，而开发者每使用一个库和插件，就需要使用新的风格的回调函数，这让所有的开发者对于回调函数苦不堪言。

```javascript
// es5时代回调函数风格混乱的现状

// jqyery ajax
$.ajax(
    url: 'url',
    success: function(res) {
        console.log('ajax', res)
    },
    error: function() {
        alert('网络异常')
    }
)

$.get('url', {}, function(res) {
    console.log('get', res)
}, function() {
    alert('网络异常')
})

// 自定义回调
function wait(callback) {
    setTimeout(function() {
        callback && callback()
    }, 3000);
}

wait(function() {
    console.log('等待了3秒');
})
```

## 时代的产物: Promise

而 `Promise` 对象在这种群雄割据的局面下，就像秦始皇统一六国一样，应运而生了。

```javascript
// Promise对象出现以后

// jqyery ajax
function ajax() {
    return new Promise((resolve, reject) => {
        $.ajax(
            url: 'url',
            success: function(res) {
                resolve(res)
            },
            error: function() {
                reject()
            }
        )
    })
}

function get() {
    return new Promise((resolve, reject) => {
        $.get('url', {}, function(res) {
            resolve(res)
        }, function() {
            reject()
        })
    })
}

// 自定义回调
function wait() {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve()
        }, 500);
    })
}

ajax().then(res => {
    console.log('ajax', res)
}).catch(() => {
    alert('网络异常')
})

get().then(res => {
    console.log('ajax', res)
}).catch(() => {
    alert('网络异常')
})

wait().then(() => {
    console.log('等待了3秒');
})
```

可以看到， `Promise` 并没有过多地干涉原有异步方法的使用方式（写法），而是在原有的代码外部，包裹了一个 `Promise` 对象的实例化方法，这种对现有代码新增而不是对原有代码修改的使用方式，极大地提高了 `Promise` 的兼容性。

原有的异步方法，在使用了 `Promise` 封装之后，内部摒弃了原有风格混乱的自定义回调函数，转而统一使用 `Promise` 提供的 `resolve` 和 `reject` 这两个回调函数，极大地提高了代码的易读性，降低了代码的维护成本。

最后再看封装之后的方法调用，统一使用 `then` 和 `catch` 来处理正常和异常的回调逻辑，简洁而又灵活， `es5` 时期回调函数风格混乱的情况不复存在。

## Promise的作用

通过上面的介绍，我们大致可以明白， `Promise` 作为一种规范化的技术手段，提供了统一所有回调函数风格的解决方案，并且这不是强制的，开发者完全可以选择使用或不使用（当然，作为新时代有追求的开发者，我们要跟紧时代的步伐，拥抱变化，拒绝摆烂！:rofl:）。

## 回调地狱

有了 `Promise` 之后，所有开发者的回调函数代码逐渐走向统一风格的道路，但你以为问题就这样解决了吗？不！问题才刚刚开始！（毕竟人心都是贪婪的:smiling_imp:）因为回调函数的混乱并不仅仅是风格的混乱，还有一个 `Promise` 无法解决的超级大难题，那就是著名的 `回调地狱` 。

**举个例子：**

我们现在有三个接口需要调用，但是接口2需要的参数是接口1的返回，而接口3需要的参数又是接口2的返回，因此我们必须要接口1调用完成后再进行接口2的调用，并在接口2完成后再进行接口3的调用（看似无理，但现实中的某些需求就是如此:yum:）。

```javascript
// es5中的回调地狱

(function() {
    $.ajax(
        url: '接口1',
        success: function(res1) {
            $.ajax(
                url: '接口2',
                data: res1,
                success: function(res2) {
                    $.ajax(
                        url: '接口3',
                        data: res2,
                        success: function(res3) {
                            console.log('最终数据', res3)
                        },
                        error: function() {
                            alert('网络异常')
                        }
                    )
                },
                error: function() {
                    alert('网络异常')
                }
            )
        },
        error: function() {
            alert('网络异常')
        }
    )
})()
```

上面是 `es5` 时代的一个实现，可以看出，已经产生了回调地狱，代码的可读性已经几乎没有了，维护成本也非常高（谁维护谁倒霉:upside_down_face:）。

接下来再看看用了 `Promise` 会不会好一点：

```javascript
// 使用了Promise

(function() {
    // 封装
    function getData(url, data) {
        return new Promise(resolve => {
            $.ajax(
                url,
                data,
                success: (res) => {
                    resolve(res)
                },
                error: function() => {
                    alert('网络异常')
                }
            )
        })
    }

    // 调用
    getData('接口1').then(res1 => {
        getData('接口2', res1).then(res2 => {
            getData('接口3', res2).then(res3 => {
                console.log('最终数据', res3)
            })
        })
    })
})()
```

可以看到，相对于 `es5` 的回调地狱，使用了 `Promise` 后，代码的确会变得简洁很多，但是讨厌的缩进依然存在，我们还是需要在岑岑嵌套中书写代码，因为 `Promise` 能做的仅仅是针对风格的统一，仅仅是让回调地狱变得更加有条理，但哪怕代码再优雅的回调地狱，依然是开发者的心头大患。

## async/await 的诞生

终于在被回调地狱折磨了将近10年后，2017年的 `es8` 引入了 `async/await` 这一新特性，从此，回调地狱成为历史！:tada::tada::tada:

`async/await` 只有一个目的，就是消除可怕的回调地狱。

我们再来看看之前的例子如果使用了 `async/await` ，会变成什么样：

```javascript
// 使用了Promise和async/await

(async function() {
    // 封装
    function getData(url, data) {
        return new Promise(resolve => {
            $.ajax(
                url,
                data,
                success: (res) => {
                    resolve(res)
                },
                error: function() => {
                    alert('网络异常')
                }
            )
        })
    }

    // 调用
    const res1 = await getData('接口1')
    const res2 = await getData('接口2', res1)
    const res3 = await getData('接口3', res2)

    console.log('最终数据', res3)
})()
```

是的，使用了 `async/await` 之后，讨厌的缩进没有了，回调地狱再也不会出现在开发者的编辑器中，开发者终于可以继续优雅的写代码了！:satisfied:

需要注意的是，使用了 `async/await` 改造的代码中，封装的代码和之前完全没有变化，因为 `async/await` 就是基于 `Promise` 所实现的新特性，因此我们需要修改的仅仅是调用部分的代码，以及父级方法的类型（即加上 `async` ）。

## async/await 到底是什么

其实 `async/await` 只是一个语法糖（简单来说就是让你通过少量的代码来实现大量重复和复杂的逻辑的偷懒技巧:wink:）， 并没有改变js的底层语法，代码编译之后，依然是一个个的回调函数和回调地狱。

但俗话说得好，眼不见心不烦，既然回调地狱我们看不见了，那就等于被消灭了~

## async 的作用

`async` 类似于一种函数修饰符，所有函数一旦使用了该修饰符后，原有的返回数据（ `return` 的数据）将会被替换成一个 `Promise` 对象的实例。

```javascript
function fn1() {
    return true
}

fn1() // return true

async function fn2() {
    return true
}

fn2() // return Promise{}
```

既然函数使用了 `async` 修饰符会返回一个 `Promise` 对象的实例，那么反之亦然，所有返回一个 `Promise` 对象实例的函数，都可以看做是一个 `async` 的函数。

以下两种函数的功能是一样：

```javascript
async function fn1() {
    return true
}

fn1() // return Promise{}

function fn2() {
    return new Promise(resolve => {
        resolve(true)
    })
}

fn2() // return Promise{}
```

## await 的作用

`await` 是一个命令关键字，用来获取 `Promise` 对象实例的 `resolve` 方法的参数，调用 `resolve` 方法时传递的第一个参数会被 `await` 获取并返回，而第一个以外的其他参数会被丢弃。

```javascript
function fn() {
    return new Promise(resolve => {
        resolve(1, 2, 3)
    })
}

// 这里仅仅返回了1，而2和3都被丢弃
await fn() // return 1
```

`await` 命令如果对一个非 `Promise` 对象的实例使用，首先会判断目标对象是否包含 `then` 方法，如果包含，则也会将其当做 `Promise` 对象实例来处理。若不包含，则会直接返回目标对象本身。

```javascript
function fn1() {
    return new Promise(resolve => {
        resolve(true)
    })
}

function fn2() {
    return true
}

await fn1() // return true

await fn2() // return true

await true // return true
```

`await` 在获取 `Promise` 对象的 `resolve` 值时，如果 `resolve()` 没有执行，那么 `await` 命令将一直等待（挂起）， `await` 之后的代码将不会继续执行，即使执行了 `reject()` 方法也不行。

```javascript
function fn1() {
    return new Promise((resolve, reject) => {
        // resolve(true)
        reject()
    })
}

await fn1()
// 打印将永远不会执行，因为await会一直挂起。
console.log('await fn1() finish')
```

## async/await 使用场景

为了保证代码的易读性可易维护性，每当我们遇到异步方法和回调函数的时候，就需要使用 `async/await` ，但请不要过度依赖该特性，因为它仅仅是一个语法糖。

以下是一些使用的示例，说说你觉得哪些是合理的，哪些是不合理的？:smiley_cat:

```javascript
await 1

await (function() { return 1 })()

await (() => 1)()

await async function() { return 1 }()

await new Promise(resolve => resolve(1))

await new Promise(resolve => setTimeout(() => resolve(1)))
```
