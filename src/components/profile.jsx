import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useStores } from "../store/index";
import { useObserver } from "mobx-react";
import { useRef } from "react";

export const Profile = () => {
  const navigate = useNavigate();
  const { AuthStore, CommonStore } = useStores();
  const fileInputRef = useRef(null);
  const defaultprofile = "https://ih1.redbubble.net/image.1046392278.3346/pp,504x498-pad,600x600,f8f8f8.jpg"
  const goToHomepage = () => {
    if (CommonStore.role === "principal") {
      navigate("/principal");
    } else if (CommonStore.role === "hod" || CommonStore.role === "staff")  {
      navigate(`/${AuthStore.user?.department.toUpperCase()}/staffpage`);
    } else {
      navigate(`/${AuthStore.user?.department}/${AuthStore.user?.pinno}`);
    }
  };

  const changeImage = (event) => {
    const file = event.target.files[0];
    if(file){
      console.log("Selected file" + file.name);
    }

  }

  const openfiles = () => {
    fileInputRef.current.click();
  }

  const logout = () => {
    localStorage.removeItem("user");
    AuthStore.user = null;
    AuthStore.setPrincipalAuth(false);
    AuthStore.setHodAuth(false);
    AuthStore.setStudentAuth(false);
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
          src={AuthStore.user?.coverImage}
          alt=""
        />

        <div className="w-24 h-24 rounded-full border border-white absolute z-30 mt-[-12%] left-4 overflow-hidden"
          style={{ backgroundImage: `url(${defaultprofile})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        >
          <img
            className="rounded-full object-cover "
            src={AuthStore.user?.photo}
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
