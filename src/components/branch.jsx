import { MdArrowBackIosNew } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import Lectures from './lectures';
import StudentList from './StudentList';
export default function Branch() {
    return (

        <div className='w-[100%] h-screen flex flex-col'>
            <div className='w-[90%] mx-auto pt-6 flex items-center'>
                <MdArrowBackIosNew />
                <h2 className='mx-1 text-lg '>Electronics</h2>
            </div>
            <div className='px-4 relative'>
                <input className='mt-4 border-blue-400 border-[1px] rounded-full w-96 pl-14 py-6 h-10 pr-10' type="text" placeholder='Search' />
                <span className='absolute left-3 top-3 mt-5 ml-8'>
                    <FaSearch />
                </span>
            </div>
            <div className='bg-[#E4E4FF] mt-6 mx-auto w-[90%] rounded-lg'>
                <div className='flex w-[90%] justify-between item-center mt-2 mx-auto'>
                    <h2 className='text-2xl text-blue-900 font-bold'>Lecturers</h2>
                    <div className='flex mt-2'>
                    <IoMdAddCircle className='mt-0.5 text-blue-900'/>
                    <a className='text-blue-900 text-sm' href="/">Add new Staff</a>
                    </div>
                </div>
                <div className='mt-4'>
                <Lectures />
                </div>
                
              
                {/* <div className='flex mx-6 mt-2 text-center pb-4'>
                    <div className='mx-3'>
                        <img className='h-24 w-24 rounded-full' src={teacher1} alt="" />
                        <p className='w-[90px]'>H.O.D Name</p>
                    </div>
                    <div className='mx-3'>
                        <img className='h-24 w-24 rounded-full' src={teacher1} alt="" />
                        <p className='w-[90px]'>Lecturer1</p>
                    </div>
                    <div className='mx-3 '>
                        <img className='h-24 w-24 rounded-full' src={teacher1} alt="" />
                        <p className='w-[90px]'>Lecturer2</p>
                    </div>
                </div> */}
            </div>
            <div className='pt-8 px-6'>
                    <StudentList />
                </div>

        </div>


    );
}
