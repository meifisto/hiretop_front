<template>
  <div class="container-fluid">
    <!-- head -->
    <div class="w-100 card shadow rounded  p-2">
      <div class="d-flex justify-content-between mt-2">
        <span class="h2">Vos candidatures</span> 
        <!-- Button trigger modal -->
        <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          Launch demo modal
        </button> -->

        <!-- Modal -->
        <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div> -->
        <span>
          <!-- <button class="btn btn-warning w-100" @click="()=>{$router.push({ name: 'offers-create' })}">
            <span class="font-weight-bold mr-1">Enregistrer une nouvelle offre</span>
          </button> -->
        </span>
      </div>
      <hr class="hr-primary">
      <!-- {{ filterBy }} -->
      <button class="btn btn-outline-light btn-sm text-dark" type="button" id="filter_button">
        Filtrer par
      </button>
      <div class="collapse" :class="{ 'show': isCollapsed }" id="filter_collapse">
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <label for="sector">Prériode de soumission</label>
            <!-- <input type="text" class="form-control" id="physical_adress" v-model="form_data.titre"> -->
            <span class="d-flex justify-content-betwenn">
              <input type="text" class="form-control" id="startDate" v-model="filterBy.createdAt.from" placeholder="Date de début">
              <input type="text" class="form-control" id="endDate" v-model="filterBy.createdAt.to" placeholder="Date de fin">
            </span>
          </div>
          <!-- sector -->
          <div class="col-lg-6 col-md-12 form-group">
            <label for="sector">Secteur</label>
            <select class="form-control" id="sector" v-model="filterBy.sector">
              <option :value="sector._id" v-for="(sector, sector_k) in sectors_options" :key="sector_k">
                {{sector.nom}}
              </option>
            </select> 
          </div>
          <!-- businesses -->
          <div class="col-lg-6 col-md-12 form-group">
            <label for="business">Structure / Entreprise</label>
            <select class="form-control" id="business" v-model="filterBy.business_associated">
              <option :value="business._id" v-for="(business, business_k) in businesses_options" :key="business_k">
                {{business.social_raison}}
              </option>
            </select> 
          </div>
          <!-- statut -->
          <div class="col-lg-6 col-md-12 form-group">
            <label for="business">Statut de la candidature</label>
            <select class="form-control" id="business" v-model="filterBy.statut">
              <option :value="statut.value" v-for="(statut, statut_k) in statut_options" :key="statut_k">
                {{statut.label}}
              </option>
            </select> 
          </div>
          <div class="col-lg-12 col-md-12 d-flex justify-content-end">
            <button class="btn btn-warning" @click="prepare_params()">
              <span class="font-weight-bold mr-1">Filtrer</span>
              <span class="spinner-border spinner-border-sm" v-if="isLoading"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- content -->
    <div v-if="current_list.length > 0" class="row mt-3">
      <div class="mt-2 col-lg-4 cursor-pointer" 
        v-for="(item, item_k) in current_list" :key="item_k"
        data-toggle="modal" :data-target="'#modal-' + item._id"
      >
        <!-- <img class="card-img-top" :src="item.fichiers[0].url"> -->
        <div class="card-body card rounded">
          <div class="row">
            <div class="col-lg-7 col-md-6 col-sm-12">
              <strong>{{ formatDateToFrench(item.createdAt) }}</strong> 
            </div> 
            <div class="col-lg-5 col-md-6 col-sm-12">
              <StatutComponent :curr_statut="item.statut" />
            </div>
            <div class="col-lg-12">
              {{item.sector.nom}} <br> {{item.offer.titre }} 
            </div> 
            <hr>
            <div class="col-lg-12">
              <strong>{{item.titre}}</strong>
            </div>
          </div>
          <!-- <button type="button" class="btn btn-primary">
            <i class="las la-eye"></i>
          </button> -->
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center mt-3">  
      <span class="text-center">
        <span class="spinner-border spinner-border-sm" v-if="isLoading"/>
        <span class="font-weight-bold" v-else>Liste vide</span>
      </span>
    </div>
    <!-- modal details -->
    <div class="modal fade" :id="'modal-' + item._id" tabindex="-1" :aria-labelledby="'modalLabel-' + item._id" aria-hidden="true" v-for="(item, item_k) in current_list" :key="'modal-' + item_k">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" :id="'modalLabel-' + item._id">
              Détails de votre candidature
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p><b>Domaine :</b> {{item.sector.nom}}</p>
            <p><b>Titre de l'offre :</b> {{item.offer.titre}}</p>
            <p><b>Description de l'offre : </b></p>
            <p v-html="item.offer.contenu"></p>
          </div>
          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div> -->
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
import StatutComponent from '@/components/StatutComponent.vue'

import { mapActions } from 'vuex'
import utilsService from '@/services/utils/utils.service'
const { isAuthenticated, userData, isBusiness,  isTalent, isAdmin, currentUserId} = utilsService.currentUserUtils();

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
    StatutComponent,
    // AppLogo,
    // MapsComponent
  },
  // mixins: [togglePasswordVisibility],
  setup() {},
  data() {
    return {
      title: 'Détails',
      isLoading: false,
      isAuthenticated, userData, isBusiness,  isTalent, isAdmin, currentUserId,
      current_id: null,
      current_list: [],
      current_item: null,
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
      statut_options: [
        {label: 'Enregistrée', value: 'saved'},
        {label: 'Acceptée', value: 'accepted'},
        {label: 'Rejetée', value: 'accepted'},
        {label: 'En phase d\'entreitne', value: 'meeting_step'},
      ],
    }
  },
  watch: {
    $route: {
      immediate: true,
      async handler(val, old) {
        this.init()
      },
    },
  },
  computed: {},
  mounted() {
    this.active_collapse('filter_button','filter_collapse')
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
    init(){
      // load sectors -----------------------------------------------------------
      this.$store
        .dispatch('sectors/fetchSectors', )
        .then(response => {
          if (response.status === 200) {
            this.sectors_options = response.data.resources
            console.log('this.sectors_options::: ❌', this.sectors_options);
          }
        })
        .catch(error => {
          console.log('error::: ', error);
        })
      // load businesses ----------------------------------------------------
      this.$store
        .dispatch('businesses/fetchBusinesses')
        .then(response => {
          if (response.status === 200) {
            this.businesses_options = response.data.resources
            // console.log('this.businesses_options::: ❌', this.businesses_options);
          }
        })
        .catch(error => {
          console.log('error::: ', error);
        })
      this.prepare_params()
    },  
    prepare_params(){
      if(this.isLoading) return
      this.isLoading = true
      this.filterBy.createdAt.from = $('#startDate').datepicker('getFormattedDate','yyyy/mm/dd')
      this.filterBy.createdAt.to = $('#endDate').datepicker('getFormattedDate','yyyy/mm/dd')

      if(this.filterBy.createdAt.from && this.filterBy.createdAt.to){
        const range = this.filterBy.createdAt.from + ',' + this.filterBy.createdAt.to
        this.query.filter.type.push("createdAt")
        this.query.filter.text.push(range)
      }
      if(this.filterBy.titre && this.filterBy.titre !== ''){
        this.query.filter.type.push("titre")
        this.query.filter.text.push(this.filterBy.titre)
      }
      if(this.filterBy.business_associated){
        this.query.options = { 
          ...this.query.options, 
          business_associated: this.filterBy.business_associated
        }  
      }
      if(this.filterBy.statut){
        this.query.options = { 
          ...this.query.options, 
          statut: this.filterBy.statut
        }  
      }
      if(this.filterBy.sector){
        this.query.options = { 
          ...this.query.options, 
          sector: this.filterBy.sector
        }  
      }

      this.query.options = { 
        ...this.query.options, 
        talent: this.currentUserId
      }  
      console.log('this.query:::⭕️ ', this.query);
      this.load_data()
    },
    load_data(){
      console.log('this.query:::⭕️ ', this.query);
      // load offers ----------------------------------------------------
      const params = {
        ...this.query,
        page: this.paginationData.currentPage - 1,
        perPage: this.paginationData.perPage,
      }
      console.log('params::: ⭕️⭕️⭕️', params);
      this.$store
        .dispatch('candidacies/fetchCandidacies', params)
        .then(response => {
          console.log('candidacies/fetchCandidacies response::: ', response);
          // this.isLoading = false
          if (response.status === 200) {
            this.current_list = response.data.resources
            console.log('this.current_list::: ❌❌❌', this.current_list);
          }
        })
        .catch(error => {
          console.log('error::: ', error);
          // this.isLoading = false
        })
    },
  },
}
</script>

<style lang="scss">
.btn-color{
  color: #af8404;
}
/* Define the cursor style for the 'cursor-pointer' class */
.cursor-pointer {
  cursor: pointer;
}
</style>
