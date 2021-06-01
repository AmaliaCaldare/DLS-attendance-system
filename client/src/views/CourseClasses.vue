<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="text-center">
            <h2>Course's details</h2>
            <h4>Course's name: {{course.name}}</h4>
            <h4 v-if="userRole === 'admin' || userRole === 'student'">Teacher: {{teacher.name}}</h4>
            <h4 v-if="userRole === 'admin' || userRole === 'teacher'">Groups: 
                <span v-for="group in groups" :key="group._id">
                    {{group.name}}
                </span>
            </h4>
            <h2>{{course.name}}'s Classes</h2>
            <div class="pt-8 d-flex flex-column justify-content-between">
                <router-link  v-for="courseClass in classes" 
                :key="courseClass.id"
                :to="{name: 'class-view', params: { course: course.name, classId: courseClass._id}}"
                class="lg font-weight-bold class-btn mt-3">
                    {{courseClass.date}} {{courseClass.startTime}}-{{courseClass.endTime}}
                </router-link>
            </div>
        </b-container>
        
    </div>
</template>
<script>
import {getClassesByCourseId} from '../services/ClassService'
import {getCourseById} from '../services/CourseService'
import {getTeacherById} from '../services/UserService'
import {getGroupById} from '../services/GroupService'
import NavBar from '../components/NavBar.vue'
import {checkToken} from '../services/AuthService'


export default {
    components: {
        NavBar
    },
    data(){
        return {
          classes: [],
          course: {},
          teacher: {},
          groups: [],
          userRole: ""
        }
    },
    methods: {
    },
    async created(){
        if(!checkToken(['admin', 'teacher'])) {
            this.$router.push('/login');
        } else {
            this.userRole = localStorage.getItem('role')
            this.course = await getCourseById(this.$route.params.courseId)
            this.teacher = await getTeacherById(this.course.teacherId)
            this.course.groups.forEach(async (groupId) => {
                let group = await getGroupById(groupId)
                this.groups.push(group)
            });
            this.classes = await getClassesByCourseId(this.course._id)

        }  
    }
}
</script>
<style scoped>
.class-btn{
    width: 50%;
    margin: 0 auto;
    height: 40px;
    background-color: #161966;
}
</style>
