// import { MdOutlineArrowBackIosNew } from "react-icons/md";
import CertificateList from "./CertificateList";
import { Branches } from "../helpers/Branches";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import { useStores } from "../store/index";
import { useObserver } from "mobx-react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { PiBuildingsBold } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { IoMdAdd, IoMdAddCircle } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import Loader from "./reusable_Components/loader";

export default function Studentview() {
  const { UserStore,CommonStore } = useStores();
  const [loading, setLoading] = useState(false);
  const { branch, id } = useParams();
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const defaultprofile = "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
  const fileInputRef = useRef(null);
  const nameref = useRef(null);
  const pinref = useRef(null);
  const emailref = useRef(null);
  const branchref = useRef(null);
  const phoneref = useRef(null);

  // const selectedBranch = Branches.find(
  //   (branchname) => branchname.name === branch
  // );

  const selectedStudent = UserStore?.students.find(
    (student) => student?._id === id
  );

  const autofillref = () => {
    try {
      nameref.current.value = selectedStudent?.name;
    pinref.current.value = selectedStudent?.pinno;
    emailref.current.value = selectedStudent?.emailid;
    branchref.current.value = selectedStudent?.department;
    phoneref.current.value = selectedStudent?.studentmobile;
    } catch (error) {
      
    }
  };

  useEffect(() => {
    autofillref();
  }, [editForm]);  

  const updateStudentDetails = async (id) => {
    try {
      const name = nameref.current.value;
    const pinno = pinref.current.value;
    const emailid = emailref.current.value;
    const department = branchref.current.value;
    const studentmobile = phoneref.current.value;

    await UserStore.updateStudents(name,pinno,emailid,studentmobile,department,id);
    setEditForm(false);
    } catch (error) {
      
    }
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    UserStore.user = null;
    UserStore.setPrincipalAuth(false);
    UserStore.setHodAuth(false);
    UserStore.setStudentAuth(false);
    CommonStore.setRole(null);
    navigate("/");
  };

  const Navbar = () => {
    if (CommonStore.role === "principal") {
      return (
        <button
          className="flex items-center w-[20%] mx-4 text-white text-lg"
          onClick={showBranch}
        >
          <AiOutlineLeft className="mr-1" /> Back
        </button>
      );
    } else if (CommonStore.role === "hod" || CommonStore.role === "staff") {
      return (
        <div className="flex justify-between w-[95%] items-center">
          <button
            className="flex items-center w-[20%] mx-4 text-white text-lg"
            onClick={showBranch}
          >
            <AiOutlineLeft className="mr-1" /> Back
          </button>
          <div className="flex">
            <button
              onClick={() => setEditForm(true)}
              className="w-10 h-10 bg-white rounded-full mx-2 text-2xl text-black flex items-center justify-center"
            >
              <MdOutlineEdit />
            </button>
            <button
              onClick={() => setDeleteForm(true)}
              className="w-10 h-10 bg-white rounded-full mx-3 text-2xl text-black flex items-center justify-center"
            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-end w-[95%] items-center">
          <button
            // onClick={() => setEditForm(true)}
            className="w-10 h-10 bg-white rounded-full mx-2 text-2xl text-black flex items-center justify-center"
          >
            {" "}
            <PiBuildingsBold />
          </button>
          <button
            onClick={logout}
            className="w-10 h-10 bg-white rounded-full mx-2 text-2xl text-black flex items-center justify-center"
          >
            {" "}
            <BiLogOut />
          </button>
        </div>
      );
    }
  };

  const removeStudent = async (id) => {
    await UserStore.deleteStudents(id);
    setDeleteForm(false);
    navigate(`/${UserStore.user?.department}/staffpage`);
  };

  const showBranch = () => {
    if (CommonStore.role === "principal") {
      navigate(`/${branch}`);
    } else {
      navigate(`/${branch}/staffpage`);
    }
  };

  const openFiles = () => {
    fileInputRef.current.click();
  };

  const uploadImageToFirebase = async (file) => {
    
      const timeStamp = new Date().valueOf();
      const storageRef = ref(storage, `images/${timeStamp}-${file.name}`);
      try {
        setLoading(true);
      await uploadBytes(storageRef, file);
      console.log('Image uploaded to Firebase Storage');
      const imageURL = await getDownloadURL(storageRef);
      console.log(imageURL);
      await UserStore.updateStudentImage(imageURL,UserStore.user?._id);
      setLoading(false);
      } catch (error) {

      }
  };
    


  const changeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImageToFirebase(file);
    }
  };

  return useObserver(() => (
    <div className="w-[100%] h-full">
    {loading &&  <Loader loader={true} />}
      <div className="pb-10 pt-6 flex flex-col items-start w-full bg-primary rounded-b-2xl">
        <Navbar />
        <div className="pb-2 w-[85%] mx-auto items-center flex mt-4">
          {CommonStore.role === "student" && !UserStore.user?.photo ? (
            <div onClick={openFiles} className="bg-secondary cursor-pointer text-primary my-6 w-36 h-44 rounded-lg flex flex-col items-center justify-center">
              <IoMdAdd className="text-6xl" />
              <p className="py-1 text-lg">Add Image</p>
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                className="hidden"
                onChange={changeImage}
              />
            </div>
          ) :
            <div className="h-44 w-36 rounded-lg relative overflow-hidden"
              style={{ backgroundImage: `url(${defaultprofile})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
            >
              <img
                src={
                  CommonStore.role === "student"
                    ? UserStore.user?.photo
                    : selectedStudent?.photo
                }
                className="h-full w-full object-cover rounded-lg"
                alt=""
              />
              <span onClick={openFiles} className="bg-primary w-6 absolute z-auto cursor-pointer left-[85%] top-0 h-6 rounded-full flex items-center justify-center">
                <MdOutlineEdit className=" text-white" />
                <input type="file" id="fileinput" className="hidden" ref={fileInputRef} onChange={changeImage} />
              </span>
            </div>
          }
          <div className="ml-6 text-white">
            <h1 className="text-xl pb-1 ">
              {CommonStore.role === "student"
                ? UserStore.user?.name
                : selectedStudent?.name}
            </h1>
            <p className="text-base ">
              {CommonStore.role === "student"
                ? UserStore.user?.pinno
                : selectedStudent?.pinno}
            </p>
            <p className="text-base">
              {CommonStore.role === "student"
                ? UserStore.user?.department
                : selectedStudent?.department}
            </p>
            <p className="text-base">
              {CommonStore.role === "student"
                ? UserStore.user?.studentmobile
                : selectedStudent?.studentmobile}
            </p>
            <p className="text-base pb-1">
              {CommonStore.role === "student"
                ? UserStore.user?.emailid
                : selectedStudent?.emailid}
            </p>
            {CommonStore.role === "staff" || CommonStore.role === "hod" ? (
              <button className="bg-white text-black rounded-lg p-1">
                View Biodata
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex ml-6 mt-4 space-x-10 ">
        <div className="h-16 w-36 bg-primary rounded-lg">
          <p className="text-lg ml-2 text-white">Sem Percentage</p>
          <p className="text-white ml-14">
            {CommonStore.role === "student"
              ? UserStore.user?.percentage
              : selectedStudent?.percentage}{" "}
            %
          </p>
        </div>
        <div className="h-16 w-36 bg-primary rounded-lg">
          <p className="text-lg ml-9 text-white">Backlogs</p>
          <p className="text-white ml-16">
            {CommonStore.role === "student"
              ? UserStore.user?.backlogs
              : selectedStudent?.backlogs}
          </p>
        </div>
      </div>
      <div className="bg-white  drop-shadow my-6 shadow-lg w-[90%] py-3 mx-auto rounded-lg">
        {CommonStore.role !== "principal" ? (
          <div className="flex w-[90%] justify-between items-center mt-2 mx-auto">
            <h2 className="text-2xl text-text_color1 font-semibold">
              Certificates
            </h2>
            <button
              className="flex text-xs text-text_color1 items-center cursor-pointer"
              onClick={() => navigate(`/${branch}/${CommonStore.role === "student" ? UserStore.user?._id : selectedStudent?._id}/certificate`)}
            >
              <IoMdAddCircle className="text-base" />
              Add new Certificate
            </button>
          </div>
        ) : (
          <h1 className="text-text_color1 font-semibold w-[90%] mx-auto text-2xl">
            Certificates
          </h1>
        )}
        <CertificateList />
      </div>
      {deleteForm ? (
        <div className="fixed inset-0  w-[80%] m-auto h-[20%] flex flex-col z-50 py-4 px-2 rounded-2xl items-center  bg-primary">
          <h1 className="text-center text-2xl text-white">Confirm to delete</h1>
          <p className="text-white pt-1 text-2xl">{selectedStudent?.name}</p>
          {/* <AiOutlineClose onClick={() => setDeleteForm(false)} className="absolute text-white text-2xl cursor-pointer right-2 top-4" /> */}
          <div className="w-[90%] mx-auto flex my-3  justify-between items-center">
            <button
              onClick={() => setDeleteForm(false)}
              className="flex w-[40%] mx-auto text-xl justify-between bg-white rounded-lg  text-black items-center p-2"
            >
              Cancel
              <AiOutlineClose className="mx-1" />
            </button>
            <button
              onClick={() => removeStudent(selectedStudent?._id)}
              className="flex w-[40%] mx-auto text-xl justify-between bg-white rounded-lg text-black items-center p-2">
              Delete
              <MdDeleteOutline className="mx-1" />
            </button>
          </div>
        </div>
      ) : null}
      {
        editForm ? (
          <div className="fixed inset-0 w-[90%] m-auto h-[80%] flex flex-col z-50 py-4 px-2 rounded-2xl justify-center  bg-primary">
          <h1 className="text-center text-lg text-white">Edit Details </h1>

          <AiOutlineClose
            onClick={() => setEditForm(false)}
            className="absolute text-white text-2xl cursor-pointer right-2 top-4"
          />
          <div
            className="flex flex-col w-[95%] mx-auto h-full"
          >
            <div className="flex flex-col mt-2">
              <label className="pb-2 text-white">Name</label>
              <input
                required
                ref={nameref}
                type="text"
                className="bg-primary mb-1 px-1 text-white text-opacity-80 text-lg focus:outline-none border-b-2 border-[rgba(255, 255, 255, 1)]"
              />
            </div>
            <div className="flex flex-col mt-1">
              <label className="pb-2 text-white">Pin Number</label>
              <input
                required
                ref={pinref}
                type="text"
                className="bg-primary mb-1 px-1 text-white text-lg text-opacity-80 focus:outline-none border-b-2 border-[rgba(255, 255, 255, 1)]"
              />
            </div>
            <div className="flex flex-col mt-1">
              <label className="pb-2 text-white">E-mail</label>
              <input
                required
                ref={emailref}
                type="text"
                className="bg-primary mb-1 px-1 text-white text-lg text-opacity-80 focus:outline-none border-b-2 border-[rgba(255, 255, 255, 1)]"
              />
            </div>
             <div className="flex flex-col mt-1">
              <label className="pb-2 text-white">Phone Number</label>
              <input
                required
                ref={phoneref}
                type="text"
                className="bg-primary mb-1 px-1 text-white text-lg text-opacity-80 focus:outline-none border-b-2 border-[rgba(255, 255, 255, 1)]"
              />
            </div>
            <div className="flex flex-col mt-1">
              <label className="pb-2 text-white">Branch</label>
              <select
                required
                ref={branchref}
                type="text"
                className="w-[70%] mb-1 rounded-lg px-1 bg-white text-opacity-80  text-lg focus:outline-none  "
              >
                <option className="text-xs" value="Mech">
                  Mechanical Engineering
                </option>
                <option className="text-xs" value="EEE">
                  Electrical and Electronics Engineering
                </option>
                <option className="text-xs" value="ECE">
                  Electronics and Communication Engineering
                </option>
                <option className="text-xs" value="Civil">
                  Civil Engineering
                </option>
              </select>
            </div>

            <button
              onClick={() => updateStudentDetails(selectedStudent?._id)}
              className="absolute right-6 bottom-4 px-8 py-1 bg-black text-white rounded-lg text-base"
            >
              Save
            </button>
          </div>
        </div>
        ) : null
      }
    </div>
  ));
}
