# Vue2组件封装技巧

本文主要从数据以及样式两个方面介绍如何优雅的创建 `Vue2` 组件。

## 单向数据流

`Vue` 为了保证数据的易维护性，在组件之间，使用了单向数据流的方式，控制了数据的流向，即：父组件传递数据给子组件，子组件接收数据，但不允许直接更改，而是通过事件抛出数据变化，将数据修改权限还给父组件。

```HTML
<!-- Child.vue -->
<template>
    <div>{{ value }}</div>
    <button @click="handleAdd">喜加一</button>
</template>
<script>
    export default {
        name: 'Child',
        props: {
            value: Number
        },
        methods: {
            handleAdd() {
                this.$emit('change', this.value + 1)
            }
        }
    }
</script>
```

```HTML
<!-- Parent.vue -->
<template>
    <Child :value="test" @change="handleTestChange"></Child>
</template>

<script>
    export default {
        name: 'Parent',
        data() {
            test: 123
        },
        methods: {
            handleTestChange(newTest) {
                this.test = newTest
            }
        }
    }
</script>
```

## v-model

通过 `Vue` 官方提供的 `model` 选项，可以为自定义组件提供使用 `v-model` 的能力。

```HTML
<!-- Child.vue -->
<template>
    <div>{{ value }}</div>
</template>
<script>
    export default {
        name: 'Child',
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: Number
        }
    }
</script>
```

```HTML
<!-- Parent.vue -->
<template>
    <Child v-model="test"></Child>
</template>

<script>
    export default {
        name: 'Parent',
        data() {
            test: 123
        }
    }
</script>
```

## 样式边缘处理

`Vue` 的样式作用域，依赖 `hash` 属性来实现，即渲染的每个HTML节点都会有一个哈希属性，类似于 `data-v-12345677` ，它的格式是 `data-v-[hash]` ，其中的 `hash` 值，根据每个组件的不同，是唯一的，这就实现了每个组件的样式仅对包含该组件哈希属性的HTML节点生效。

```HTML
<!-- Parent组件编译后的html和style -->
<template>
    <div class="parent" data-v-aaaaaa></div>
</template>
<style>
    .parent[data-v-aaaaaa] {
        color: red;
    }
</style>
```

但 `Vue` 考虑到实际开发中，完全的样式隔离，会导致组件无法灵活地复用和扩展，因此，对于每个子组件，其根节点除了拥有自己本身的hash属性，还会拥有父组件的hash属性，这意味着，父组件的样式，可以影响到子组件的根节点。

```HTML
<!-- Parent组件编译后的html和style -->
<template>
    <div class="parent" data-v-aaaaaa></div>
    <Child></Child>
</template>
<style>
    .parent[data-v-aaaaaa] {
        color: red;
    }

    .child[data-v-aaaaaa] {
        color: red;
    }
</style>
```

```HTML
<!-- Child组件编译后的html和style -->
<template>
    <div class="child" data-v-bbbbbb data-v-aaaaaa>
        <span data-v-bbbbbb></span>
    </div>
</template>
<style>
    .child[data-v-bbbbbb] {
        font-size: 30px;
    }
</style>
```

上面示例中，Child组件渲染后，其根节点不仅有自身的 `data-v-bbbbbb` 哈希属性，还有父组件的 `data-v-aaaaaa` 属性，因此Parent组件的样式同样会影响到该节点。
