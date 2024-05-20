import candidacyService from "@/services/http/candidacies.service";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createWithFile({ rootState }, data) {
      const res = await candidacyService.createWithFile(data);
      return res;
    },
    async createCandidacy({ rootState }, data) {
      const res = await candidacyService.createCandidacy(data);
      return res;
    },
    async fetchCandidacies({ rootState }, data) {
      const res = await candidacyService.fetchCandidacies(data);
      return res;
    },
    async getCandidacy({ rootState }, data) {
      const res = await candidacyService.getCandidacy(data);
      return res;
    },
    async updateCandidacy({ rootState }, data) {
      const res = await candidacyService.updateCandidacy(data);
      return res;
    },
  },
};
