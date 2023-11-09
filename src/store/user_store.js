import { makeAutoObservable, toJS } from "mobx";
import { apiGet, apiPostPut, apiDelete } from "../api/api_methods";

class UserStore {
  constructor() {
    makeAutoObservable(this);
    this.loadUserDataFromLocalStorage();
  }
  lecturers = [];
  students = [];
  user = null;
  principal = [];
  hodAuth = false;
  studentAuth = false;
  principalAuth = false;
  hittedapis = {
    lecturers: false,
    students: false,
    principal: false,
  };

  loadUserDataFromLocalStorage() {
    const lecturers = JSON.parse(localStorage.getItem("lecturers"));
    const students = JSON.parse(localStorage.getItem("students"));
    const user = JSON.parse(localStorage.getItem("user"));
    const principal = JSON.parse(localStorage.getItem("principal"));
    if (user) {
      this.setUser(user);
    }
    if (principal) {
      this.setPrincipal(principal);
    }
    if (lecturers) {
      this.setLecturers(lecturers);
    }
    if (students) {
      this.setStudents(students);
    }
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

  async getPrincipalfromapi(refresh = false) {
    if (!refresh && this.hittedapis.principal) return;
    const response = await apiGet("/principal");
    if (response.status === 200) {
      console.log(response?.body);
      this.hittedapis.principal = true;
      return this.setPrincipal(response?.body);
    }
    return alert("failed to fetch principal.");
  }

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

  async updateLecturerPhoto(image, id) {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `/hod/${id}`;
    const body = {
      photo: image,
    };
    const response = await apiPostPut(body, url, "PUT");
    if (response.status === 200) {
      console.log(response?.body);
      const index = this.lecturers.findIndex((lecturer) => lecturer?._id === id);
      localStorage.setItem("user", JSON.stringify(response?.body));
      this.setUser(response?.body);
      if (index !== -1) {
        this.lecturers[index] = response?.body;
      }
      return true;
    }
    alert("failed to fetch lecturers.");
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

  async postStudents(image,name, pinno, email, phno,branch,password) {
    const url = "/register/studentS";
    const body = {
      photo: image,
      name: name,
      department: branch,
      pinno: pinno,
      emailid: email,
      password: password,
      role: "student",
      studentmobile: phno,
      isVerified: true,
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

  async updateStudents(name, pinno, email,mobile, branch, id) {
    const url = `/students/${id}`;
    const body = {
      name: name,
      department: branch,
      pinno: pinno,
      emailid: email,
      studentmobile: mobile,
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


  async updateStudentImage(image, id) {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `/students/${id}`;
    const body = {
      photo: image,
    };
    const response = await apiPostPut(body, url, "PUT");
    if (response.status === 200) {
      console.log(response?.body);
      const index = this.students.findIndex((student) => student?._id === id);
      localStorage.setItem("user", JSON.stringify(response?.body));
      this.setUser(response?.body);
      if (index !== -1) {
        this.students[index] = response?.body;
      }
      return true;
    }
    alert("failed to fetch students.");
    return false;
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

  setStudents(students) {
    this.students = students;
    localStorage.setItem("students", JSON.stringify(students));
  }

  setLecturers(lecturers) {
    this.lecturers = lecturers;
    localStorage.setItem("lecturers", JSON.stringify(lecturers));
  }

  setPrincipal(principal) {
    this.principal = principal;
    localStorage.setItem("principal", JSON.stringify(principal));
  }
}

export default UserStore;
