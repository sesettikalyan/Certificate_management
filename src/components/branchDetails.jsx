import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
// import { Lectures } from '../helpers/lectures';
// import { MechStudents } from '../helpers/MechStudents';
import { Branches } from "../helpers/Branches";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PiBuildingsBold } from "react-icons/pi";
import { BsPersonCheck } from "react-icons/bs";
import { useStores } from "../store/index";
import { useObserver } from "mobx-react";

export default function BranchDetails() {
  const { UserStore } = useStores();

  return useObserver(() => (
    <>
      <div className="w-[100%] h-screen flex flex-col bg-gray-100">
        <TitleAndSearch />
        {/* Lecturers section */}
        <div className="flex flex-col md:flex-row-reverse md:justify-between mx-auto w-[90%] md:w-[90%]">
        <div className="bg-[#E4E4FF] mt-6  rounded-lg md:w-[35%] ">
          <LecturerSection />
        </div>
        {/* Student-list-section */}
        <div className="bg-white  drop-shadow-2xl my-6 shadow-lg md:w-[55%]  rounded-lg  ">
          <StudentSection />
        </div>
        </div>
      </div>
    </>
  ));
}

export function TitleAndSearch({ onStaff }) {
  let { branch } = useParams();
  const { UserStore } = useStores();
  const defaultprofile = "https://ih1.redbubble.net/image.1046392278.3346/pp,504x498-pad,600x600,f8f8f8.jpg";

  const selectedBranch = Branches.find(
    (branchname) => branchname.name === branch
  );

  const navigate = useNavigate();
  const gotoStudentApproval = () => {
    navigate(`/${branch}/studentapproval`);
  };

  const gotoProfile = () => {
    navigate(`/profile`);
  };

  const gotoHomePage = () => {
    navigate(`/principal`);
  };

  const showlecturerprofile = (id) => {
    navigate(`/${branch}/lecturer/${id}`);
  };

  return useObserver(() => (
    <div className="flex flex-col w-[90%] mx-auto md:w-[90%] md:flex-row md:justify-between">
      <div className="md:w-[55%]  pt-6 flex items-center">
        {!onStaff ? (
          <>
            {" "}
            <AiOutlineLeft className="text-lg  cursor-pointer" onClick={gotoHomePage} />
            <h2 className="mx-1 text-lg text-primary ">
              {selectedBranch?.name}
            </h2>
          </>
        ) : (
          <>
            <div className="mt-2 ml-auto flex">
              <div
                className="bg-secondary h-12 w-12 rounded-full mx-2"
                onClick={gotoStudentApproval}
              >
                <BsPersonCheck className="text-4xl ml-1 mt-1" />
              </div>
              <div
                className="bg-secondary h-12 w-12 rounded-full mx-2"
                onClick={gotoProfile}
              >
                <PiBuildingsBold className="text-3xl ml-2 mt-2" />
              </div>
              <div
                onClick={() => showlecturerprofile(UserStore.user?.idno)}
                className=" mx-2 pr-2"
              >
                <div className="h-12 w-12 rounded-full overflow-hidden"
                  style={{ backgroundImage: `url(${defaultprofile})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                >
                  <img
                    className="object-cover rounded-full"
                    src={UserStore.user?.photo}
                    alt=" "
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-6  relative w-[90%]  md:w-[35%] ">
        <input
          type="text"
          placeholder="Search"
          className="pl-14 pr-4 py-4 w-full border-blue-400 border-2 rounded-full focus:outline-none"
        />
        <span className="absolute left-2 top-5  mx-4  ">
          <FaSearch className="text-lg" />
        </span>
      </div>
    </div>
  ));
}

export function LecturerSection() {
  const navigate = useNavigate();
  const { UserStore } = useStores();
  const [selectedBranchLecturers, setSelectedBranchLecturers] = useState([]);
  const defaultprofile = "https://ih1.redbubble.net/image.1046392278.3346/pp,504x498-pad,600x600,f8f8f8.jpg"
  let { branch } = useParams();



  //check verification
  useEffect(() => {
    try {
      const verifiedLecturers = UserStore?.lecturers.filter(
        (lecturer) => lecturer?.department.toUpperCase() === branch.toUpperCase() && lecturer?.isVerified === true
      );
      setSelectedBranchLecturers(verifiedLecturers);
    } catch (error) {
      console.log(error);
    }
  }, [UserStore?.lecturers]);



  const showLecturerDetails = (id) => {
    navigate(`/${branch}/lecturer/${id}`);
  };

  const addNewStaff = (branch) => {
    navigate(`/${branch}/newstaff`);
  };

  return useObserver(() => (
    <>
      <div className="flex w-[90%] justify-between items-center mt-2 mx-auto md:w-[75%]">
        <h2 className="text-2xl text-text_color1 font-semibold">Lecturers</h2>
        <button
          className="flex text-xs text-text_color1 items-center"
          onClick={() => addNewStaff(branch)}
        >
          <IoMdAddCircle className="text-base" />
          Add new Staff
        </button>
      </div>
      <div className="mt-4 w-[90%] mx-auto">
        <div className="flex overflow-x-auto items-center pb-4 md:grid md:grid-cols-3 md:gap-4">
          {
            selectedBranchLecturers.length === 0 ? (
              <h1 className="font-semibold w-[90%] text-lg py-10 mx-auto text-center">
                No Approved Lecturers
              </h1>
            ) : (
              selectedBranchLecturers.map((lecturer, index) => (
                <div
                  key={index}
                  onClick={() => showLecturerDetails(lecturer?._id)}
                  className="cursor-pointer mx-3 flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden"
                    style={{ backgroundImage: `url(${defaultprofile})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                  >
                    <img
                      src={lecturer?.photo}
                      alt=" "
                      className=" rounded-full object-cover "
                    />
                  </div>

                  <p className="text-black pt-1 md:w-28 text-center truncate">{lecturer?.name}</p>
                </div>
              ))
            )
          }
        </div>
      </div>
    </>
  ));
}

export function StudentSection({ onstaff }) {
  let { branch } = useParams();
  const [selectedBranchStudents, setSelectedBranchStudents] = useState([]);
  const { UserStore } = useStores();
  const defaultprofile = "https://ih1.redbubble.net/image.1046392278.3346/pp,504x498-pad,600x600,f8f8f8.jpg"


  //check verification 
  useEffect(() => {
    try {
      const verifiedStudents = UserStore?.students.filter(
        (student) => student?.department.toUpperCase() === branch.toUpperCase() && student?.isVerified === true
      );
      setSelectedBranchStudents(verifiedStudents);
    } catch (error) {
      console.log(error);
    }
  }
    , [UserStore?.students]);

  const navigate = useNavigate();

  const showStudentDetails = (id) => {
    navigate(`/${branch}/${id}`);
  };

  return useObserver(() => (
    <>
      {onstaff ? (
        <>
          <div className="flex w-[90%] justify-between items-center mt-2 mx-auto">
            <h2 className="text-2xl text-text_color1 font-semibold">
              Students
            </h2>
            <button
              className="flex text-xs text-text_color1 items-center"
            // onClick={() => addNewStaff(branch)}
            >
              <IoMdAddCircle className="text-base" />
              Add new Student
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-text_color1 font-semibold w-[90%] mx-auto text-2xl my-4">
          Students
        </h1>
      )}
      {
        selectedBranchStudents.length === 0 ? (
          <h1 className=" font-semibold w-[90%] text-lg py-10 mx-auto text-center">
            No Approved Students
          </h1>
        ) : (
          selectedBranchStudents.map((student) => (
            <>
              <div className="w-[90%] p-2 border-b-2 border-[rgba(0, 0, 0, 1)] mx-auto my-2 flex flex-row items-end justify-between">
                <div className="flex flex-row items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden"
                    style={{ backgroundImage: `url(${defaultprofile})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                  >
                    <img
                      src={student?.photo}
                      className="object-cover rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-start ml-3">
                    <h1 className="text-lg">{student?.name}</h1>
                    <p className="text-base">{student?.pinno}</p>
                  </div>
                </div>
                <div className="flex">
                  <button
                    className="flex items-center justify-center"
                    onClick={() => showStudentDetails(student?._id)}
                  >
                    view details <AiOutlineRight className="text-sm ml-1 mt-1" />{" "}
                  </button>
                </div>
              </div>
            </>
          ))
        )
      }
    </>
  ));
}
