import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
export default function Principal() {
    const now = new Date();
    const hours = now.getHours();
    const profile = "https://tse4.mm.bing.net/th?id=OIP.AZORnc-2Ni4OxteNH3jTHwHaE8&pid=Api&P=0&h=180";

    // const [greeting, setGreeting] = useState(null);
    let greeting = null;

    if (hours >= 5 && hours < 12) {
        // setGreeting("Good Morning");
        greeting = "Good Morning";
    }
    else if (hours >= 12 && hours < 17) {
        // setGreeting("Good Afternoon");
        greeting = "Good Afternoon";
    }
    else if (hours >= 17 && hours < 21) {
        // setGreeting("Good Evening");
        greeting = "Good Evening";
    }
    else {
        // setGreeting("Good Night");
        greeting = "Good Night";
    }

    return (
        <div className="w-[100%] h-screen flex flex-col">
            <div className="w-[90%] pt-[6%] flex flex-row mx-auto justify-between items-center">
                <div className="flex  flex-col items-start">
                    <p className="text-secondary text-xl">{greeting}..!</p>
                    <h1 className="text-2xl">Principal Name</h1>
                </div>
                <div>
                    <img src={profile} className="w-12 h-12 rounded-full" alt="" />
                </div>
            </div>
            <div className="w-[90%] flex flex-col mx-auto">
                <div className="w-[100%] mt-[10%] flex flex-row mx-auto justify-between items-center">
                    <h1 className="text-2xl">Select Branch</h1>
                    <AiOutlineSearch className="text-2xl" />
                </div>

                <div className="w-[100%]  my-3 flex flex-wrap mx-auto justify-between items-center">
                    <div className="w-[160px] h-[160px] mx-2 shadow-sm shadow-[#000000] my-8 flex flex-col items-center justify-center rounded-lg bg-white">

                    </div>
                    <div className="w-[160px] h-[160px] mx-2 shadow-sm shadow-[#000000] my-8 flex flex-col items-center justify-center rounded-lg bg-white">

                    </div>
                    <div className="w-[160px] h-[160px] mx-2 shadow-sm shadow-[#000000] my-8 flex flex-col items-center justify-center rounded-lg bg-white">

                    </div>
                    <div className="w-[160px] h-[160px] mx-2 shadow-sm shadow-[#000000] my-8 flex flex-col items-center justify-center rounded-lg bg-white">

                    </div>
                </div>

            </div>
        </div>
    );
}