<template>
  <div class="container-fluid " style="">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import utilsService from '@/services/utils/utils.service'
const { isAuthenticated, userData } = utilsService.currentUserUtils();
export default {
  name: "Home",
  components: {
    Navbar,
  },
  data() {
    return {
      // links: [
      //   { name: 'Home', path: '/' },
      //   { name: 'Login', path: '/users/login' }
      // ]
      isAuthenticated,
      userData,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #000000;
  //background-color: #ececee;
  background-color: #f2f1eb;
  height: 100%;
  padding: 0 0 20px 0;
}


</style>
