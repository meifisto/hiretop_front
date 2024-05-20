<template>
  <div class="home">
    <!-- En tête -->
    <div class="col-12 card shadow rounded p-3 text-center">
      <label class="h2 font-weight-bold">Bienvenue à HireTop</label>
      <label class="font-weight-bold">Découvrez les Talents qui Transformeront Votre Structure</label>
    </div>
    <!-- Structure & talent -->
    <div class="mt-2 row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card shadow rounded p-3 h-100">
          <label class="h2">Pour les Structures</label>
          <label>Publiez vos offres et trouvez les candidats parfaits !</label>
          <p>
            Chez HireTop, nous comprenons que le recrutement est une tâche cruciale et délicate. Notre plateforme vous permet de publier vos offres d'emploi et de connecter avec des talents exceptionnels prêts à faire évoluer votre structure.
            <ul>
              <li><b>Publiez des Offres</b> : Créez et gérez facilement vos annonces d'emploi.</li>
              <li><b>Accédez à une Base de Talents</b> : Consultez les profils de candidats qualifiés et motivés.</li>
              <li><b>Recrutement Rapide et Efficace</b> : Utilisez nos outils de recherche et de filtrage avancés pour trouver rapidement le candidat idéal.</li>
            </ul>
          </p>
          <p>
            <b>Commencez dès aujourd'hui !</b> <a href="/src/views/users/Register.vue">Créer un Compte Structure</a>
          </p>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card shadow rounded p-3 h-100">
          <label class="h2">Pour les Talents</label>
          <label>Trouvez l'emploi de vos rêves !</label>
          <p>
            Vous êtes à la recherche de nouvelles opportunités professionnelles ? HireTop est là pour vous aider à trouver le poste qui correspond à vos compétences et à vos aspirations.
            <ul>
              <li><b>Recherchez des Offres</b> : Parcourez les offres d'emploi des entreprises les plus innovantes.</li>
              <li><b>Créez un Profil</b> : Mettez en avant vos compétences et vos expériences.</li>
              <li><b>Postulez Facilement</b> : Envoyez vos candidatures en quelques clics.</li>
            </ul>
          </p>
          <p>
            <b>Inscrivez-vous maintenant !</b> <a href="/src/views/users/Register.vue">Créer un Compte Talent</a>
          </p>
        </div>
      </div>
    </div>
    <!-- Pourquoi choisir HireTop -->
    <div class="mt-2 row">
      <div class="col-12">
        <div class="card shadow rounded p-3">
          <div class="mb-2 text-center">
            <label class="h2">Pourquoi Choisir HireTop ?</label>
          </div>
          <div class="row">
            <!-- Simplicité et Efficacité -->
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="card p-3 h-100">
                <label class="h4">Simplicité et Efficacité</label>
                <p>Notre interface intuitive rend la publication des offres et la recherche d'emploi plus simples que jamais.</p>
              </div>
            </div>
            <!-- Matching Intelligent -->
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="card p-3 h-100">
                <label class="h4">Matching Intelligent</label>
                <p>Grâce à nos algorithmes avancés, nous vous aidons à trouver les meilleures correspondances entre les entreprises et les talents.</p>
              </div>
            </div>
            <!-- Sécurité et Confidentialité -->
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="card p-3 h-100">
                <label class="h4">Simplicité et Efficacité</label>
                <p>Nous garantissons la confidentialité de vos données et veillons à ce que vos informations soient protégées.</p>
              </div>
            </div>
            <!-- Support Dédié -->
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="card p-3 h-100">
                <label class="h4">Simplicité et Efficacité</label>
                <p>Notre équipe est disponible pour vous accompagner à chaque étape du processus de recrutement.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Statistiques -->
    <div class="mt-2 row" v-if="current_data">
      <div class="col-12">
        <div class="card shadow rounded p-3">
          <div class="mb-2 text-center">
            <label class="h2">Ce que nous avons pu faire jusqu'à ce jour....</label>
          </div>
          <div class="row text-center">
            <!-- Talents -->
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="card p-3 h-100">
                <label class="h4">Talent</label>
                <p class="display-4">{{ current_data.data && current_data.data.totalTalents }}</p>
              </div>
            </div>
            <!-- Structures -->
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="card p-3 h-100">
                <label class="h4">Structures</label>
                <p class="display-4">{{ current_data.data && current_data.data.totalStructures }}</p>
              </div>
            </div>
            <!-- Candidatures -->
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="card p-3 h-100">
                <label class="h4">Candidatures</label>
                <p class="display-4">{{ current_data.data && current_data.data.totalCandidatures }}</p>
              </div>
            </div>
            <!-- Candidatures retenues -->
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="card p-3 h-100">
                <label class="h4">Candidatures retenues</label>
                <p class="display-4">{{ current_data.data && current_data.data.candidaturesByStatus.meeting_step }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Témoignages & Contact -->
    <div class="mt-2 row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card shadow rounded p-3 h-100">
          <label class="h2">Rejoignez HireTop Aujourd'hui !</label>
          <p>
            Qu'il s'agisse de dénicher le talent parfait pour votre structure ou de trouver l'opportunité professionnelle qui vous correspond, HireTop est la solution idéale.
          </p>
          <p>
            <b>Pour les Structures :</b> <a href="/src/views/users/Register.vue">Créer un Compte Structure</a>
          </p>
          <p>
            <b>Pour les Talents :</b> <a href="/src/views/users/Register.vue">Pour les Talents</a>
          </p>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card shadow rounded p-3 h-100">
          <label class="h2">Questions ?</label>
          <label>N'hésitez pas à nous contacter pour toute question ou assistance. <a href="#">Contactez-nous</a></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      isLoading: false,
      current_data: {},
    }
  },
  watch: {
    $route: {
      immediate: true,
      async handler(val, old) {
        this.load_data()
      },
    },
  },
  methods: {
    load_data(){
      if(this.isLoading) return
      this.isLoading = true
      // load stats ----------------------------------------------------
      this.$store
        .dispatch('stats/statisticsGlobals')
        .then(response => {
          this.isLoading = false
          console.log('stats/globalStats response::: ❌❌❌', response.data);
          this.current_data = response.data
        })
        .catch(error => {
          console.log('error::: ', error);
          this.isLoading = false
        })
    }
  },
};
</script>
