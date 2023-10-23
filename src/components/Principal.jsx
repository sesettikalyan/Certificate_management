import { AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { lecturerApprovals } from "../helpers/lecturerapprovals";
import { useNavigate, useParams } from 'react-router-dom';
import { Branches } from "../helpers/Branches";
import { useEffect } from "react";
import { useStores } from "../store/index";

export default function Principal() {
    const { UserStore } = useStores();
    useEffect(() => {
        UserStore.getLecturersfromapi();
    }, [])

    return (
        <div className="w-[100%] my-1 h-screen flex flex-col">
            <div className="w-[90%] h-[12%] flex sticky flex-row mx-auto justify-between items-center">
                <Navbar />
            </div>
            <div className="w-[100%] h-[88%] overflow-y-auto ">
                <Branch />
                <LecturerApprovals />

            </div>
        </div>
    );

}


export function Navbar() {
    const now = new Date();
    const hours = now.getHours();
    const profile = "https://tse4.mm.bing.net/th?id=OIP.AZORnc-2Ni4OxteNH3jTHwHaE8&pid=Api&P=0&h=180";
    const navigate = useNavigate();
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

    const goToProfile = () => {
        navigate('/profile');
    }

    return (
        <>
            <div className="flex  flex-col items-start">
                <p className="text-text_color2 text-xl">{greeting}..!</p>
                <h1 className="text-2xl">Principal Name</h1>
            </div>
            <div >
                <img src={profile} onClick={goToProfile} className="w-12 h-12 rounded-full" alt="" />
            </div>
        </>
    );
}


export function Branch() {

    const navigate = useNavigate();

    const goToSpecificBranch = (branch) => {
        navigate(`/${branch}`);
    }

    const goToSearch = () => {
        navigate('/search');
    }

    return (
        <>
            <div className="w-[90%] h-fit flex flex-col mx-auto">
                <div className="w-[100%] mt-[2%] flex flex-row mx-auto justify-between items-center">
                    <h1 className="text-2xl">Select Branch</h1>
                    <AiOutlineSearch onClick={goToSearch} className="text-2xl" />
                </div>


            </div>
            <div className="w-full h-fit  my-3 flex flex-wrap mx-auto justify-between items-center">
                {
                    Branches.map((item) => (
                        <div className="w-[45%] h-[200px] mx-auto pl-4 shadow-sm shadow-[#000000] my-5 flex flex-col items-start py-2  rounded-lg bg-white" onClick={() => goToSpecificBranch(item.name)} >
                            <div className="w-16 h-16 rounded-full bg-primary2 my-1"  > </div>
                            <h1 className="text-lg pb-1">{item.name}</h1>
                            <p className="text-base  text-text_color2">Total Staff :{item.total_staff}</p>
                            <p className="text-base pb-1 text-green-400">Total Students :{item.total_students}</p>
                        </div>
                    ))
                }
                {/* <div className="w-[45%] h-[200px] mx-auto pl-4 shadow-md  shadow-[#000000] my-5 flex flex-col items-start py-2  rounded-lg bg-white">
                    <div className="w-16 h-16 rounded-full bg-primary2 my-1"  > </div>
                    <h1 className="text-lg pb-1">Electrical Engineering</h1>
                    <p className="text-base  text-text_color2">Total Staff : 34</p>
                    <p className="text-base pb-1 text-green-400">Total Students : 134</p>
                </div>
                <div className="w-[45%] h-[200px] mx-auto pl-4 shadow-md shadow-[#000000] my-5 flex flex-col items-start py-2  rounded-lg bg-white">
                    <div className="w-16 h-16 rounded-full bg-primary2
                            my-1"  > </div>
                    <h1 className="text-lg pb-1">Electronics Engineering</h1>
                    <p className="text-base  text-text_color2">Total Staff : 34</p>
                    <p className="text-base pb-1 text-green-400">Total Students : 134</p>
                </div>
                <div className="w-[45%]  h-[200px] mx-auto pl-4 shadow-md shadow-[#000000] my-5 flex flex-col items-start py-2  rounded-lg bg-white">
                    <div className="w-16 h-16 rounded-full bg-primary2 my-1"  > </div>
                    <h1 className="text-lg pb-1 ">Civil Engineering</h1>
                    <p className="text-base  text-text_color2">Total Staff : 34</p>
                    <p className="text-base pb-1 text-green-400">Total Students : 134</p>
                </div> */}

            </div>
        </>
    )
}


export function LecturerApprovals({ navigation }) {
    const navigate = useNavigate();
    const { branch } = useParams();

    const selectedBranch = Branches.find((branchname) => branchname.name === branch);

    const viewStaffDetails = (id) => {
        navigate(`/staff/${id}`);
    }

    const viewStudentDetails = (pin) => {
        return navigate(`/${selectedBranch?.name}/studentapproval/${pin}`)
    }

    return (
        <div className="bg-secondary w-[95%] py-3 mx-auto rounded-lg">
            <h1 className="text-text_color1 font-semibold w-[90%] mx-auto text-3xl">{navigation ? <>Student Approvals</> : <>Lecturer Approvals</>}</h1>
            {!navigation ? (<>
                {lecturerApprovals.map((lecturer) => (
                    <div className="w-[90%] p-2 border-b-2 border-black mx-auto my-2 flex flex-row items-end justify-between">
                        <div className="flex flex-row items-center">
                            <img src={lecturer.image} className="w-12 h-12 rounded-full" alt="" />
                            <div className="flex flex-col items-start ml-3">
                                <h1 className="text-lg">{lecturer.name}</h1>
                                <p className="text-base">{lecturer.id}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <button className="flex items-center justify-center" onClick={() => viewStaffDetails(lecturer.id)} >view details  <AiOutlineRight className="text-sm ml-1 mt-1" /> </button>
                        </div>
                    </div>
                ))}
            </>)
                :
                <>
                    {selectedBranch?.students.map((student) => (
                        <div className="w-[90%] p-2 border-b-2 border-black mx-auto my-2 flex flex-row items-end justify-between">
                            <div className="flex flex-row items-center">
                                <img src={student?.image} className="w-12 h-12 rounded-full" alt="" />
                                <div className="flex flex-col items-start ml-3">
                                    <h1 className="text-lg">{student?.name}</h1>
                                    <p className="text-base">{student?.pin}</p>
                                </div>
                            </div>
                            <div className="flex">
                                <button className="flex items-center justify-center" onClick={() => viewStudentDetails(student?.pin)} >view details  <AiOutlineRight className="text-sm ml-1 mt-1" /> </button>
                            </div>
                        </div>
                    ))
                    }
                </>

            }
        </div>
    );
}