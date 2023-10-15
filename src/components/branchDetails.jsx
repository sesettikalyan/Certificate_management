import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
// import { Lectures } from '../helpers/lectures';
// import { MechStudents } from '../helpers/MechStudents';
import { Branches } from '../helpers/Branches';
import { useNavigate, useParams } from 'react-router-dom';

export default function BranchDetails() {




    return (

        <div className='w-[100%] h-screen flex flex-col bg-gray-100'>
            <TitleAndSearch />
            {/* Lecturers section */}
            <div className='bg-[#E4E4FF] mt-6 mx-auto w-[90%] rounded-lg'>
                <LecturerSection />
            </div>
            {/* Student-list-section */}
            {/* <div className='pt-8 px-6'>
                <div className="bg-white border-[1px] border-gray-200 shadow-2xl rounded-lg">
                    <div className="flex justify-between my-5">
                        <h1 className="text-3xl text-blue-900 font-semibold ml-6">Students</h1>
                    </div>
                    {MechStudents.map((student) => (
                        <div key={student.id} className="flex items-center border-b-2 border-gray-300 justify-between py-2 px-8 ">
                            <div className="flex">
                                <img src={student.img} alt={`${student.name} Image`} className="w-16 h-16 rounded-full object-cover" />
                                < div className="ml-4 py-2">
                                    <p>{student.name}</p>
                                    <p>{student.pin}</p>
                                </div>
                            </div>
                            <div className="text-black text-xs mt-6 flex"><a href="#">view details</a> <MdArrowForwardIos className="mt-1" /></div>
                        </div>
                    ))
                    }
                </div>
            </div> */}
            <div className="bg-white  drop-shadow my-6 shadow-lg w-[90%] py-3 mx-auto rounded-lg">
                <StudentSection />
            </div>

        </div>


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
                <h2 className='mx-1 text-lg text-primary '>{selectedBranch.name}</h2>
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
    let { branch } = useParams();

    const selectedBranch = Branches.find((branchname) => branchname.name === branch);
    return (
        <>
            <div className='flex w-[90%] justify-between item-center mt-2 mx-auto'>
                <h2 className='text-2xl text-text_color1 font-semibold'>Lecturers</h2>
                <button className='flex text-xs text-text_color1 items-center'>
                    <IoMdAddCircle className='text-base' />Add new Staff
                </button>
            </div>
            <div className='mt-4 w-[90%] mx-auto'>
                <div className="flex overflow-x-auto  items-center pb-4">
                    {selectedBranch.lecturers.map((lecturer, index) => (
                        <div key={index} className="flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full mx-4 overflow-hidden">
                                <img src={lecturer.img} alt="" className="w-full h-full object-cover" />
                            </div>

                            <p className="text-black ">{lecturer.teacher}</p>

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

    return (
        <>
            <h1 className="text-text_color1 font-semibold w-[90%] mx-auto text-2xl">Students</h1>
            {selectedBranch.students.map((student) => (
                <div className="w-[90%] p-2 border-b-2 border-[rgba(0, 0, 0, 1)] mx-auto my-2 flex flex-row items-end justify-between">
                    <div className="flex flex-row items-center">
                        <img src={student.img} className="w-12 h-12 rounded-full" alt="" />
                        <div className="flex flex-col items-start ml-3">
                            <h1 className="text-lg">{student.name}</h1>
                            <p className="text-base">{student.pin}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <button className="flex items-center justify-center"  >view details  <AiOutlineRight className="text-sm ml-1 mt-1" /> </button>
                    </div>
                </div>
            ))}
        </>
    )
}