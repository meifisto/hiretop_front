import offersService from "@/services/http/offers.service";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createWithFile({ rootState }, data) {
      const res = await offersService.createWithFile(data);
      return res;
    },
    async createOffer({ rootState }, data) {
      const res = await offersService.createOffer(data);
      return res;
    },
    async fetchOffers({ rootState }, data) {
      const res = await offersService.fetchOffers(data);
      return res;
    },
    async getOffers({ rootState }, data) {
      const res = await offersService.getOffers(data);
      return res;
    },
    async updateOffer({ rootState }, data) {
      const res = await offersService.updateOffer(data);
      return res;
    },
    // async resetPasswordUser({ rootState }, data) {
    //   const res = await offersService.resetPasswordUser(data);
    //   return res;
    // },
    // async archiveUser({ rootState }, data) {
    //   const res = await offersService.archiveUser(data);
    //   return res;
    // },
    // async searchUsers({ rootState }, data) {
    //   const res = await offersService.searchUsers(data);
    //   return res;
    // },
    // async getUser({ rootState }, data) {
    //   const res = await offersService.getUser(data);
    //   return res;
    // },
  },
};
