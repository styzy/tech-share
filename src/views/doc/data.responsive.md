# 深入数据响应式原理

## 什么是数据响应式？

当数据发生变化时，会自动触发相对应的处理事件，这个过程称为数据响应式。

基于数据响应式，开发者可以通过类似事件监听的方式，来监听数据的改动，从而实现数据驱动的开发模式。

## 数据响应式的实现原理

根据 `javascript` 发展的不同时期，实现数据响应式的方式主要包括：
* 脏数据检查
* 数据劫持
* 数据代理

## 脏数据检查

脏数据检查来源于早起版本的 `AngularJs` 。它的内部原理是利用 `javascript` 的定时器轮询机制，通过不断的循环去检查数据的变化，从而实现数据响应式。

因为脏数据检查的数据响应式，并不是通过数据本身的变化来触发，而是通过定时器的检查触发，这在一定程度上会造成极大地性能消耗，这也是它被称为 **`脏`** 的原因。

```JS
// 定义监听方法
function watch(object, key, feedback) {
    let current = object[key]

    window.setInterval(diff, 10)
    diff()

    function diff() {
        if (object[key] !== current) {

            feedback(object[key], current)

            current = object[key]
        }
    }
}

// 定义数据对象
var data = {
    test: 1
}

// 监听test属性变化
watch(data, 'test', function(newValue, oldValue) {
    console.log('检查到test属性发生变化')
    console.log('newValue: ', newValue);
    console.log('oldValue: ', oldValue);
})

// 修改数据
data.test = 2
```

## 数据劫持

`Vue2` 使用了数据劫持的方式来实现数据响应式，其原理是通过 `Object.defineProperty()` 方法对 `data` 内数据的 `get` 和 `set` 方法进行劫持，从而干预数据的改动。

```JS
// 定义监听方法
function watch(object, key, feedback) {
    let oldValue = object[key]

    Object.defineProperty(object, key, {
        get: function() {
            return oldValue
        },
        set: function(newValue) {
            if (newValue === oldValue) return

            feedback(newValue, oldValue)

            oldValue = newValue
        }
    })
}

// 定义数据对象
var data = {
    test: 1
}

// 监听test属性变化
watch(data, 'test', function(newValue, oldValue) {
    console.log('检查到test属性发生变化')
    console.log('newValue: ', newValue);
    console.log('oldValue: ', oldValue);
})

// 修改数据
data.test = 2
```

`Object.defineProperty()` 的浏览器兼容性，至少需要 `IE9` ，因此 `Vue2` 的浏览器兼容性也同样是 `IE9` 。

## 数据代理

`Vue3` 使用了 `es6` 中的 `Proxy（代理）` 类来实现数据响应式。和 `Object.defineProperty()` 劫持某个属性不同， `Proxy` 是对整个对象进行了代理，对象所有属性的改动都会被监听。

```JS
// 定义代理方法
function proxyData(object, feedback) {
    return new Proxy(object, {
        get(target, key) {
            return Reflect.get(target, key)
        },
        set(target, key, newValue) {
            feedback(key, newValue, target[key])

            Reflect.set(target, key, newValue)
        }
    })
}

// 定义数据对象
var data = proxyData({
    test: 1
}, function(key, newValue, oldValue) {
    console.log(`检查到${key}属性发生变化`)
    console.log('newValue: ', newValue);
    console.log('oldValue: ', oldValue);
})

// 修改数据
data.test = 2
```

`Proxy` 并不兼容 `IE` ，这也是 `Vue3` 直接抛弃 `IE` 的一个主要原因。
