import { useParams, useNavigate } from "react-router-dom";
import { Branches } from "../helpers/Branches";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

export default function LecturerView() {
    const [editForm, setEditForm] = useState(false);
    const [deleteForm,setDeleteForm] = useState(false);
    const navigate = useNavigate();
    const { branch, id } = useParams();
    const selectedBranch = Branches.find((branchname) => branchname.name === branch);
    const selectedLecturer = selectedBranch.lecturers.find((lecturer) => lecturer.id === id);

    const nameref = useRef();
    const idref = useRef();
    const emailref = useRef();
    const branchref = useRef();

    const autofillref = () => {
        try {
            nameref.current.value = selectedLecturer?.teacher;
            idref.current.value = selectedLecturer?.id;
            emailref.current.value = selectedLecturer?.email;
            branchref.current.value = selectedBranch?.name;
        } catch (error) {

        }
    }

    const goBack = () => {
        navigate(`/${branch}`);
    }

    useEffect(() => {
        autofillref();
    }, [editForm])

    return (
        <div className='w-[100%] flex flex-col items-center py-4 h-full rounded-b-2xl bg-secondary'>
            <div className='w-[90%] my-2 mx-auto flex items-center justify-between'>
                <button className="flex items-center  text-lg" onClick={goBack} ><AiOutlineLeft className="mr-1" /> Back</button>
                <div className='w-[25%] flex justify-between items-center'>
                    <button onClick={() => setEditForm(true)} className='w-10 h-10 bg-primary rounded-full text-2xl text-white flex items-center justify-center'> <MdOutlineEdit /></button>
                    <button onClick={() => setDeleteForm(true)} className='w-10 h-10 bg-primary rounded-full text-2xl text-white flex items-center justify-center'> <MdDeleteOutline /></button>
                </div>
            </div>
            <img src={selectedLecturer?.image} className=" my-6 w-48 h-52 rounded-lg object-cover" alt="" />

            <div className="flex flex-col w-[90%]">
                <div className="flex flex-col mt-2 items-start ">
                    <label className="pb-2" >Name</label>
                    <div className="text-base px-4 py-2 w-full  border-2 rounded-lg border-black">{selectedLecturer?.teacher}</div>
                </div>
                <div className="flex flex-col mt-2 items-start ">
                    <label className="pb-2" >I'd number</label>
                    <div className="text-base px-4 py-2 w-full  border-2 rounded-lg border-black">{selectedLecturer?.id}</div>
                </div>
                <div className="flex flex-col mt-2 items-start ">
                    <label className="pb-2" >Branch name</label>
                    <div className="text-base px-4 py-2 w-full  border-2 rounded-lg border-black">{branch}</div>
                </div>
                <div className="flex flex-col mt-2 items-start ">
                    <label className="pb-2" >Phone number</label>
                    <div className="text-base px-4 py-2 w-full  border-2 rounded-lg border-black">{selectedLecturer?.mobile}</div>
                </div>
                <div className="flex flex-col mt-2 items-start ">
                    <label className="pb-2" >Email address</label>
                    <div className="text-base px-4 py-2 w-full  border-2 rounded-lg border-black">{selectedLecturer?.email}</div>
                </div>

            </div>

            {
                editForm ?
                    (
                        <div className="fixed inset-0 w-[90%] m-auto h-[80%] flex flex-col z-50 py-4 px-2 rounded-2xl justify-center  bg-primary">

                            <h1 className="text-center text-lg text-white">Edit Details </h1>


                            <AiOutlineClose onClick={() => setEditForm(false)} className="absolute text-white text-2xl cursor-pointer right-2 top-4" />
                            <form className="flex flex-col w-[95%] mx-auto h-full">


                                <div className="flex flex-col mt-2">
                                    <label className="pb-2 text-white" >Name</label>
                                    <input ref={nameref} type="text" className="bg-primary mb-1 px-1 text-white text-opacity-80 text-lg focus:outline-none border-b-2 border-[rgba(255, 255, 255, 1)]" />

                                </div>
                                <div className="flex flex-col mt-1">
                                    <label className="pb-2 text-white" >I'd Number</label>
                                    <input ref={idref} type="text" className="bg-primary mb-1 px-1 text-white text-lg text-opacity-80 focus:outline-none border-b-2 border-[rgba(255, 255, 255, 1)]" />

                                </div>
                                <div className="flex flex-col mt-1">
                                    <label className="pb-2 text-white" >E-mail</label>
                                    <input ref={emailref} type="text" className="bg-primary mb-1 px-1 text-white text-lg text-opacity-80 focus:outline-none border-b-2 border-[rgba(255, 255, 255, 1)]" />

                                </div>
                                <div className="flex flex-col mt-1">
                                    <label className="pb-2 text-white" >Branch</label>
                                    <select ref={branchref} type="text" className="w-[70%] mb-1 rounded-lg px-1 bg-white text-opacity-80  text-lg focus:outline-none  " >
                                        <option className="text-xs" value="">Mechanical Engineering</option>
                                        <option className="text-xs" value="">Electrical Engineering</option>
                                        <option className="text-xs" value="">Electronics Engineering</option>
                                        <option className="text-xs" value="">Civil Engineering</option>

                                    </select>

                                </div>

                                <button type="submit" className="absolute right-6 bottom-4 px-8 py-1 bg-black text-white rounded-lg text-base">Save</button>


                            </form>


                        </div>
                    ) : null
            }

            {
                deleteForm ?
                (
                    <div className="fixed inset-0  w-[80%] m-auto h-[20%] flex flex-col z-50 py-4 px-2 rounded-2xl items-center  bg-primary">
                        <h1 className="text-center text-2xl text-white">Confirm to delete</h1>
                        <p className="text-white pt-1 text-2xl">{selectedLecturer?.teacher}</p>
                        {/* <AiOutlineClose onClick={() => setDeleteForm(false)} className="absolute text-white text-2xl cursor-pointer right-2 top-4" /> */}
                        <div className="w-[90%] mx-auto flex my-3  justify-between items-center" >
                            <button onClick={() => setDeleteForm(false)} className="flex w-[40%] mx-auto text-xl justify-between bg-black rounded-lg  text-white items-center p-2">Cancel<AiOutlineClose className="mx-1"/></button>
                            <button className="flex w-[40%] mx-auto text-xl justify-between bg-black rounded-lg text-white items-center p-2">Delete<MdDeleteOutline className="mx-1"/></button>

                        </div>

                    </div>
                )
                :
                null
            }

        </div >
    );
}