import { makeAutoObservable } from "mobx";

class CommonStore {
  constructor() {
    makeAutoObservable(this);
    this.loadRoleFromLocalStorage();
  }

  role = null;

  loadRoleFromLocalStorage() {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      this.setRole(savedRole);
    }
  }

  setRole(role) {
    this.role = role;
    localStorage.setItem("role", role);
  }
}

export default CommonStore;
