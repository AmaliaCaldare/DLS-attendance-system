<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="center">
            <b-card class="w-75 schedule-card">
                <h4>Students' attendance list</h4>
                <h4>{{courseClass.date}} - {{courseName}} - {{group.name}}</h4>
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
import {getClassById} from '../services/ClassService'
import {getGroupById} from '../services/GroupService'

export default {
    components: {
        NavBar
    },
    data(){
        return {
            fields: ['studentName', 'attendance'],
            studentsAttendance: [],
            courseClass: {},
            courseName: this.$route.params.course,
            group: {}  
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
    async created(){
        if(!checkToken(['admin', 'teacher'])) {
            this.$router.push('/login');
        } else {
            this.courseClass = await getClassById(this.$route.params.classId)
            this.group = await getGroupById(this.courseClass.groupId)
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
