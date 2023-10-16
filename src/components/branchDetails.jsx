import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { MdOutlineEdit } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
// import { Lectures } from '../helpers/lectures';
// import { MechStudents } from '../helpers/MechStudents';
import { Branches } from '../helpers/Branches';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function BranchDetails() {
    const navigate = useNavigate();


    return (

        <>

            <div className='w-[100%] h-screen flex flex-col bg-gray-100'>
                <TitleAndSearch />
                {/* Lecturers section */}
                <div className='bg-[#E4E4FF] mt-6 mx-auto w-[90%] rounded-lg'>
                    <LecturerSection />
                </div>
                {/* Student-list-section */}
                <div className="bg-white  drop-shadow my-6 shadow-lg w-[90%] py-3 mx-auto rounded-lg">
                    <StudentSection />
                </div>

            </div>



        </>


    );
}

export function TitleAndSearch() {
    let { branch } = useParams();

    const selectedBranch = Branches.find((branchname) => branchname.name === branch);

    const navigate = useNavigate();

    const gotoHomePage = () => {
        navigate(`/principal`);
    }

    return (
        <>
            <div className='w-[90%] mx-auto pt-6 flex items-center'>
                <AiOutlineLeft className='text-lg' onClick={gotoHomePage} />
                <h2 className='mx-1 text-lg text-primary '>{selectedBranch?.name}</h2>
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

export function LecturerSection() {
    const navigate = useNavigate();

    let { branch } = useParams();

    const selectedBranch = Branches.find((branchname) => branchname.name === branch);

    const showLecturerDetails = (id) => {
        navigate(`/${branch}/lecturer/${id}`);
    }


    return (
        <>
            <div className='flex w-[90%] justify-between items-center mt-2 mx-auto'>
                <h2 className='text-2xl text-text_color1 font-semibold'>Lecturers</h2>
                <button className='flex text-xs text-text_color1 items-center'>
                    <IoMdAddCircle className='text-base' />Add new Staff
                </button>
            </div>
            <div className='mt-4 w-[90%] mx-auto'>
                <div className="flex overflow-x-auto  items-center pb-4">
                    {selectedBranch?.lecturers.map((lecturer, index) => (
                        <div key={index} onClick={() => showLecturerDetails(lecturer?.id)} className="cursor-pointer mx-4 flex flex-col items-center justify-center" >
                            <div className="w-20 h-20 rounded-full  ">
                                <img src={lecturer?.image} alt="" className="w-full h-full rounded-full object-cover" />
                            </div>

                            <p className="text-black ">{lecturer?.teacher}</p>

                        </div>
                    ))}
                </div>
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