<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="text-center">
            <h2>Courses</h2>
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
import {getAllCourses} from '../services/CourseService'
import {checkToken} from "../services/AuthService";
import NavBar from '../components/NavBar.vue'


export default {
    components: {
        NavBar
    },
    data(){
        return {
          courses: [],
        }
    },
    methods: {
        getAllCourses(){
            getAllCourses().then(response => {
                this.courses = response
            })

        }
    },
    created(){
      if(!checkToken(['admin', 'teacher'])) {
        this.$router.push('/login');
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
