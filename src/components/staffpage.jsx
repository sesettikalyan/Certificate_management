import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Branches } from '../helpers/Branches';
import { AiOutlineRight } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { BsPersonCheck } from 'react-icons/bs';
import { PiBuildingsBold } from 'react-icons/pi';
import { MdOutlineEdit } from 'react-icons/md';
import { MdArrowBackIosNew } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";


export default function StaffPage() {
    return(
        <div>
             <div className='w-[100%] h-screen flex flex-col bg-gray-100'>
                <TitleAndSearch />
                {/* Student-list-section */}
                <div className="bg-white  drop-shadow my-6 shadow-lg w-[90%] py-3 mx-auto rounded-lg">
                    <StudentSection />
                </div>

            </div>
        </div>
    )
}
export function TitleAndSearch() {
    let { branch } = useParams();

    const navigate = useNavigate();

    //for navigating to the student approval page 
    const gotoStudentApproval = () => {
        navigate(`/${branch}/studentapproval`);
    }

    const gotoProfile = () => {
        navigate(`/profile`);
    }

    return (
        <>
            {/* <div className='w-[90%] mx-auto pt-6 flex items-center'>
                <AiOutlineLeft className='text-lg' onClick={gotoHomePage} />
                <h2 className='mx-1 text-lg text-primary '>{selectedBranch?.name}</h2>
            </div> */}
            <div className='mt-6 ml-auto flex'>
                <div className='bg-secondary h-12 w-12 rounded-full mx-2' onClick={gotoStudentApproval} >
                <BsPersonCheck className='text-4xl ml-1 mt-1'/>
                </div>
                <div className='bg-secondary h-12 w-12 rounded-full mx-2'  onClick={gotoProfile}>
                <PiBuildingsBold className='text-3xl ml-2 mt-2'/>
                </div>
                <div className=' mx-2 pr-4'>
                    <img className='h-12 w-12 rounded-full' src="https://t3.ftcdn.net/jpg/02/65/18/30/360_F_265183061_NkulfPZgRxbNg3rvYSNGGwi0iD7qbmOp.jpg" alt="" />
                </div>
            </div>
            <div className='mt-6 relative w-[90%] mx-auto'>
                <input type="text" placeholder='Search' className='pl-14 pr-4 py-4 w-full border-blue-400 border-2 rounded-full focus:outline-none' />
                <span className='absolute left-2 top-5  mx-4'>
                    <FaSearch className='text-lg' />
                </span>
            </div>
        </>
    )
}

export function StudentSection() {
    let { branch } = useParams();

    const selectedBranch = Branches.find((branchname) => branchname.name === branch);

    const navigate = useNavigate();

    const showStudentDetails = (branch, pin) => {
        navigate(`/${branch}/${pin}`);
    }

    return (
        <>
            <h1 className="text-text_color1 font-semibold w-[90%] mx-auto text-2xl">Students</h1>
            {selectedBranch?.students.map((student) => (
                <div className="w-[90%] p-2 border-b-2 border-[rgba(0, 0, 0, 1)] mx-auto my-2 flex flex-row items-end justify-between">
                    <div className="flex flex-row items-center">
                        <img src={student?.image} className="w-12 h-12 rounded-full" alt="" />
                        <div className="flex flex-col items-start ml-3">
                            <h1 className="text-lg">{student?.name}</h1>
                            <p className="text-base">{student?.pin}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <button className="flex items-center justify-center" onClick={() => showStudentDetails(selectedBranch?.name, student?.pin)} >view details  <AiOutlineRight className="text-sm ml-1 mt-1" /> </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export const Profile = () => {
    let { branch } = useParams();
    //for navigating the profile to staffpage on clicking back button
    const navigate = useNavigate();
    const gotoStaffPage = () => {
        navigate(`/${branch}/staffpage`);
    }
    return (
        <div className="bg-secondary h-screen">
            <div className="flex pt-4 pb-4 justify-between">
                <button>
                <div className="flex" onClick={gotoStaffPage}>
                <MdArrowBackIosNew className="mt-1 mx-2" />
                <p> Back</p>
                </div></button>
                <div className="bg-blue-900 rounded-full text-white text-2xl h-8 w-8 mr-4">
                <BiLogOut className="mt-1 mx-1" />
                </div>
            </div>
            <div className="relative">
                <img className="rounded-lg h-60" src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Corpus_Christi_College_New_Court%2C_Cambridge%2C_UK_-_Diliff.jpg" alt="" />

                <img className="rounded-full w-24 h-24 border-4 border-white absolute bottom-0 left-4 mt-6" src="https://tse4.mm.bing.net/th?id=OIP.AZORnc-2Ni4OxteNH3jTHwHaE8&pid=Api&P=0&h=180" alt="" />
                <div className="bg-blue-900 w-5 h-5 rounded-full text-center left-9 ml-24 ">
                    <span className="text-white"><MdOutlineEdit className="ml-1" /></span>
                </div>
            </div>
            

        </div>
    )
}
