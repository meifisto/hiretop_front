import { BaseService } from "./base.service";

export class CandidacyService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  createWithFile(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('/candidacies/create-file', data)
        .then(result => {resolve(result)})
        .catch(err => {reject(err)})
    })
  }
  createCandidacy(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('/candidacies/create', data)
        .then(result => {resolve(result)})
        .catch(err => {reject(err)})
    })
  }
  fetchCandidacies(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get("/candidacies/list", { params: data })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
  updateCandidacy({ id, data }) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put(`/candidacies/${id}`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
  getCandidacy(id) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`/candidacies/${id}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export default new CandidacyService();
