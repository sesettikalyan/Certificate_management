import { makeAutoObservable } from "mobx";
import { apiPostPut } from "../api/api_methods";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  hodAuth = false;
  studentAuth = false;

  async callingHodLoginApi(username, password) {
    const url = "/hod/login";
    const body = { idno: username, password: password };
    const response = await apiPostPut(body, url, "POST");
    if (response.status === 200) {
      this.setHodAuth(true);
      console.log(response?.body?.hod);
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
      return true;
    }
    return `${response?.body?.message}`;
  }

  setHodAuth(bool) {
    this.hodAuth = bool;
  }

  setStudentAuth(bool) {
    this.studentAuth = bool;
  }
}

export default AuthStore;
