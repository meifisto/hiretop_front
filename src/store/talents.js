import talentService from "@/services/http/talents.service";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createWithFile({ rootState }, data) {
      const res = await talentService.createWithFile(data);
      return res;
    },
    async fetchTalents({ rootState }, data) {
      const res = await talentService.fetchTalents(data);
      return res;
    },
    async getTalent({ rootState }, data) {
      const res = await talentService.getTalent(data);
      return res;
    },
  },
};
