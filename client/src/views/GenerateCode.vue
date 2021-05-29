<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="center">
            <b-card class="w-75 login-card">
                <b-form @submit="onSubmit" class="m-4 text-center">
                    <h1>Time:  {{formatTime(countDown)}}</h1>
                    <input type="text" :value="code" readonly class="code-box my-5"> <br>
                    <b-button type="submit" class="generate-btn">Generate code</b-button>
                </b-form>
            </b-card>
        </b-container>
        
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'


export default {
    components: {
        NavBar
    },
    data(){
        return {
            countDown : 300,
            code: 'LIWEHF92HJ'
          
        }
    },
    methods: {
        onSubmit(event){
            event.preventDefault()
            this.countDownTimer()

        },
        countDownTimer() {
            if(this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        },
        formatTime(seconds){
            let minutes = Math.floor(seconds / 60)
            let sec = seconds - minutes * 60;
            return minutes + ':' + sec
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
