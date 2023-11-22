import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useStores } from "../store/index";
import { useObserver } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import { storage } from "../firebase"
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";

export default function Biodata () {
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
  const defaultprofile = "https://ih1.redbubble.net/image.1046392278.3346/pp,504x498-pad,600x600,f8f8f8.jpg"
  const goToHomepage = () => {
    if (CommonStore.role === "principal") {
      navigate("/principal");
    } else if (CommonStore.role === "hod" || CommonStore.role === "staff") {
      navigate(`/${UserStore.user?.department.toUpperCase()}/staffpage`);
    } else {
      navigate(`/${UserStore.user?.department}/${UserStore.user?._id}`);
    }
  };

  useEffect(() => {
    autofillRef();
  }, []);

  const autofillRef = () => {
    if (CommonStore.role === "principal") {
      nameRef.current.value = UserStore.user?.name;
      pinRef.current.value = UserStore.user?.pin;
      fathernameRef.current.value = UserStore.user?.fathername;
      mothernameRef.current.value = UserStore.user?.mothername;
      parentnumberRef.current.value = UserStore.user?.parentnumber;
      birthRef.current.value = UserStore.user?.birth;
      polycetRef.current.value = UserStore.user?.polycet;
      rationRef.current.value = UserStore.user?.ration;
      genderRef.current.value = UserStore.user?.gender;
      studentaadharRef.current.value = UserStore.user?.studentaadhar;
      fatheraadharRef.current.value = UserStore.user?.fatheraadhar;
      motheraadharRef.current.value = UserStore.user?.motheraadhar;
      studentnumberRef.current.value = UserStore.user?.studentnumber;
      categoryRef.current.value = UserStore.user?.category;
      religionRef.current.value = UserStore.user?.religion;
      studiedRef.current.value = UserStore.user?.studied;
      polycetrankRef.current.value = UserStore.user?.polycetrank;
      joiningRef.current.value = UserStore.user?.joining;
      physicalRef.current.value = UserStore.user?.physical;
      emailRef.current.value = UserStore.user?.email;
      addressRef.current.value = UserStore.user?.address;
      districtRef.current.value = UserStore.user?.district;
      pincodeRef.current.value = UserStore.user?.pincode;
    } else {
      nameRef.current.value = UserStore.principal[0]?.name;
      pinRef.current.value = UserStore.principal[0]?.pin;
      fathernameRef.current.value = UserStore.principal[0]?.fathername;
      mothernameRef.current.value = UserStore.principal[0]?.mothername;
      parentnumberRef.current.value = UserStore.principal[0]?.parentnumber;
      birthRef.current.value = UserStore.principal[0]?.birth;
      polycetRef.current.value = UserStore.principal[0]?.polycet;
      rationRef.current.value = UserStore.principal[0]?.ration;
      genderRef.current.value = UserStore.principal[0]?.gender;
      studentaadharRef.current.value = UserStore.principal[0]?.studentaadhar;
      fatheraadharRef.current.value = UserStore.principal[0]?.fatheraadhar;
      motheraadharRef.current.value = UserStore.principal[0]?.motheraadhar;
      studentnumberRef.current.value = UserStore.principal[0]?.studentnumber;
      categoryRef.current.value = UserStore.principal[0]?.category;
      religionRef.current.value = UserStore.principal[0]?.religion;
      studiedRef.current.value = UserStore.principal[0]?.studied;
      polycetrankRef.current.value = UserStore.principal[0]?.polycetrank;
      joiningRef.current.value = UserStore.principal[0]?.joining;
      physicalRef.current.value = UserStore.principal[0]?.physical;
      emailRef.current.value = UserStore.principal[0]?.email;
      addressRef.current.value = UserStore.principal[0]?.address;
      districtRef.current.value = UserStore.principal[0]?.district;
      pincodeRef.current.value = UserStore.principal[0]?.pincode;
    }
  }

  const uploadImageToFirebase = async (file) => {

    const timeStamp = new Date().valueOf();
    const storageRef = ref(storage, `images/${timeStamp}-${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      console.log('Image uploaded to Firebase Storage');
      const imageURL = await getDownloadURL(storageRef);

      setImageUrl(imageURL);
      console.log(imageURL);

      if (CommonStore.role === "principal") {
        await UserStore.updateImageofPrincipal(UserStore.user?._id, imageURL);
      }
      else if (CommonStore.role === "hod" || CommonStore.role === "staff") {
        await UserStore.updateLecturerPhoto(imageURL, UserStore.user?._id);
      }

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

  const updateBiodata = async () => {
    const name = nameRef.current.value;
    const pin = pinRef.current.value;
    const fathername = fathernameRef.current.value;
    const mothername = mothernameRef.current.value;
    const parentnumber = parentnumberRef.current.value;
    const birth = birthRef.current.value;
    const polycet = polycetRef.current.value;
    const ration = rationRef.current.value;
    const gender = genderRef.current.value;
    const studentaadhar = studentaadharRef.current.value;
    const fatheraadhar = fatheraadharRef.current.value;
    const motheraadhar = motheraadharRef.current.value;
    const studentnumber = studentnumberRef.current.value;
    const category = categoryRef.current.value;
    const religion = religionRef.current.value;
    const studied = studiedRef.current.value;
    const polycetrank = polycetrankRef.current.value;
    const joining = joiningRef.current.value;
    const physical = physicalRef.current.value;
    const email = emailRef.current.value;
    const address = addressRef.current.value;
    const district = districtRef.current.value;
    const pincode = pincodeRef.current.value;
    const image = UserStore.user?.photo;
    const coverImage = UserStore.user?.coverImage;
    const id = UserStore.user?._id;
    UserStore.updatePrincipal(name, pin, fathername,mothername,parentnumber,birth,polycet,ration,gender,studentaadhar,fatheraadhar,motheraadhar,studentnumber,category,religion,studied,polycetrank,joining,physical,email,address,district,pincode, image, coverImage, id);
  }

  const logout = () => {
    UserStore.setUser(null);
    localStorage.clear();
    UserStore.setPrincipalAuth(false);
    UserStore.setHodAuth(false);
    UserStore.setStudentAuth(false);
    CommonStore.setRole(null);
    navigate("/");
  };

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
              src={CommonStore.role === "principal" ? UserStore.user?.photo : UserStore.principal[0]?.photo}
              alt=" "
            />
          </div>
          {CommonStore.role === "principal" && (
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
            <textarea ref={birthRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">POLYCET HT Number</label>
            <textarea ref={polycetRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Ration Card Number</label>
            <textarea ref={rationRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Gender</label>
            <textarea ref={genderRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Student AADHAR Number</label>
            <textarea ref={studentaadharRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Father AADHAR Number</label>
            <textarea ref={fatheraadharRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Mother AADHAR Number</label>
            <textarea ref={motheraadharRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Student Mobile Number</label>
            <textarea ref={studentnumberRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Category (Sub Caste) </label>
            <textarea ref={categoryRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Religion</label>
            <textarea ref={religionRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Studied/Resided during SSC</label>
            <textarea ref={studiedRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">POLYCET Rank</label>
            <textarea ref={polycetrankRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Date of Joining</label>
            <textarea ref={joiningRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Physically Challenged</label>
            <textarea ref={physicalRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Email-id</label>
            <textarea ref={emailRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">Address</label>
            <textarea ref={addressRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">District</label>
            <textarea ref={districtRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          <div className="flex flex-col mt-2 w-full items-start">
            <label className="text-secondary2">PIN Code</label>
            <textarea ref={pincodeRef} disabled={!editable} className="focus:outline-none bg-primary3 w-full py-3 px-2 rounded-lg mt-1" />
          </div>
          {editable && (
            <button onClick={updateBiodata} className="bg-primary w-full py-2  my-3 rounded-lg text-white ">Save</button>
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
