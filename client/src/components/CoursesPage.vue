<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid>
            <div class="pt-8">
                <h3  v-for="course in courses" :key="course.id" class="lg font-weight-bold">
                    {{course.name}}
                </h3>
            </div>
        </b-container>
        
    </div>
</template>
<script>
import {getAllCourses} from '../services/CourseService'
import NavBar from '../components/NavBar.vue'


export default {
    components: {
        NavBar
    },
    data(){
        return {
          courses: [{name: 'DLS'},
                    {name: 'Testing'},
                    {name: 'Databases'}],
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
        //this.getAllCourses()
    }
}
</script>
