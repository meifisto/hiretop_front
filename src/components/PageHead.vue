<template>
  <div class="w-100">

  </div>
</template>

<script>

export default {
  name: 'PageHead',
  components: {
  },
  directives: {},
  props: {
    title: { type: String, default: null },
    sub_title: { type: String, default: null },
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
