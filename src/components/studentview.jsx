// import { MdOutlineArrowBackIosNew } from "react-icons/md";
import CertificateList from "./CertificateList";
import { Branches } from "../helpers/Branches";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { useStores } from "../store/index";
import { useObserver } from "mobx-react";

export default function Studentview() {
  const { UserStore, AuthStore } = useStores();
  const { branch, pin } = useParams();

  const selectedBranch = Branches.find(
    (branchname) => branchname.name === branch
  );

  const selectedStudent = UserStore.students.find(
    (student) => student.pinno === pin
  );

  const navigate = useNavigate();

  const showBranch = () => {
    if (AuthStore.principalAuth === true) {
      navigate(`/${branch}`);
    } else {
      navigate(`/${branch}/staffpage`);
    }
  };

  return useObserver(() => (
    <div className="w-[100%] h-full">
      <div className="py-10 flex flex-col items-start w-full bg-primary rounded-b-2xl">
        <button
          className="flex items-center w-[20%] mx-4 text-white text-lg"
          onClick={showBranch}
        >
          <AiOutlineLeft className="mr-1" /> Back
        </button>
        <div className="w-[85%] mx-auto items-center flex mt-6">
          <img
            src={selectedStudent?.photo}
            className="h-44 w-36 object-fit-cover rounded-lg"
            alt=""
          />
          <div className="ml-6 text-white">
            <h1 className="text-xl pb-1 ">{selectedStudent?.name}</h1>
            <p className="text-base ">{selectedStudent?.pinno}</p>
            <p className="text-base">{branch}</p>
            <p className="text-base">{selectedStudent?.studentmobile}</p>
            <p className="text-base pb-1">{selectedStudent?.emailid}</p>
          </div>
        </div>
      </div>
      <div className="flex ml-6 mt-4 space-x-10 ">
        <div className="h-16 w-36 bg-primary rounded-lg">
          <p className="text-lg ml-2 text-white">Sem Percentage</p>
          <p className="text-white ml-14">{selectedStudent?.percentage} %</p>
        </div>
        <div className="h-16 w-36 bg-primary rounded-lg">
          <p className="text-lg ml-9 text-white">Backlogs</p>
          <p className="text-white ml-16">{selectedStudent?.backlogs}</p>
        </div>
      </div>
      <div className="bg-white  drop-shadow my-6 shadow-lg w-[90%] py-3 mx-auto rounded-lg">
        <h1 className="text-text_color1 font-semibold w-[90%] mx-auto text-2xl">
          Certificates
        </h1>
        <CertificateList />
      </div>
    </div>
  ));
}
