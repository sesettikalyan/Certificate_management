
// import { MdOutlineArrowBackIosNew } from "react-icons/md";
import CertificateList from "./CertificateList";
import { Branches } from '../helpers/Branches';
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

export default function Studentview() {

    const { branch, pin } = useParams();

    const selectedBranch = Branches.find((branchname) => branchname.name === branch);

    const selectedStudent = selectedBranch.students.find((student) => student.pin === pin);

    const navigate = useNavigate();

    const showBranch = () => {
        navigate(`/${branch}`);
    }


    return (
        <div className="w-[100%] h-full">
            <div className='py-10 flex flex-col items-start w-full bg-primary rounded-b-2xl'>
                <button className="flex items-center w-[20%] mx-4 text-white text-lg" onClick={showBranch} ><AiOutlineLeft className="mr-1" /> Back</button>
                <div className="w-[85%] mx-auto items-center flex mt-6">
                    <img src={selectedStudent?.image} className="h-44 w-36 rounded-lg" alt="" />
                    <div className="ml-6 text-white">
                        <h1 className="text-xl pb-1 ">{selectedStudent?.name}</h1>
                        <p className="text-base ">{selectedStudent?.pin}</p>
                        <p className="text-base">{branch}</p>
                        <p className="text-base">{selectedStudent?.mobile}</p>
                        <p className="text-base pb-1">{selectedStudent?.email}</p>
                    </div>

                </div>
            </div>
            <div className='flex ml-6 mt-4 space-x-10 '>
                <div className='h-16 w-36 bg-primary rounded-lg'>
                    <p className='text-lg ml-2 text-white'>Sem Percentage</p>
                    <p className='text-white ml-14'>{selectedStudent?.percentage} %</p>
                </div>
                <div className='h-16 w-36 bg-primary rounded-lg'>
                    <p className='text-lg ml-9 text-white'>Backlogs</p>
                    <p className='text-white ml-16'>{selectedStudent?.backlogs}</p>
                </div>
            </div>
            <div className="bg-white  drop-shadow my-6 shadow-lg w-[90%] py-3 mx-auto rounded-lg">

                <h1 className="text-text_color1 font-semibold w-[90%] mx-auto text-2xl">Certificates</h1>
                <CertificateList />
            </div>
        </div>

    );
}
