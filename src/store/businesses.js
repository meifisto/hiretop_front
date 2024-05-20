import businessesService from "@/services/http/businesses.service";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createWithFile({ rootState }, data) {
      const res = await businessesService.createWithFile(data);
      return res;
    },
    async fetchBusinesses({ rootState }, data) {
      const res = await businessesService.fetchBusinesses(data);
      return res;
    },
    async getBusiness({ rootState }, data) {
      const res = await businessesService.getBusiness(data);
      return res;
    },
  },
};
