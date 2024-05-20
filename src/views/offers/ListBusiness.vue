<template>
  <div class="container-fluid">
    <!-- head -->
    <div class="w-100 card shadow rounded  p-2">
      <div class="d-flex justify-content-between mt-2">
        <span class="h2">Offres </span> 
        <span>
          <button class="btn btn-warning w-100" @click="()=>{$router.push({ name: 'offers-create' })}">
            <span class="font-weight-bold mr-1">Enregistrer une nouvelle offre</span>
          </button>
        </span>
      </div>
      <hr class="hr-primary">
      <!-- {{ filterBy }} -->
      <button class="btn btn-outline-light btn-sm text-dark" type="button" id="filter_button">
        Filtrer par
      </button>
      <div class="collapse" :class="{ 'show': isCollapsed }" id="filter_collapse">
        <div class="row">
          <!-- createdApp -->
          <div class="col-lg-6 col-md-12">
            <label for="sector">Prériode d'enregistrement</label>
            <span class="d-flex justify-content-betwenn">
              <input type="text" class="form-control" id="startDate" v-model="filterBy.createdAt.from" placeholder="Date de début">
              <input type="text" class="form-control" id="endDate" v-model="filterBy.createdAt.to" placeholder="Date de fin">
            </span>
          </div>
          <!-- titre -->
          <div class="col-lg-6 col-md-12 form-group">
            <label for="sector">Titre</label>
            <input type="text" class="form-control" id="sector"  v-model="filterBy.titre">
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
          <!-- button -->
          <div class="col-lg-12 col-md-12 d-flex justify-content-end">
            <button class="btn btn-warning" @click="updateFilter()">
              <span class="font-weight-bold mr-1">Filtrer</span>
              <span class="spinner-border spinner-border-sm" v-if="isLoading"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- content -->
    <div v-if="current_list.length > 0" class="d-flex justify-content-between mt-3">
      <div class="mt-2  col-lg-4 col-md-4 cursor-pointer" 
        v-for="(item, item_k) in current_list" :key="item_k" 
        @click="
          $router.push({
            name: isTalent ? 'offers-details' : 'offers-details-business',
            params: {
              id: item._id,
            },
          })
        "
      >
        <img class="card-img-top" :src="item.fichiers.length != 0 && item.fichiers[0] && item.fichiers[0].url || logoImg">
        <div class="card-body card rounded">
          <span class="row">
            <span class="col-12">
              <strong>{{ formatDateToFrench(item.createdAt) }}</strong> 
            </span> 
            <span class="col-12">
              {{item.business_associated && item.business_associated.social_raison}} |
              {{item.sector.nom}} 
              <!-- <strong>
              </strong> -->
            </span> 
            
            <span class="col-12">
              <strong>{{item.titre}}</strong>
            </span>
            <!-- <span class="col-4 d-flex justify-content-end">
              <span 
                class="badge my-auto" 
                :class="item.statut === 'published' ? 'badge-success' : 'badge-dark'" 
                v-if="isBusiness"
              >
                {{ item.statut === 'published' ? 'Publié' : 'Non publié' }} 
              </span>
            </span> -->
          </span>
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center mt-3">  
      <span class="text-center">
        <span class="spinner-border spinner-border-sm" v-if="isLoading"/>
        <span class="font-weight-bold" v-else>Liste vide</span>
      </span>
    </div>
    <!-- pagination -->
    <div class="w-100">
      <PaginationComponent
        :table-data="tableData"
        :per-page="paginationData.perPage"
        :total-rows="paginationData.total"
        @change="onPaginationChange"
      />
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
import { buildFiltersForRequest } from '../../helpers/http-utils'
import PaginationComponent from '@/components/PaginationComponent.vue'

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
    PaginationComponent,
  },
  // mixins: [togglePasswordVisibility],
  setup() {},
  data() {
    return {
      title: 'Détails',
      isLoading: false,
      isAuthenticated, userData, isBusiness,  isTalent, isAdmin,
      logoImg: require('../../assets/images/logo_1_transparent.png'),
      current_id: null,
      current_list: [],
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
        this.init()
      },
    },
    'paginationData.currentPage': {
      handler(val, old) {
        this.load_data()
      },
    },
    'paginationData.perPage': {
      handler(val, old) {
        this.load_data()
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
            // console.log('this.sectors_options::: ❌', this.sectors_options);
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
            console.log('this.businesses_options::: ❌', this.businesses_options);
          }
        })
        .catch(error => {
          console.log('error::: ', error);
        })
      this.load_data()
    }, 
    updateFilter() {
      this.query.filter = { text: [], type: [], }
      const periodeFilter = () => {
        this.filterBy.createdAt.from = $('#startDate').datepicker('getFormattedDate','yyyy/mm/dd')
        this.filterBy.createdAt.to = $('#endDate').datepicker('getFormattedDate','yyyy/mm/dd')
        const { from, to } = this.filterBy.createdAt
        console.log('from, to::: ', typeof from, typeof to , from === 'string');
        if (typeof from === 'object' || typeof to === 'object') return { createdAt: '' }
        const result = !to ? `${from},${from}` : `${from},${to}`
        return { createdAt: result }
      }
      const titreFilter = () => {
        return { titre: this.filterBy.titre }
      }

      let filters = {
        ...periodeFilter(),
        ...titreFilter(),
      }

      const filtersObj = buildFiltersForRequest(filters)
      console.log('filtersObj::: ', filtersObj);
      
      this.query = {
        filter : filtersObj,
        option : {
          business_associated: this.filterBy.business_associated,
          sector: this.filterBy.sector,
          // statut: 'published',
        },
        page: this.paginationData.currentPage - 1,
        perPage: this.paginationData.perPage,
      }

      console.log('this.query:::❌❌❌ ', this.query, JSON.parse(JSON.stringify(this.query)));
      // console.log('::: ❌❌❌', this.query[[Target]]);
      this.query = JSON.parse(JSON.stringify(this.query))
    },
    load_data(){
      if(this.isLoading) return
      this.isLoading = true
      this.updateFilter()
      // load offers ----------------------------------------------------
      this.$store
        .dispatch('offers/fetchOffers', {
          ...JSON.parse(JSON.stringify(this.query))
        })
        .then(response => {
          console.log('offers/fetchOffers response::: ', response);
          this.isLoading = false
          if (response.status === 200) {
            this.current_list = response.data.resources
            console.log('this.current_list::: ❌❌❌', this.current_list);
            
            // pagination ----------------------------------------------------
            this.paginationData.total = response.data.total || response.data.resources.length || 0
            if (this.paginationData.metaData.from == 0) {
              this.paginationData.metaData.from += 1
            } else {
              this.paginationData.metaData.from = this.paginationData.perPage * this.paginationData.currentPage
                - this.paginationData.perPage
            }
            this.paginationData.metaData.to = this.paginationData.perPage * this.paginationData.currentPage
              - this.paginationData.perPage
              + this.current_list.length
            // pagination ----------------------------------------------------
          }
        })
        .catch(error => {
          console.log('error::: ', error);
          this.isLoading = false
        })
    },
    onPaginationChange(val) {
      this.paginationData = { ...this.paginationData, ...val }
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
