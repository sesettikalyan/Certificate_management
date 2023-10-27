import { makeAutoObservable } from "mobx";
import { apiPostPut } from "../api/api_methods";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = {};
  hodAuth = false;
  studentAuth = false;
  principalAuth = false;

  async callingHodLoginApi(username, password) {
    const url = "/hod/login";
    const body = { idno: username, password: password };
    const response = await apiPostPut(body, url, "POST");
    if (response.status === 200) {
      this.setHodAuth(true);
      console.log(response?.body?.hod);
      this.setuser(JSON.stringify(response?.body?.hod));
      localStorage.setItem("user", JSON.stringify(response?.body?.hod));
      return true;
    }
    return `${response?.body?.message}`;
  }

  async callingStudentLoginApi(pinno, password) {
    const url = "/students/login";
    const body = { pinno: pinno, password: password };
    const response = await apiPostPut(body, url, "POST");
    if (response.status === 200) {
      this.setStudentAuth(true);
      console.log(response?.body);
      this.setuser(JSON.stringify(response?.body?.student));
      localStorage.setItem("user", JSON.stringify(response?.body?.student));
      return true;
    }
    return `${response?.body?.message}`;
  }

  async callingPrincipalLogin(username, password) {
    const url = "/principal/login";
    const body = { id: username, password: password };
    const response = await apiPostPut(body, url, "POST");
    if (response.status === 200) {
      this.setPrincipalAuth(true);
      console.log(response?.body);
      this.setuser(JSON.stringify(response?.body?.principal));
      localStorage.setItem("user", JSON.stringify(response?.body?.principal));
      return true;
    }
    return `${response?.body?.message}`;
  }

  setPrincipalAuth(bool) {
    this.principalAuth = bool;
  }

  setHodAuth(bool) {
    this.hodAuth = bool;
  }

  setStudentAuth(bool) {
    this.studentAuth = bool;
  }

  setuser(user) {
    this.user = user;
  }
}

export default AuthStore;
