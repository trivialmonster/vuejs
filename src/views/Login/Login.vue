<template>
    <div id="login" class="Login">
        <Header :type="'login'">
            <template #first>header test</template>
            <template #second>second header test</template>
        </Header>

        <div class="container">
            <div>
                <span>用户名：</span>
                <span><input v-model="userName" type="text"/></span>
            </div>
            <div>
                <span>密码：</span>
                <span><input v-model="passWord" type="password"/></span>
            </div>
        </div>

        <button @click="loginFn">login</button>
        <Test :level="1" @testClickFn="testClickFn"/>
        <div>getters:{{getLoginStatus}}</div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    import Header from '../../component/common/Header.vue';
    import Test from '../../component/common/Test.vue';
    import './Login.less';

    const { mapGetters, mapActions } = createNamespacedHelpers('Login/');

    export default {
        components: {
            Header,
            Test
        },
        data () {
            return {
                userName: '',
                passWord: '',
                test: ''
            }
        },
        computed: {
            ...mapGetters({
                getLoginStatus: 'getLoginStatus'
            })
        },
        watch: {},
        mounted() {
            console.log(this.$store);
        },
        updated() {

        },
        methods: {
            ...mapActions([
                'LOGIN'
            ]),
            loginFn: function () {
                this.LOGIN()
                    .then(() => {
                        console.log(123);
                        console.log(this.getLoginStatus);
                    })
                //  this.$router.push('/homepage');
            },
            testClickFn: function (value) {
                console.log('parent method done' + value);
            }
        }
    }
</script>