import { BaseService } from "./base.service";

export class SectorService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  createSector(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('/sectors/create', data)
        .then(result => {resolve(result)})
        .catch(err => {reject(err)})
    })
  }
  fetchSectors(data) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get("/sectors/list", { params: data })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export default new SectorService();
