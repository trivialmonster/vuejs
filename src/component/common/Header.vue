<template>
    <div id="Header" class="Header">
        header:{{title}}
    </div>
</template>

<script>
    export default {
        props: ['title'],
//        props: {
//            title: Number
//        },
        data(){
            return {}
        },
    }
</script>