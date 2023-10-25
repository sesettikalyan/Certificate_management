import { useRef } from "react";
import logo from "../assets/logo.png";
import { useStores } from "../store/index";
export default function StaffLogin({ role }) {
  const usernameref = useRef(null);
  const passwordref = useRef(null);
  const { AuthStore } = useStores();

  const handleSubmit = (e) => {
    e.preventDefault();
    //     console.log("clicked");
    console.log("clicked");
    console.log(role);
    try {
      const username = usernameref.current.value;
      const password = passwordref.current.value;
      AuthStore.callingHodLoginApi(username, password);
      // const data = {
      //     username,
      //     password
      // }

      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-[100%]  h-screen items-center">
        <div className="h-[30%] mt-[10%] md:mt-[2%]">
          <img src={logo} className="w-32 h-32 " alt="" />
        </div>
        <div className="bg-primary p-4 h-[70%]  w-[100%] rounded-tl-[100px] mt-[20%] md:mt-[10%]  items-center justify-center">
          <h1 className="text-3xl text-center py-2 text-white">
            Enter Details
          </h1>

          <div className="flex flex-wrap items-center my-6  justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-[90%] justify-between h-[70%]"
            >
              <p className="text-white mt-10 ml-3">User I'd</p>
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
              <div className="flex items-center pt-2 text-white justify-center">
                <p>Don't have an account!</p>
                <button className="ml-1">Sign Up?</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
