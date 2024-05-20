<template>
  <div class="auth-wrapper auth-v2 h-100">
    <!-- Brand logo-->
    <!-- <span  class="brand-logo">
      <AppLogo />
    </span> -->
    <!-- /Brand logo-->

    <div class="row justify-content-center">
      <!-- img -->
      <div class="col-lg-6 col-md-6 col-sm-12 w-100 d-lg-flex align-items-center justify-content-center">
        <img
          :src="sideImg"
          alt="Login V2"
          class="img-fluid"
        />
      </div>
      <!-- form -->
      <div class="col-lg-4 col-md-6 col-sm-12 row w-100 align-items-center justify-content-center">
        <div class="card shadow rounded col-12">
          <!-- <ValidationObserver ref="loginForm"> -->

            <div class="col-12 p-3"> 
              <span class="h2 text-center w-100">Hiretop</span>
              <div class="text-danger h4 mb-1 " v-if="error_msg">{{ error_msg }}</div>
  
              <div class="form-group mt-5">
                <label for="curr_email">Addresse Email</label>
                <input 
                  type="email" name="email" class="form-control" id="curr_email" placeholder="Votre email" 
                  v-model="curr_email"
                  @keyup.enter="login()"
                  @blur="v$.curr_email.$touch"
                  :class=" v$.curr_email.$errors.length && 'border border-danger'"
                >
                <div class="input-errors text-danger" v-for="error of v$.curr_email.$errors" :key="error.$uid">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
  
              <div class="form-group">
                <label for="curr_password">Mot de passe : </label>
                <input type="password" name="password" class="form-control" id="curr_password" placeholder="Votre mot de passe"
                  v-model="curr_password"  
                  @keyup.enter="login()"
                  @blur="v$.curr_password.$touch"
                  :class=" v$.curr_password.$errors.length && 'border border-danger'"
                >
                <div class="input-errors text-danger" v-for="error of v$.curr_password.$errors" :key="error.$uid">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
  
              <div class="w-100 ">
                <!-- @click="login()" -->
                <button class="btn btn-warning w-100" @click="login()">
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
import localstorageService from '@/services/localstorage/localstorage.service'

import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'


export default {
  page() {
    return {
      title: () => this.title,
      // meta: [{ name: 'description', content: $themeConfig.app.description }],
    }
  },
  directives: {},
  components: {
    // ValidationProvider,
  },
  // mixins: [togglePasswordVisibility],
  setup() {
    return { 
      v$: useVuelidate({ $lazy: true }),
    }
  },
  data() {
    return {
      title: 'Connexion',
      status: '',
      curr_password: '',
      curr_email: '',
      sideImg: require('@/assets/images/login.png'),

      // validation rules
      // required,
      // email,
      isLoading: false,
      recaptchaResponse: null,
      error_msg: null,
      // required, email,
    }
  },
  validations () {
    return {
      curr_email: { required, email },
      curr_password: { required },
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  mounted() {
    // this.$toast("I'm a toast!");

  },
  methods: {
    async login() {
      const isFormCorrect =  await this.v$.$validate();
      if(isFormCorrect){
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
            email: this.curr_email,
            password: this.curr_password,
            token
          })
          .then(response => {
            // console.log('login response ================== ', response)
            if (response.status === 200 && response.data.token) {
              const { user: userData, token } = response.data
  
              localstorageService.setJwtToken(token)
              const isAdmin = userData.role && userData.role.code === 'admin'
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
                // ],
              ]
              localstorageService.setUserData(
                {
                  ...userData,
                  role: { ...userData.role, permissions },
                  ability: permissions,
                },
              )  
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
      }

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
