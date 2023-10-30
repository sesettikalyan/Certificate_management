import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useStores } from "../store/index";

export const Profile = () => {
  const navigate = useNavigate();
  const { AuthStore, CommonStore } = useStores();
  const goToHomepage = () => {
    if (AuthStore.principalAuth === true) {
      navigate("/principal");
    } else if (AuthStore.hodAuth === true) {
      navigate(`/${AuthStore.user?.department.toUpperCase()}/staffpage`);
    } else {
      navigate("/:branch/:pin");
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

  return (
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
          className="relative rounded-lg h-60"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Corpus_Christi_College_New_Court%2C_Cambridge%2C_UK_-_Diliff.jpg"
          alt=""
        />

        <img
          className="rounded-full w-24 h-24 border-4 border-white absolute z-30 mt-[-15%] left-4 "
          src={AuthStore.user?.photo}
          alt="profile"
        />
        <div className=" w-24 h-24 relative  ">
          <span className="bg-blue-900 w-5 absolute z-50 left-[90%] top-[10%] h-5 rounded-full text-center">
            <MdOutlineEdit className="ml-1 text-white" />
          </span>
        </div>
      </div>
    </div>
  );
};
