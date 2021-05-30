<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="center">
            <b-card class="w-75 create-card">
                <b-form @submit="onSubmit" class="m-4">
                    <h3>Create user</h3>

                    <b-form-group label="Name:" label-for="name" class="mt-5 w-75">
                        <b-form-input
                            id="name"
                            v-model="form.name"
                            type="text"
                            required
                            class="mb-4 create-input"
                        ></b-form-input>
                    </b-form-group>
                    <div class="form-inline">
                        <b-form-group label="Email: " label-for="email" >
                            <b-form-input
                                id="email"
                                v-model="form.email"
                                type="email"
                                required
                                class="mb-4 create-input"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="Password:" label-for="password" class="ml-5">
                            <b-form-input
                                id="password"
                                v-model="form.password"
                                type="password"
                                required
                                class="mb-4 create-input"
                            ></b-form-input>
                        </b-form-group>
                    </div>

                    <b-form-group label="Role:" label-for="role" class="w-75">
                        <b-form-select
                            id="role"
                            v-model="form.role"
                            :options="roles"
                            required
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
import {checkToken} from '../services/AuthService'
import {createUser} from '../services/UserService'


export default {
    components: {
        NavBar
    },
    data(){
        return {
            form: {
                name: "",
                email: "",
                role: "",
                password: ""
            },
            roles: ['admin', 'teacher', 'student']
        }
    },
    
    methods: {
        onSubmit(event){
            event.preventDefault()
            createUser({name: this.form.name, email: this.form.email, 
                password: this.form.password, role: this.form.role})
                .then(() => {
                    this.$router.push(`/courses`)
                })

        },
        
    },
    created(){
        if(!checkToken(['admin'])) {
            this.$router.push('/login');
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
