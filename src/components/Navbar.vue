<template>
  <div id="nav" class="" style="padding: 20px 0 0 !important;margin: 10px 0 0 0 !important;">
    <span  class=" d-flex justify-content-between">
      <span class="my-auto">
        <router-link to="/" class="" >
          <img alt="Vue logo" src="../assets/images/logo_1_transparent.png" 
            style="width: 100px; height: 50px; object-fit: cover;"/>
          <!-- <i class="las la-home"/> -->
        </router-link> |
        <span v-if="isAdmin">
          <router-link to="/about" class="mr-3"><i class="las la-chart-bar"/> Tableau de bord</router-link> 
          <router-link to="/about" class="mr-3"><i class="las la-users mr-1"/>Nos utilisateurs</router-link> 
          <!-- <router-link to="/about"><i class="las la-info-circle"/> Nos recommandations</router-link> | -->
        </span>
        <span v-if="isBusiness">
          <router-link to="/businesses/details"><i class="las la-industry"/> Votre entreprise</router-link> |
          <router-link to="/offers/list/business"><i class="las la-shopping-basket"/> Vos offres</router-link> |
          <router-link to="/candidacies/list/business"><i class="las la-user-graduate"/> Les candidatures</router-link> |
          <router-link to="/business/impact"><i class="las la-bolt"/>Votre impact</router-link> |
        </span>
        <span v-if="isTalent">
          <router-link to="/talents/details"><i class="las la-industry"/> Votre profil</router-link> |
          <router-link to="/offers/list/talent"><i class="las la-shopping-basket"/> Les offres</router-link> |
          <router-link to="/candidacies/list"><i class="las la-folder"/> Vos candidatures</router-link> |
          <!-- <router-link to="/about"><i class="las la-lightbulb"/> Nos recommandations</router-link> | -->
        </span>

        <router-link to="/about"><i class="las la-info-circle"/> HireTop</router-link>
      </span>
      <span class="my-auto" v-if="!isAuthenticated">
        <router-link to="/users/register">S'inscrire</router-link> | 
        <router-link to="/users/login">Se connecter</router-link>
      </span>
      <span v-else class="d-flex flex-row">
        <span class="my-auto">
          <span class="strong"> {{userData.firstname + ' ' + userData.lastname}} </span> <br>
          <span class="strong" v-if="userData.business_associated"> 
            {{ userData.business_associated.social_raison }} 
          </span> 
          <span v-if="isAdmin"> {{ userData.role.nom }} </span>
        </span>
        <div class="profile-container ml-2 my-auto">
          <!-- <img src="https://res.cloudinary.com/dfidd0bty/image/upload/v1690714445/frs1az4nxqlqh7emqwik.jpg" class="rounded-circle" 
              style="width: 50px; height: 50px; object-fit: cover;" > -->
          <i class="las la-user-circle iconBig"></i>
        </div>
        <span class="ml-1 my-auto" @click="logout()">
          <i class="las la-sign-out-alt iconBig"></i>
        </span>
      </span>
    </span>
    <hr class="hr-primary">
  </div>
</template>

<script>
import localstorageService from '@/services/localstorage/localstorage.service'
import utilsService from '@/services/utils/utils.service'
const { isAuthenticated, userData, isBusiness,  isTalent, isAdmin} = utilsService.currentUserUtils();

export default {
  name: 'Navbar',
  data() {
    return {
      isAuthenticated,
      userData,
      isAdmin,
      isBusiness,  
      isTalent
    };
  },
  watch: {
    $route: {
      immediate: true,
      async handler(val, old) {
      },
    },
  },
  mounted(){
    // console.log('this.userData ::: ', this.userData);
  }
}
</script>

<style scoped lang="scss">
#nav {
  padding: 20px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #af8404;
    }
  }
}

@media (max-width: 600px) {
  nav ul {
    flex-direction: column;
  }
}
</style>