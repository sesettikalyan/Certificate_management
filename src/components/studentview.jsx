
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import CertificateList from "./CertificateList";

const profile = 'https://i.pinimg.com/736x/1b/ed/eb/1bedeb9763233ccd4956fbd238073b2c.jpg'
export default function Studentview() {
    return (
        <div>
            <div className='h-72 w-[94%] bg-primary rounded-b-2xl'>
                <div className='flex'>
                    <div className='text-white pt-2'>
                        <MdOutlineArrowBackIosNew />
                    </div>
                    <button className='flex text-xl text-white'>Back</button>
                </div>
                <div className='flex'>
                    <div className='pt-8 pl-8'>
                        <img className='h-48 w-32 rounded-lg' src={profile} alt="" />
                    </div>
                </div>
            </div>
            <div className='flex ml-6 mt-4 space-x-10 '>
                <div className='h-16 w-36 bg-primary rounded-lg'>
                    <p className='text-lg ml-2 text-white'>Sem Percentage</p>
                    <p className='text-white ml-14'>99 %</p>
                </div>
                <div className='h-16 w-36 bg-primary rounded-lg'>
                    <p className='text-lg ml-9 text-white'>Backlogs</p>
                    <p className='text-white ml-16'>0</p>
                </div>
            </div>
            <div className='h-96 w-80 mt-7 ml-8 shadow-2xl bg-white rounded-2xl'>
                <div className=''>
                    <p className='font-bold text-3xl mt-8 ml-4 text-primary'>Certificates</p>
                    <CertificateList />
                </div>
            </div>
        </div>
    );
}
