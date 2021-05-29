<template>
    <div>
        <nav-bar></nav-bar>
        <b-container fluid class="text-center">
            <h2>{{course}} Classes</h2>
            <div class="pt-8 d-flex flex-column justify-content-between">
                <b-button  v-for="courseClass in classes" :key="courseClass.id" class="lg font-weight-bold class-btn mt-3">
                    {{courseClass.date}} {{courseClass.startTime}}-{{courseClass.endTime}}
                </b-button>
            </div>
        </b-container>
        
    </div>
</template>
<script>
import {getClasses} from '../services/ClassService'
import NavBar from '../components/NavBar.vue'


export default {
    components: {
        NavBar
    },
    data(){
        return {
          classes: [],
          course: ""
        }
    },
    methods: {
        getAllClasses(){
            getClasses().then(response => {
                this.classes = response
            })
            
        }
    },
    created(){
        this.getAllClasses()
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
