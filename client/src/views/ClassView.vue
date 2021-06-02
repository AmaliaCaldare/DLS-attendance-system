<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="center">
            <b-card class="w-75 schedule-card">
                <h4>Students' attendance list</h4>
                <b-row>
                    <b-col>
                        <h4>{{courseClass.date}} - {{courseName}} - {{group.name}}</h4>
                    </b-col>
                    <b-col>
                        <h2 class="text-right">{{averageAttendance}} %</h2>
                    </b-col>
                </b-row>
                <b-table
                    :fields="fields"
                    :items="students">
                    <template v-slot:cell(attendance)="{ item }">
                        <b-icon icon="check2-circle" variant="success" v-if="item.attendance" font-scale="2"></b-icon>
                        <b-icon icon="x-circle-fill" variant="danger" v-if="!item.attendance" font-scale="2"></b-icon>
                    </template>
                </b-table>                
            </b-card>
        </b-container>
        
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import {checkToken} from '../services/AuthService'
import {getClassById, getAttendanceList} from '../services/ClassService'
import {getGroupById} from '../services/GroupService'
import {getStudentById} from '../services/UserService'

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
            group: {},
            students: [],
            attendanceList: [],
            averageAttendance: 0
        }
    },
   
    methods: {
        async calculateAverage(){
            let checks = [];
            this.attendanceList.forEach((result) => {
                checks.push(result.attendanceCheck)
            });
            const attended = checks.filter(Boolean).length;
            this.averageAttendance = attended/(this.attendanceList.length)*100
        }
        
    },
    async created(){
        if(!checkToken(['admin', 'teacher'])) {
            this.$router.push('/login');
        } else {
            this.courseClass = await getClassById(this.$route.params.classId)
            this.group = await getGroupById(this.courseClass.groupId)
            this.attendanceList = await getAttendanceList(this.courseClass._id)
            this.attendanceList.forEach(async (record) => {
                console.log(record);
                let student = await getStudentById(record.studentId)
                this.students.push({studentName: student.name, attendance: record.attendanceCheck})
            })
            this.calculateAverage()

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
