import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import Toast from "vue-toastification";
// import "vue-toastification/dist/index.css"; // Import the CSS or use your own!


import { VueReCaptcha } from 'vue-recaptcha-v3'

// import assets styles
require('@/assets/style.css')

// Importer le CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importer les scripts de Bootstrap
import 'bootstrap';

import { abilitiesPlugin } from '@casl/vue';
import defineAbilitiesFor from './casl/ability';

import utilsService from '@/services/utils/utils.service'
const { userData } = utilsService.currentUserUtils();

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

import * as VeeValidate from 'vee-validate'

const dictionary = {
  en: {
    messages: {
      alpha: () => 'Some English Message',
      required: () => 'The field is required !!!',
    },
  },
  fr: {
    messages: {
      required: field => 'Ce champ est requis',
      email: field => 'Ce champs requiert un email',
      alpha: field => 'Ce champs ne peut contenir que des lettres',
      strictlyNumber: field => 'Ce champs ne doit contenir que des nombres',
      strictlyString: field => 'Ce champs ne doit contenir que des lettres',
      beforeOrToday: field => 'La date ne peut pas dépasser la date du jour',
      afterToday: field => 'La date doit etre ultérieure à la date du jour',
      valideBirthdate: field => "L'age est compris entre 0 et 150 ans",
      length: (field, { length, max }) => {
        if (max) {
          return `Ce champs doit avoir entre ${length} et ${max} caratères`
        }
        return `Ce champs doit avoir ${length} caratères`
      },
      between: (field, { min, max }) => `La valeur est comprise entre ${min} et ${max}`,
    },
  },
}
// VeeValidate.localize('fr', dictionary.fr)
// VeeValidate.extend('strictlyNumber', {
//   // getMessage: field => 'Ce champs ne doit contenir que des nombres',
//   validate: value => Number.isInteger(value),
// })
const app = createApp(App);

app.use(VueAwesomePaginate)

if(userData){
  const ability = defineAbilitiesFor(userData.ability);
  app.use(abilitiesPlugin, ability);
}
app.use(router);
// app.use(Toast);
app.use(store);
app.use(VueReCaptcha, { siteKey: '6Lc2dtApAAAAALyPXmg1YR5sC-9hqdNIdqjZGu74' }); // ReCaptcha v3
import localstorageService from '@/services/localstorage/localstorage.service'

const mixin = {
  data() {
    return {
      userName: 'John Doe',
      userRole: 'Admin'
    };
  },
  methods: {
    formatDateToFrench(dateString) {
      const date = new Date(dateString);
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    },
    async logout() {
      localstorageService.removeJwtToken()
      localstorageService.removeUserData()
      setTimeout(() => {
        window.location.reload();
      }, 500);
      this.$router.replace({ name: 'users-login' })
      // await this.$store.dispatch('auth/logout', {}).then(res => {
      //   // this.$ability.update(initialAbility)
      // })
    },
    active_collapse(button_id, collapse_id){
      const button = document.getElementById(button_id);
      const collapse = document.getElementById(collapse_id);
      // Ajoutez un gestionnaire d'événements au bouton
      if(button && collapse){
        button.addEventListener('click', function() {
          // Basculez la classe 'show' sur le collapse pour l'afficher ou le cacher
          if (collapse.classList.contains('show')) {
            collapse.classList.remove('show');
          } else {
            collapse.classList.add('show');
          }
        });
      }
    }
  },
  created() {
    // console.log('UserMixin has been created!');
  }
};

// directive for phone number input field
app.directive('phonenumber-field', {
  bind(el, binding, vnode) {
    const { length } = binding.value || {}
    const isNumeric = function (inputVal) {
      return /^[\\(\\)\\+0-9]+$/.test(inputVal)
    }
    el.addEventListener('keydown', e => {
      const allowKey = key => [
        'Backspace',
        'Enter',
        'Shift',
        'Tab',
        'ArrowLeft',
        'ArrowRight',
      ].includes(key)
      if (!allowKey(e.key) && !isNumeric(e.key)) {
        e.preventDefault()
      }
      if (!allowKey(e.key) && length && e.target.value.length >= length) {
        e.preventDefault()
      }
    })
    el.addEventListener('keyup', e => {
      e.target.value = `${e.target.value}`
    })
  },
  update(el, binding, vnode, prevVnode) {},
})

app.mixin(mixin);
app.mount('#app');
// createApp(App).use(store).use(router).mount("#app");
