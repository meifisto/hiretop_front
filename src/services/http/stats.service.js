import { BaseService } from "./base.service";

export class StatsService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  statisticsGlobals(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('/statisticsGlobals', data)
        .then(result => {resolve(result)})
        .catch(err => {reject(err)})
    })
  }
  businessImpact(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('/businessImpact', data)
        .then(result => {resolve(result)})
        .catch(err => {reject(err)})
    })
  }
  businessTalentRecommended(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post("/businessTalentRecommended", data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export default new StatsService();
