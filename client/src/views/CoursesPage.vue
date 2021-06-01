<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="text-center">
            <h2>Courses</h2>
            <router-link to="/create/course" v-if="userRole === 'admin'">Create a new course</router-link>
            <div class="pt-8 d-flex flex-column justify-content-between">
                <b-button v-for="course in courses" :key="course.id" class="lg font-weight-bold course-btn mt-3">
                    <router-link :to="{ name: 'course-classes', params: {courseId: course._id } }">
                    {{course.name}}
                    </router-link>
                </b-button>
            </div>
        </b-container>

    </div>
</template>
<script>
import {getAllCourses, getCoursesByStudent} from '../services/CourseService'
import {checkToken} from "../services/AuthService";
import NavBar from '../components/NavBar.vue'


export default {
    components: {
        NavBar
    },
    data(){
        return {
          courses: [],
          userRole: ""
        }
    },
    async created(){
      if(!checkToken(['admin', 'teacher', 'student'])) {
        this.$router.push('/login');
      }else {
        this.userRole = localStorage.getItem('role')
        const user = JSON.parse(localStorage.getItem('user'))
        if(this.userRole === 'admin'){
            this.courses = await getAllCourses()
        }else if(this.userRole === 'teacher'){
            getAllCourses().then(response => {
                response.forEach((course) => {
                    if(course.teacherId === user._id){
                        this.courses.push(course)
                    }
                })
            })
        }else if(this.userRole === 'student'){
            this.courses = await getCoursesByStudent(user._id)
        }
        
      }
    }
}
</script>
<style scoped>
.course-btn{
    width: 50%;
    margin: 0 auto;
    height: 40px;
    background-color: #161966;
}
</style>
