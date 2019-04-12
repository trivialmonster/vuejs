<!--<template>-->
    <!--<div id="Test" class="Test">-->
        <!---->
    <!--</div>-->
<!--</template>-->

<script>
    export default {
        render: function (createElement) {
            return createElement(
                'h' + this.level,   // 标签名称
                this.$slots.default // 子元素数组
            )
        },
//        render: function (h) {
//            return (
//                <div>11111</div>
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
        }
    }
</script>