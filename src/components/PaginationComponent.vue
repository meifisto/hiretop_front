<template>
  <div>
    <div class="col-lg-12 col-sm-12">
      <div
        class="
          d-flex
          align-items-center
          justify-content-between
          my-2
          pagination-ctn
        "
      >
        <div class="count">
          {{ totalRows > 0 ? fromToOver.from + ' à ' + fromToOver.to+ ' sur ' : '' }}
          {{ totalRows }} résultats
        </div>
        <div class="pagination justify-content-center">
          <!-- <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
          /> -->
          <vue-awesome-paginate
            v-model="currentPage"
            :total-items="totalRows"
            :items-per-page="perPage"
            :max-pages-shown="5"
          />
        </div>
        <div class="per-page d-flex align-items-center justify-content-between">
          <div class="mr-1">
            <label
              for="per-page"
              class="font-bold ml-1"
            >Afficher par :
            </label>
          </div>
          <div class="my-auto">
            <!-- <b-form-select
              v-model="perPageLocal"
              :options="perPageValues"
            /> -->
            <select class="" v-model="perPageLocal">
              <option :value="value" v-for="(value, value_k) in perPageValues" :key="value_k">
                {{value}}
              </option>
            </select> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    perPage: {
      type: Number,
      default: 10,
    },
    totalRows: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentPage: 1,
      perPageLocal: this.$props.perPage,
      perPageValues: [2, 10, 20, 100, 200],
    }
  },
  computed: {
    tableDataLength() {
      return (this.tableData && this.tableData.length) || 0
    },
    fromToOver() {
      let from = this.currentPage * this.perPageLocal - this.perPageLocal
      if (from < 0) from = 0

      let to = from + this.perPageLocal
      if (to > this.totalRows) to = this.totalRows

      if (from === 0) from = 1
      if (to === 0) from = 0
      return { from, to }
    },
  },
  watch: {
    currentPage: {
      handler(val, old) {
        this.emitPaginationOutput()
      },
    },
    perPageLocal: {
      handler(val, old) {
        this.emitPaginationOutput()
      },
    },
    tableData: {
      deep: true,
      handler(val, old) {
        // const largestPerPageValue = [...this.perPageValues].pop()
        // if (this.totalRows > largestPerPageValue) this.perPageValues.push(this.totalRows)
      },
    },
  },
  methods: {
    emitPaginationOutput() {
      this.$emit('change', {
        perPage: this.perPageLocal,
        currentPage: this.currentPage,
      })
    },
  },
}
</script>

<style scoped lang="scss">

ul.pagination.b-pagination {
  margin-bottom: 0;
}
.pagination-ctn {
  @media (max-width: 768px) {
    justify-content: center !important;
    gap: 10px;
    flex-wrap: wrap;
  }
}

.pagination {
  @media (max-width: 768px) {
    justify-content: center !important;
    width: 100%;
  }
}
</style>
