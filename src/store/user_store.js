import { makeAutoObservable } from "mobx";
import { apiGet, apiPostPut, apiDelete } from "../api/api_methods";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  lecturers = [];
  students = [];
  notVerifiedStudents = [];
  notVerifiedLecturers = [];
  verifiedlectrers = [];
  verifiedstudents = [];
  hittedapis = {
    lecturers: false,
    students: false,
  };

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
      //pushing this into lecturers array
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

  async approveLecturer(id, isVerified) {
    const url = `/hod/${id}`;
    const body = {
      isVerified: isVerified,
    };
    const response = await apiPostPut(body, url, "PUT");
    if (response.status === 200) {
      console.log(response?.body);
      this.lecturers.push({
        ...response?.body,
      });
      console.log(this.lecturers);
      this.UnVerifiedLecturersfromlecturers();
      return true;
    }
    alert("failed to fetch lecturers.");
    return false;
  }

  UnVerifiedLecturersfromlecturers() {
    try {
      const notVerifiedLecturers = this.lecturers.reduce((acc, lecturer) => {
        if (lecturer?.isVerified === false) {
          acc.push(lecturer);
        }
        return acc;
      }, []);
      return this.setNotVerifiedLecturers(notVerifiedLecturers);
    } catch (error) {}
  }

  setNotVerifiedLecturers(lecturers) {
    this.notVerifiedLecturers = lecturers;
  }

  approvedlecturers() {
    try {
      const verifiedlectrers = this.lecturers.reduce((acc, lecturer) => {
        if (lecturer?.isVerified === true) {
          acc.push(lecturer);
        }
        return acc;
      }, []);
      return this.setVerifiedLecturers(verifiedlectrers);
    } catch (error) {}
  }

  setVerifiedLecturers(lecturers) {
    this.verifiedlectrers = lecturers;
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
      return this.setLecturers(response?.body);
    }
    return alert("failed to fetch lecturers.");
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

  approvedStudents() {
    try {
      const verifiedstudents = this.students.reduce((acc, student) => {
        if (student?.isVerified === true) {
          acc.push(student);
        }
        return acc;
      }, []);
      return this.setVerifiedStudents(verifiedstudents);
    } catch (error) {}
  }

  setVerifiedStudents(students) {
    this.verifiedstudents = students;
  }

  UnverifiedStudentsfromstudents() {
    try {
      const notVerifiedStudents = this.students.reduce((acc, student) => {
        if (student?.isVerified === false) {
          acc.push(student);
        }
        return acc;
      }, []);
      return this.setNotVerifiedStudents(notVerifiedStudents);
    } catch (error) {}
  }

  setNotVerifiedStudents(students) {
    this.notVerifiedStudents = students;
  }

  setStudents(students) {
    this.students = students;
  }

  setLecturers(lecturers) {
    this.lecturers = lecturers;
  }
}

export default UserStore;
