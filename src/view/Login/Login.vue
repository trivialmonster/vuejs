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

        <div>
            <Test :level="1">
                <div>
                    <span>Hello world!</span>
                </div>
            </Test>
        </div>
    </div>
</template>

<script>
    import Header from '../../component/common/Header.vue';
    import Test from '../../component/common/Test.vue';
    import './Login.less';

    export default {
        components: {
            Header,
            Test
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