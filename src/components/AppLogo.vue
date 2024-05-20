<template>
  <!-- <b-link
    class="navbar-brand"
    to="/dashboard"
  > -->
  <a
    class="navbar-brand"
    @click="navigateToHome"
  >
    <img
      :height="height"
      :class="{'img-filter-blacknwhite':blacknwhite}"
      :src="require('@/assets/images/logo_1_transparent.png')"
      alt="logo"
    /></a>
</template>

<script>

export default {
  name: 'AppLogo',
  components: {
  },
  directives: {},
  props: {
    width: { type: Number, default: 100 },
    height: { type: Number, default: 50 },
    blacknwhite: { type: Boolean, default: false },
  },
  methods:{
    navigateToHome(){
      window.location = "/"
    }
  },
  computed: {
    logoImgProps() {
      return {
        blank: true,
        width: this.width,
        height: this.height,
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
