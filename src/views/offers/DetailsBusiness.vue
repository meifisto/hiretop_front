<template>
  <div class="container-fluid">
    <!-- head -->
    <div class="w-100 card shadow rounded  p-2">
      <div class="d-flex justify-content-between mt-2">
        <div class="col-md-1">
          <img
            :src="current_data && current_data.fichiers && current_data.fichiers[0].url"
            alt="Login V2"
            class="img-fluid"
            style="width: 100px; height: 50px; object-fit: cover;"
          />
        </div>
        <div class="col my-auto">
          <span class="h2">Détails de l'offre </span> 
        </div>
        <span>
          <button class="btn btn-warning w-100" @click="updateOffer()">
            <span class="font-weight-bold mr-1">Enregister les modifications</span>
          </button>
        </span>
      </div>
    </div>
    <!-- content -->
    <div class="mt-2 col-lg-12 col-md-12 w-100">
      <!-- <img class="card-img-top" :src="current_data && current_data.fichiers[0].url"> -->
      <div class="card-body card rounded">
        <span class="row">
          <span class="col-12 d-flex justify-content-end">
            <span class="d-flex ">

            </span>
            <!-- status -->
            <span class="badge my-auto" 
              :class="
                current_data.statut === 'published' && 'badge-success' || 
                current_data.statut === 'saved' &&  'badge-dark' ||
                current_data.statut === 'removed' &&  'badge-secondary' 
              " 
            >
              {{ 
                current_data.statut === 'saved' && 'Non publié' || 
                current_data.statut === 'published' && 'Publié' ||  
                current_data.statut === 'removed' && 'Publié'
              }} 
            </span> 
            
            <div class="form-check ml-1" v-for="(option, option_k) in offer_type_options" :key="option_k" id="statut">
              <input class="form-check-input" type="radio" name="register_option" :id="'option_' + option_k" 
                :value="option.value" v-model="current_data.statut">
              <label class="form-check-label" :for="'option_' + option_k">
                {{ option.label }}
              </label>
            </div>
            <span class="">
              <!-- ok -->
              <!-- <span class="badge badge-warning"><i class="las la-eye"/></span> -->
              <!-- <button class="btn btn-warning w-100" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
                <i class="las la-eye"/>
              </button> -->
            </span>
          </span>
          <span class="col-6 mt-2">
            <select class="form-control" id="sector" v-model="current_data.sector">
              <option :value="sector._id" v-for="(sector, sector_k) in sectors_options" :key="sector_k">
                {{sector.nom}}
              </option>
            </select> 
          </span> 
          <span class="col-6 mt-2">
            <input type="text" class="form-control" id="physical_adress" v-model="current_data.titre">
          </span>
          <!-- <span class="col-6 mt-2">
            
          </span> -->
          
          <!-- contenu -->
          <div class="col-lg-12 col-md-12 mt-4">
            <div class="form-group">
              <!-- <label for="description">Description de l'offre :</label> -->
              <!-- <div v-html="current_data.contenu"/> -->
              <input type="text" class="form-control" id="contenu">
            </div>
          </div>
        </span>
      </div>
    </div>
    <!-- <div class="d-flex justify-content-between mt-3">
    </div> -->
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
    // MapsComponent
  },
  // mixins: [togglePasswordVisibility],
  setup() {},
  data() {
    return {
      title: 'Détails',
      isLoading: false,
      isAuthenticated, userData, isBusiness,  isTalent, isAdmin,
      current_id: null,
      current_data: {},
      paginationData: {
        currentPage: 1,
        total: 0,
        perPage: 15,
        metaData: { from: 0, to: 0 },
      },
      filterBy: {
        createdAt: {from: null, to: null},
        titre: null,
        statut: null,
        sector: null,
        business_associated: null,
      },
      query: {
        filter: {type:[], text:[]},
        options: {},
      },
      sectors_options: [],
      businesses_options: [],
      offer_type_options: [
        {label: "Enregister l'offre", value:'saved'},
        {label: "Enregistrer et publier l'offre", value:'published'},
        {label: "Retirer l'offre", value:'removed'},
      ],
    }
  },
  watch: {
    $route: {
      immediate: true,
      async handler(val, old) {
        const { id } = this.$route.params;
        this.current_id = id

        // load sectors ----------------------------------------------------
        this.$store
          .dispatch('sectors/fetchSectors', )
          .then(response => {
            this.isLoading = false
            if (response.status === 200) {
              this.sectors_options = response.data.resources
            }
          })
          .catch(error => {
            this.isLoading = false
            console.log('error::: ', error)
          })
        // -----------------------------------------------------------------
        this.load_data()
      },
    },
  },
  computed: {},
  mounted() {
    this.active_collapse('filter_button','filter_collapse')
    // Initialisez TinyMCE sur le champ de texte
    tinymce.init({
      selector: '#contenu',
      plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      height: 600,  // Hauteur du champ de texte
    })
    // init datepicker inputs
    // $(document).ready(function(){
    //   $('#startDate').datepicker({
    //       format: 'dd-mm-yyyy',
    //       autoclose: true,
    //       todayHighlight: true,
    //       language: 'fr'
    //   });

    //   $('#endDate').datepicker({
    //       format: 'dd-mm-yyyy',
    //       autoclose: true,
    //       todayHighlight: true,
    //       language: 'fr'
    //   });
    // });
    // init filterby 
    // if(this.isBusiness)
      // this.filterBy.business_associated = this.userData && this.userData.business_associated._id;
  },
  methods: {
    load_data(){
      this.isLoading = true
      // console.log(' ❌❌❌',);
      // load offers ----------------------------------------------------
      this.$store
        .dispatch('offers/getOffers', this.current_id)
        .then(response => {
          this.isLoading = false
          console.log('offers/getOffers response::: ', response);
          if (response.status === 200) {
            this.current_data = response.data.resource
            console.log('this.current_data.contenu::: ❌❌❌', this.current_data.contenu);
            this.current_data.sector = this.current_data.sector._id
            console.log('this.current_data.sector::: ', this.current_data.sector);
            // return

            setTimeout(() => {
              // init tiny whith current content
              const editor = tinymce.get('contenu');
              console.log('editor::: ', editor);
              if (editor) {
                editor.setContent(this.current_data.contenu);
              } else {
                console.error('Editor not initialized');
              }
            }, 500);
          }
        })
        .catch(error => {
          console.log('error::: ', error);
          this.isLoading = false
        })
    },
    updateOffer(){
      let data = {
        ...this.current_data
      }
      delete data.fichiers
      delete data.updatedAt
      delete data.createdAt
      delete data.business_associated
      delete data.__v

      console.log('data::: ', data);
      console.log('this.current_id::: ', this.current_id);
      this.isLoading = true
      this.$store
        .dispatch('offers/updateOffer', { id: this.current_id, data})
        .then(response => {
          this.isLoading = false
          console.log('offers/updateOffer response::: ', response);
          if (response.status === 200) {
            this.load_data()
          }
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
.btn-color{
  color: #af8404;
}
</style>
