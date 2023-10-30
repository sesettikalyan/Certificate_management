import { makeAutoObservable } from "mobx";

class CommonStore {
  constructor() {
    makeAutoObservable(this);
  }

  role = null;

  setRole(role) {
    this.role = role;
  }
}

export default CommonStore;
