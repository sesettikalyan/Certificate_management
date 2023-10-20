import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { Branches } from '../helpers/Branches';
import { useParams } from 'react-router-dom';
import StudentApproval from './studentApproval';


export default function StudentDetails() {
    let { branch, pin } = useParams();
    const selectedStudent = Branches.find((branchname) => branchname.name === branch)?.students.find((student) => student.pin === pin);
    const navigate = useNavigate();
    const gotoStudentApproval = () => {
        navigate(`/${branch}/studentapproval`);
    }

    return (
        <div className='bg-secondary '>
            <div className='pt-8'>

            <button className="flex items-center  pl-4 text-lg" onClick={gotoStudentApproval}><AiOutlineLeft className="mr-1" /> Back</button>
            </div>

            <div className='flex mt-3 pb-4'>
                <div className='pl-6'>
                <img className='h-[100%] w-[80%] rounded-lg' src={selectedStudent.image} alt="" />
                </div>
                <div className='pr-8 text-left pt-2'>
                    <h1 className='text-lg'>{selectedStudent.name}</h1>
                    <p>{selectedStudent.pin}</p>
                    <p>{selectedStudent.branch}</p>
                    <p>{selectedStudent.mobile}</p>
                    <p>{selectedStudent.email}</p>
                    <button className="py-2 px-4 bg-primary text-white rounded-lg mt-3">Approve</button>

                </div>
            </div>
            {/* <StudentApproval selectedStudent={selectedStudent} /> */}
        </div>
    )

}
