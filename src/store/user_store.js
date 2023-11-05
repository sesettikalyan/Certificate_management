import { makeAutoObservable } from "mobx";
import { apiGet, apiPostPut, apiDelete } from "../api/api_methods";

class UserStore {
  constructor() {
    makeAutoObservable(this);
    this.loadUserDataFromLocalStorage();
  }
  lecturers = [];
  students = [];
  hittedapis = {
    lecturers: false,
    students: false,
  };

  loadUserDataFromLocalStorage() {
    const lecturers = JSON.parse(localStorage.getItem("lecturers"));
    const students = JSON.parse(localStorage.getItem("students"));
    if (lecturers) {
      this.setLecturers(lecturers);
    }
    if (students) {
      this.setStudents(students);
    }
  }

  async getLecturersfromapi(refresh = false) {
    if (!refresh && this.hittedapis.lecturers) return;
    const response = await apiGet("/hod");
    if (response.status === 200) {
      console.log(response?.body);
      this.hittedapis.lecturers = true;
      return this.setLecturers(response?.body);
    }
    return alert("failed to fetch lecturers.");
  }

  async postLecturers(name, idno, email, branch, password, role, phno) {
    const url = "/register/hod";
    const body = {
      name: name,
      department: branch,
      idno: idno,
      email: email,
      password: password,
      role: role,
      phoneNumber: phno,
    };
    const response = await apiPostPut(body, url, "POST");
    if (response.status === 200) {
      console.log(response?.body);
      console.log(
        this.lecturers.push({
          ...response?.body,
        })
      );
      this.lecturers.push({
        ...response?.body,
      });
      return true;
    }
    alert(`${response?.body}`);
    return false;
  }



  async approveLecturer(id) {
    const url = `/hod/${id}`;
    const body = {
      isVerified: true,
    };
    const response = await apiPostPut(body, url, "PUT");
    if (response.status === 200) {
      console.log(response?.body);
      const index = this.lecturers.findIndex((lecturer) => lecturer?._id === id);
      if (index !== -1) {
        this.lecturers[index].isVerified = true;
      }
      return true;
    }
    alert("failed to fetch lecturers.");
    return false;
  }


  async updateLecturers(name, idno, email, branch, id) {
    const url = `/hod/${id}`;
    const body = {
      name: name,
      department: branch,
      idno: idno,
      email: email,
    };
    const response = await apiPostPut(body, url, "PUT");
    if (response.status === 200) {
      console.log(response?.body);
      const index = this.lecturers.findIndex((lecturer) => lecturer?._id === id);
      if (index !== -1) {
        this.lecturers[index] = response?.body;
      }
      return true;
    }
    alert("failed to fetch lecturers.");
    return false;
  }

  async deleteLecturers(id) {
    const url = `/hod/${id}`;
    const response = await apiDelete(url);
    if (response.status === 200) {
      console.log(response?.body);
      const index = this.lecturers.findIndex((lecturer) => lecturer?._id === id);
      if (index !== -1) {
        this.lecturers.splice(index, 1);
      }
      return true;
    }
    alert("failed to fetch lecturers.");
    return false;
  }

  async getStudentsfromapi(refresh = false) {
    if (!refresh && this.hittedapis.students) return;
    const response = await apiGet("/students");
    if (response.status === 200) {
      console.log(response?.body);
      this.hittedapis.students = true;
      return this.setStudents(response?.body);
    }
    return alert("failed to fetch students.");
  }

  async postStudents(name, pinno, email, branch, password, role, phno) {
    const url = "/register/studentS";
    const body = {
      name: name,
      department: branch,
      pinno: pinno,
      emailid: email,
      password: password,
      role: role,
      studentmobile: phno,
    };
    const response = await apiPostPut(body, url, "POST");
    if (response.status === 200) {
      console.log(response?.body);
      //pushing this into students array
      console.log(
        this.students.push({
          ...response?.body,
        })
      );
      this.students.push({
        ...response?.body,
      });
      return true;
    }
    alert(`${response?.body}`);
    return false;
  }

  async approveStudent(id) {
    const url = `/students/${id}`;
    const body = {
      isVerified: true,
    };
    const response = await apiPostPut(body, url, "PUT");
    if (response.status === 200) {
      console.log(response?.body);
      const index = this.students.findIndex((student) => student?._id === id);
      if (index !== -1) {
        this.students[index].isVerified = true;
      }
      return true;
    }
    alert("failed to fetch students.");
    return false;
  }

  async updateStudents(name, pinno, email, branch, id) {
    const url = `/students/${id}`;
    const body = {
      name: name,
      department: branch,
      pinno: pinno,
      emailid: email,
    };
    const response = await apiPostPut(body, url, "PUT");
    if (response.status === 200) {
      console.log(response?.body);
      const index = this.students.findIndex((student) => student?._id === id);
      if (index !== -1) {
        this.students[index] = response?.body;
      }
      return true;
    }
    alert("failed to fetch students.");
    return false;
  }

  async deleteStudents(id) {
    const url = `/students/${id}`;
    const response = await apiDelete(url);
    if (response.status === 200) {
      console.log(response?.body);
      const index = this.students.findIndex((student) => student?._id === id);
      if (index !== -1) {
        this.students.splice(index, 1);
      }
      return true;
    }
    alert("failed to fetch students.");
    return false;
  }

  setStudents(students) {
    this.students = students;
    localStorage.setItem("students", JSON.stringify(students));
  }

  setLecturers(lecturers) {
    this.lecturers = lecturers;
    localStorage.setItem("lecturers", JSON.stringify(lecturers));
  }
}

export default UserStore;
