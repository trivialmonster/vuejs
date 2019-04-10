<template>
    <div id="login" class="Login">
        <Header :title="42">
            <template #first>header test</template>
            <template #second>second header test</template>
        </Header>
        <button v-on:click="show = !show">
            Toggle
        </button>
        <transition appear name="g-fade">
            <p v-if="show">hello</p>
        </transition>
    </div>
</template>

<script>
    import Header from '../../component/common/Header.vue';
    import './Login.less';

    export default {
        components: {
            Header,
        },
        data () {
            return {
                show: true
            }
        },
//        provide: function () {
//            return {
//                getMap: '1111'
//            }
//        }
    }
</script>