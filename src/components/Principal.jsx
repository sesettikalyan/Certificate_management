import { AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { lecturerApprovals } from "../helpers/lecturerapprovals";
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
        <div className="w-[100%] my-1 h-screen flex flex-col">
            <div className="w-[90%] pt-[6%] h-[20%] flex sticky flex-row mx-auto justify-between items-center">
                <div className="flex  flex-col items-start">
                    <p className="text-secondary text-xl">{greeting}..!</p>
                    <h1 className="text-2xl">Principal Name</h1>
                </div>
                <div>
                    <img src={profile} className="w-12 h-12 rounded-full" alt="" />
                </div>
            </div>
            <div className="w-[100%] h-[80%] overflow-y-auto">
                <div className="w-[90%] h-fit flex flex-col mx-auto">
                    <div className="w-[100%] mt-[10%] flex flex-row mx-auto justify-between items-center">
                        <h1 className="text-2xl">Select Branch</h1>
                        <AiOutlineSearch className="text-2xl" />
                    </div>


                </div>
                <div className="w-full h-fit  my-3 flex flex-wrap mx-auto justify-between items-center">
                        <div className="w-[45%] h-[200px] mx-auto pl-4 shadow-md shadow-[#000000] my-5 flex flex-col items-start py-2  rounded-lg bg-white">
                            <div  className="w-16 h-16 rounded-full bg-primary2 my-1"  > </div>
                            <h1 className="text-lg pb-1">Mechanical Engineering</h1>
                            <p className="text-base  text-secondary">Total Staff : 34</p>
                            <p className="text-base pb-1 text-green-400">Total Students : 134</p>
                        </div>
                        <div className="w-[45%] h-[200px] mx-auto pl-4 shadow-md  shadow-[#000000] my-5 flex flex-col items-start py-2  rounded-lg bg-white">
                            <div  className="w-16 h-16 rounded-full bg-primary2 my-1"  > </div>
                            <h1 className="text-lg pb-1">Electrical Engineering</h1>
                            <p className="text-base  text-secondary">Total Staff : 34</p>
                            <p className="text-base pb-1 text-green-400">Total Students : 134</p>
                        </div>
                        <div className="w-[45%] h-[200px] mx-auto pl-4 shadow-md shadow-[#000000] my-5 flex flex-col items-start py-2  rounded-lg bg-white">
                            <div  className="w-16 h-16 rounded-full bg-primary2
                            my-1"  > </div>
                            <h1 className="text-lg pb-1">Electronics Engineering</h1>
                            <p className="text-base  text-secondary">Total Staff : 34</p>
                            <p className="text-base pb-1 text-green-400">Total Students : 134</p>
                        </div>
                        <div className="w-[45%]  h-[200px] mx-auto pl-4 shadow-md shadow-[#000000] my-5 flex flex-col items-start py-2  rounded-lg bg-white">
                            <div  className="w-16 h-16 rounded-full bg-primary2 my-1"  > </div>
                            <h1 className="text-lg pb-1 ">Civil Engineering</h1>
                            <p className="text-base  text-secondary">Total Staff : 34</p>
                            <p className="text-base pb-1 text-green-400">Total Students : 134</p>
                        </div>
                        
                </div>
                <div className="bg-primary2 w-[95%] py-3 mx-auto rounded-lg">
                        <h1 className="text-secondary font-semibold w-[90%] mx-auto text-3xl">Lecturer Approvals</h1>
                        {lecturerApprovals.map((item) => (
                            <div className="w-[90%] p-2 border-b-2 border-secondary mx-auto my-2 flex flex-row items-end justify-between">
                                <div className="flex flex-row items-center">
                                    <img src={item.image} className="w-12 h-12 rounded-full" alt="" />
                                    <div className="flex flex-col items-start ml-3">
                                        <h1 className="text-lg">{item.name}</h1>
                                        <p className="text-base">{item.id}</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <button className="flex items-center justify-center">view details  <AiOutlineRight className="text-sm ml-1 mt-1"/> </button>
                                </div>
                            </div>
                        ))  

                        }
                </div>
            </div>
        </div>
    );
}