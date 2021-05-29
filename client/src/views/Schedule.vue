<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="center">
            <b-card class="w-75 schedule-card">
                <div v-for="date in Object.keys(getClassesByDate())" :key="date.id">
                    <h3 v-if="date==new Date().toISOString().slice(0, 10)">Today's classes</h3>
                    <h3 v-else>{{date}}</h3>
                    <b-table
                        :fields="fields"
                        :items="configFields(getClassesByDate()[date])">

                    </b-table>
                </div>
                
            </b-card>
        </b-container>
        
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import {getClasses} from '../services/ClassService'



export default {
    components: {
        NavBar
    },
    data(){
        return {
            fields: ['time', 'course', 'group', 'status'],
            todaysClasses: [],
            classes: []
          
        }
    },
    watch: {
        'classes': function (){
         this.getClassesByDate()
        },
    },
    methods: {
        onSubmit(event){
            event.preventDefault()

        },
        getAllClasses(){
            getClasses().then(classes => {
                this.classes = classes
            })
        },
        getClassesByDate(){
            let classesByDate = this.classes.reduce((r, a) => {
                r[a.date] = [...r[a.date] || [], a];
                return r;
            }, {});
            console.log(classesByDate);
            return classesByDate;
        },
        configFields(classes){
            let classesByDate = []
            classes.forEach((classByDate) => {
                let status = ""
                const now = new Date().getHours()
                if(now >= classByDate.startTime && now <= classByDate.endTime){
                    status = 'Ongoing'
                }else if(now > classByDate.endTime){
                    status = 'Past'
                }else{
                    status = 'Upcoming'
                }
                // we need course name by id
                let updatedClass = {time: classByDate.startTime + '-' + classByDate.endTime,
                course: classByDate.courseId, group: classByDate.group, status: status}
                classesByDate.push(updatedClass)
            })
            return classesByDate
        }
        
    },
    created(){
        this.getAllClasses()        
        
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
