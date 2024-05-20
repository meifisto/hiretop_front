import { BaseService } from "./base.service";

export class UserService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post("/users/login", data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }




  
  fetchUsers(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get("/admins/list", { params: data })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  fetchAgentsEtab(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get("/inscriptions/list-agents", { params: data })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  removeAgentsEtab(id) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .delete("/inscriptions/archive-agent", { id })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  fetchCommissariats(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get("/admins/list-commissariats", { params: data })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  fetchAgentsPolice(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get("/admins/list-agents-police", { params: data })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  fetchUser({ id }) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`/api/v1/users/${id}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  addUser(userData) {
    // console.log('----- userData: ------ >    ', userData);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post("admins/register", userData)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  updateUser({ id, data }) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put(`/admins/${id}`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  resetPasswordUser(userData) {
    // console.log('--- userData: --- ', userData);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post("/admins/forget-password", userData)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  archiveUser(data) {
    const { id } = data;
    // console.log('id: ::: ', id);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put(`/admins/${id}`, { isArchive: true })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  searchUsers(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post("/api/v1/users/search", data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export default new UserService();
