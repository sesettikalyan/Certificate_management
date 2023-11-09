import { useParams, useNavigate } from "react-router-dom";
import { Branches } from "../helpers/Branches";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useStores } from "../store/index";
import { useObserver } from "mobx-react";
import { BiLogOut } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { toJS } from "mobx";

export default function LecturerView() {
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState({});
  const { UserStore, CommonStore } = useStores();
  const navigate = useNavigate();
  const { branch, id } = useParams();
  const defaultprofile = "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
  const fileInputRef = useRef(null);

  // const selectedLecturer = UserStore.lecturers.find(
  //   (lecturer) => lecturer?.idno === id
  // );

  const nameref = useRef();
  const idref = useRef();
  const emailref = useRef();
  const branchref = useRef();

  const autofillref = () => {
    try {
      nameref.current.value = selectedLecturer?.name;
      idref.current.value = selectedLecturer?.idno;
      emailref.current.value = selectedLecturer?.email;
      branchref.current.value = selectedLecturer?.department;
    } catch (error) { }
  };

  const goBack = () => {
    if (CommonStore.role === "principal") {
      navigate(`/${branch}`);
    } else {
      navigate(`/${branch}/staffpage`);
    }
  };

  useEffect(() => {
    autofillref();
    const lecturer = UserStore.lecturers.find(
      (lecturer) => lecturer?._id === id
    );
    setSelectedLecturer(lecturer);
  }, [editForm]);


  const updateLecturerDetails = async (id) => {
    const name = nameref.current.value;
    const idno = idref.current.value;
    const email = emailref.current.value;
    const branch = branchref.current.value;
    console.log(name, idno, email, branch);
    console.log(id);
    if (await UserStore.updateLecturers(name, idno, email, branch, id)) {
      setEditForm(false);
    }

  };

  const removeLecturer = async (id) => {
    await UserStore.deleteLecturers(id);
    setDeleteForm(false);
    navigate(`/${branch}`);
  }

  const logout = () => {
    localStorage.removeItem("user");
    UserStore.user = null;
    UserStore.setPrincipalAuth(false);
    UserStore.setHodAuth(false);
    UserStore.setStudentAuth(false);
    navigate("/");
  };

  const openFiles = () => {
    fileInputRef.current.click();
  };

  const changeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the selected file
      console.log('Selected file: ' + file.name);
    }
  };


  return useObserver(() => (
    <div className="w-[100%] flex flex-col items-center py-4 h-full rounded-b-2xl bg-secondary">
      <div className="w-[90%] my-2 mx-auto flex items-center justify-between">
        <button className="flex items-center  text-lg" onClick={goBack}>
          <AiOutlineLeft className="mr-1" /> Back
        </button>

        {CommonStore.role === "principal" ? (
          <div className="w-[25%] flex justify-between items-center">
            <button
              onClick={() => setEditForm(true)}
              className="w-10 h-10 bg-primary rounded-full text-2xl text-white flex items-center justify-center"
            >
              {" "}
              <MdOutlineEdit />
            </button>
            <button
              onClick={() => setDeleteForm(true)}
              className="w-10 h-10 bg-primary rounded-full text-2xl text-white flex items-center justify-center"
            >
              {" "}
              <MdDeleteOutline />
            </button>
          </div>
        ) : (
          <div
            onClick={logout}
            className="bg-blue-900 cursor-pointer rounded-full text-white text-2xl h-10 w-10 flex items-center justify-center"
          >
            <BiLogOut className="mr-1" />
          </div>
        )}
      </div>
      {CommonStore.role === "hod" && !UserStore.user?.photo || CommonStore.role === "staff"  && !UserStore.user?.photo ? (
        <div onClick={openFiles} className="bg-primary text-white my-6 w-48 h-52 rounded-lg flex flex-col items-center justify-center">
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
      ) : (
        <div className="w-48 h-52 rounded-lg overflow-hidden"
          style={{ backgroundImage: `url(${defaultprofile})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        >
          <img
            src={CommonStore.role === "hod" || CommonStore.role === "staff" ? UserStore.user?.photo : selectedLecturer?.photo}
            className="w-48 rounded-lg object-cover"
            alt=""
          />
        </div>
      )}

      <div className="flex flex-col w-[90%]">
        <div className="flex flex-col mt-2 items-start ">
          <label className="pb-2">Name</label>
          <div className="text-base px-4 py-2 w-full  border-2 rounded-lg border-black">
            {CommonStore.role === "hod" || CommonStore.role === "staff" ? UserStore.user?.name : selectedLecturer?.name}
          </div>
        </div>
        <div className="flex flex-col mt-2 items-start ">
          <label className="pb-2">I'd number</label>
          <div className="text-base px-4 py-2 w-full  border-2 rounded-lg border-black">
            {CommonStore.role === "hod" || CommonStore.role === "staff" ? UserStore.user?.idno : selectedLecturer?.idno}
          </div>
        </div>
        <div className="flex flex-col mt-2 items-start ">
          <label className="pb-2">Branch name</label>
          <div className="text-base px-4 py-2 w-full  border-2 rounded-lg border-black">
            {CommonStore.role === "hod" || CommonStore.role === "staff" ? UserStore.user?.department : selectedLecturer?.department}
          </div>
        </div>
        <div className="flex flex-col mt-2 items-start ">
          <label className="pb-2">Phone number</label>
          <div className="text-base px-4 py-2 w-full  border-2 rounded-lg border-black">
            {CommonStore.role === "hod" || CommonStore.role === "staff" ? UserStore.user?.phoneNumber : selectedLecturer?.phoneNumber}
          </div>
        </div>
        <div className="flex flex-col mt-2 items-start ">
          <label className="pb-2">Email address</label>
          <div className="text-base px-4 py-2 w-full  border-2 rounded-lg border-black">
            {CommonStore.role === "hod" || CommonStore.role === "staff" ? UserStore.user?.email : selectedLecturer?.email}
          </div>
        </div>
      </div>

      {editForm ? (
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
              <label className="pb-2 text-white">I'd Number</label>
              <input
                required
                ref={idref}
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
              onClick={() => updateLecturerDetails(selectedLecturer?._id)}
              className="absolute right-6 bottom-4 px-8 py-1 bg-black text-white rounded-lg text-base"
            >
              Save
            </button>
          </div>
        </div>
      ) : null}

      {deleteForm ? (
        <div className="fixed inset-0  w-[80%] m-auto h-[20%] flex flex-col z-50 py-4 px-2 rounded-2xl items-center  bg-primary">
          <h1 className="text-center text-2xl text-white">Confirm to delete</h1>
          <p className="text-white pt-1 text-2xl">
            {selectedLecturer?.name}
          </p>
          {/* <AiOutlineClose onClick={() => setDeleteForm(false)} className="absolute text-white text-2xl cursor-pointer right-2 top-4" /> */}
          <div className="w-[90%] mx-auto flex my-3  justify-between items-center">
            <button
              onClick={() => setDeleteForm(false)}
              className="flex w-[40%] mx-auto text-xl justify-between bg-black rounded-lg  text-white items-center p-2"
            >
              Cancel
              <AiOutlineClose className="mx-1" />
            </button>
            <button onClick={() => removeLecturer(selectedLecturer?._id)} className="flex w-[40%] mx-auto text-xl justify-between bg-black rounded-lg text-white items-center p-2">
              Delete
              <MdDeleteOutline className="mx-1" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  ));
}
