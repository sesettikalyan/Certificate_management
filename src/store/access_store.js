import { makeAutoObservable } from "mobx";

class AccessStore {
  constructor() {
    makeAutoObservable(this);
  }
}
export default AccessStore;
