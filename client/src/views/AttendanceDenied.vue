<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="center">
            <b-card class="w-75 message-card text-center">
                <h1 class="mb-5">Attendance check denied</h1>
                <b-icon icon="x-circle-fill" variant="danger" font-scale="7.5"></b-icon>
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
            
          
        }
    },

    created(){
        if(!checkToken(['student'])) {
            this.$router.push('/login');
        }
        
    },  
}
</script>
<style scoped>
.center{
    display: flex;
    justify-content: center;
}
.message-card{
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
