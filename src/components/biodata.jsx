import { MdOutlineEdit } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useStores } from "../store/index";
import { useObserver } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import { storage } from "../firebase"
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";

export default function Biodata () {
  const {id,branch} = useParams();
  const navigate = useNavigate();
  const { UserStore, CommonStore } = useStores();
  const [imageUrl, setImageUrl] = useState();
  const fileInputRef = useRef(null);
  const nameRef = useRef(null);
  const pinRef = useRef(null);
  const fathernameRef = useRef(null);
  const mothernameRef = useRef(null);
  const parentnumberRef = useRef(null);
  const birthRef = useRef(null);
  const polycetRef = useRef(null);
  const rationRef = useRef(null);
  const genderRef = useRef(null);
  const studentaadharRef = useRef(null);
  const fatheraadharRef = useRef(null);
  const motheraadharRef = useRef(null);
  const studentnumberRef = useRef(null);
  const categoryRef = useRef(null);
  const religionRef = useRef(null);
  const studiedRef = useRef(null);
  const polycetrankRef = useRef(null);
  const joiningRef = useRef(null);
  const physicalRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const districtRef = useRef(null);
  const pincodeRef = useRef(null);
  const [editable, setEditable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const defaultprofile = "https://ih1.redbubble.net/image.1046392278.3346/pp,504x498-pad,600x600,f8f8f8.jpg"
  const goToHomepage = () => {
    if (CommonStore.role === "principal") {
      navigate(`${branch}`);
    } else if (CommonStore.role === "hod" || CommonStore.role === "staff") {
      navigate(`/${UserStore.user?.department.toUpperCase()}/staffpage`);
    } else {
      navigate(`/${UserStore.user?.department}/${UserStore.user?._id}`);
    }
  };

  useEffect(() => {
    const student = UserStore.students.find((student) => student?._id === id);
    setSelectedStudent(student);
  }, []);

  const uploadImageToFirebase = async (file) => {

    const timeStamp = new Date().valueOf();
    const storageRef = ref(storage, `images/${timeStamp}-${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      console.log('Image uploaded to Firebase Storage');
      const imageURL = await getDownloadURL(storageRef);

      setImageUrl(imageURL);
      console.log(imageURL);

    } catch (error) {

    }

  };

  const changeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImageToFirebase(file);
    }
  }


  const openfiles = () => {
    fileInputRef.current.click();
  }


 

  return useObserver(() => (
    <div className=" h-screen">
      <div className="flex pt-4 pb-4 justify-between bg-primary">
        <div onClick={goToHomepage} className="flex">
        <div className="bg-primary h-48 ">
                    <button className="flex items-center w-[20%] mx-4 text-xl text-white">
                        <BiArrowBack className="text-white text-2xl mt-5" />
                    </button>
                    <h1 className="text-white text-4xl ml-[100%]"> Biodata </h1>
                </div>
        </div>
        
      </div>
      
      <div className="flex flex-col w-full rounded-2xl absolute bg-white z-40 mt-[-10%]  items-start">
        <div className="w-full flex justify-between">
          <div className="w-24 h-24  rounded-full border border-white mt-[-12%] mx-5  overflow-hidden"
            style={{ backgroundImage: `url(${defaultprofile})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
          >
            <img
              className="rounded-full object-cover "
              src={CommonStore.role === "student" ? UserStore.user?.photo : selectedStudent?.photo}
              alt=" "
            />
          </div>
          {CommonStore.role === "hod" || CommonStore.role === "staff" && (
            <>
              <span onClick={openfiles} className="bg-blue-900 w-5 h-5 absolute left-[24%] top-[4%] rounded-full flex items-center justify-center">
                <MdOutlineEdit className=" text-white" />
                <input type="file" id="fileinput" className="hidden" ref={fileInputRef} onChange={changeImage} />
              </span>
              <button onClick={() => setShowPopup(true)} className="flex items-center mx-4">Edit Details <MdOutlineEdit className="text-primary ml-1" /></button>
            </>
          )}

        </div>
        <div className="flex flex-col items-center w-[85%] mx-auto ">
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Student Name</label>
            <input ref={nameRef} disabled={!editable} type="text" className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Pin Number</label>
            <input ref={pinRef} disabled={!editable} type="text" className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Father's Name</label>
            <input ref={fathernameRef} disabled={!editable} type="email" className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Mother's Name</label>
            <input ref={mothernameRef} disabled={!editable} type="text" className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Parent Mobile Number</label>
            <input ref={parentnumberRef} disabled={!editable} type="text" className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Date Of Birth</label>
            <input ref={birthRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">POLYCET HT Number</label>
            <input ref={polycetRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Ration Card Number</label>
            <input ref={rationRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Gender</label>
            <input ref={genderRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Student AADHAR Number</label>
            <input ref={studentaadharRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Father AADHAR Number</label>
            <input ref={fatheraadharRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Mother AADHAR Number</label>
            <input ref={motheraadharRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Student Mobile Number</label>
            <input ref={studentnumberRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Category (Sub Caste) </label>
            <input ref={categoryRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Religion</label>
            <input ref={religionRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Studied/Resided during SSC</label>
            <input ref={studiedRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">POLYCET Rank</label>
            <input ref={polycetrankRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Date of Joining</label>
            <input ref={joiningRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Physically Challenged</label>
            <input ref={physicalRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Email-id</label>
            <input ref={emailRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Address</label>
            <input ref={addressRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">District</label>
            <input ref={districtRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">PIN Code</label>
            <input ref={pincodeRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          {editable && (
            <button 
            className="bg-primary w-full py-2  my-3 rounded-lg text-white ">Save</button>
          )
          }
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 z-50 w-full h-screen flex items-center justify-center">
          <div className="bg-white w-[80%] h-auto rounded-lg shade-sh flex flex-col items-center justify-center py-8">
            <p className="text-2xl text-center font-semibold">Edit Details</p>
            <div className="flex mt-6 w-[60%] justify-between">
              <button onClick={() => { setEditable(true); setShowPopup(false) }} className="text-justify hover:bg-primary border border-primary hover:text-white py-1  px-4 rounded-lg">Yes</button>
              <button onClick={() => { setEditable(false); setShowPopup(false) }} className="text-justify py-1 hover:bg-primary border border-primary hover:text-white  px-4 rounded-lg">No</button>
            </div>
          </div>
        </div>
      )}

    </div>
  ));
};
