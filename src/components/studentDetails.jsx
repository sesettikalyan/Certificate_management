import React from "react";
import { useNavigate } from "react-router-dom";
import { Branches } from "../helpers/Branches";
import { useParams } from "react-router-dom";
import StaffApproval from "./staffApproval";

export default function StudentApprovalDetails() {
  let { branch, pin } = useParams();
  const selectedStudent = Branches.find(
    (branchname) => branchname.name === branch
  )?.students.find((student) => student.pin === pin);
  const navigate = useNavigate();
  const gotoStudentApproval = () => {
    navigate(`/${branch}/studentapproval`);
  };

  return <StaffApproval navigation={true} />;
}
