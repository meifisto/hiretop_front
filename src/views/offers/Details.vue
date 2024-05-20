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
          <button class="btn btn-warning w-100" @click="
            $router.push({
              name: 'candidacies-create',
              params: {
                offer_id: current_data._id,
              },
            })
            "
          >
            <span class="font-weight-bold mr-1">Postuler à cette offre</span>
          </button>
        </span>
      </div>
    </div>
    <!-- content -->
    <div class="mt-2 col-lg-12 col-md-12 w-100">
      <div class="card-body card rounded">
        <span class="row">
          <span class="col-6">
            <span class="mt-2">{{current_data.titre}}</span>
          </span>
          <span class="col-6 d-flex justify-content-end">
            <span class="mr-2">
              {{current_data.sector.nom}} |
              <strong>{{current_data.business_associated && current_data.business_associated.social_raison}}</strong>
            </span> 
          </span>
          <!-- contenu -->
          <div class="col-lg-12 col-md-12 mt-4">
            <div class="form-group">
              <!-- <label for="description">Description de l'offre :</label> -->
              <div v-html="current_data.contenu"/>
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
    }
  },
  watch: {
    $route: {
      immediate: true,
      async handler(val, old) {
        const { id } = this.$route.params;
        this.current_id = id
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
    $(document).ready(function(){
      $('#startDate').datepicker({
          format: 'dd-mm-yyyy',
          autoclose: true,
          todayHighlight: true,
          language: 'fr'
      });

      $('#endDate').datepicker({
          format: 'dd-mm-yyyy',
          autoclose: true,
          todayHighlight: true,
          language: 'fr'
      });
    });
    // init filterby 
    if(this.isBusiness)
      this.filterBy.business_associated = this.userData && this.userData.business_associated._id;
  },
  methods: {
    load_data(){
      // console.log(' ❌❌❌',);
      // load offers ----------------------------------------------------
      this.$store
        .dispatch('offers/getOffers', this.current_id)
        .then(response => {
          this.isLoading = false
          console.log('offers/getOffers response::: ', response);
          if (response.status === 200) {
            this.current_data = response.data.resource
            console.log('this.current_data::: ❌❌❌', this.current_data.contenu);
            // init tiny whith current content
            const editor = tinymce.get('contenu');
            console.log('editor::: ', editor);
            if (editor) {
              editor.setContent(this.current_data.contenu);
            } else {
              console.error('Editor not initialized');
            }
          }
        })
        .catch(error => {
          console.log('error::: ', error);
          this.isLoading = false
        })
    }
    // init(){
    //   this.load_data()
    // },  
    // prepare_params(){
    //   if(this.isLoading) return
    //   this.isLoading = true
    //   this.filterBy.createdAt.from = $('#startDate').datepicker('getFormattedDate','yyyy/mm/dd')
    //   this.filterBy.createdAt.to = $('#endDate').datepicker('getFormattedDate','yyyy/mm/dd')

    //   if(this.filterBy.createdAt.from && this.filterBy.createdAt.to){
    //     const range = this.filterBy.createdAt.from + ',' + this.filterBy.createdAt.to
    //     this.query.filter.type.push("createdAt")
    //     this.query.filter.text.push(range)
    //   }
    //   if(this.filterBy.titre && this.filterBy.titre !== ''){
    //     this.query.filter.type.push("titre")
    //     this.query.filter.text.push(this.filterBy.titre)
    //   }
    //   if(this.filterBy.business_associated){
    //     this.query.options = { 
    //       ...this.query.options, 
    //       business_associated: this.filterBy.business_associated
    //     }  
    //   }
    //   if(this.filterBy.statut){
    //     this.query.options = { 
    //       ...this.query.options, 
    //       statut: this.filterBy.statut
    //     }  
    //   }
    //   if(this.filterBy.sector){
    //     this.query.options = { 
    //       ...this.query.options, 
    //       sector: this.filterBy.sector
    //     }  
    //   }
    //   console.log('this.query:::⭕️ ', this.query);
    //   this.load_data()
    // },
    
  },
}
</script>

<style lang="scss">
.btn-color{
  color: #af8404;
}
</style>
