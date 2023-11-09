import React from "react";
import UserStore from "./user_store";
import CommonStore from "./common_store";

class RootStore {
  constructor() {
    this.UserStore = new UserStore(this);
    this.CommonStore = new CommonStore(this);
  }
}

const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);
