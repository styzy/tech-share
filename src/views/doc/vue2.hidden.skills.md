# Vue2冷门小技巧

## 如何优雅地修改Props

我们都知道， `Vue` 为了减少数据维护成本，默认是不允许在组件内修改所接受属性的值，而是推荐通过事件的方式从外部进行数据更新，写法如下:

**子组件**

```JS
export default {
    props: {
        test: {
            type: Boolean
        }
    },
    methods: {
        handleChange() {
            // 错误写法，会抛出警告。
            // this.test = 2
            // 正确写法
            this.$emit('update:test', 2)
        }
    }
}
```

**父组件**

```HTML
<template>
    <Child :test="test" @update:test="updateTest">
</template>
```

```JS
export default {
    data() {
        return {
            test: 1
        }
    },
    methods: {
        updateTest(test) {
            this.test = test
        }
    }
}
```

这样写，的确可以满足 `Vue` 单向数据流的设计思想，但是，需要多写很多冗余代码，因此， `Vue` 针对这种会被子组件内部修改的 `Props` ，提供了 `sync` 修饰符。通过使用 `sync` 修饰符，上方的代码可以简化成：

**子组件**

```JS
export default {
    props: {
        test: {
            type: Boolean
        }
    },
    methods: {
        handleChange() {
            // 错误写法，会抛出警告。
            // this.test = 2
            // 正确写法
            this.$emit('update:test', 2)
        }
    }
}
```

**父组件**

```HTML
<template>
    <Child :test.sync="test">
</template>
```

虽然子组件内仍需要通过 `$emit` 来触发改动事件，但父组件的代码得到了极大地精简。

`sync` 修饰符使用起来有点类似 `v-model` 。

## 如何监听子组件声明周期

`Vue` 的生命周期可以在组件内通过声明钩子函数来触发，但这仅限于组件内部，而当外部组件（即父组件）需要监听内部组件（即子组件）的生命周期时，该怎么实现呢？

我们先看一下传统的写法：

**子组件**

```JS
export default {
    mounted() {
        this.$emit('mounted')
    },
    destroyed() {
        this.$emit('destroyed')
    }
}
```

**父组件**

```html
<template>
    <Child @mounted="childMounted" @destroyed="childDestroyed">
</template>
```

上方代码实现的逻辑是：子组件预先在内部定义钩子函数，钩子函数内通过 `$emit` 触发自定义事件，从而使父组件在外部可以监听到。

这样写其实没问题，但有一个前提，那就是子组件需要预先在内部定义钩子函数，如果是我们自己开发的组件，那也就是几行代码的事，可如果我们需要使用的子组件，是第三方组件库所提供的呢？

众所周知，第三方组件库的组件已经是编译压缩过后的代码，想要直接修改并不现实，但实际开发中，的确有很多时候，需要在外部监听第三方组件的生命周期，这时候该怎么办？

对此， `Vue` 官方在 `3.x` 版本中提供了 `hook（钩子）` 功能，方便在父组件内监听子组件的生命周期，而对于 `Vue` 的 `2.x` 版本，虽然官方文档内没有任何这方面的说明，但实际上也在某次更新中提供了对 `hook` 钩子的支持。

下面我们使用 `hook` 改写上方代码：

**父组件**

```html
<template>
    <Child @hook:mounted="childMounted" @hook:destroyed="childDestroyed">
</template>
```

可以看到，我们只需要在父组件内对子组件进行监听即可，完全不需要对子组件进行任何改动，对于使用第三方组件库的场景，这无疑是提供了巨大的便利。
