import { useParams } from "react-router-dom";
import { Branches } from "../helpers/Branches";
import { AiOutlineRight } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

export default function CertificateList() {
    const { branch, pin } = useParams();

    const selectedBranch = Branches.find((branchname) => branchname.name === branch);

    const selectedStudent = selectedBranch.students.find((student) => student.pin === pin);

    // const navigate = useNavigate();

    // const showDetails = (branch, pin) => {
    //     navigate()
    // }
    return (
        < >

            {/* {certificate.map((certificate) => (
                <div key={certificate.id}>
                    <p>Name: {certificate.name}</p>
                    <p>ID: {certificate.id}</p>
                </div>

            ))} */}

            {selectedStudent?.certificate.map((item) => (
                <div className="w-[90%] p-2 border-b-2 border-gray-400 mx-auto my-2 flex flex-row items-end justify-between">
                    <div className="flex flex-row items-center">
                        <img src={item?.url} className="w-16 h-12 " alt="" />
                        <div className="flex flex-col items-start ml-3">
                            <h1 className="text-lg">{item?.name}</h1>
                            {/* <p className="text-base">{student.pin}</p> */}
                        </div>
                    </div>
                    <div className="flex">
                        <button className="flex items-center justify-center text-sm" > view details  <AiOutlineRight className="text-sm ml-1 mt-1" /> </button>
                    </div>
                </div>
            ))}
        </>
    )
}