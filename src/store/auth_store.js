import { makeAutoObservable, toJS } from "mobx";
import { apiPostPut } from "../api/api_methods";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;
  hodAuth = false;
  studentAuth = false;
  principalAuth = false;

  async callingHodLoginApi(username, password, refresh = false) {
    if (!refresh && this.hodAuth) return;
    const url = "/hod/login";
    const body = { idno: username, password: password };
    const response = await apiPostPut(body, url, "POST");
    if (response.status === 200) {
      console.log(response?.body?.hod);

      this.setuser(response?.body?.hod);
      localStorage.setItem("user", JSON.stringify(response?.body?.hod));

      return this.setHodAuth(true);
    }
    return alert(response?.body);
  }

  async callingStudentLoginApi(pinno, password, refresh = false) {
    if (!refresh && this.studentAuth) return;
    const url = "/students/login";
    const body = { pinno: pinno, password: password };
    const response = await apiPostPut(body, url, "POST");
    if (response.status === 200) {
      this.setStudentAuth(true);
      console.log(response?.body);
      this.setuser(response?.body?.student);
      localStorage.setItem("user", JSON.stringify(response?.body?.student));

      return true;
    }
    return alert(response?.body?.message);
  }

  async callingPrincipalLogin(username, password, refresh = false) {
    if (!refresh && this.principalAuth) return;
    const url = "/principal/login";
    const body = { id: username, password: password };
    const response = await apiPostPut(body, url, "POST");
    if (response.status === 200) {
      this.setPrincipalAuth(true);
      console.log(response?.body?.principal);
      this.setuser(response?.body?.principal);
      localStorage.setItem("user", JSON.stringify(response?.body?.principal));
      console.log(this.user);
      return true;
    }
    return alert(response?.body?.message);
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
