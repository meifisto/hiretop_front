<template>
  <div class="container-fluid">
    <!-- head -->
    <div class="w-100 card shadow rounded  p-2">
      <div class="d-flex justify-content-between mt-2">
        <span class="h2">Les candidatures pour vos offres</span> 
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
    <div v-if="current_list.length > 0" class="d-flex justify-content-between mt-3">
      <div class="mt-2  col-lg-4 col-md-6 cursor-pointer" 
        v-for="(item, item_k) in current_list" :key="item_k" 
        @click="
        ()=>{
          $router.push({
            name: 'candidacies-details',
            params: {
              candidacy_id: item._id,
            },
          }) 
        }"
      >
        <div class="card-body card rounded">
          <span class="row">
            <span class="col-7">
              <small><strong>{{ formatDateToFrench(item.createdAt) }}</strong> </small> 
            </span> 
            <span class="col-5 nopadding">
              <StatutComponent :curr_statut="item.statut" />
            </span>
            <span class="col-12">
              {{item.sector.nom}} <br> {{item.offer.titre }} 
            </span> 
            <span class="col-12"><strong>{{item.titre}}</strong></span>
            <hr class="hrPrimary">
            <span 
              class="col-12"
              v-if="item.statut !== 'saved' && 
                item.statut !== 'accepted' && item.statut !== 'rejected'"
            >
              <label class="col-12 text-small">Date de l'entretien : {{ item.meeting_date }}</label>
              <label class="col-12 text-small">Lien de l'entretien : {{item.meeting_link}}</label>
              <hr class="hrPrimary">
            </span>
            <span class="col-12"><strong>{{item.titre}}</strong></span>
            <span class="col-12">
              {{item.talentUser.firstname}} {{item.talentUser.lastname }}, 
              {{item.talentUser.email }}, {{item.talentUser.telephone }}
            </span>
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
    <!-- modal details -->
    <!-- <div class="modal modal-dialog modal-lg" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
      <div class="modal-dialog" v-if="current_item">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailsModalLabel">
              {{current_item.sector.nom}} <br> {{current_item.offer.titre }} 
            </h5>
            <button type="btn btn-warning" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer">
              <i class="las la-times"></i>
            </button>
          </div>
          <div class="modal-body">
            Contenu du modal...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Fermer</button>
            <button type="button" class="btn btn-warning">Enregistrer</button>
          </div>
        </div>
      </div>
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
import StatutComponent from '@/components/StatutComponent.vue'
import { buildFiltersForRequest } from '../../helpers/http-utils'


import { mapActions } from 'vuex'
import utilsService from '@/services/utils/utils.service'
const { isAuthenticated, userData, isBusiness,  isTalent, isAdmin, currentUserId } = utilsService.currentUserUtils();

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
        {label: 'Rejetée', value: 'rejected'},
        {label: 'En phase d\'entretien', value: 'meeting_step'},
        {label: 'Profil retenu',  value: 'taken' },
        {label: 'Profil rrejetté', value: 'abandoned'},
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
  },
  methods: {
    init(){
      // console.log('::: ', this.userData.business_associated._id);
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
            // console.log('this.businesses_options::: ❌', this.businesses_options);
          }
        })
        .catch(error => {
          console.log('error::: ', error);
        })
      this.load_data()
    },  
    prepare_params(){
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
          statut: this.filterBy.statut,
          business_associated: this.userData && this.userData.business_associated._id,
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
      this.prepare_params()
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
          this.isLoading = false
          console.log('candidacies/fetchCandidacies response::: ', response);
          if (response.status === 200) {
            this.current_list = response.data.resources
            console.log('this.current_list::: ❌❌❌', this.current_list);
          }
        })
        .catch(error => {
          console.log('error::: ', error);
          this.isLoading = false
        })
    },
    openModal(item) {
      this.current_item = item
      // Sélectionner le modal par son identifiant et l'ouvrir
      const myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
      myModal.show();
    }
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
