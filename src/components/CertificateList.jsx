import { useNavigate, useParams } from "react-router-dom";
import { Branches } from "../helpers/Branches";
import { AiOutlineRight } from "react-icons/ai";
import { useStores } from "../store/index";

export default function CertificateList() {
  const { branch, id } = useParams();
  const { UserStore,CommonStore } = useStores();
  const navigate = useNavigate();
  const selectedStudent = UserStore?.students.find(
    (student) => student?._id === id
  );

  return (
    <>
    {
      CommonStore.role !== "student" ?
      (selectedStudent?.documents.length === 0 ?
        <h1 className=" font-semibold w-[90%] text-lg py-10 mx-auto text-center">
            No Certificates Uploaded
          </h1>
          : selectedStudent?.documents.map((item) => (
            <div className="w-[90%] p-2 border-b-2 border-gray-400 mx-auto my-2 flex flex-row items-end justify-between">
              <div className="flex flex-row items-center">
                <img src={item?.url} className="w-16 h-12 " alt="" />
                <div className="flex flex-col items-start ml-3">
                  <h1 className="text-lg">{item?.name}</h1>
                  {/* <p className="text-base">{student.pin}</p> */}
                </div>
              </div>
              <div className="flex">
                <button onClick={() => navigate(`/${branch}/${id}/certificate/${item?._id}`)} className="flex items-center justify-center text-sm">
                  view details <AiOutlineRight className="text-sm ml-1 mt-1" />{" "}
                </button>
              </div>
            </div>
          ))
        ) : (
        UserStore.user?.documents.length === 0 ?
        <h1 className=" font-semibold w-[90%] text-lg py-10 mx-auto text-center">
            No Certificates Uploaded
          </h1>
          : UserStore?.user?.documents.map((item) => (
            <div className="w-[90%] p-2 border-b-2 border-gray-400 mx-auto my-2 flex flex-row items-end justify-between">
              <div className="flex flex-row items-center">
                <img src={item?.url} className="w-16 h-12 " alt="" />
                <div className="flex flex-col items-start ml-3">
                  <h1 className="text-lg">{item?.name}</h1>
                  {/* <p className="text-base">{student.pin}</p> */}
                </div>
              </div>
              <div className="flex">
                <button onClick={() => navigate(`/${branch}/${UserStore?.user?._id}/certificate/${item?._id}`) } className="flex items-center justify-center text-sm">
                  view details <AiOutlineRight className="text-sm ml-1 mt-1" />
                </button>
              </div>
            </div>
          )))

    }
    </>
  );
}
