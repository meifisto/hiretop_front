import { BaseService } from "./base.service";

export class BusinessService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  createWithFile(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('/businessprofiles/create-file', data)
        .then(result => {resolve(result)})
        .catch(err => {reject(err)})
    })
  }
  updateWithFile(input_data) {
    const {id , data } = input_data
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put('/businessprofiles/update-file/'+id, data)
        .then(result => {resolve(result)})
        .catch(err => {reject(err)})
    })
  }
  fetchBusinesses(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get("/businessprofiles/list", { params: data })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
  getBusiness(id) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`/businessprofiles/${id}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export default new BusinessService();
