import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { Branches } from '../helpers/Branches';
import { useParams } from 'react-router-dom';

export default function StudentApproval() {
    let { branch } = useParams();
    //for navigating to the staffpage on clicking back button
    const navigate = useNavigate();
    const gotoStaffPage = () => {
        navigate(`/${branch}/staffpage`);
    }
    return (
        <div>
                <button className="flex items-center mt-6 pl-4 text-lg" onClick={gotoStaffPage}><AiOutlineLeft className="mr-1" /> Back</button>

                 {/* Student-list-section */}
                 <div className=" drop-shadow my-6 shadow-lg w-[90%] mx-auto ">
                    <StudentSection />
                </div>

        </div>
        
    )
}


export function StudentSection() {
    let { branch } = useParams();

    const selectedBranch = Branches.find((branchname) => branchname.name === branch);

    const navigate = useNavigate();

    const showStudentDetails = (branch, pin) => {
        navigate(`/${branch}/studentapproval/${pin}`);
    }

    return (
        <> 
        <div className='bg-secondary rounded-xl'>
            <h1 className="text-text_color1 font-semibold w-[90%] mx-auto text-2xl">Students Approvals</h1>
            {selectedBranch?.students.map((student) => (
                <div className="w-[90%] p-2 border-b-2 border-gray-400 mx-auto my-2 flex flex-row items-end justify-between">
                    <div className="flex flex-row items-center">
                        <img src={student?.image} className="w-12 h-12 rounded-full" alt="" />
                        <div className="flex flex-col items-start ml-3">
                            <h1 className="text-lg">{student?.name}</h1>
                            <p className="text-base">{student?.pin}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <button className="flex items-center justify-center"  onClick={() => showStudentDetails(selectedBranch?.name, student?.pin)} >view details  <AiOutlineRight className="text-sm ml-1 mt-1" /> </button>
                    </div>
                    {/*  onClick={() => showStudentDetails(selectedBranch?.name, student?.pin)} */}
                </div>
            ))}
            </div>
        </>
    )
}
