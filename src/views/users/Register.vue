<template>
  <div class="auth-wrapper auth-v2">
    <!-- Brand logo-->
    <span  class="brand-logo">
      <!-- <AppLogo /> -->
    </span>
    <!-- /Brand logo-->

    <!-- form -->
    <div class="row px-3">
      <!-- head -->
      <div class="col-12 card shadow rounded p-3 text-center">
        <label class="h2" >Intégrer la communauté !</label>
        <label>Vous êtes une entreprise ou en recherche d'emploi ?  </label>
        <div class="d-flex flex-row justify-content-center">
          <div class="form-check mx-5" v-for="(option, option_k) in register_options" :key="option_k">
            <input class="form-check-input" type="radio" name="register_option" :id="'option_' + option_k" :value="option.value" v-model="register_type">
            <label class="form-check-label" :for="'option_' + option_k">
              {{ option.label }}
            </label>
          </div>
        </div>
      </div>
      <!-- form -->
      <!--  -------------------------------------------- business ------------------------------------------------------------------------------------------------------------------------------>
      <div class="col-12 card shadow rounded p-3 mt-2" v-if="register_type === 'business'"> 
        <div class="row">
          <!-- social_raison -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="social_raison">Nom / Raison sociale de la structure</label>
              <input
                type="text"
                class="form-control"
                id="social_raison"
                v-model="form_business.social_raison"
                placeholder="Entrez le nom de la structure"
                :class="v$.form_business.social_raison.$errors.length && 'border border-danger'"
                @blur="v$.form_business.social_raison.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_business.social_raison.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- sector -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="sector">Secteur d'activité de la structure</label>
              <select class="form-control" id="sector" 
                v-model="form_business.sector" 
                :class="v$.form_business.sector.$errors.length && 'border border-danger'"
                @blur="v$.form_business.sector.$touch"
              >
                <!-- <option selected>Choisissez votre secteur...</option> -->
                <option :value="sector._id" v-for="(sector, sector_k) in sectors_options" :key="sector_k">
                  {{sector.nom}}
                </option>
              </select>
              <div class="input-errors text-danger" v-for="error of v$.form_business.sector.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- agrement_legal_identification -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="businessName">Identifiant / N° agrément social de la structure</label>
              <input type="text" class="form-control" id="businessName"
                v-model="form_business.agrement_legal_identification" 
                :class="v$.form_business.agrement_legal_identification.$errors.length && 'border border-danger'"
                @blur="v$.form_business.agrement_legal_identification.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_business.agrement_legal_identification.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- physical_address -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="physical_address">Adresse physique de la structure</label>
              <input type="text" class="form-control" id="physical_address"
                v-model="form_business.physical_address"  :class="v$.form_business.physical_address.$errors.length && 'border border-danger'"
                @blur="v$.form_business.physical_address.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_business.physical_address.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- email -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="email">Email de la structure <span class="text-danger">(Ce mail servira à vous connecter)</span></label>
              <input type="text" class="form-control" id="email" v-model="form_business.email" 
                :class="v$.form_business.email.$errors.length && 'border border-danger'"
                @blur="v$.form_business.email.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_business.email.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- phonenumber -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="phonenumber">Numéro de téléphone de la structure</label>
              <input type="text" class="form-control" id="phonenumber" v-model="form_business.phonenumber" v-phonenumber-field 
                :class="v$.form_business.phonenumber.$errors.length && 'border border-danger'"
                @blur="v$.form_business.phonenumber.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_business.phonenumber.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- password -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input type="text" class="form-control" id="password" 
                v-model="form_business.password"  :class="v$.form_business.password.$errors.length && 'border border-danger'"
                @blur="v$.form_business.password.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_business.password.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- confirm_password -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="confirm_password">Confirmer le mot de passe</label>
              <input type="text" class="form-control" id="confirm_password" 
                v-model="form_business.confirm_password"  
                :class="v$.form_business.confirm_password.$errors.length && 'border border-danger'"
                @blur="v$.form_business.confirm_password.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_business.confirm_password.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>  
            </div>
          </div>
          <!-- description -->
          <div class="col-lg-12 col-sm-12" v-if="show_description"> 
            <div class="form-group">
              <label for="description">Description de la structure</label>
              <input type="text" class="form-control" id="description" v-model="form_business.description" placeholder="Parlez nous de vous">
            </div>
          </div>



          <hr class="my-1">
          <!-- fichier -->
          <div class="col-12 row mt-5">
            <label class="col-12">Pièces jointes</label>
            <span 
              class="col-lg-6 col-sm-12 mb-1"
              v-for="(fileInput, index) in piecesJointesList_business"
              :key="index"
              :label-for="fileInput.label"
            >
              <label :for="fileInput.id"><small>{{fileInput.label}}</small></label>
              <input class="form-control" type="file" :id="fileInput.id" 
                @change="laod_file(fileInput.id)" :accept="fileInput.type"
              >
              <!-- <div>
                <small 
                  v-if="!isValidFile(piecesJointesList_business[index].value, fileInput.type) && fileInput.type === '.pdf'" 
                  class="text-danger"
                >
                  Ce fichier est requis et doit être un PDF de moins de 5Mo.
                </small>
                <small 
                  v-if="!isValidFile(piecesJointesList_business[index].value, fileInput.type) && fileInput.type !== '.pdf'" 
                  class="text-danger"
                >
                  La taille de ce fichier dépasse 5Mo ou le fichier n'est pas du bon type.
                </small>
              </div> -->
              <div>
                <small
                  v-if="!isValidFile(piecesJointesList_business[index].value)"
                  class="text-danger"
                  >La taille de ce fichier dépasse 5Mo ou le fichier n'est pas du bon type
                </small>
              </div>
            </span>
          </div>
          <!-- localisation -->
          <div class="col-12 mt-5">
            <label classe="">
              Marquez la position de votre établissement : 
              <span v-if="form_business.localization && form_business.localization.lng && form_business.localization.lat">
                {{ form_business.localization.lng && form_business.localization.lat && 'votre position a été bien récupérée.' }}
              </span>
            </label>
            <div class="h-100">
              <MapsComponent
                @on_position_fixed="position_selected($event)"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- legal_representant -->
      <div class="col-12 card shadow rounded p-3 mt-2" v-if="register_type === 'business'"> 
        <div class="row">
          <!-- legal_representant_lastname -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="legal_representant_lastname">Nom du représentant légal de la structure</label>
              <input type="text" class="form-control" id="legal_representant_lastname" 
                v-model="form_business.legal_representant_lastname" v-phonenumber-field 
                :class="v$.form_business.legal_representant_lastname.$errors.length && 'border border-danger'"
                @blur="v$.form_business.legal_representant_lastname.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_business.legal_representant_lastname.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- legal_representant_fistname -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="legal_representant_fistname">Prénom(s) du représentant légal de la structure</label>
              <input type="text" class="form-control" id="legal_representant_fistname" 
                v-model="form_business.legal_representant_fistname" v-phonenumber-field 
                :class="v$.form_business.legal_representant_fistname.$errors.length && 'border border-danger'"
                @blur="v$.form_business.legal_representant_fistname.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_business.legal_representant_fistname.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- legal_representant_email -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="legal_representant_email">Email du représentant légal de la structure</label>
              <input type="text" class="form-control" id="legal_representant_email" 
                v-model="form_business.legal_representant_email" v-phonenumber-field 
                :class="v$.form_business.legal_representant_email.$errors.length && 'border border-danger'"
                @blur="v$.form_business.legal_representant_email.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_business.legal_representant_email.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- legal_representant_phonenumber -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="legal_representant_phonenumber">Téléphone du représentant légal de la structure</label>
              <input type="text" class="form-control" id="legal_representant_phonenumber" 
                v-model="form_business.legal_representant_phonenumber" v-phonenumber-field 
                :class="v$.form_business.legal_representant_phonenumber.$errors.length && 'border border-danger'"
                @blur="v$.form_business.legal_representant_phonenumber.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_business.legal_representant_phonenumber.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -------------------------------------------- talent ------------------------------------------------------------------------------------------------------------------------------>
      <div class="col-12 card shadow rounded p-3 mt-2" v-if="register_type === 'talent'"> 
        <div class="row">
          <!-- lastname -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="lastname">Nom</label>
              <input type="text" class="form-control" id="lastname" v-model="form_talent.lastname"
                :class="v$.form_talent.lastname.$errors.length && 'border border-danger'"
                @blur="v$.form_talent.lastname.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_talent.lastname.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- firstname -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="firstname">Prénom(s)</label>
              <input type="text" class="form-control" id="firstname" 
                v-model="form_talent.firstname" :class="v$.form_talent.firstname.$errors.length && 'border border-danger'"
                @blur="v$.form_talent.firstname.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_talent.firstname.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- email -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="email">Email </label>
              <input type="text" class="form-control" id="email" 
                v-model="form_talent.email" :class="v$.form_talent.email.$errors.length && 'border border-danger'"
                @blur="v$.form_talent.email.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_talent.email.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- telephone -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="telephone">Téléphone</label>
              <input type="text" class="form-control" id="telephone" 
                v-model="form_talent.telephone" :class="v$.form_talent.telephone.$errors.length && 'border border-danger'"
                @blur="v$.form_talent.telephone.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_talent.telephone.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- address -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="adress">Adresse</label>
              <input type="text" class="form-control" id="adress" 
                v-model="form_talent.address" :class="v$.form_talent.address.$errors.length && 'border border-danger'"
                @blur="v$.form_talent.address.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_talent.address.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- sector -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="telephone">Secteur d'activité</label>
              <select class="form-control" id="sector" v-model="form_talent.sector" 
                :class="v$.form_talent.sector.$errors.length && 'border border-danger'"
                @blur="v$.form_talent.sector.$touch"
              >
                <option :value="sector._id" v-for="(sector, sector_k) in sectors_options" :key="sector_k">
                  {{sector.nom}}
                </option>
              </select>
              <div class="input-errors text-danger" v-for="error of v$.form_talent.sector.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- workSince -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="telephone">En activité depuis (ans)</label>
              <input type="number" min="0" class="form-control" id="telephone" 
                v-model="form_talent.workSince" :class="v$.form_talent.workSince.$errors.length && 'border border-danger'"
                @blur="v$.form_talent.workSince.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_talent.workSince.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
        
          <!-- fichier -->
          <div class="col-12 row mt-5">
            <label class="col-12">Pièces jointes</label>
            <span 
              class="col-lg-6 col-sm-12 mb-1"
              v-for="(fileInput, index) in piecesJointesList_talent"
              :key="index"
              :label-for="fileInput.label"
            >
              <label :for="fileInput.id"><small>{{fileInput.label}}</small></label>
              <input class="form-control" type="file" :id="fileInput.id" 
                @change="laod_file(fileInput.id)" :accept="fileInput.type"
              >
              <div>
                <small 
                  v-if="!isValidFile(piecesJointesList_business[index].value, fileInput.type) && fileInput.type === '.pdf'" 
                  class="text-danger"
                >
                  Ce fichier est requis et doit être un PDF de moins de 5Mo.
                </small>
                <small 
                  v-if="!isValidFile(piecesJointesList_business[index].value, fileInput.type) && fileInput.type !== '.pdf'" 
                  class="text-danger"
                >
                  La taille de ce fichier dépasse 5Mo ou le fichier n'est pas du bon type.
                </small>
              </div>
            </span>
          </div>
          <!-- description -->
          <div class="col-lg-12 col-sm-12 mt-2" v-if="show_description"> 
            <div class="form-group">
              <label for="description">A propos de vous</label>
              <input type="text" class="form-control" id="description" v-model="form_talent.description" placeholder="Parlez nous de vous">
            </div>
          </div>
          <hr class="my-1">
          <!-- password -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input type="text" class="form-control" id="password" 
                v-model="form_talent.password" placeholder="Entrez le nom de la structure" 
                :class="v$.form_talent.password.$errors.length && 'border border-danger'"
                @blur="v$.form_talent.password.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_talent.password.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
          <!-- confirm_password -->
          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label for="confirm_password">Confirmer le mot de passe</label>
              <input type="text" class="form-control" id="confirm_password" 
                v-model="form_talent.confirm_password" placeholder="Entrez le nom de la structure" 
                :class="v$.form_talent.confirm_password.$errors.length && 'border border-danger'"
                @blur="v$.form_talent.confirm_password.$touch"
              >
              <div class="input-errors text-danger" v-for="error of v$.form_talent.confirm_password.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- button -->
      <div class="col-12 mt-5 w-100 " style="padding: 0 !important;margin: 0 !important;" v-if="register_type">
        <button type="submit" class="btn btn-warning w-100" @click="register()">
          <span class="font-weight-bold mr-1">Inscription</span>
          <span class="spinner-border spinner-border-sm" v-if="isLoading"/>
        </button>
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
import MapsComponent from '@/components/MapsComponent.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

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
    MapsComponent,
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
      register_options: [
        {label: 'Entreprise', value:'business'},
        {label: 'Candidat', value:'talent'},
      ],
      sectors_options: [],
      register_type: null,
      form_business: {
        social_raison: null,
        sector: null,
        physical_address: null,
        email: null,
        phonenumber: null,
        agrement_legal_identification: null,
        description: null,
        localization: null,

        legal_representant_fistname: null,
        legal_representant_lastname: null,
        legal_representant_email: null,
        legal_representant_phonenumber: null,
        password: null,
      },
      form_talent: {
        email: null,
        telephone: null,
        firstname: null,
        lastname: null,
        description: null,
        
        workSince: null,
        sector: null,
        address: null,
        
        password: null,
      },
      confirm_password: null,
      piecesJointesList_business: [
        { label: "Agrément/Licence", id:"agrement", value: null, type:'.pdf' },
        { label: "Pièce d'identité du représentant", id:"representative_id_card", value: null, type:'.pdf' },
        { label: "Photo Établssement 1", id:"pic_1", value: null, type:'image/*' },
        { label: "Photo Établssement 1", id:"pic_2", value: null, type:'image/*' },
        { label: "Photo Établssement 3", id:"pic_3",value: null, type:'image/*' },
      ],
      piecesJointesList_talent: [
        { label: "Curriculum Vitae", id:"cv", value: null, type:'.pdf' },
        { label: "Photo de profil", id:"pic_1", value: null, type:'image/*' },
      ],
      sideImg: require('@/assets/images/login.png'),

      isLoading: false,
      show_description: true,
    }
  },
  validations() {
      if (this.register_type === 'business') {
        return {
          form_business: {
            social_raison: { required },
            sector: { required },
            physical_address: { required },
            email: { required, email },
            phonenumber: { required },
            agrement_legal_identification: { required },
            legal_representant_fistname: { required },
            legal_representant_lastname: { required },
            legal_representant_email: { required, email },
            legal_representant_phonenumber: { required },
            password: { required },
            confirm_password: { required },
          },
        };
      } else if (this.register_type === 'talent') {
        return {
          form_talent: {
            email: { required, email },
            telephone: { required },
            firstname: { required },
            lastname: { required },
            workSince: { required },
            sector: { required },
            address: { required },
            password: { required },
            confirm_password: { required },
          },
        };
      } else {
        return {};
      }
    },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  watch: {
    $route: {
      immediate: true,
      async handler(val, old) {
        // load sectors ----------------------------------------------------
        this.$store
          .dispatch('sectors/fetchSectors', )
          .then(response => {
            // this.isLoading = false
            if (response.status === 200) {
              this.sectors_options = response.data.resources
            }
          })
          .catch(error => {
            console.log('error::: ', error);
            // this.isLoading = false
          })
      },
    },
  },
  mounted() {
    // Initialisez TinyMCE sur le champ de texte
    tinymce.init({
      selector: '#description',
      plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      height: 300,  // Hauteur du champ de texte
    });
    this.show_description = true
  },
  methods: {
    isValidFile(file, type) {
      if ((file && file.size && file.size > 5000000) && (file.type === type)) {
        return false;
      }
      return true;
    },
    // isValidFile(file, type) {
    //   if (!file) return type !== '.pdf'; // Requis pour les fichiers PDF
    //   const isCorrectType = file.type === type || (type === 'image/*' && file.type.startsWith('image/'));
    //   const isCorrectSize = file.size <= 5000000; // 5MB en octets
    //   return isCorrectType && isCorrectSize;
    // },
    laod_file(file_id){
      if( this.register_type === 'business' ){
        this.piecesJointesList_business.forEach(piece => {
          if(piece.id === file_id){
            // document.getElementById(file_id).addEventListener('change', function() {
  
            var fileInput = document.getElementById(file_id);
            if (fileInput.files.length > 0) {
              var file = fileInput.files[0];
              piece.value = file
              // console.log("Nom du fichier :", file.name);
              // console.log("Taille du fichier :", file.size);
              // console.log("Type de fichier :", file.type);
  
              // // Si vous voulez lire le contenu du fichier, utilisez FileReader
              // const reader = new FileReader();
              // reader.onload = function(e) {
              //   // e.target.result contient le contenu du fichier
              //   console.log("Contenu du fichier :", e.target.result);
              // };
              // // Pour lire le fichier comme texte
              // reader.readAsText(file);
              // Pour lire le fichier comme un Data URL (utile pour les images)
              // reader.readAsDataURL(file);
            } else {
              console.log("Aucun fichier sélectionné.");
            }
          };
        });
      } else {
        this.piecesJointesList_talent.forEach(piece => {
          if(piece.id === file_id){
            // document.getElementById(file_id).addEventListener('change', function() {
  
            var fileInput = document.getElementById(file_id);
            if (fileInput.files.length > 0) {
              var file = fileInput.files[0];
              piece.value = file
              // console.log("Nom du fichier :", file.name);
              // console.log("Taille du fichier :", file.size);
              // console.log("Type de fichier :", file.type);
  
              // // Si vous voulez lire le contenu du fichier, utilisez FileReader
              // const reader = new FileReader();
              // reader.onload = function(e) {
              //   // e.target.result contient le contenu du fichier
              //   console.log("Contenu du fichier :", e.target.result);
              // };
              // // Pour lire le fichier comme texte
              // reader.readAsText(file);
              // Pour lire le fichier comme un Data URL (utile pour les images)
              // reader.readAsDataURL(file);
            } else {
              console.log("Aucun fichier sélectionné.");
            }
          };
        });
      }
    },
    async register() {
      // console.log('this.v$::: ', this.v$);
      const isFormCorrect =  await this.v$.$validate();
      console.log('isFormCorrect::: ', isFormCorrect);

      if(isFormCorrect){
        // if(this.isLoading) return
        this.isLoading = true
  
        // ReCaptcha v3 : Execute reCAPTCHA with action "login"
        const token = await this.$recaptcha('register')
        if (!token) {
          this.isLoading = false
          return
        }
  
        // Récupérez l'instance TinyMCE associée au champ de texte
        var editor = tinymce.get('description');
        if(this.register_type === 'business'){
          // Vérifiez si l'instance de l'éditeur existe et récupérez le contenu
          if (editor) {
            var content = editor.getContent();
            this.form_business.description = content
          }
          // control password
          if( this.form_business.password !== this.form_business.confirm_password ){
            console.log('::: les mots de passes ne sont pas identiques', );
            this.isLoading = false
            return
          }
        } else {
          // Vérifiez si l'instance de l'éditeur existe et récupérez le contenu
          if (editor) {
            var content = editor.getContent();
            this.form_talent.description = content
          }
          // control password
          if( this.form_talent.password !== this.form_talent.confirm_password ){
            console.log('::: les mots de passes ne sont pas identiques', );
            this.isLoading = false
            return
          }
        }
  
        // control files form
        let files =  []
        if( this.register_type === 'business' ){
          files = this.piecesJointesList_business.map((e) => e.value)
        } else {
          files = this.piecesJointesList_talent.map((e) => e.value)
        }
        const allFilesAreValid = files.map((file) => this.isValidFile(file));
  
        for (let index = 0; index < allFilesAreValid.length; index++) {
          const element = allFilesAreValid[index];
          if (element === false) {
            console.log('::: Vos fichiers ne sont pas au bon format', );
            // this.$toast({
            //   component: ToastificationContent,
            //   position: "top-right",
            //   props: {
            //     title:
            //       "Vos fichiers ne sont pas au bon format. Veuillez renseigner des fichiers de 10Mo maximum, au format PDF",
            //     icon: "CheckIcon",
            //     variant: "danger",
            //   },
            // });
            this.isLoading = false;
            return;
          }
        }
  
        
  
        const formData = new FormData();
        let objectdata = {}
        if(this.register_type === 'business'){
          objectdata = {
            social_raison: this.form_business.social_raison,
            sector: this.form_business.sector,
            physical_address: this.form_business.physical_address,
            email: this.form_business.email,
            description: this.form_business.description,
            agrement_legal_identification: this.form_business.agrement_legal_identification,
            localization: this.form_business.localization,
            legal_representant_fistname: this.form_business.legal_representant_fistname,
            legal_representant_lastname: this.form_business.legal_representant_lastname,
            legal_representant_email: this.form_business.legal_representant_email,
            legal_representant_phonenumber: this.form_business.legal_representant_phonenumber,
          };
        }else{
          objectdata = {
            email: this.form_talent.email,
            telephone: this.form_talent.telephone,
            firstname: this.form_talent.firstname,
            lastname: this.form_talent.lastname,
            description: this.form_talent.description,
            workSince: this.form_talent.workSince,
            sector: this.form_talent.sector,
            address: this.form_talent.address,
            password: this.form_talent.password,
          };
        }
  
  
        formData.append("objectdata", JSON.stringify(objectdata));
        formData.append("fileprop", "fichiers");
        formData.append("filenumber", `${files.length || 0}`);
        formData.append("token", token);
  
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          if(file) formData.append(`filedata${index}`, file);
        }
  
        for (const pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }
  
        const path = this.register_type === 'business' ? 'businesses/createWithFile' : 'talents/createWithFile'
        // console.log('path::: ', path);
        // return
  
        this.$store
          .dispatch(path, formData)
          .then(response => {
            this.isLoading = false
            console.log('createWithFile response ==================::: ', response)
            if (response.status === 200) {
              this.$router.replace({ name: 'users-login' })
            }
          })
          .catch(error => {
            console.log('error::: ', error);
            this.isLoading = false
          })
      }
    },
    position_selected(data) {
      if(data && data.lng != '' && data.lat != ''){
        this.form_business.localization = {
          lng: data.lng,
          lat: data.lat,
        }
      }
    },
  },
}
</script>

<style lang="scss">

</style>
