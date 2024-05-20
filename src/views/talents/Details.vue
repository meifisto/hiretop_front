<template>
  <div class="container-fluid">
    <!-- head -->
    <div class="w-100 card shadow rounded p-2">
      <div class="d-flex justify-content-between mt-2">
        <span class="h2">Détails sur votre profil </span> 
        <!-- <span></span> -->
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
      <!-- talent -->
      <div class="row p-3 mt-2">
        <!-- lastname -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="lastname">Nom</label>
            <input type="text" class="form-control" id="lastname" v-model="current_data.lastname">
          </div>
        </div>
        <!-- firstname -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="firstname">Prénom(s)</label>
            <input type="text" class="form-control" id="firstname" v-model="current_data.firstname">
          </div>
        </div>
        <!-- email -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="email">Email <span class="text-danger">(Ce mail servira à vous connecter)</span></label>
            <input type="text" class="form-control" id="email" v-model="current_data.email">
          </div>
        </div>
        <!-- telephone -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="telephone">Téléphone</label>
            <input type="text" class="form-control" id="telephone" v-model="current_data.telephone">
          </div>
        </div>
        <!-- sector -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="telephone">Secteur d'activité</label>
            <select class="form-control" id="sector" v-model="current_data.sector">
              <!-- <option selected>Choisissez votre secteur...</option> -->
              <option :value="sector._id" v-for="(sector, sector_k) in sectors_options" :key="sector_k">
                {{sector.nom}}
              </option>
            </select>
          </div>
        </div>
        <!-- workSince -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="telephone">En activité depuis (ans)</label>
            <input type="number" min="0" class="form-control" id="telephone" v-model="current_data.workSince">
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
            <span class="ml-1" v-if="old_files[index]">
              <strong> <a :href="old_files[index].url">{{ old_files[index].original_filename +'.'+old_files[index].format}}</a> </strong>
            </span> 
            <input class="form-control" type="file" :id="fileInput.id" 
              @change="laod_file(fileInput.id)" :accept="fileInput.type"
            >
            <div>
              <small
                v-if="!isValidFile(piecesJointesList_talent[index].value)"
                class="text-danger"
                >La taille de ce fichier dépasse 5Mo ou le fichier n'est pas du bon type
              </small>
            </div>
          </span>
        </div>
        <!-- description -->
        <div class="col-lg-12 col-sm-12 mt-2" v-if="show_description"> 
          <div class="form-group">
            <label for="description">A propos de vous</label>
            <input type="text" class="form-control" id="description" v-model="current_data.description" placeholder="Parlez nous de vous">
          </div>
        </div>
        <hr class="my-1">
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
      piecesJointesList_talent: [
        { label: "Curriculum Vitae", id:"cv", value: null, type:'.pdf' },
        { label: "Photo de profil", id:"pic_1", value: null, type:'image/*' },
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
        this.current_id = this.userData.talent_associated._id
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
      // load current talent ----------------------------------------------------
      this.$store
        .dispatch('talents/getTalent', this.current_id)
        .then(response => {
          // this.isLoading = false
          if (response.status === 200) {
            this.current_data = response.data.resource
            this.current_data.sector = this.current_data.sector._id
            this.current_data.email = this.userData.email
            this.current_data.telephone = this.userData.telephone
            this.current_data.firstname = this.userData.firstname
            this.current_data.lastname = this.userData.lastname
            this.old_files = this.current_data.fichiers
            // init tiny whith current content
            const editor = tinymce.get('description');
            console.log('editor::: ', editor);
            console.log('this.current_data.description::: ', this.current_data.description);
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
        .catch(error => {console.log('error::: ', error);})
    },
    isValidFile(file, type) {
      if ((file && file.size && file.size > 5000000) && (file.type === type)) {
        return false;
      }
      return true;
    },
    laod_file(file_id){
      this.piecesJointesList_talent.forEach(piece => {
        if(piece.id === file_id){
          // document.getElementById(file_id).addEventListener('change', function() {

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
  },
}
</script>

<style lang="scss">

</style>
