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
                        <template v-slot:cell(status)="{ item }">
                            {{ item.status }}
                            <router-link v-if="userRole === 'teacher' && item.status === 'Ongoing'" 
                                :to="{ name: 'generate-code', params: {classId: item.id } }">
                                Generate code
                            </router-link>
                            <router-link v-if="userRole === 'student' && item.status === 'Ongoing'" 
                                :to="{ name: 'enter-code', params: {classId: item.id } }">
                                Enter code
                            </router-link>
                        </template>
                    </b-table>
                </div>
                
            </b-card>
        </b-container>
        
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import {getClasses} from '../services/ClassService'
import {checkToken} from '../services/AuthService'
import {getCourseById} from '../services/CourseService'
import {getGroupById} from '../services/GroupService'


export default {
    components: {
        NavBar
    },
    data(){
        return {
            fields: ['time', 'course', 'group', 'status'],
            todaysClasses: [],
            classes: [],
            userRole: "",
            updatedClasses: []
          
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
                for(let i = 0; i < classes.length; i++) {
                    let doc = classes[i]
                    let newClass = {id: doc._id, startTime: doc.startTime, endTime: doc.endTime, date: doc.date}
                     //   course: course.name, group: doc.groupId}
                    getCourseById(doc.courseId).then((course) => {
                        newClass.course = course.name 
                    }).then(() => {
                        getGroupById(doc.groupId).then((group) => {
                            newClass.group = group.name
                            this.classes.push(newClass) 
                        })
                    })
                }
            })
        },
        
        isToday(someDate){
            const today = new Date()
            return someDate.getDate() == today.getDate() &&
                someDate.getMonth() == today.getMonth() &&
                someDate.getFullYear() == today.getFullYear()
        },
       
        getClassesByDate(){
            if(this.classes.length > 0){
                
                let classesByDate = this.classes.reduce((r, a) => {
                    r[a.date] = [...r[a.date] || [], a];
                    return r;
                }, {});
                return classesByDate;
            }
            return []  
        },
        configFields(classes){
            let classesByDate = []
            classes.forEach(async (classByDate) => {
                let status = ""
                let currentDate = new Date()
                let startDate = new Date(currentDate.getTime());
                startDate.setHours(classByDate.startTime.split(":")[0]);
                startDate.setMinutes(classByDate.startTime.split(":")[1]);

                let endDate = new Date(currentDate.getTime());
                endDate.setHours(classByDate.endTime.split(":")[0]);
                endDate.setMinutes(classByDate.endTime.split(":")[1]);

                if(currentDate >= startDate && currentDate <= endDate && this.isToday(new Date(classByDate.date))){
                    status = 'Ongoing'
                }else if(currentDate > endDate && new Date(classByDate.date) < currentDate){
                    status = 'Past'
                }else{
                    status = 'Upcoming'
                }
                let updatedClass = {id: classByDate.id,time: classByDate.startTime + '-' + classByDate.endTime,
                     course: classByDate.course, group: classByDate.group, status: status}
                const uc = updatedClass;
                classesByDate.push(uc)  
            })
            return classesByDate
        }
        
    },
    created(){
        if(!checkToken(['student', 'teacher'])) {
            this.$router.push('/login');
        } else {
            this.userRole = localStorage.getItem('role')
        }    
    },
    beforeMount() {
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
