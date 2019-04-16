<template>
    <div id="Test" class="Test">
        <div @click="testFn">123</div>
    </div>
</template>

<script>
    export default {
//        render: function (createElement) {
//            return createElement(
//                'h' + this.level,   // 标签名称
//                this.$slots.default // 子元素数组
//            )
//        },
//        render: function (h) {
//            return (
//                <div>{this.level}</div>
//            )
//        },
        props: {
            level: {
                type: Number,
                required: true
            }
        },
        data() {
            return {}
        },
        mounted: function () {
//            console.log(this.$parent);
        },
        methods: {
            testFn: function () {
                this.$emit('testClickFn', 123);
            }
        }
    }
</script>