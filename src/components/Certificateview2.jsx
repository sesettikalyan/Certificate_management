import { MdOutlineArrowBackIosNew } from "react-icons/md";

const file = 'https://www.ittcouncil.com/assets/img/certificate/new1.jpg'
export default function Certificateview2() {
    return (
        <div>
            <div className='flex mt-4 ml-4'>
                <div className=' pt-2'>
                    <MdOutlineArrowBackIosNew />
                </div>
                <button className='flex text-xl'>Back</button>
            </div>
            <div className='h-96 w-80 border-2 border-slate-400 justify-center bg-slate-400 rounded-lg m-9'>
                <img className='h-96 w-80 rounded-lg' src={file} alt="" />
            </div>
            <div classname=''>
                <h1 className='font-normal text-3xl text-primary'>Certificate Details</h1>
            </div>
            <div>
            <div>
                <p className='mt-6'>Certificate Type</p>
            </div>
            <div className='h-16 w-96  justify-center m-1 '>
                <input className='w-full h-16 border-2 px-2  border-slate-400 rounded-lg ' type="text" />
                <p></p>
            </div>
            </div>

            <div>
            <div>
                <p className='mt-6'>Semester Type</p>
            </div>
            <div className='h-16 w-96  justify-center m-1 '>
                <input className='w-full h-16 border-2 px-2  border-slate-400 rounded-lg ' type="text" />
                <p></p>
            </div>
            </div>

            <div>
            <div>
                <p className='mt-6'>Sem percentage</p>
            </div>
            <div className='h-16 w-96  justify-center m-1 '>
                <input className='w-full h-16 border-2 px-2  border-slate-400 rounded-lg ' type="text" />
                <p></p>
            </div>
            </div>

            <div>
            <div>
                <p className='mt-6'>Backlogs</p>
            </div>
            <div className='h-16 w-96  justify-center m-1 '>
                <input className='w-full h-16 border-2 px-2  border-slate-400 rounded-lg ' type="text" />
                <p></p>
            </div>
            </div>

            <div>
            <div>
                <p className='mt-6'>Certificate description</p>
            </div>
            <div className='h-16 w-96  justify-center m-1 mb-4'>
                <input className='w-full h-24 border-2 px-2  border-slate-400 rounded-lg ' type="text" />
                <p></p>
            </div>
            </div>

            
            
        </div>
    )
}
