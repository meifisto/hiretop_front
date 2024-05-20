<template>
  <div class="container-fluid">
    <!-- head -->
    <div class="w-100 card shadow rounded p-2">
      <div class="d-flex justify-content-between mt-2">
        <span class="h2" v-if="isBusiness">Détails sur votre structure : {{ userData.business_associated.social_raison }} </span> 
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
      <!-- business -->
      <div class="row p-3 mt-2">
        <!-- social_raison -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="social_raison">Nom / Raison sociale de la structure</label>
            <input type="text" class="form-control" id="social_raison" v-model="current_data.social_raison" >
          </div>
        </div>
        <!-- sector -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="sector">Secteur d'activité de la structure</label>
            <!-- <input type="text" class="form-control" id="sector"  > -->
            <select class="form-control" id="exampleSelect" v-model="current_data.sector">
              <option selected>Choisissez...</option>
              <option :value="sector._id" v-for="(sector, sector_k) in sectors_options" :key="sector_k">
                {{sector.nom}}
              </option>
            </select>
          </div>
        </div>
        <!-- sector -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="businessName">Idantifiant / N° agrément social de la structure</label>
            <input type="text" class="form-control" id="businessName" v-model="current_data.agrement_legal_identification" >
          </div>
        </div>
        <!-- physical_adress -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="physical_adress">Adresse physique de la structure</label>
            <input type="text" class="form-control" id="physical_adress" v-model="current_data.physical_adress" >
          </div>
        </div>
        <!-- email -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="email">Email de la structure <span class="text-danger">(Ce mail servira à vous connecter)</span></label>
            <input disabled type="text" class="form-control" id="email" v-model="current_data.email" >
          </div>
        </div>
        <!-- phonenumber -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="phonenumber">Numéro de téléphone de la structure</label>
            <input type="text" class="form-control" id="phonenumber" v-model="current_data.phonenumber"  v-phonenumber-field>
          </div>
        </div>
        <!-- description -->
        <div class="col-lg-12 col-sm-12" v-if="show_description">
          <div class="form-group">
            <label for="description">Description de la structure :</label>
            <input type="text" class="form-control" id="description" v-model="current_data.description" placeholder="Parlez nous de vous ">
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
            <label :for="fileInput.id"><small>{{fileInput.label}} : </small></label>
            <span class="ml-1" v-if="old_files[index]">
              <strong> <a :href="old_files[index].url">{{ old_files[index].original_filename +'.'+old_files[index].format}}</a> </strong>
            </span> 
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
        </div>
        <!-- localisation -->
        <div class="col-12 mt-5" v-if="show_localization">
          <label classe="">
            Marquez la position de votre établissement : 
            <span v-if="current_data.localization && current_data.localization.lng && current_data.localization.lat">
              {{ current_data.localization.lng && current_data.localization.lat && 'votre position a été bien récupérée.' }}
            </span>
          </label>
          <div class="h-100">
            <MapsComponent
              @on_position_fixed="position_selected($event)"
              :positions="[current_data.localization]"
              isDraggable="false"
            />
          </div>
        </div>
      </div>
      <!-- legal_representant -->
      <div class="row p-3 mt-3">
        <!-- legal_representant_lastname -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="legal_representant_lastname">Nom du représentant légal de la structure</label>
            <input type="text" class="form-control" id="legal_representant_lastname" v-model="current_data.legal_representant_lastname" placeholder="" v-phonenumber-field>
          </div>
        </div>
        <!-- legal_representant_fistname -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="legal_representant_fistname">Prénom(s) du représentant légal de la structure</label>
            <input type="text" class="form-control" id="legal_representant_fistname" v-model="current_data.legal_representant_fistname" placeholder="" v-phonenumber-field>
          </div>
        </div>
        <!-- legal_representant_email -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="legal_representant_email">Email du représentant légal de la structure</label>
            <input type="text" class="form-control" id="legal_representant_email" v-model="current_data.legal_representant_email" placeholder="" v-phonenumber-field>
          </div>
        </div>
        <!-- legal_representant_phonenumber -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="legal_representant_phonenumber">Téléphone du représentant légal de la structure</label>
            <input type="text" class="form-control" id="legal_representant_phonenumber" v-model="current_data.legal_representant_phonenumber" placeholder="" v-phonenumber-field>
          </div>
        </div>
      </div>
      <!-- <div class="col-12 w-100">
      </div> -->
      <!-- button -->
      <!-- <div class="col-12 mt-5 w-100 " style="padding: 0 !important;margin: 0 !important;">
        <button type="submit" class="btn btn-warning w-100" @click="register()">
          <span class="font-weight-bold mr-1">Inscription</span>
          <span class="spinner-border spinner-border-sm" v-if="isLoading"/>
        </button>
      </div> -->
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
import MapsComponent from '@/components/MapsComponent.vue'

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
    // AppLogo,
    MapsComponent
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
      sectors_options: [],
      piecesJointesList_business: [
        { label: "Agrément/Licence", id:"agrement", value: null, type:'.pdf' },
        { label: "Pièce d'identité du représentant", id:"representative_id_card", value: null, type:'.pdf' },
        { label: "Photo Établssement 1", id:"pic_1", value: null, type:'image/*' },
        { label: "Photo Établssement 1", id:"pic_2", value: null, type:'image/*' },
        { label: "Photo Établssement 3", id:"pic_3",value: null, type:'image/*' },
      ],
      old_files: [],
      show_localization: false,
      show_description: true,
    }
  },
  watch: {
    $route: {
      immediate: true,
      async handler(val, old) {
        // const { id } = val.params
        this.current_id = this.userData.business_associated._id
        this.init()
      },
    },
  },
  computed: {},
  mounted() {
    this.show_description = true
    // Initialisez TinyMCE sur le champ de texte
    tinymce.init({
      selector: '#description',
      plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      height: 300,  // Hauteur du champ de texte
    })
  },
  methods: {
    init(){
      // load current business ----------------------------------------------------
      this.$store
        .dispatch('businesses/getBusiness', this.current_id)
        .then(response => {
          if (response.status === 200) {
            this.current_data = response.data.resource
            this.current_data.sector = this.current_data.sector._id
            if(this.current_data.localization && this.current_data.localization.lng && this.current_data.localization.lat){
              this.show_localization = true
            }
            this.old_files = this.current_data.fichiers
            // init tiny whith current content
            const editor = tinymce.get('description');
            console.log('editor::: ', editor);
            if (editor) {
              editor.setContent(this.current_data.description);
            } else {
              console.error('Editor not initialized');
            }
          }
        })
        .catch(error => {
          console.log('error::: ', error);
          // this.isLoading = false
        })
      // load sectors -----------------------------------------------------------
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
    },
    async update() {
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
      // Vérifiez si l'instance de l'éditeur existe et récupérez le contenu
      if (editor) {
        var content = editor.getContent();
        this.form_business.description = content
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
          this.isLoading = false;
          return;
        }
      }

      

      const formData = new FormData();
      let objectdata = {}
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

      
      // console.log('path::: ', path);
      return

      this.$store
        .dispatch('businesses/createWithFile', formData)
        .then(response => {
          this.isLoading = false
          console.log('createWithFile response ==================::: ', response)
          if (response.status === 200) {
            // this.$router.replace({ name: 'users-login' })
          }
        })
        .catch(error => {
          console.log('error::: ', error);
          this.isLoading = false
        })
    },
  },
}
</script>

<style lang="scss">

</style>
