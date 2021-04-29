<template>
    <div>
        <span  v-for="course in courses" :key="course.id">
            {{course.name}}
        </span>
    </div>
</template>
<script>
import {getAllCourses} from '../services/CourseService'

export default {
    data(){
        return {
          courses: [],
        }
    },
    methods: {
        getAllCourses(){
            getAllCourses().then(response => {
                console.log(response);
                console.log('loaded');
                this.courses = response
            })
            
        }
    },
    created(){
        this.getAllCourses()
    }
}
</script>
