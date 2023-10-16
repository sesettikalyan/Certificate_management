// import { MdArrowBackIosNew } from 'react-icons/md';
// import { FaSearch } from 'react-icons/fa';
// import { IoMdAddCircle } from 'react-icons/io';
// import { Lectures } from '../helpers/lectures';
// import { MdArrowForwardIos } from 'react-icons/md';
// import { StudentList, students } from '../helpers/StudentList';





// export default function Branch() {
//     return (

//         <div className='w-[100%] h-screen flex flex-col'>
//             <div className='w-[90%] mx-auto pt-6 flex items-center'>
//                 <MdArrowBackIosNew />
//                 <h2 className='mx-1 text-lg '>Electronics</h2>
//             </div>
//             <div className='px-4 relative w-[85%]'>
//                 <input className='mt-4 border-blue-400 border-[1px] rounded-full w-96 pl-14 py-6 h-10 pr-10' type="Search" placeholder='Search' />
//                 <span className='absolute left-3 top-3 mt-5 ml-8'>
//                     <FaSearch />
//                 </span>
//             </div>
//             {/* Lecturers section */}
//             <div className='bg-[#E4E4FF] mt-6 mx-auto w-[90%] rounded-lg'>
//                 <div className='flex w-[90%] justify-between item-center mt-2 mx-auto'>
//                     <h2 className='text-2xl text-blue-900 font-bold'>Lecturers</h2>
//                     <div className='flex mt-2'>
//                     <IoMdAddCircle className='mt-0.5 text-blue-900'/>
//                     <a className='text-blue-900 text-sm' href="/">Add new Staff</a>
//                     </div>
//                 </div>
//                 <div className='mt-4'>
//                 <div className="flex overflow-x-auto mx-4 mt-2 pb-4">
//                         {Lectures.ece.map((lecture, index) => (
//                             <div key={index} className="items-center space-x-8">
//                                 <div className="w-20 h-20 rounded-full mx-4 overflow-hidden">
//                                     <img src={lecture.img} alt="" className="w-full h-full object-cover" />
//                                 </div>
//                                 <div className="">
//                                     <p className="text-black text-start">{lecture.teacher}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             {/* Student-list-section */}
//             <div className='pt-8 px-6'>
//             <div className="bg-white border-[1px] border-gray-200 shadow-2xl rounded-lg">
//             <div className="flex justify-between my-5">
//             <h1 className="text-3xl text-blue-900 font-semibold ml-6">Students</h1>
//             </div>
//             {StudentList.map((student) => (
//                 <div key={student.id} className="flex items-center border-b-2 border-gray-300 justify-between py-2 px-8 ">
//                     <div className="flex">
//                         <img src={student.image} alt={`${student.name} Image`} className="w-16 h-16 rounded-full object-cover" />
//                     < div className="ml-4 py-2">
//                         <p>{student.name}</p>
//                         <p>{student.pin}</p>
//                     </div>
//                     </div>
//                     <div className="text-black text-xs mt-6 flex"><a href="#">view details</a> <MdArrowForwardIos className="mt-1"/></div>
//                 </div>
//             ))
//             }
//         </div>
//                 </div>

//         </div>


//     );
// }
