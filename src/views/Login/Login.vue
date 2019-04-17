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
        <div>states:{{loginStatus ? 'true' : 'false'}}</div>
        <div>getters:{{getLoginStatus ? 'true' : 'false'}}</div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
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
                passWord: '',
                test: ''
            }
        },
        computed: {
            ...mapState('Login', {
                'loginStatus': 'loginStatus'
            }),
//            ...mapGetters({
//                'getLoginStatus': 'Login/getLoginStatus'
//            }),
            ...mapGetters('Login', {
                'getLoginStatus': 'getLoginStatus'
            })
        },
        //        computed: mapState([
        //            'loginStatus'
        //        ]),
        //        computed: {
        //            loginStatus() {
        //                return this.$store.getters.getLoginStatus;
        //            }
        //        },
        //        provide: function () {
        //            return {
        //                getMap: '1111'
        //            }
        //        }
        watch: {},
        mounted() {
            //            console.log(this.$store);
            //            console.log(this.getLoginStatus);
        },
        updated() {
            //            console.log(this.getLoginStatus);
        },
        methods: {
            loginFn: function () {
                this.$store.dispatch({
//                    type: 'LOGIN',
                    type: 'Login/LOGIN',
                    //  addNum: 10
                });
                //                this.$router.push('/homepage');
            },
            testClickFn: function (value) {
                console.log('parent method done' + value);
            }
        }
    }
</script>