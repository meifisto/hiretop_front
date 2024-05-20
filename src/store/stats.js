import statService from "@/services/http/stats.service";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async statisticsGlobals({ rootState }, data) {
      const res = await statService.statisticsGlobals(data);
      return res;
    },
    async businessImpact({ rootState }, data) {
      const res = await statService.businessImpact(data);
      return res;
    },
    async businessTalentRecommended({ rootState }, data) {
      const res = await statService.businessTalentRecommended(data);
      return res;
    },
  },
};
