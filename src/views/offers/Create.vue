<template>
  <div class="container-fluid">
    <!-- head -->
    <div class="w-100 card shadow rounded  p-2">
      <div class="d-flex justify-content-center mt-2">
        <span class="h2">Nouvelle offre </span> 
      </div>
    </div>
    {{ form_data }}
    <!-- content -->
    <div class="w-100 card shadow rounded mt-4">
      <!-- legal_representant -->
      <div class="row p-3 mt-3">
        <!-- titre -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="physical_adress">Titre de l'offre</label>
            <input type="text" class="form-control" id="physical_adress" v-model="form_data.titre"
              :class="v$.form_data.titre.$errors.length && 'border border-danger'"
            >
            <div class="input-errors text-danger" v-for="error of v$.form_data.titre.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>
        <!-- sector -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="sector">Secteur associé à l'offre</label>
            <select class="form-control" id="sector" v-model="form_data.sector" :class="v$.form_data.sector.$errors.length && 'border border-danger'">
              <option :value="sector._id" v-for="(sector, sector_k) in sectors_options" :key="sector_k">
                {{sector.nom}}
              </option>
            </select>
            <div class="input-errors text-danger" v-for="error of v$.form_data.sector.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>
        <!-- fichier -->
        <span 
          class="col-lg-6 col-sm-12"
          v-for="(fileInput, index) in piecesJointesList_business"
          :key="index"
          :label-for="fileInput.label"
        >
          <label :for="fileInput.id">{{fileInput.label}}</label>
          <input class="form-control" type="file" :id="fileInput.id" 
            @change="laod_file(fileInput.id)" :accept="fileInput.type"
          >
          <div>
            <small
              v-if="!isValidFile(piecesJointesList_business[index].value)"
              class="text-danger"
              >La taille de ce fichier dépasse 5Mo ou le fichier n'est pas du bon type
            </small>
          </div>
        </span>
        <!-- <div class="col-lg-6 col-sm-12 d-flex flex-row">
          
        </div> -->

        <!-- statut -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="statut">Publier l'offre ? </label>
            <div class="form-check" v-for="(option, option_k) in offer_type_options" :key="option_k" id="statut">
              <input class="form-check-input" type="radio" name="register_option" :id="'option_' + option_k" 
                :value="option.value" v-model="form_data.statut">
              <label class="form-check-label" :for="'option_' + option_k">
                {{ option.label }}
              </label>
            </div>
            <!-- <span class="d-flex flex-row">
            </span> -->
          </div>
        </div>

        <!-- contenu -->
        <div class="col-lg-12 col-md-12 mt-4">
          <div class="form-group">
            <label for="description">Description de l'offre {{form_data.contenu}}</label>
            <input type="text" class="form-control" id="contenu" placeholder="Décrivez votre offre ici">
          </div>
        </div>
        <!-- button -->
      </div>
      <div class="d-flex flex-column flex-md-row justify-content-center justify-content-md-end mx-2 my-2">
        <button type="submit" class="btn btn-warning" @click="save()">
          <span class="font-weight-bold mr-1">Enregistrer l'offre</span>
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
const { isAuthenticated, userData, isBusiness,  isTalent, isAdmin, currentUserId} = utilsService.currentUserUtils();
// import MapsComponent from '@/components/MapsComponent.vue'
// import Editor from '@tinymce/tinymce-vue'
import { reactive } from 'vue'
// import { mapActions } from 'vuex'

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

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
    // MapsComponent,
  },
  // mixins: [togglePasswordVisibility],
  setup() {
    return { 
      v$: useVuelidate({ $lazy: true }),
    }
  },
  data() {
    return {
      isAuthenticated, userData, isBusiness,  isTalent, isAdmin, currentUserId,
      sectors_options: [],
      register_type: 'business',
      form_talent: {},
      form_data: {
        titre: null,
        sector: null,
        contenu: null,
        statut: 'published',
        business_associated: null,
      },
      piecesJointesList_business: [
        { label: "Banière de l'offre", id:"pic_1", value: null, type:'image/*' },
        // { label: "Agrément/Licence", id:"agrement", value: null, type:'.pdf' },
      ],
      offer_type_options: [
        {label: "Enregister l'offre", value:'saved'},
        {label: "Enregistrer et publier l'offre", value:'published'},
      ],

      isLoading: false,
    }
  },
  validations() {
    return {
      form_data: {
        titre: { required },
        sector: { required },
        contenu: { required },
        statut: { required },
        business_associated: { required },
      }
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
          .catch(error => {console.log('error::: ', error)})
      },
    },
  },
  mounted() {
    this.form_data.sector = this.userData && this.userData.business_associated.sector;
    this.form_data.business_associated = this.userData && this.userData.business_associated._id;

    // Initialisez TinyMCE sur le champ de texte
    tinymce.init({
      selector: '#contenu',
      plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      height: 250,  // Hauteur du champ de texte
    });

    // Sélectionnez le champ de texte à la ligne 90 par son ID
    // var quill = new Quill('#description', {
    //   theme: 'snow',  // Utilisez le thème 'snow' pour une interface utilisateur claire
    //   modules: {
    //     toolbar: [
    //       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    //       ['bold', 'italic', 'underline', 'strike'],
    //       ['link', 'image'],
    //       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    //       ['clean']
    //     ]
    //   },
    //   placeholder: 'Saisissez votre description ici...'
    // });
  },
  methods: {
    isValidFile(file, type) {
      if ((file && file.size && file.size > 5000000) && (file.type === type)) {
        return false;
      }
      return true;
    },
    laod_file(file_id){
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
          } else {
            console.log("Aucun fichier sélectionné.");
          }
        };
      });
    },
    async save() {
      if(this.isLoading) return
      const isFormCorrect =  await this.v$.$validate();
      if(isFormCorrect) {
        this.isLoading = true
  
        // control files form
        const files = this.piecesJointesList_business.map((e) => e.value)
        const allFilesAreValid = files.map((file) => this.isValidFile(file));
  
        for (let index = 0; index < allFilesAreValid.length; index++) {
          const element = allFilesAreValid[index];
          if (element === false) {
            console.log('::: Vos fichiers ne sont pas au bon format', );
            this.isLoading = false;
            return;
          }
        }
  
        // Récupérez l'instance TinyMCE associée au champ de texte
        var editor = tinymce.get('contenu');
        // Vérifiez si l'instance de l'éditeur existe et récupérez le contenu
        if (editor) {
          var content = editor.getContent();
          this.form_data.contenu = content
        }
        
        // ReCaptcha v3 : Execute reCAPTCHA with action "login"
        const token = await this.$recaptcha('submitForm')
        if (!token) {
          this.isLoading = false
          return
        }
  
        const formData = new FormData();
        const objectdata = {
          titre: this.form_data.titre,
          sector: this.form_data.sector,
          contenu: this.form_data.contenu,
          statut: this.form_data.statut,
          business_associated: this.form_data.business_associated,
        };
        formData.append("objectdata", JSON.stringify(objectdata));
        formData.append("fileprop", "fichiers");
        formData.append("filenumber", `${files.length || 0}`);
        formData.append("token", token);
  
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          if(file) formData.append(`filedata${index}`, file);
        }
  
        console.log('::: ⭕️⭕️⭕️', );
        for (const pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }
        console.log('::: ⭕️⭕️⭕️', );
  
        // return
        this.$store
          .dispatch('offers/createWithFile', formData)
          .then(response => {
            this.isLoading = false
            console.log('crete response ==================::: ', response)
            if (response.status === 200) {
              this.$router.replace({ name: 'offers-list' })
              return
            }
          })
          .catch(error => {
            console.log('error::: ', error);
            this.isLoading = false
          })
      }
    },
  },
}
</script>

<style lang="scss">

</style>
