import usersService from "@/services/http/users.service";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async login({ rootState }, data) {
      const res = await usersService.login(data);
      return res;
    },
    // async addUser({ rootState }, data) {
    //   const res = await usersService.addUser(data);
    //   return res;
    // },
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
