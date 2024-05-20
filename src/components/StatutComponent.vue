<template>
  <span class="my-auto badge" :class="current_object.class">
    {{current_object.label}}
  </span>
</template>

<script>

export default {
  name: 'StatutCandidature',
  components: {
  },
  directives: {},
  props: {
    curr_statut: { type: String, default: '100' },
  },
  data() {
    return {
      statut_options: [
        {label: 'Enregistrée', value: 'saved', class: 'badge-dark'},
        {label: 'Rejetée', value: 'rejected', class: 'badge-danger'},
        {label: 'Acceptée', value: 'accepted', class: 'badge-warning'},
        {label: 'En phase d\'entretien', value: 'meeting_step', class: 'badge-success'},
      ],
    }
  },
  methods:{
    // navigateToHome(){
    //   window.location = "/"
    // }
  },
  computed: {
    current_object(){
      const object = this.statut_options.find(curr_stat => curr_stat.value === this.curr_statut);
      return object
    }
    // logoImgProps() {
    //   return {
    //     blank: true,
    //     width: this.width,
    //     height: this.height,
    //   }
    // },
  },
}
</script>
<style lang="scss" scoped></style>
