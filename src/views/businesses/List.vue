<template>
  <div class="auth-wrapper auth-v2">
    <!-- Brand logo-->
    <!-- <span  class="brand-logo">
      <AppLogo />
    </span> -->
    <!-- /Brand logo-->

    <div class="d-flex flex-row">
      <!-- img -->
      <div class="col-8 w-100 d-lg-flex align-items-center justify-content-center px-5">
        <img
          fluid
          :src="sideImg"
          alt="Login V2"
          class="img-fluid"
        />
      </div>
      <!-- form -->
      <!--  -->
      <div class="col-4 row  row d-flex align-items-center ">
        <div class="card shadow rounded col-12">
          <div class="col-12 p-3"> 
            <span class="h2 text-center w-100">Hiretop</span>
            <div class="text-danger h4 mb-1 " v-if="error_msg">
              {{ error_msg }}
            </div>
            <div class="form-group mt-5">
              <label for="userEmail">Addresse Email</label>
              <input type="email" class="form-control" id="userEmail" v-model="userEmail" placeholder="Votre email" @keyup.enter="login()">
            </div>
            <div class="form-group">
              <label for="password">Mot de passe :</label>
              <input type="password" class="form-control" id="password" v-model="password" placeholder="Votre mot de passe" @keyup.enter="login()">
            </div>
            <div class="w-100 ">
              <button type="submit" class="btn btn-warning w-100" @click="login()">
                <span class="font-weight-bold mr-1">Connexion</span>
                <span class="spinner-border spinner-border-sm" v-if="isLoading"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AbilityBuilder } from '@casl/ability'
// import { initialAbility } from '@/libs/acl/config'
// import store from '@/store/index'
import localstorageService from '@/services/localstorage/localstorage.service'
// import ColorBandGouvBj from '@/components/ColorBandGouvBj.vue'
// import AppLogo from '@/components/AppLogo.vue'
import utilsService from '@/services/utils/utils.service'
import { mapActions } from 'vuex'

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
    // AppLogo,
  },
  // mixins: [togglePasswordVisibility],
  setup() {
    
  },
  data() {
    return {
      title: 'Connexion',
      status: '',
      password: '',
      userEmail: '',
      sideImg: require('@/assets/images/login.png'),

      // validation rules
      // required,
      // email,
      isLoading: false,
      recaptchaResponse: null,
      error_msg: null,
    }
  },
  watch: {
    $route: {
      immediate: true,
      async handler(val, old) {
        const { slug } = val.params
        this.slug = slug

        this.selectedForm = utilsService.getFormulaireBySlug(slug)
        this.formTitle = utilsService.getFormulaireTitleBySlug(slug)
      
        
        // add column -----------------------------------------------
        this.tableColumns = []
        this.tableColumns.push(
          {
            key: 'reference', label: 'Ref', sortable: true,
          },
          )
        // add columns by type form type
        const { type, sousType } = this.selectedForm

        if(this.isPromoteur || this.isAgent){
          this.query.options = {
            etablissement: this.userData.etablissement._id,
          }
        }
        // frontiere
        if(sousType === 'frontiere'){
          if(this.isSuperAdmin || this.isAgentMtca){
            console.log('add column ::: ------------------', );
            this.tableColumns.push(
              {
                key: 'commissariat.nom', label: 'Commissariat ', sortable: true,
              },
            )
          }
          if(this.isAgentPolice){
            this.query.options = {
              commissariat: this.userData.commissariatAssociated._id,
              auteur: this.userData._id,
            }
          }
          if(this.isCommissaire){
            this.query.options = {
              commissariat: this.userData._id,
            }
            this.tableColumns.push(
              {
                key: 'auteur', label: 'Agent Enquêteur', sortable: true,
              },
            )
          }
          this.tableColumns.push(
            {
              key: 'lastname', label: 'Nom Voyageur', sortable: true,
            },
            {
              key: 'firstname', label: 'Prénom Voyageur', sortable: true,
            },
            {
              key: 'date', label: 'Date d\'entrée', sortable: true,
            },
          )
          if(this.estUneFicheFrontiereEntree){
            this.tableColumns.push(
              {
                key: 'date', label: 'Date d\'entrée', sortable: true,
              },
            )
          }
          if(this.estUneFicheFrontiereSortie){
            this.tableColumns.push(
              {
                key: 'date', label: 'Date de sortie', sortable: true,
              },
            )
          }
        }
        if (type === 'etablissement') {
          this.tableColumns.push(
            {
              key: 'nom', label: 'Nom Établissement', sortable: true,
            },
            {
              key: 'annee', label: 'Année', sortable: true,
            },
            {
              key: 'mois', label: 'Mois', sortable: true,
            },
            {
              key: 'statut', label: "Statut Validation", sortable: true,
            },
          )
        }
        if (type === 'client') {
          this.tableColumns.push(
            {
              key: 'lastname', label: 'Nom Client', sortable: true,
            },
            {
              key: 'firstname', label: 'Prénom Client', sortable: true,
            },
            {
              key: 'dateArrivee', label: 'Date d\'arrivée du client', sortable: true,
            },
          )
          if (!this.isEtablissementUser) {
            this.tableColumns.push({
              key: 'etablissement', label: 'établissement', sortable: true,
            })
          }
        }
        this.tableColumns.push(
          {
            key: 'createdAt', label: "Date d'ajout", sortable: true,
          },
          { key: 'actions', },
        )
        // /add column -----------------------------------------------
        if (this.isAdminOrAgentMTCA) {
          await this.getListEtablissements()
          this.getListCommissariats()
        }
        this.getListFormulaires()
      },
    },
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    // imgUrl() {
    //   if (store.state.appConfig.layout.skin === 'dark') {
    //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //     this.sideImg = require('@/assets/images/pages/login-default.png')
    //     return this.sideImg
    //   }
    //   return this.sideImg
    // },
  },
  mounted() {
    const { redirectMotive } = this.$route.params
    if (redirectMotive && redirectMotive === 'sessionExpired') {
      const errorMessage = 'Votre session a expiré. Veuillez vous reconnecter pour accéder à votre compte.'
      // this.$toast({
      //   component: ToastificationContent,
      //   props: {
      //     title: errorMessage,
      //     icon: 'AlertTriangleIcon',
      //     variant: 'danger',
      //   },
      // })
    }
  },
  methods: {
    ...mapActions('imagePuzzleSliderCaptcha', { showSliderCaptcha: 'show' }),
    // ---------------------------------------------------------------------
    async login() {
      this.isLoading = true
      // ReCaptcha v3 : Execute reCAPTCHA with action "login"
      const token = await this.$recaptcha('login')
      if (!token) {
        this.isLoading = false
        return
      }
      // console.log('token::: ', token);
      this.$store
        .dispatch('users/login', {
          email: this.userEmail,
          password: this.password,
          token
        })
        .then(response => {
          console.log('login response ================== ', response)
          if (response.status === 200 && response.data.token) {
            const { user: userData, token } = response.data
            console.log('userData: ', userData)

            localstorageService.setJwtToken(token)
            const isSuperAdmin = userData.role && userData.role.code === 'admin'
            // const permissionsEtabUser = [
            //   {
            //     action: 'read',
            //     subject: 'statistiquesEtablissemnts',
            //   },
            // ]
            
            const permissions = [
              // ...initialAbility,
              ...(
                (userData.role && userData.role.permissions)
                || []
              ).filter(e => e.subject !== 'all'),
              // ...[
              //   {
              //     action: 'read',
              //     subject: 'etablissement',
              //   },
              //   {
              //     action: 'create',
              //     subject: 'etablissement',
              //   },
              //   {
              //     action: 'read',
              //     subject: 'agent',
              //   },
              //   {
              //     action: 'create',
              //     subject: 'agent',
              //   },
              // ],
            ]
            localstorageService.setUserData(
              {
                ...userData,
                role: { ...userData.role, permissions },
                ability: permissions,
              },
            )
            // return

            // redirect user to the page he was looking for before he was redirect to login page. If none, redirect to /
            const pathToRedirectToAfterLogin = localstorageService.getRouteToRedirectToAfterLogin()
            window.location = pathToRedirectToAfterLogin || '/'
            // window.location.reload();
          } else {
            this.isLoading = false
            const customError = {
              email: ['Email or Password is Invalid'],
            }
            this.$refs.loginForm.setErrors(customError)
          }
        })
        .catch(error => {
          console.log('error::: ', error);
          this.error_msg = error.message
          this.isLoading = false
          // console.log('AUTH ERROR')
        })

      return
      this.$refs.loginForm.validate().then(async success => {
        // if (success) {}
          this.isLoading = true

          // const sliderCaptchaResponse = await this.showSliderCaptcha()
          // const { isSolved } = sliderCaptchaResponse || {}
          // console.log('sliderCaptchaResponse', isSolved)
          // if (!isSolved) {
          //   this.isLoading = false
          //   return
          // }

          

          
        
      })
    },

    onRecaptchaChange(recaptchaEvent) {
      if (recaptchaEvent && recaptchaEvent.type === 'success') {
        this.recaptchaResponse = recaptchaEvent
      } else {
        this.recaptchaResponse = null
      }
    },
    // updateAbility() {
    //   const { can, rules } = new AbilityBuilder()

    //   if (user.role === 'admin') {
    //     can('manage', 'all')
    //   } else {
    //     can('read', 'all')
    //   }

    //   this.$ability.update(rules)
    // },
  },
}
</script>

<style lang="scss">

</style>
