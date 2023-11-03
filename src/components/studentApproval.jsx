import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { useStores } from "../store/index";
import { Approvals } from "./Principal";
import { useObserver } from "mobx-react";

export default function StudentApproval() {
  const { AuthStore } = useStores();
  const navigate = useNavigate();
  const gotoStaffPage = () => {
    navigate(`/${AuthStore.user?.department}/staffpage`);
  };
  return useObserver(() => (
    <div>
      <button
        className="flex items-center mt-6 pl-4 text-lg"
        onClick={gotoStaffPage}
      >
        <AiOutlineLeft className="mr-1" /> Back
      </button>

      {/* Student-list-section */}
      <div className=" drop-shadow my-6 pb-2 shadow-lg w-[90%] mx-auto ">
        <Approvals />
      </div>
    </div>
  ));
}

