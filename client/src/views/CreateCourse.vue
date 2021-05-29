<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="center">
            <b-card class="w-75 create-card">
                <b-form @submit="onSubmit" class="m-4">
                    <h3>Create course</h3>

                    <b-form-group label="Course Name:" label-for="name" class="mt-5 w-75">
                        <b-form-input
                            id="name"
                            v-model="form.name"
                            type="text"
                            placeholder="Enter course name"
                            required
                            class="mb-4 create-input"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Teacher:" label-for="teacher" class="w-75">
                        <b-form-select
                            id="teacher"
                            v-model="form.teacher"
                            :options="teachers"
                            required
                            value-field="_id"
                            text-field="name"
                            class="create-input"
                        ></b-form-select>
                    </b-form-group>

                    <b-form-group label="Groups:" label-for="group" class="w-75">
                        <multiselect
                            v-model="form.groups"
                            :options="groups"
                            :multiple="true"
                            label="name" 
                            track-by="name" 
                            :preselect-first="true"
                            :close-on-select="false"
                            :clear-on-select="false"
                            :preserve-search="true"
                            placeholder="Select groups"
                            open-direction="bottom"
                            required
                            class="mb-5 create-input">
                            <template slot="selection" slot-scope="{ values, search, isOpen }">
                                <span class="multiselect__single" 
                                    v-if="values.length &amp;&amp; !isOpen">
                                    {{ values.length }} options selected
                                </span>
                            </template>
                        </multiselect>
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
import {getTeachers} from '../services/UserService'
import {createCourse} from '../services/CourseService'
import {getAllGroups} from '../services/GroupService'
import {checkToken} from '../services/AuthService'


export default {
    components: {
        NavBar
    },
    data(){
        return {
            form: {
                name: "",
                teacher: "",
                groups: []
            },
            teachers: [],
            groups: []
        }
    },
    methods: {
        onSubmit(event){
            event.preventDefault()
            const groupIds = [];
            this.form.groups.forEach((group) => {
                groupIds.push(group._id)
            });
            createCourse({name: this.form.name, teacherId: this.form.teacher, groups: groupIds})
                .then(data => {
                    console.log(data);
                }).then(() => {
                    this.$router.push('/courses')
                })
        },
        getAllTeachers(){
            getTeachers().then(teachers => {
                this.teachers = teachers
            })
            
        },
        getAllGroups(){
            getAllGroups().then(groups => {
                this.groups = groups
            })  
        },
        
    },
    created(){
        if(!checkToken(['admin', 'teacher'])) {
            this.$router.push('/login');
        } else {
            this.getAllTeachers()
            this.getAllGroups()
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
.navy{
    color: #161966;
}
.create-input{
    height: 50px;
    border-color: #161966;
    background-color: #E3E1E1 !important;
    
}
.create-input {
    ::v-deep .multiselect__input{
        background-color: #E3E1E1 !important;
    }
    ::v-deep .multiselect__single{
        background-color: #E3E1E1 !important;
    }
    
    ::v-deep .multiselect__tags{
        height: 50px;
        border-color: #161966;
        background-color: #E3E1E1 !important;
    }   
}
.create-btn{
    width: 25%;
    margin: 0 auto;
    height: 40px;
    background-color: #161966;
}
</style>
