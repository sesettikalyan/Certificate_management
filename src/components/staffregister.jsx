import logo from "../assets/logo.png";
export default function Login1({ from }) {
  return (
    <>
      <div className="flex flex-col w-[100%]  items-center">
        <div className="h-[30%] mt-[10%] md:mt-[2%]">
          <img src={logo} className="w-32 h-32 " alt="" />
        </div>
        <div className="bg-primary h-[70%] p-6  w-[100%] rounded-tl-[100px] mt-[20%] md:mt-[10%]  items-center justify-center">
          <h1 className="text-3xl text-center py-2 text-white">
            Enter Details
          </h1>

          <div className="flex flex-wrap items-center   justify-center">
            <form className="flex w-[90%] flex-col justify-between ">
              <p className="text-white mt-4 ml-3">Name</p>
              <input className="px-5 w-[100%] py-4 rounded-full " type="text" />

              <p className="text-white mt-4 ml-3">Phone Number</p>
              <input className="px-5 w-[100%] py-4 rounded-full" type="text" />
              {/* <link rel="stylesheet" href="" /> */}
              <p className="text-white mt-4 ml-3">
                {from ? "Pin Number" : "User I'd"}
              </p>
              <input className="px-5 w-[100%] py-4 rounded-full " type="text" />

              <p className="text-white mt-4 ml-3">Password</p>
              <input
                className="px-5 w-[100%] py-4 rounded-full "
                type="password"
              />

              <p className="text-white mt-4 ml-3">Conform Password</p>
              <input
                className="px-5 w-[100%] py-4 rounded-full "
                type="password"
              />

              {/* <p className='text-white ml-auto mr-3 mt-3 mb-2'>Forgot Password ?</p> */}
              <button className="w-[100%] py-4 rounded-full text-white border-[1px] mt-10 border-white">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
