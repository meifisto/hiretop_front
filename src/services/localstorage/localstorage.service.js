/* eslint-disable max-classes-per-file */
/* eslint-disable camelcase */

export class LocalStorageService {
  key_mtca_route_to_redirect_to_after_login = 'route_to_redirect_to_after_login';

  key_jwt_access_token = 'accessToken';

  key_jwt_refresh_token = 'refreshTokenToken';

  key_userData = 'userData';

  key_local_language = 'local_language';

  key_manuel_utilisation_id = 'manuel_utilisation_id';

  key_plainte_id = 'plainte_id';

  key_welcome_display = 'welcome_display';

  key_auto_evaluation_tut = 'auto_evaluation_tut';

  /*
   In order to prevent JSON.parse errors while trying to parse string to object
   Is set to true when the default localstorage is the storage instance
   Is set to false when SecureLS is the storage instance ( SecureLS support object as well as Array thus there's no need to parse them anymore. The .get method do it automatically)
  */
  storeObjectAsString = true;

  /*
  Basic local storage instance. The browser localStorage as is
  Uncomment the line bellow in developement only
  */
  localStorageInstance = localStorage;

  /*
  Secure localStorage instance. Datas are encrypted and non human-readable
  This is the default instance for security purpose
  WIP : Should we encrypt the storage keys too ??
 */
  // localStorageInstance = new CryptedLS()


  // key_local_language
  setLocalLanguage(value) {
    this.localStorageInstance.setItem(this.key_local_language, value);
  }

  getLocalLanguage() {
    return this.localStorageInstance.getItem(this.key_local_language);
  }

  removeLocalLanguage() {
    this.localStorageInstance.removeItem(this.key_local_language);
  }

  // jwt token
  setJwtToken(value) {
    this.localStorageInstance.setItem(this.key_jwt_access_token, value);
  }

  getJwtToken() {
    return this.localStorageInstance.getItem(this.key_jwt_access_token);
  }

  removeJwtToken() {
    this.localStorageInstance.removeItem(this.key_jwt_access_token);
  }

  // routeToRedirectToAfterLogin
  setRouteToRedirectToAfterLogin(value) {
    this.localStorageInstance.setItem(
      this.key_mtca_route_to_redirect_to_after_login,
      value
    );
  }

  getRouteToRedirectToAfterLogin() {
    return this.localStorageInstance.getItem(
      this.key_mtca_route_to_redirect_to_after_login
    );
  }

  removeRouteToRedirectToAfterLogin() {
    this.localStorageInstance.removeItem(
      this.key_mtca_route_to_redirect_to_after_login
    );
  }

  // jwt refresh token
  setJwtRefreshToken(value) {
    this.localStorageInstance.setItem(this.key_jwt_refresh_token, value);
  }

  getJwtRefreshToken() {
    return this.localStorageInstance.getItem(this.key_jwt_refresh_token);
  }

  removeJwtRefreshToken() {
    this.localStorageInstance.removeItem(this.key_jwt_refresh_token);
  }

  // jwt userdata
  setUserData(value) {
    if (this.storeObjectAsString) value = JSON.stringify(value);
    this.localStorageInstance.setItem(this.key_userData, value);
  }

  getUserData() {
    const item = this.localStorageInstance.getItem(this.key_userData);
    if (!this.storeObjectAsString) return item;
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  }

  getUserId(key) {
    const user = this.getUserData();
    if (user) {
      if (key) return user[key];
      return user.id;
    }
    return user;
  }

  removeUserData() {
    this.localStorageInstance.removeItem(this.key_userData);
  }


  // manuel_utilisation_id
  getManuelUtilisationId() {
    const code = localStorage.getItem(this.key_manuel_utilisation_id);
    try {
      return code;
    } catch (e) {
      return code;
    }
  }

  setManuelUtilisationId(value) {
    try {
      localStorage.setItem(this.key_manuel_utilisation_id, value);
    } catch (e) {
      console.log(e);
    }
  }

  removeManuelUtilisationId() {
    localStorage.removeItem(this.key_manuel_utilisation_id);
    return true;
  }

  // welcome_display
  getWelcomePage() {
    const isDisplay = localStorage.getItem(this.key_welcome_display);
    try {
      return isDisplay;
    } catch (e) {
      return isDisplay;
    }
  }

  setWelcomePage(value) {
    try {
      localStorage.setItem(this.key_welcome_display, value);
    } catch (e) {
      console.log(e);
    }
  }

  removeWelcomePage() {
    localStorage.removeItem(this.key_welcome_display);
    return true;
  }
  getAutoEvalTut() {
    const isDisplay = localStorage.getItem(this.key_auto_evaluation_tut);
    try {
      return isDisplay;
    } catch (e) {
      return isDisplay;
    }
  }

  setAutoEvalTut(value) {
    try {
      localStorage.setItem(this.key_auto_evaluation_tut, value);
    } catch (e) {
      console.log(e);
    }
  }

  removeAutoEvalTut() {
    localStorage.removeItem(this.key_auto_evaluation_tut);
    return true;
  }

  // plainte_id
  getPlainteId() {
    const code = localStorage.getItem(this.key_plainte_id);
    try {
      return code;
    } catch (e) {
      return code;
    }
  }

  setPlainteId(value) {
    try {
      localStorage.setItem(this.key_plainte_id, value);
    } catch (e) {
      console.log(e);
    }
  }

  removePlainteId() {
    localStorage.removeItem(this.key_plainte_id);
    return true;
  }

  clearAuthData() {
    this.removeJwtRefreshToken();
    this.removeJwtToken();
    this.removeUserData();
  }
}

// export an instance of the class
export default new LocalStorageService();
