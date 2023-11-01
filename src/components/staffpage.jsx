import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Branches } from "../helpers/Branches";
import { AiOutlineRight } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { BsPersonCheck } from "react-icons/bs";
import { PiBuildingsBold } from "react-icons/pi";
import { MdOutlineEdit } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { TitleAndSearch } from "./branchDetails";
import { StudentSection } from "./branchDetails";
import { useStores } from "../store/index";
import { useObserver } from "mobx-react";

export default function StaffPage() {
  const { UserStore } = useStores();
  const { branch } = useParams();

  useEffect(() => {
    UserStore.getStudentsfromapi();
    UserStore.getLecturersfromapi();
  });

  return useObserver(() => (
    <div>
      <div className="w-[100%] h-screen flex flex-col bg-gray-100">
        {/* search box */}
        <TitleAndSearch onStaff={true} branch1={branch} />
        {/* Student-list-section */}
        <div className="bg-white  drop-shadow my-6 shadow-lg w-[90%] py-3 mx-auto rounded-lg">
          <StudentSection onstaff={true} />
        </div>
      </div>
    </div>
  ));
}

// export function StudentSection() {
//     let { branch } = useParams();

//     const selectedBranch = Branches.find((branchname) => branchname.name === branch);

//     const navigate = useNavigate();

//     const showStudentDetails = (branch, pin) => {
//         navigate(`/${branch}/${pin}`);
//     }

//     return (
//         <>
//             <h1 className="text-text_color1 font-semibold w-[90%] mx-auto text-2xl">Students</h1>
//             {selectedBranch?.students.map((student) => (
//                 <div className="w-[90%] p-2 border-b-2 border-[rgba(0, 0, 0, 1)] mx-auto my-2 flex flex-row items-end justify-between">
//                     <div className="flex flex-row items-center">
//                         <img src={student?.image} className="w-12 h-12 rounded-full" alt="" />
//                         <div className="flex flex-col items-start ml-3">
//                             <h1 className="text-lg">{student?.name}</h1>
//                             <p className="text-base">{student?.pin}</p>
//                         </div>
//                     </div>
//                     <div className="flex">
//                         <button className="flex items-center justify-center" onClick={() => showStudentDetails(selectedBranch?.name, student?.pin)} >view details  <AiOutlineRight className="text-sm ml-1 mt-1" /> </button>
//                     </div>
//                 </div>
//             ))}
//         </>
//     )
// }
