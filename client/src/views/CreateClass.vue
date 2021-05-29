<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="center">
            <b-card class="w-75 create-card">
                <b-form @submit="onSubmit" class="m-4">
                    <h3>Create class</h3>

                    <b-form-group label="Date:" label-for="date" class="mt-5 w-75">
                        <b-form-input
                            id="date"
                            v-model="form.date"
                            type="date"
                            required
                            class="mb-4 create-input"
                        ></b-form-input>
                    </b-form-group>
                    <div class="form-inline">
                        <b-form-group label="Start time:" label-for="start-time" >
                            <b-form-input
                                id="start-time"
                                v-model="form.startTime"
                                type="time"
                                required
                                class="mb-4 create-input"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="End time:" label-for="end-time" class="ml-5">
                            <b-form-input
                                id="end-time"
                                v-model="form.endTime"
                                type="time"
                                required
                                class="mb-4 create-input"
                            ></b-form-input>
                        </b-form-group>
                    </div>

                    <b-form-group label="Course:" label-for="course" class="w-75">
                        <b-form-select
                            id="course"
                            v-model="form.course"
                            :options="courses"
                            required
                            value-field="_id"
                            text-field="name"
                            class="create-input"
                        ></b-form-select>
                    </b-form-group>
                    <div class="text-center">
                        <b-button type="submit" class="create-btn">Create</b-button>
                    </div>
                </b-form>
            </b-card>
        </b-container>
        
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import {getAllCourses} from '../services/CourseService'
import {createClass} from '../services/ClassService'
import {checkToken} from '../services/AuthService'


export default {
    components: {
        NavBar
    },
    data(){
        return {
            form: {
                date: "",
                startTime: "",
                endTime: "",
                course: ""
            },
            courses: []
        }
    },
    
    methods: {
        onSubmit(event){
            event.preventDefault()
            createClass({date: this.form.date, startTime: this.form.startTime, 
                endTime: this.form.endTime, courseId: this.form.course})
                .then(data => {
                    console.log(data);
                })

        },
        getAllCourses(){
            getAllCourses().then(courses => {
                this.courses = courses
            })
        }
        
    },
    created(){
        if(!checkToken(['admin', 'teacher'])) {
            this.$router.push('/login');
        } else {
            this.getAllCourses()
        } 
        
    }
}
</script>
<style lang="scss" scoped>
.center{
    display: flex;
    justify-content: center;
}
.create-card{
    border-color: #161966;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    
}
.create-input{
    height: 50px;
    border-color: #161966;
    background-color: #E3E1E1 !important; 
}

.create-btn{
    width: 25%;
    margin: 0 auto;
    height: 40px;
    background-color: #161966;
}
</style>
