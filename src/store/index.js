import React from "react";
import UserStore from "./user_store";
import AuthStore from "./auth_store";

class RootStore {
    constructor() {
        this.UserStore = new UserStore(this);
        this.AuthStore = new AuthStore(this);
    }
}

const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);

