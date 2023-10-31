import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { useStores } from "../store/index";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const { CommonStore, UserStore } = useStores();
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [pin, setPin] = useState(null);
  const [branch, setBranch] = useState(null);
  const nameref = useRef(null);
  const emailref = useRef(null);
  const phoneref = useRef(null);
  const passref = useRef(null);
  const cpassref = useRef(null);
  const pinref = useRef(null);
  const branchref = useRef(null);
  const navigate = useNavigate();

  const goToSetPassword = (e) => {
    e.preventDefault();
    try {
      setName(nameref.current.value);
      setEmail(emailref.current.value);
      setPhone(phoneref.current.value);
      setPin(pinref.current.value);
      setBranch(branchref.current.value);
      setShowSetPassword(true);
    } catch (error) {}
  };

  const postDetails = (e) => {
    e.preventDefault();
    try {
      console.log(name, email, phone, branch, pin, CommonStore.role);
      const password = passref.current.value;
      const confirmpassword = cpassref.current.value;
      if (password !== confirmpassword) {
        alert("Password and Confirm Password are not same");
        return;
      } else {
        if (CommonStore.role === "hod" || CommonStore.role === "staff") {
          if (
            UserStore.postLecturers(
              name,
              pin,
              email,
              branch,
              password,
              CommonStore.role,
              phone
            )
          ) {
            return navigate("/login");
          }
        } else {
          if (
            UserStore.postStudents(
              name,
              pin,
              email,
              branch,
              password,
              CommonStore.role,
              phone
            )
          ) {
            return navigate("/login");
          }
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="flex flex-col w-[100%] h-screen items-center">
        <div
          className={`h-[30%] ${
            showSetPassword ? "mt-[20%]" : "mt-[3%]"
          } md:mt-[2%]`}
        >
          <img src={logo} className="w-36 h-36" alt="" />
        </div>
        {!showSetPassword ? (
          <div className="bg-primary h-[100%] py-4 flex flex-col  w-[100%] rounded-tl-[100px] mt-[6%]  items-center justify-center">
            <h1 className="text-3xl text-center py-2 text-white">
              Enter Details
            </h1>

            <div className="flex flex-wrap w-[95%] items-center   justify-center">
              <form
                onSubmit={goToSetPassword}
                className="flex w-[90%] flex-col justify-between "
              >
                <p className="text-white mt-4 ml-3">Name</p>
                <input
                  ref={nameref}
                  required
                  className="px-5 w-[100%] py-4 rounded-full "
                  type="text"
                />
                <p className="text-white mt-4 ml-3">Email</p>
                <input
                  ref={emailref}
                  required
                  className="px-5 w-[100%] py-4 rounded-full "
                  type="email"
                />

                <p className="text-white mt-4 ml-3">Phone Number</p>
                <input
                  ref={phoneref}
                  required
                  className="px-5 w-[100%] py-4 rounded-full"
                  type="text"
                />
                {/* <link rel="stylesheet" href="" /> */}
                <p className="text-white mt-4 ml-3">
                  {CommonStore.role === "student" ? "Pin Number" : "Staff I'd"}
                </p>
                <input
                  ref={pinref}
                  required
                  className="px-5 w-[100%] py-4 rounded-full "
                  type="text"
                />

                <p className="text-white mt-4 ml-3">Branch</p>
                <select
                  ref={branchref}
                  type="text"
                  className="px-5 w-[100%] py-4 rounded-full  "
                >
                  <option className="text-xs" value="Mech">
                    Mechanical Engineering
                  </option>
                  <option className="text-xs" value="EEE">
                    Electrical Engineering
                  </option>
                  <option className="text-xs" value="ECE">
                    Electronics Engineering
                  </option>
                  <option className="text-xs" value="Civil">
                    Civil Engineering
                  </option>
                </select>

                {/* <p className="text-white mt-4 ml-3">Password</p>
              <input
                required
                ref={passref}
                className="px-5 w-[100%] py-4 rounded-full "
                type="password"
              />

              <p className="text-white mt-4 ml-3">Conform Password</p>
              <input
                required
                ref={cpassref}
                className="px-5 w-[100%] py-4 rounded-full "
                type="password"
              /> */}

                {/* <p className='text-white ml-auto mr-3 mt-3 mb-2'>Forgot Password ?</p> */}
                <button
                  type="submit"
                  className="w-[100%] py-4 rounded-full text-white border-[1px] mt-10 border-white"
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            <h1 className="mt-[8%] text-3xl">Set New Password</h1>
            <div className="bg-primary h-[100%] flex px-6  w-[100%] rounded-tl-[100px] mt-[10%]  items-center justify-center">
              <form
                onSubmit={postDetails}
                className="flex flex-col w-[95%] items-center"
              >
                <p className="w-full text-white mt-4 ml-3">New Password</p>
                <input
                  required
                  ref={passref}
                  className="px-5 w-[100%] py-4 rounded-full "
                  type="password"
                />

                <p className="text-white w-full mt-6 ml-3">
                  Confirm New Password
                </p>
                <input
                  required
                  ref={cpassref}
                  className="px-5 w-[100%] py-4 rounded-full "
                  type="password"
                />
                <button
                  type="submit"
                  className="w-[50%] py-4 rounded-full text-white border-[1px] mt-10 border-white"
                >
                  Register
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// export function SetPasswordFields() {
//   const passref = useRef(null);
//   const cpassref = useRef(null);
//   return (

//   );
// }
