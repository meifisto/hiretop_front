import sectorsService from "@/services/http/sectors.service";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createSector({ rootState }, data) {
      const res = await sectorsService.createSector(data);
      return res;
    },
    async fetchSectors({ rootState }, data) {
      const res = await sectorsService.fetchSectors(data);
      return res;
    },
    // async updateUser({ rootState }, data) {
    //   const res = await usersService.updateUser(data);
    //   return res;
    // },
    // async updateUserFormData({ rootState }, data) {
    //   const res = await usersService.updateUserFormData(data);
    //   return res;
    // },
    // async resetPasswordUser({ rootState }, data) {
    //   const res = await usersService.resetPasswordUser(data);
    //   return res;
    // },
    // async archiveUser({ rootState }, data) {
    //   const res = await usersService.archiveUser(data);
    //   return res;
    // },
    // async searchUsers({ rootState }, data) {
    //   const res = await usersService.searchUsers(data);
    //   return res;
    // },
    // async getUser({ rootState }, data) {
    //   const res = await usersService.getUser(data);
    //   return res;
    // },
  },
};
