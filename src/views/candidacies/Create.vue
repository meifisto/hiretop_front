<template>
  <div class="container-fluid">
    <!-- head -->
    <div class="w-100 card shadow rounded  p-2">
      <div class="d-flex justify-content-between mt-2">
        <span class="h2">
          Candidature à l'offre <strong> {{ offer.titre }} </strong>  de la structure 
          <strong>{{ offer.business_associated && offer.business_associated.social_raison }}</strong>
          <!-- <strong> {{ offer.titre }} </strong> -->
        </span> 
      </div>
    </div>
    <!-- content -->
    <div class="w-100 card shadow rounded mt-4">
      <!-- legal_representant -->
      <div class="row p-3 mt-3">
        <!-- fichier -->
        <span 
          class="col-lg-12 col-sm-12"
          v-for="(fileInput, index) in piecesJointesList_candidacy"
          :key="index"
          :label-for="fileInput.label"
        >
          <label :for="fileInput.id">{{fileInput.label}} : </label>
          <span class="ml-1" v-if="form_data.fichiers[index]">
            <strong> <a :href="form_data.fichiers[index].secure_url" target="_blank">
              {{ form_data.fichiers[index].original_filename +'.'+form_data.fichiers[index].format}}
            </a> </strong>
          </span> 
          <input class="form-control" type="file" :id="fileInput.id" 
            @change="laod_file(fileInput.id)" :accept="fileInput.type"
            placeholder="Sélectionné un nouveau CV pour cette offre si besoin"
          >
          <div>
            <small
              v-if="!isValidFile(piecesJointesList_candidacy[index].value)"
              class="text-danger"
              >La taille de ce fichier dépasse 5Mo ou le fichier n'est pas du bon type
            </small>
          </div>
        </span>

        <!-- message -->
        <div class="col-lg-12 col-md-12 mt-4">
          <div class="form-group">
            <label for="description">Lettre de motivation</label>
            <input type="text" class="form-control" id="message" placeholder="Décrivez votre offre ici ">
          </div>
        </div>
        <!-- button -->
        <div class="col-md-12 d-flex justify-content-end" style="padding: 0 !important;margin: 0 !important;">
          <button type="submit" class="btn btn-warning" @click="save()">
            <span class="font-weight-bold mr-1">Envoyer la candidature</span>
            <span class="spinner-border spinner-border-sm" v-if="isLoading"/>
          </button>
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
const { isAuthenticated, userData, isBusiness,  isTalent, isAdmin, currentUserId} = utilsService.currentUserUtils();
// import MapsComponent from '@/components/MapsComponent.vue'
// import Editor from '@tinymce/tinymce-vue'
import { reactive } from 'vue'
// import { mapActions } from 'vuex'

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
  },
  data() {
    return {
      isAuthenticated, userData, isBusiness,  isTalent, isAdmin, currentUserId,
      sectors_options: [],
      register_type: 'business',
      form_talent: {},
      form_data: {
        message: null,
        offer: null,
        talent: null,
        fichiers: [],
        sector: null,
        business: null,
      },
      offer: {},
      piecesJointesList_candidacy: [
        { label: "Votre CV", id:"cv", value: null, type:'.pdf' },
        // { label: "Agrément/Licence", id:"agrement", value: null, type:'.pdf' },
      ],
      isLoading: false,
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
        const { offer_id } = this.$route.params;
        console.log('offer_id::: ', offer_id);
        console.log('this.userData::: ', this.userData);

        // load offers ----------------------------------------------------
        this.$store
          .dispatch('offers/getOffers', offer_id)
          .then(response => {
            this.isLoading = false
            if (response.status === 200) {
              this.offer = response.data.resource
              console.log('this.offer::: ', this.offer);
              this.form_data.offer = this.offer._id
              this.form_data.talent = this.currentUserId
              this.form_data.fichiers[0] = this.userData.fichiers[0]
              this.form_data.sector = this.offer.sector._id
              this.form_data.business = this.offer.business_associated._id
            }
          })
          .catch(error => {
            console.log('error::: ', error);
            this.isLoading = false
          })
      },
    },
  },
  mounted() {
    // this.form_data.sector = this.userData && this.userData.business_associated.sector;
    // this.form_data.business_associated = this.userData && this.userData.business_associated._id;

    // Initialisez TinyMCE sur le champ de texte
    tinymce.init({
      selector: '#message',
      plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      height: 400,  // Hauteur du champ de texte
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
    async save() {
      if(this.isLoading) return
      this.isLoading = true

      // control files form
      const files = this.piecesJointesList_candidacy.map((e) => e.value)
      const isAllNull = files.every(value => value === null);

      if (isAllNull) { // direct create
        var editor = tinymce.get('message');
        if (editor) {
          var content = editor.getContent();
          this.form_data.message = content
        }
        // ReCaptcha v3 : Execute reCAPTCHA with action "login"
        const token = await this.$recaptcha('submitForm')
        if (!token) {
          this.isLoading = false
          return
        }
        this.form_data.token = token
        
        this.$store
          .dispatch('candidacies/createCandidacy', this.form_data)
          .then(response => {
            this.isLoading = false
            // console.log('crete response ==================::: ', response)
            if (response.status === 200) {
              this.$router.replace({ name: 'offers-list' })
              return
            }
          })
          .catch(error => {
            console.log('error::: ', error);
            this.isLoading = false
          })
        return
      }
      const allFilesAreValid = files.map((file) => this.isValidFile(file));

      for (let index = 0; index < allFilesAreValid.length; index++) {
        const element = allFilesAreValid[index];
        if (element === false) {
          console.log('::: Vos fichiers ne sont pas au bon format', );
          this.isLoading = false;
          return;
        }
      }

      var editor = tinymce.get('message');
      if (editor) {
        var content = editor.getContent();
        this.form_data.message = content
      }
      
      // ReCaptcha v3 : Execute reCAPTCHA with action "login"
      const token = await this.$recaptcha('submitForm')
      if (!token) {
        this.isLoading = false
        return
      }

      const formData = new FormData();
      const objectdata = {
        offer: this.form_data.offer,
        talent: this.form_data.talent,
        message: this.form_data.message,
        sector: this.form_data.sector,
        business: this.form_data.business,
        // statut: this.form_data.statut,
        // business_associated: this.form_data.business_associated,
      };
      formData.append("objectdata", JSON.stringify(objectdata));
      formData.append("fileprop", "fichiers");
      formData.append("filenumber", `${files.length || 0}`);
      formData.append("token", token);

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if(file) formData.append(`filedata${index}`, file);
      }

      // console.log('::: ⭕️⭕️⭕️', );
      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

      // return
      this.$store
        .dispatch('candidacies/createWithFile', formData)
        .then(response => {
          this.isLoading = false
          // console.log('crete response ==================::: ', response)
          if (response.status === 200) {
            this.$router.replace({ name: 'offers-list' })
            return
          }
        })
        .catch(error => {
          console.log('error::: ', error);
          this.isLoading = false
        })
    },
    laod_file(file_id){
      this.piecesJointesList_candidacy.forEach(piece => {
        if(piece.id === file_id){
          var fileInput = document.getElementById(file_id);
          if (fileInput.files.length > 0) {
            var file = fileInput.files[0];
            piece.value = file
          } else {
            console.log("Aucun fichier sélectionné.");
          }
        };
      });
    },
    isValidFile(file, type) {
      if ((file && file.size && file.size > 5000000) && (file.type === type)) {
        return false;
      }
      return true;
    },
  },
}
</script>

<style lang="scss">

</style>
