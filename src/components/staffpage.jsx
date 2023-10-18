import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Branches } from '../helpers/Branches';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { BsPersonCheck } from 'react-icons/bs';
import { PiBuildingsBold } from 'react-icons/pi';
import { IoMdAddCircle } from 'react-icons/io';

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

    const selectedBranch = Branches.find((branchname) => branchname.name === branch);

    const navigate = useNavigate();

    const gotoHomePage = () => {
        navigate(`/principal`);
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
            <div className='mt-6 ml-auto flex' onClick={gotoProfile}>
                <div className='bg-secondary h-12 w-12 rounded-full mx-2'>
                <BsPersonCheck className='text-4xl ml-1 mt-1'/>
                </div>
                <div className='bg-secondary h-12 w-12 rounded-full mx-2'>
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