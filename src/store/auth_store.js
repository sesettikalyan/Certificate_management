import {makeAutoObservable} from "mobx";
import {apiPostPut} from "../api/api_methods"

class AuthStore {
    constructor() {
        makeAutoObservable(this)
    }
    hodAuth = false

    async callingLoginApiByPostingDetails(username, password) {
        const url = "/hod/login"
        const body = {username, password}
        const response = await apiPostPut(body, url,"POST")
        if (response.status === 200) {
            this.setHodAuth(true)
            return true
        }
        return false
    }

     
    setHodAuth(bool) {
        this.hodAuth = bool
    }
}


export default AuthStore;