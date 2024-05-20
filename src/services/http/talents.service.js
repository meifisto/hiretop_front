import { BaseService } from "./base.service";

export class TalentService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  createWithFile(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('/talentsprofiles/create-file', data)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  fetchTalents(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get("/talentsprofiles/list", { params: data })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
  getTalent(id) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`/talentsprofiles/${id}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export default new TalentService();
