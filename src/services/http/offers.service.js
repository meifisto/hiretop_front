import { BaseService } from "./base.service";

export class OfferService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  createWithFile(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('/offres/create-file', data)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  createOffer(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('/offres/create', data)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  fetchOffers(params) {
    console.log('params:::+++++++++++++ ', params);
    // params = JSON.parse(params)
    // console.log('params:::+++++++++++++ ', params);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get("/offres/list", { params })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
  getOffers(id) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`/offres/${id}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
  updateOffer(input_data) {
    const {id , data } = input_data
    console.log('id , data::: ', id , data);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put('/offers/'+id, data)
        .then(result => {resolve(result)})
        .catch(err => {reject(err)})
    })
  }
}

export default new OfferService();
