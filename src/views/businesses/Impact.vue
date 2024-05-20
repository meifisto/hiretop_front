<template>
  <div class="container-fluid">
    <!-- head -->
    <div class="w-100 card shadow rounded p-2">
      <div class="d-flex justify-content-between mt-2">
        <span class="h2" >
          L'impact de <strong>{{ userData.business_associated.social_raison }}</strong>  dans la communauté !
        </span> 
        <span>
          <!-- <button class="btn btn-warning w-100" @click="update()">
            <span class="font-weight-bold mr-1">Enregistrer les modifications</span>
            <span class="spinner-border spinner-border-sm" v-if="isLoading"/>
          </button> -->
        </span>
      </div>
      <!-- <hr class="hr-primary"> -->
      <!-- <button class="btn btn-primary" type="button" @click="toggleCollapse" id="filter_button">
        Button with data-target
      </button>
      <div class="collapse" :class="{ 'show': isCollapsed }" id="filter_collapse">
        <div class="card card-body">
          Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
        </div>
      </div> -->
    </div>
    <!-- content -->
    <div class="w-100 card shadow rounded mt-4">
      toto
    </div>
    
  </div>
</template>

<script>
import { AbilityBuilder } from '@casl/ability'
import localstorageService from '@/services/localstorage/localstorage.service'

import { mapActions } from 'vuex'
import utilsService from '@/services/utils/utils.service'
const { isAuthenticated, userData, isBusiness,  isTalent, isAdmin} = utilsService.currentUserUtils();

export default {
  page() {
    return {
      title: () => this.title,
      // meta: [{ name: 'description', content: $themeConfig.app.description }],
    }
  },
  directives: {
    // 'b-tooltip': VBTooltip,
  },
  components: {
  },
  // mixins: [togglePasswordVisibility],
  setup() {},
  data() {
    return {
      title: 'Détails',
      // sideImg: require('@/assets/images/login.png'),
      isLoading: false,
      isAuthenticated, userData, isBusiness,  isTalent, isAdmin,
      current_id: null,
      current_data: {},
    }
  },
  watch: {
    $route: {
      immediate: true,
      async handler(val, old) {
        // const { id } = val.params
        this.current_id = this.userData.business_associated._id
        if(this.current_id) this.load_data()
      },
    },
  },
  computed: {},
  mounted() {
    // this.show_description = true
    // Initialisez TinyMCE sur le champ de texte
    // tinymce.init({
    //   selector: '#description',
    //   plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
    //   toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    //   height: 300,  // Hauteur du champ de texte
    // })
  },
  methods: {
    load_data(){
      if(this.isLoading) return
      this.isLoading = true
      // load stats ----------------------------------------------------
      this.$store
        .dispatch('stats/businessImpact',{businessId: this.current_id})
        .then(response => {
          this.isLoading = false
          console.log('stats/globalStats response::: ❌❌❌', response.data);
          this.current_data = response.data
        })
        .catch(error => {
          console.log('error::: ', error);
          this.isLoading = false
        })
    }
  },
}
</script>

<style lang="scss">

</style>
