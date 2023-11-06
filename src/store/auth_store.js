import { makeAutoObservable, toJS } from "mobx";
import { apiGet, apiPostPut } from "../api/api_methods";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
    this.loadUserFromLocalStorage();
  }
  user = null;
  principal = [];
  hodAuth = false;
  studentAuth = false;
  principalAuth = false;
  
  loadUserFromLocalStorage() {
    const user = JSON.parse(localStorage.getItem("user"));
    const principal = JSON.parse(localStorage.getItem("principal"));
    if (user) {
      this.setUser(user);
    }
    if (principal) {
      this.setPrincipal(principal);
    }
  }


  //update image of principal if commonstore.role is principal also set it to user
  async updateImageofPrincipal(id, image) {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `/principal/${id}`;
    const body = {
      photo: image,
    };
    const response = await apiPostPut(body, url, "PUT");
    if (response.status === 200) {
      console.log(response?.body);
      this.setPrincipal(response?.body);
      localStorage.setItem("user", JSON.stringify(response?.body));
      this.setUser(response?.body);
      return true;
    }
    alert("failed to fetch principal.");
    return false;
  }

  async getPrincipalfromapi(refresh = false) {
    // if (!refresh && this.hittedapis.principal) return;
    const response = await apiGet("/principal");
    if (response.status === 200) {
      console.log(response?.body);
      // this.hittedapis.principal = true;
      return this.setPrincipal(response?.body);
    }
    return alert("failed to fetch principal.");
  }

  setPrincipal(principal) {
    this.principal = principal;
    localStorage.setItem("principal", JSON.stringify(principal));
  }

  async callingHodLoginApi(username, password) {
    const url = "/hod/login";
    const body = { idno: username, password: password };
    const response = await apiPostPut(body, url, "POST");
    if (response.status === 200) {
      this.setHodAuth(true);
      console.log(response?.body?.hod);

      this.setUser(response?.body?.hod);
      localStorage.setItem("user", JSON.stringify(response?.body?.hod));
      console.log(toJS(this.user));
      if (
        response?.body?.hod?.idno === username &&
        response?.body?.hod?.password === password
      ) {
        return true;
      }
      return true;
    } else {
      alert(response?.body?.message);
      return false;
    }
  }

  async callingStudentLoginApi(pinno, password) {
    const url = "/students/login";
    const body = { pinno: pinno, password: password };
    const response = await apiPostPut(body, url, "POST");
    if (response.status === 200) {
      this.setStudentAuth(true);
      console.log(response?.body);
      this.setUser(response?.body?.student);
      localStorage.setItem("user", JSON.stringify(response?.body?.student));
      console.log(toJS(this.user));
      if (
        response?.body?.student?.pinno === pinno &&
        response?.body?.student?.password === password
      ) {
        return true;
      }
      return true;
    } else {
      alert(response?.body?.message);
      return false;
    }
  }

  async callingPrincipalLogin(username, password) {
    const url = "/principal/login";
    const body = { id: username, password: password };
    const response = await apiPostPut(body, url, "POST");

    if (response.status === 200) {
      this.setPrincipalAuth(true);
      console.log(response?.body?.principal?.id);
      this.setUser(response?.body?.principal);
      localStorage.setItem("user", JSON.stringify(response?.body?.principal));
      console.log(toJS(this.user));
      // if (
      //   response?.body?.principal?.id === username &&
      //   response?.body?.principal?.password === password
      // ) {
      //   return true;
      // }
      return true;
    } else {
      // alert(response?.body?.message);
      return false;
    }
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

  setUser(user) {
    this.user = user;
  }
}

export default AuthStore;
