import { useRef } from "react";
import logo from "../assets/logo.png";
import { useStores } from "../store/index";
import { useNavigate } from "react-router-dom";
export default function Login({ role }) {
  const usernameref = useRef(null);
  const passwordref = useRef(null);
  const { AuthStore } = useStores();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameref.current.value;
    const password = passwordref.current.value;
    const resp = AuthStore.callingPrincipalLogin(username, password);
    if (AuthStore.principalAuth === true) {
      navigate("/principal");
    }
  };

  return (
    <>
      <div className="flex flex-col w-[100%]  h-screen items-center">
        <div className="h-[30%] mt-[10%] md:mt-[2%]">
          <img src={logo} className="w-32 h-32 " alt="" />
        </div>
        <div className="bg-primary p-6 h-[70%]  w-[100%] rounded-tl-[100px] mt-[20%] md:mt-[10%]  items-center justify-center">
          <h1 className="text-3xl text-center py-2 text-white">
            Enter Details
          </h1>

          <div className="flex flex-wrap items-center my-6  justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-[90%] justify-between h-[70%]"
            >
              <p className="text-white mt-10 ml-3">Username</p>
              <input
                ref={usernameref}
                className="px-5 py-4 rounded-full w-[98%] "
                type="text"
              />
              <br />
              <p className="text-white mt-5 ml-3">Password</p>
              <input
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
