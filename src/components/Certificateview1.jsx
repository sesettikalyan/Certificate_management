import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useStores } from "../store";
export default function Certificateview1() {
  const {branch,studentid,id}= useParams();
  const navigate = useNavigate();
  const {UserStore} = useStores();
  const selectedCertificate = UserStore?.students?.find((student) => student?._id === studentid)?.documents?.find((certificate) => certificate?._id === id);
    return (
        <div>
            <div className="w-[90%] mx-auto">
              <button className="flex items-center justify-center mt-2 text-lg" onClick={() => navigate(`/${branch}/${studentid}`) }><MdOutlineArrowBackIosNew className="mr-1"/> Back</button>
            </div>
            <div className='h-96 w-[80%] rounded-lg'>
                <iframe src={selectedCertificate?.fileUrl} className="w-full h-full" style={{zoom:"150%"}} frameborder="0"></iframe>
            </div>
               
          <div className="flex flex-col w-[90%] mx-auto">
            <h1 className=' text-2xl text-primary'>Certificate Details</h1> 
            <div className="flex flex-col  mt-2 items-start ">
              <label className="pb-2">Certificate Name</label>
              <div className="text-base px-4 py-2 w-full  border-2 rounded-lg border-[border: 0.3px solid #000000]">
                name
              </div>
            </div>
            <div className="flex flex-col mt-2 items-start ">
              <label className="pb-2">Certificate Type</label>
              <div className="text-base px-4 py-2 w-full  border-2 rounded-lg border-[border: 0.3px solid #000000]">
                Type
              </div>
            </div>
          </div>
        </div>
    )
}
