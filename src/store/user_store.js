import { makeAutoObservable } from "mobx";
import { apiGet, apiPostPut, apiDelete } from "../api/api_methods";

class UserStore {
    constructor() {
        makeAutoObservable(this);
    }
    lecturers = [];

    async getLecturersfromapi() {
        const response = await apiGet("/hod");
        if (response.status === 200) {
            console.log(response?.body);
            return this.setLecturers(response?.body);
        }
        return alert("something went wrong");
    }


    setLecturers(lecturers) {
        this.lecturers = lecturers;
    }

}


export default UserStore;