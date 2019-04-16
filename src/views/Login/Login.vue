<template>
    <div id="login" class="Login">
        <Header :type="'login'">
            <template #first>header test</template>
            <template #second>second header test</template>
        </Header>

        <div class="container">
            <div>
                <span>用户名：</span>
                <span><input v-model="userName" type="text" /></span>
            </div>
            <div>
                <span>密码：</span>
                <span><input v-model="passWord" type="password" /></span>
            </div>
        </div>

        <button @click="loginFn">login</button>
        <Test :level="1" @testClickFn="testClickFn" />
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
                userName: '',
                passWord: ''
            }
        },
        computed: {},
//        provide: function () {
//            return {
//                getMap: '1111'
//            }
//        }
        watch: {

        },
        created() {
            console.log('created');
        },
        beforeMount() {
            console.log('beforeMount');
        },
        mounted() {
            console.log('mounted');
            console.log(this.$el);
        },
        beforeUpdate() {
            console.log('beforeUpdate');
        },
        updated() {
            console.log('updated');
        },
        methods: {
            loginFn: function () {
                this.$store.dispatch({
                    type: 'LOGIN',
//                    addNum: 10
                });
                this.$router.push('/homepage');
            },
            testClickFn: function (value) {
                console.log('parent method done' + value);
            }
        }
    }
</script>