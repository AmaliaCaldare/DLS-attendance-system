<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="center">
            <b-card class="w-75 login-card">
                <b-form @submit="onSubmit" class="m-4">
                    <h1>Login</h1>
                    <b-form-input
                        id="email"
                        v-model="email"
                        type="email"
                        placeholder="Enter email"
                        required
                        class="mt-5 mb-4 login-input"
                    ></b-form-input>
                    <b-form-input
                        id="password"
                        v-model="password"
                        type="password"
                        placeholder="Enter password"
                        required
                        class="mb-5 login-input"
                    ></b-form-input>
                    <b-button type="submit" class="login-btn">Login</b-button>
                </b-form>
            </b-card>
        </b-container>

    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import { getAccessToken } from '../services/AuthService.js';


export default {
    components: {
        NavBar
    },
    data(){
        return {
            email: "",
            password: ""

        }
    },
    methods: {
      onSubmit(event){
        let user = {
          email: this.email,
          password: this.password
        }
        getAccessToken(user).then(response => {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('role', response.role)
          this.$router.push('/courses')

        })

            event.preventDefault()
      }

    },
    created(){
    }
}
</script>
<style scoped>
.center{
    display: flex;
    justify-content: center;
}
.login-card{
    border-color: #161966;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

}
.navy{
    color: #161966;
}
.login-input{
    height: 50px;
    border-color: #161966;
    background-color: #E3E1E1 !important;
}
.login-btn{
    width: 25%;
    margin: 0 auto;
    height: 40px;
    background-color: #161966;
}
</style>
