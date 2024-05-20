<template>
  <div class="container-fluid">
    <!-- head -->
    <div class="w-100 card shadow rounded  p-2">
      <div class="row justify-content-between mt-2" v-if="current_data">
        <div class="col-lg-6">
          <div class="h2">Détails de la candidature</div>
          <StatutComponent :curr_statut="current_data.statut" />
        </div>
        <div class="col-lg-6">
          <div class="text-right">
            <button type="button" class="btn btn-xs mx-2" 
              v-for="(statut, statut_k) in next_statut" :key="statut_k"
              :class="statut.class"
              @click="update_statut(statut)"
            >
              {{statut.action}}
              <div class="spinner-border spinner-border-sm ml-1" v-if="isLoading"/>
            </button>
          </div>
          <div v-if="current_data.statut == 'meeting_step'">
            <!--2024/05/17 -->
            <div class="d-flex flex-column">
              <label class="text-small">Date de l'entretien : {{ current_data.meeting_date }}</label>
              <input type="text" class="form-control" id="meeting_date" v-model="meeting_date_model" placeholder="Date de l'entretien" :class="v$.meeting_date_model.$errors.length && 'border border-danger'">
              <div class="input-errors text-danger" v-for="error of v$.meeting_date_model.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
            <div class="d-flex flex-column">
              <label class="">Lien de l'entretien : {{current_data.meeting_link}}</label>
              <input type="text" class="form-control" v-model="meeting_link" placeholder="Lien pour l'entretien" :class="v$.meeting_link.$errors.length && 'border border-danger'">
              <div class="input-errors text-danger" v-for="error of v$.meeting_link.$errors" :key="error.$uid">
                <small class="error-msg">{{ error.$message }}</small>
              </div>
            </div>
            <div class="d-flex justify-content-end mt-2">
              <button class="btn btn-warning " @click="save_meeting_info()">
                <span class="font-weight-bold mr-1">Enregistrer</span>
                <span class="spinner-border spinner-border-sm" v-if="isLoading"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- content -->
    <div class="w-100 card shadow rounded mt-4">
      <div class="row p-3 mt-2">

        <!-- candidate --------------------------------------------------------->
        <span class="col-lg-12 h4"> <strong> Le candidat</strong></span>
        <!-- lastname -->
        <div class="col-lg-3 col-sm-12">
          <div class="form-group">
            <label >Nom : &nbsp;</label>
            <span> {{ current_data && current_data.talentUser.lastname }} </span>
          </div>
        </div>
        <!-- firstname -->
        <div class="col-lg-3 col-sm-12">
          <div class="form-group">
            <label >Prénom(s) : &nbsp;</label>
            <span> {{ current_data && current_data.talentUser.firstname }} </span>
          </div>
        </div>
        <!-- telephone -->
        <div class="col-lg-3 col-sm-12">
          <div class="form-group">
            <label >Téléphone : &nbsp;</label>
            <span> {{ current_data && current_data.talentUser.telephone }} </span>
          </div>
        </div>
        <!-- email -->
        <div class="col-lg-3 col-sm-12">
          <div class="form-group">
            <label >Email : &nbsp;</label>
            <span> {{ current_data && current_data.talentUser.email }} </span>
          </div>
        </div>
        <!-- cv -->
        <div class="col-lg-3 col-sm-12" v-if="current_data && current_data.fichiers">
          <div class="form-group">
            <label >Curriculum vitae : &nbsp;</label>
            <span class="ml-1" v-if="current_data.fichiers[0]">
              <strong> 
                <a :href="current_data.fichiers[0].secure_url">
                  {{ current_data.fichiers[0].original_filename +'.'
                  + current_data.fichiers[0].format}}
                </a> 
              </strong>
            </span> 
          </div>
        </div>
        <!-- motivation -->
        <div class="col-lg-12 col-sm-12">
          <div class="form-group">
            <label for="lastname">Message du candidat : &nbsp;</label>
            <span v-if="current_data">
              <span v-html="current_data.message"> </span>
            </span>
          </div>
        </div>

        <div class="col-12">

          <hr class="hrPrimary">
        </div>

        <!-- offer --------------------------------------------------------->
        <span class="col-lg-12 h4"> <strong> Votre offre</strong></span>
        <!-- offer.titre -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="lastname">Titre : &nbsp;</label>
            <span> {{ current_data && current_data.offer.titre }} </span>
          </div>
        </div>
        <!-- offer.titre -->
        <div class="col-lg-6 col-sm-12">
          <div class="form-group">
            <label for="lastname">Secteur : &nbsp;</label>
            <span> {{ current_data && current_data.sector.nom }} </span>
          </div>
        </div>
        <!-- offer.titre -->
        <div class="col-lg-12 col-sm-12">
          <div class="form-group">
            <label for="lastname">Contenu de l'offre : &nbsp;</label>
            <span v-if="current_data">
              <span v-html="current_data.offer.contenu"> </span>
            </span>
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
import StatutComponent from '@/components/StatutComponent.vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

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
  directives: {},
  components: {
    StatutComponent,
  },
  // mixins: [togglePasswordVisibility],
  setup() {
    return { 
      v$: useVuelidate({ $lazy: true }),
    }
  },
  data() {
    return {
      title: 'Détails',
      isLoading: false,
      isLoadingSaveMeetingInfo: false,
      isAuthenticated, userData, isBusiness,  isTalent, isAdmin, currentUserId,
      current_id: null,
      current_data: null,
      sectors_options: [],
      businesses_options: [],
      statut_options: [
        {label: 'Enregistrée', value: 'saved', next: ['accepted', 'rejected'], class: 'btn-dark'},
        {label: 'Acceptée', action: 'Accepter la candidature', value: 'accepted', next: ['meeting_step'], class: 'btn-warning'},
        {label: 'Rejetée', action: 'Rejeter la candidature', value: 'rejected', class: 'btn-danger'},
        {label: 'En phase d\'entretien', action: "Passer à l'entretien", value: 'meeting_step', next: ['taken', 'abandoned'], class: 'btn-success'},
        {label: 'Profil retenu', action: "Retenir le profil", value: 'taken', class: 'btn-success'},
        {label: 'Profil rrejetté', action: "Rejetter le profil", value: 'abandoned', class: 'btn-danger'},
      ],
      current_statut: {},
      next_statut: null,
      meeting_date_model: null,
      meeting_link: null,
    }
  },
  validations () {
    return {
      meeting_date_model: { required },
      meeting_link: { required },
    }
  },
  watch: {
    $route: {
      immediate: true,
      async handler(val, old) {
        const { candidacy_id } = this.$route.params;
        this.current_id = candidacy_id
        this.load_data()
      },
    },
  },
  computed: {},
  mounted() {
    // this.active_collapse('filter_button','filter_collapse')
    // init datepicker inputs
    $(document).ready(function(){
      $('#meeting_date').datepicker({
          format: 'dd-mm-yyyy',
          autoclose: true,
          todayHighlight: true,
          language: 'fr'
      });
    });
    // init filterby 
    // if(this.isBusiness)
    //   this.filterBy.business_associated = this.userData && this.userData.business_associated._id;
  },
  methods: {
    load_data(){
      // console.log('::: ', this.userData.business_associated._id);
      // load candidacy ----------------------------------------------------
      this.$store
        .dispatch('candidacies/getCandidacy', this.current_id)
        .then(response => {
          // console.log('candidacies/getCandidacy response::: ❌❌❌', response);
          if(response.status === 200){
            this.current_data = response.data.resource
            console.log('this.current_data::: ❌', this.current_data);
            this.curr_statut = this.statut_options.find(curr_stat => curr_stat.value == this.current_data.statut);
            // console.log('this.curr_statut::: ', this.curr_statut);

            
            if(this.current_data.statut == 'meeting_step'){
              console.log('this.current_data.meeting_date::: ', this.current_data.meeting_date);
              // this.meeting_date_model = this.current_data.meeting_date ,
              console.log('this.current_data.meeting_link::: ', this.current_data.meeting_link);
              // this.meeting_link = this.current_data.meeting_link,
            }
            if(this.curr_statut.next){
              this.next_statut = []
              for (let index = 0; index < this.curr_statut.next.length; index++) {
                const step_value = this.curr_statut.next[index];
                // console.log('step_value::: ', step_value);
                const step = this.statut_options.find(curr_stat => curr_stat.value == step_value);
                this.next_statut.push(step)
              }
            }
            // console.log('this.next_statut::: ', this.next_statut);
          }
        })
        .catch(error => {
          console.log('error::: ', error);
        })
    },  
    update_statut(statut){
      console.log('statut::: +++ ', statut);
      const data = {statut: statut.value} 
      this.update(data)
    },
    async save_meeting_info(){
      const isFormCorrect = await this.v$.$validate();
      if(isFormCorrect) {
        const meeting_date = $('#meeting_date').datepicker('getFormattedDate','yyyy/mm/dd')
        // const meeting_date = this.meeting_date_model
        console.log('meeting_date::: ', meeting_date);
  
        const data = {
          meeting_date,
          meeting_link: this.meeting_link
        }
        await this.update(data)
      }
    },
    update(data){
      console.log('data::: ', data);
      this.isLoading = true
      // load candidacy ----------------------------------------------------
      this.$store
        .dispatch('candidacies/updateCandidacy', { 
            id: this.current_id, data 
        } )
        .then(response => {
          this.isLoading = false
          console.log('candidacies/updateCandidacy response::: ❌❌❌', response);
          if(response.status === 200){
            this.load_data()
          }
        })
        .catch(error => {
          this.isLoading = false
          console.log('error::: ', error);
        })
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
