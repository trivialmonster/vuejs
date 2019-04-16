<template>
    <div id="Header" class="Header">
        <span>VueJs</span>

        <span v-if="type !== 'login'">
            test
        </span>
        <!--{{type}}-->
        <!--<div>-->
            <!--<slot name="first"/>-->
        <!--</div>-->
        <!--<slot name="second"/>-->
    </div>
</template>

<script>
    import './Header.less';

    export default {
        props: ['type'],
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