import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useStores } from "../store/index";
import { useObserver } from "mobx-react";

export const Profile = () => {
  const navigate = useNavigate();
  const { AuthStore, CommonStore } = useStores();
  const goToHomepage = () => {
    if (AuthStore.principalAuth === true) {
      navigate("/principal");
    } else if (AuthStore.hodAuth === true) {
      navigate(`/${AuthStore.user?.department.toUpperCase()}/staffpage`);
    } else {
      navigate(`/${AuthStore.user?.department}/${AuthStore.user?.pinno}`);
    }
  };

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

        <img
          className="rounded-full w-24 h-24 border-4 border-white absolute z-30 mt-[-12%] left-4 "
          src={AuthStore.user?.photo}
          alt="profile"
        />
        <div className=" w-24 h-24 relative  ">
          <span className="bg-blue-900 w-5 absolute z-50 left-[90%] top-[25%] h-5 rounded-full flex items-center justify-center">
            <MdOutlineEdit className=" text-white" />
          </span>
        </div>
      </div>
    </div>
  ));
};
