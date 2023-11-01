import { AiOutlineLeft } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStores } from "../store/index";
import { useObserver } from "mobx-react";

export default function Approval({ navigation }) {
  let { id, pin } = useParams();
  const navigate = useNavigate();
  const { UserStore, CommonStore, AuthStore } = useStores();

  const selectedLecturer = UserStore?.notVerifiedLecturers.find(
    (lecturer) => lecturer?.idno === id
  );

  const selectedStudent = UserStore?.notVerifiedStudents.find(
    (student) => student?.pinno === pin
  );

  const approveStaff = async (id) => {
    if (await UserStore.approveLecturer(id, true)) {
      navigate(`/principal`);
    }
  };

  const goToPrincipalHome = () => {
    if (CommonStore.role === "principal") {
      navigate(`/principal`);
    } else {
      navigate(`/${AuthStore.user?.department}/studentapproval`);
    }
  };

  return useObserver(() => (
    <>
      {!navigation ? (
        <div className="w-[100%] bg-secondary py-10 flex flex-col items-start">
          <button
            className="flex items-center w-[20%] mx-4 text-lg"
            onClick={goToPrincipalHome}
          >
            <AiOutlineLeft className="mr-1" /> Back
          </button>

          <div className="w-[85%] mx-auto  flex mt-6">
            <img
              src={selectedLecturer?.photo}
              className="h-44 w-36 rounded-lg"
              alt=""
            />
            <div className="ml-6">
              <h1 className="text-xl pb-1 ">{selectedLecturer?.name}</h1>
              <p className="text-base ">{selectedLecturer?.idno}</p>
              <p className="text-base">{selectedLecturer?.department}</p>
              <p className="text-base">{selectedLecturer?.phoneNumber}</p>
              <p className="text-base pb-1">{selectedLecturer?.email}</p>
              <button
                className="py-2 px-4 bg-primary text-white rounded-lg"
                onClick={() => approveStaff(selectedLecturer?._id)}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[100%] bg-secondary py-10 flex flex-col items-start">
          <button
            className="flex items-center w-[20%] mx-4 text-lg"
            onClick={goToPrincipalHome}
          >
            <AiOutlineLeft className="mr-1" /> Back
          </button>

          <div className="w-[85%] mx-auto  flex mt-6">
            <img
              src={selectedStudent?.photo}
              className="h-44 w-36 rounded-lg"
              alt=""
            />
            <div className="ml-6">
              <h1 className="text-xl pb-1 ">{selectedStudent?.name}</h1>
              <p className="text-base ">{selectedStudent?.pinno}</p>
              <p className="text-base">{selectedStudent?.department}</p>
              <p className="text-base">{selectedStudent?.studentmobile}</p>
              <p className="text-base pb-1">{selectedStudent?.emailid}</p>
              <button
                className="py-2 px-4 bg-primary text-white rounded-lg"
                onClick={() => approveStaff(selectedStudent?._id)}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  ));
}
