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
  principal = null;
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
      // if (
      //   response?.body?.hod?.idno === username &&
      //   response?.body?.hod?.password === password
      // ) {
      //   return true;
      // }
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
      // if (
      //   response?.body?.student?.pinno === pinno &&
      //   response?.body?.student?.password === password
      // ) {
      //   return true;
      // }
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
      alert(response?.body?.message);
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

  async updatePrincipal(name,mobile,image,coverImage,email,collegeName,collegeCode,collegeAddress,id) {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `/principal/${id}`;
    const body = {
      name: name,
      phoneNumber: mobile,
      photo: image,
      coverImage: coverImage,
      email: email,
      photo: image,
      college: collegeName,
      collegeCode: collegeCode,
      collegeAddress: collegeAddress,
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
    const lecturers = JSON.parse(localStorage.getItem("lecturers"));
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
      this.lecturers.push({
        ...response?.body,
      });
      lecturers.push({
        ...response?.body,
      });
      localStorage.setItem("lecturers", JSON.stringify(lecturers));
      console.log(toJS(this.lecturers));
      return true;
    }
    alert(`failed to fetch lecturers.`);
    return false;
  }

  async updateLecturerPhoto(image, id) {
    const lecturers = JSON.parse(localStorage.getItem("user"));
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
        lecturers[index] = response?.body;
        localStorage.setItem("lecturers", JSON.stringify(lecturers));
      }
      return true;
    }
    alert("failed to fetch lecturers.");
    return false;
  }

  async approveLecturer(id) {
    const lecturers = JSON.parse(localStorage.getItem("lecturers"));
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
        lecturers[index].isVerified = true;
        localStorage.setItem("lecturers", JSON.stringify(lecturers));
      }
      return true;
    }
    alert("failed to fetch lecturers.");
    return false;
  }


  async updateLecturers(name, idno, email, branch,phoneNumber, id) {
    const lecturers = JSON.parse(localStorage.getItem("lecturers"));
    const url = `/hod/${id}`;
    const body = {
      name: name,
      department: branch,
      idno: idno,
      email: email,
      phoneNumber: phoneNumber,
    };
    const response = await apiPostPut(body, url, "PUT");
    if (response.status === 200) {
      console.log(response?.body);
      const index = this.lecturers.findIndex((lecturer) => lecturer?._id === id);
      if (index !== -1) {
        this.lecturers[index] = response?.body;
        lecturers[index] = response?.body;
        localStorage.setItem("lecturers", JSON.stringify(lecturers));
      }
      return true;
    }
    alert("failed to fetch lecturers.");
    return false;
  }

  async deleteLecturers(id) {
    const lecturers = JSON.parse(localStorage.getItem("lecturers"));
    const url = `/hod/${id}`;
    const response = await apiDelete(url);
    if (response.status === 200) {
      console.log(response?.body);
      const index = this.lecturers.findIndex((lecturer) => lecturer?._id === id);
      if (index !== -1) {
        this.lecturers.splice(index, 1);
        lecturers.splice(index, 1);
        localStorage.setItem("lecturers", JSON.stringify(lecturers));
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
    const students = JSON.parse(localStorage.getItem("students"));
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
      this.students.push({
        ...response?.body,
      });
      students.push({
        ...response?.body,
      });
      localStorage.setItem("students", JSON.stringify(students));
      console.log( toJS( this.students) );
      return true;
    }
    alert(`failed to fetch students.`);
    return false;
  }

  async approveStudent(id) {
    const students = JSON.parse(localStorage.getItem("students"));
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
        students[index].isVerified = true;
        localStorage.setItem("students", JSON.stringify(students));
      }
      return true;
    }
    alert("failed to fetch students.");
    return false;
  }

  async updateStudents(name, pinno, email,mobile, branch, id) {
    const students = JSON.parse(localStorage.getItem("students"));
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
        students[index] = response?.body;
        localStorage.setItem("students", JSON.stringify(students));
      }
      return true;
    }
    alert("failed to fetch students.");
    return false;
  }

  async deleteStudents(id) {
    const students = JSON.parse(localStorage.getItem("students"));
    const url = `/students/${id}`;
    const response = await apiDelete(url);
    if (response.status === 200) {
      console.log(response?.body);
      const index = this.students.findIndex((student) => student?._id === id);
      if (index !== -1) {
        this.students.splice(index, 1);
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
      }
      return true;
    }
    alert("failed to fetch students.");
    return false;
  } 

  async postStudentDocuments(name,type,fileUrl,semester,percentage,backlogs,studentid) {
    const studentIndex = this.students.findIndex((student) => student?._id === studentid);
    const url = "/fileUpload";
    const body = {
      studentId: studentid,
      files : [
        {
          name: name,
          certificateType: type,
          fileUrl: fileUrl,
          semister: semester,
          semPercentage: percentage,
          backlogs: backlogs,
        }
      ]
    };
    const response = await apiPostPut(body, url, "POST");
    if (response.status === 200) {
      console.log(response?.body);
      this.students[studentIndex] = response?.body?.result ;
      localStorage.setItem("students", JSON.stringify(this.students));
      return alert(`${response?.body?.message}`);
    }
    return alert(`failed to fetch students.`);
  }

  async updateStudentDocuments(name,type,fileUrl,semester,percentage,backlogs,studentid,docid) {
    const studentindex = this.students.findIndex((student) => student?._id === studentid);
    const docindex =  this.students[studentindex]?.documents.findIndex((doc) => doc?._id === docid);
    const url = `/fileUpdate`;
    const body = {
      studentId: studentid,
      index : docindex,
      files : [
        {
          name: name,
          certificateType: type,
          fileUrl: fileUrl,
          semister: semester,
          semPercentage: percentage,
          backlogs: backlogs,
        }
      ]
    };
    const response = await apiPostPut(body, url, "PUT");
    if(response.status === 200){
      console.log(response?.body);
      this.students[studentindex] = response?.body?.result ;
      localStorage.setItem("students", JSON.stringify(this.students));
     return alert(`${response?.body?.message}`)
    }
    else
    {
     return alert("failed to update documents");
    }
  }

  async deleteStudentDocuments(studentid,docid) {
    const studentindex = this.students.findIndex((student) => student?._id === studentid);
    const url = `/fileDelete`;
    const body = {
      studentId: studentid,
      documentId: docid,
    };
    const response = await apiPostPut(body, url, "PUT");
    if(response.status === 200){
      console.log(response?.body);
      this.students[studentindex] = response?.body?.result ;
      localStorage.setItem("students", JSON.stringify(this.students));
     return alert(`${response?.body?.message}`)
    }
    else
    {
     return alert("failed to delete documents");
    }
  }

  async updateStudentImage(image, id) {
    const students = JSON.parse(localStorage.getItem("user"));
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
        students[index] = response?.body;
        localStorage.setItem("students", JSON.stringify(students));
      }
      return true;
    }
    alert("failed to fetch students.");
    return false;
  }

  async updateStudentBiodata (image,name,pinno,fathername,mothername,parentmobile,dob,polycethtno,rationcardno,gender,studentaadharno,fatheraadharno,motheraadharno,studentmobile,category,religion,resides,polycetrank,dateofjoining,physicallychallenged,email,address,district,pincode,studentid) {
    const url = `/students/${studentid}`;
    const body ={
      photo: image,
      name: name,
      pinno: pinno,
      fathername: fathername,
      mothername: mothername,
      parentmobile: parentmobile,
      dateofbirth: dob,
      polycethtno: polycethtno,
      rationcardno: rationcardno,
      gender:gender,
      studentaadharno: studentaadharno,
      fatheraadharno: fatheraadharno,
      motheraadharno: motheraadharno,
      studentmobile: studentmobile,
      category: category,
      religion: religion,
      resides: resides,
      polycetrank: polycetrank,
      dateofjoining: dateofjoining,
      physicallychallenged: physicallychallenged,
      emailid: email,
      address: address,
      district: district,
      pincode: pincode,
    }
    const response = await apiPostPut(body, url, "PUT");
    if(response.status === 200){
      console.log(response?.body);
      const index = this.students.findIndex((student) => student?._id === studentid);
      if (index !== -1) {
        this.students[index] = response?.body;
        localStorage.setItem("students", JSON.stringify(this.students));
        localStorage.setItem("user", JSON.stringify(response?.body));
      }
      return true;
    }
    else
    {
     return alert("failed to update biodata");
    }
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
