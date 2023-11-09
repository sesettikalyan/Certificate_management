import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useStores } from "../store/index";
import { useObserver } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import {storage} from "../firebase"
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";

export const Profile = () => {
  const navigate = useNavigate();
  const { UserStore, CommonStore} = useStores();
  const [imageUrl, setImageUrl] = useState(); 
  const fileInputRef = useRef(null);
  const defaultprofile = "https://ih1.redbubble.net/image.1046392278.3346/pp,504x498-pad,600x600,f8f8f8.jpg"
  const goToHomepage = () => {
    if (CommonStore.role === "principal") {
      navigate("/principal");
    } else if (CommonStore.role === "hod" || CommonStore.role === "staff")  {
      navigate(`/${UserStore.user?.department.toUpperCase()}/staffpage`);
    } else {
      navigate(`/${UserStore.user?.department}/${UserStore.user?.pinno}`);
    }
  };


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
      else if(CommonStore.role === "hod" || CommonStore.role === "staff"){
        await UserStore.updateLecturerPhoto( imageURL,UserStore.user?._id);
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

  const logout = () => {
    localStorage.removeItem("user");
    UserStore.user = null;
    UserStore.setPrincipalAuth(false);
    UserStore.setHodAuth(false);
    UserStore.setStudentAuth(false);
    CommonStore.setRole(null);
    navigate("/");
  };

  return useObserver(() => (
    <div className="bg-secondary h-screen">
      <div className="flex pt-4 pb-4 justify-between">
        <div onClick={goToHomepage} className="flex">
          <MdArrowBackIosNew className="mt-1 mx-2" />
          <p> Back</p>
        </div>
        <div
          onClick={logout}
          className="bg-blue-900 cursor-pointer rounded-full text-white text-2xl h-8 w-8 mr-4"
        >
          <BiLogOut className="mt-1 mx-1" />
        </div>
      </div>
      <div>
        <img
          className="relative w-[100%] rounded-md object-cover  h-60"
          src={UserStore.user?.coverImage}
          alt=""
        />

        <div className="w-24 h-24 rounded-full border border-white absolute z-30 mt-[-12%] left-4 overflow-hidden"
          style={{ backgroundImage: `url(${defaultprofile})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        >
          <img
            className="rounded-full object-cover "
            src={UserStore.user?.photo}
            alt=" "
          />
        </div>
        <div className=" w-24 h-24 relative  ">
          <span onClick={openfiles} className="bg-blue-900 w-5 absolute z-50 left-[90%] top-[25%] h-5 rounded-full flex items-center justify-center">
            <MdOutlineEdit className=" text-white" />
            <input type="file" id="fileinput" className="hidden" ref={fileInputRef} onChange={changeImage} />
          </span>
        </div>
      </div>
    </div>
  ));
};
