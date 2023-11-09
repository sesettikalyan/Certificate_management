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
  });

  return useObserver(() => (
    <div>
      <div className="w-[100%]  flex flex-col bg-gray-100">
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
