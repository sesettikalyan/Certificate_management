import { useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import { useStores } from "../store/index";
import { useNavigate } from "react-router-dom";
import { useObserver } from "mobx-react";
import { Logo } from "./category";
export default function Login() {
  const usernameref = useRef(null);
  const passwordref = useRef(null);
  const { AuthStore, CommonStore, UserStore } = useStores();
  const navigate = useNavigate();

  const usernamelabel = () => {
    if (CommonStore.role === "principal") {
      return "Username";
    } else if (CommonStore.role === "hod" || CommonStore.role === "staff") {
      return "Staff I'd";
    } else {
      return "Pin Number";
    }
  };

  const user = usernamelabel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameref.current.value;
    const password = passwordref.current.value;

    console.log(CommonStore.role);

    // const resp = AuthStore.callingPrincipalLogin(username, password);
    // if (AuthStore.principalAuth === true) {
    //   navigate("/principal");
    // }

    if (CommonStore.role === "principal") {
      if (await AuthStore.callingPrincipalLogin(username, password)) {
        navigate("/principal");
      }
    } else if (CommonStore.role === "hod" || CommonStore.role === "staff") {
      if (await AuthStore.callingHodLoginApi(username, password)) {
        navigate("/selectbranch");
      }
    } else {
      if (await AuthStore.callingStudentLoginApi(username, password)) {
        navigate(`/${AuthStore.user?.department}/${AuthStore.user?.pinno}`);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (CommonStore.role === "principal") {
        UserStore.getLecturersfromapi();
        UserStore.getStudentsfromapi();
      } else if (CommonStore.role === "staff" || CommonStore.role === "hod") {
        UserStore.getStudentsfromapi();
      } else {
      }
    };
  }, []);

  const goToRegisterPage = () => {
    navigate("/register");
  };

  return useObserver(() => (
    <>
      <div className="flex flex-col md:flex-row lg:flex-row w-[100%]  h-screen items-center">
        <div className="h-[30%] flex justify-center md:w-[30%] items-center  md:h-[100%] mt-[10%] md:mt-0">
          <Logo />
        </div>
        <div className="bg-primary p-6 h-[70%] md:h-[100%]  w-[100%]  rounded-tl-[100px] md:rounded-none mt-[20%] md:mt-0  items-center justify-center">
          <h1 className="text-3xl text-center py-2 text-white">
            Enter Details
          </h1>

          <div className="flex flex-wrap items-center my-6  justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-[90%] justify-between h-[70%]"
            >
              <p className="text-white mt-10 ml-3">{user}</p>
              <input
                ref={usernameref}
                required
                className="px-5 py-4 rounded-full w-[98%] "
                type="text"
              />
              <br />
              <p className="text-white mt-5 ml-3">Password</p>
              <input
                required
                ref={passwordref}
                className="px-5 py-4 rounded-full w-[98%]"
                type="password"
              />
              {/* <link rel="stylesheet" href="" /> */}
              <p className="text-white ml-auto mr-3 mt-3 mb-2">
                Forgot Password ?
              </p>
              <button
                type="submit"
                className=" w-[98%] py-4 rounded-full text-white border-[1px] mt-4 border-white"
              >
                Login
              </button>
              {CommonStore.role !== "principal" ? (
                <div
                  onClick={goToRegisterPage}
                  className="flex items-center pt-2 text-white justify-center"
                >
                  <p>Don't have an account!</p>
                  <button className="ml-1">Sign Up?</button>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  ));
}
