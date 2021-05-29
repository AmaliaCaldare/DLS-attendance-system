<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="center">
            <b-card class="w-75 schedule-card">
                <h3>Students' attendance list</h3>
                <h3></h3>
                <b-table
                    :fields="fields"
                    :items="configFields()">

                </b-table>                
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
            fields: ['studentName', 'attendance'],
            studentsAttendance: []
          
        }
    },
    // watch: {
    //     'classes': function (){
    //      this.getClassesByDate()
    //     },
    // },
    methods: {
        onSubmit(event){
            event.preventDefault()

        },
    
        configFields(){
            
            
        }
        
    },
    created(){
        if(!checkToken(['admin', 'teacher'])) {
            this.$router.push('/login');
        } else {
            //this.getAllClasses()
        }  
                
        
    }
}
</script>
<style scoped>
.center{
    display: flex;
    justify-content: center;
}
.schedule-card{
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

</style>
