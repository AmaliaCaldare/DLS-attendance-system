<template>
    <div>
        <b-navbar class="nav-bar" fixed="top">
            <b-navbar-brand class="kea" href="#">KEA</b-navbar-brand>
            <b-navbar-nav>
                <b-nav-item class="nav-tab" href="/courses" v-if="role">Courses</b-nav-item>
                <b-nav-item class="nav-tab" href="/create/class" v-if="role ==='admin'">Create Class</b-nav-item>
                <b-nav-item class="nav-tab" href="/create/group" v-if="role ==='admin'">Create Group</b-nav-item>
                <b-nav-item class="nav-tab" href="/create/user" v-if="role ==='admin'">Create User</b-nav-item>
                <b-nav-item class="nav-tab" href="/schedule" v-if="role ==='teacher' || role ==='student'">Schedule</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item class="nav-tab ml-auto" @click="logout">Log out</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>
<script>
export default {
    data(){
        return {
          role: ""
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/login');
        }        
    },
    created(){
        if(localStorage.getItem('role')){
            this.role = localStorage.getItem('role');
        }
        
        // set the user role
        // this.role = ..

    }
  
}
</script>

<style scoped>
.nav-bar{
    background-color: #161966;
    height: fit-content;
    padding: 0;
}
.kea{
    background-color: #E51818;
    font-weight: bold;
    width: 100px;
    font-size: 25px;
}
.nav-tab ::v-deep .nav-link{
    color: white !important;
    font-weight: bold;
    font-size: 20px;
    padding-left: 10px !important;
    padding-right: 10px !important;
}
</style>
