<template>
    <div id="Header" class="Header">
        header:{{title}}
        <div>
            <slot name="first"/>
        </div>
        <slot name="second"/>
    </div>
</template>

<script>
    export default {
        props: ['title'],
//        props: {
//            title: Number
//        },
        data() {
            return {}
        },
        mounted: function () {
        }
    }
</script>