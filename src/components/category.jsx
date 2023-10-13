// import Home from "./home";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { PiStudentDuotone } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";


export default function HomePage() {

    const [showHome, setShowHome] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowHome(false);
        }, 3000);
    }, []);

    return (
        { showHome } ? <Category /> : <Home />


    );
}
export function Home() {

    return (
        <div className="flex h-screen flex-col items-center  justify-center bg-white" >
            <img src={logo} alt="sbtet" className="w-32 h-32 rounded-full" />
            <h1 className="text-4xl  ">GPT Pendurthi</h1>
        </div>
    );
}

export function Category() {
    return (
        <div className="flex flex-col w-[100%]  h-screen items-center " >
            <div className="h-[30%] mt-[10%] md:mt-[2%]">
                <img src={logo} className="w-32 h-32 " alt="" />
            </div>

            <div className="bg-primary p-6 h-[70%]  w-[100%] rounded-tl-[100px] mt-[20%] md:mt-[10%]  items-center justify-center">
                <h1 className="text-3xl text-center py-2 text-white">Select User Type</h1>

                <div className="flex flex-wrap items-center my-6  justify-center">
                    <div className="w-[120px] h-[120px] mx-4  my-10 flex flex-col items-center justify-center bg-white">



                    </div>
                    <div className="w-[120px] h-[120px] mx-4 my-10 flex flex-col items-center justify-center bg-white">



                    </div>
                    <div className="w-[120px] h-[120px] mx-4 my-10 flex flex-col items-center justify-center bg-white">
                        <GiTeacher className="text-6xl my-1 text-black" />
                        <h1 className="text-base ">Staff</h1>


                    </div>
                    <div className="w-[120px] h-[120px] mx-4 my-10 flex flex-col items-center justify-center bg-white">

                        <PiStudentDuotone className="text-6xl my-1 text-black" />
                        <h1 className="text-base ">Student</h1>

                    </div>



                </div>

            </div>

        </div>
    );
}