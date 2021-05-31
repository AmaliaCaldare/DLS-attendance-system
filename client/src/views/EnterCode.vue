<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="center">
            <b-card class="w-75 login-card">
                <p>{{ $socket.connected ? 'Connected' : 'Disconnected' }}</p>
                <b-form @submit="onSubmit" class="m-4 text-center">
                    <h1>Time left:  {{countDown}}</h1>
                    <h1>Enter code: </h1>
                    <input v-model="code" class="code-box my-5" required> <br>
                    <b-button type="submit" class="generate-btn">Submit</b-button>
                </b-form>
            </b-card>
        </b-container>
        
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import {checkToken} from '../services/AuthService'

export default {
    components: {
        NavBar
    },
    data(){
        return {
            countDown : "01:00",
            code: "",
          
        }
    },
    sockets: {
        connect() {
            console.log('socket connected')
        },
        // customEmit: function (data) {
        //     console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        // }
    },
    methods: {
        onSubmit(event){
            event.preventDefault()
            //this.countDownTimer()
            console.log(this.code);
            this.$socket.client.emit('student-code', this.code);
            // this.$socket.$subscribe('code', (data) => {
            //     this.code = data
            // })
            // this.$socket.$subscribe('countdown', (data) => {
            //     this.countDown = data
            // })

        },
        
        formatTime(seconds){
            let minutes = Math.floor(seconds / 60)
            let sec = seconds - minutes * 60;
            return minutes + ':' + sec
        }
        
    },
    created(){
        if(!checkToken(['student'])) {
            this.$router.push('/login');
        }
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
.generate-btn{
    width: 25%;
    margin: 0 auto;
    height: 50px;
    background-color: #161966;
}
.code-box{
    height: 60px;
    width: 50%;
    border: solid #161966 1px;
    font-size: 25px;
    color: #E51818;
    font-weight: bold;
    text-align: center;
}
</style>
