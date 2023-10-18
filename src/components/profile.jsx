import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

export const Profile = () => {
    return (
        <div className="bg-secondary h-screen">
            <div className="flex pt-4 pb-4 justify-between">
                <div className="flex">
                <MdArrowBackIosNew className="mt-1 mx-2" />
                <p> Back</p>
                </div>
                <div className="bg-blue-900 rounded-full text-white text-2xl h-8 w-8 mr-4">
                <BiLogOut className="mt-1 mx-1" />
                </div>
            </div>
            <div className="relative">
                <img className="rounded-lg h-60" src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Corpus_Christi_College_New_Court%2C_Cambridge%2C_UK_-_Diliff.jpg" alt="" />

                <img className="rounded-full w-24 h-24 border-4 border-white absolute bottom-0 left-4 mt-6" src="https://tse4.mm.bing.net/th?id=OIP.AZORnc-2Ni4OxteNH3jTHwHaE8&pid=Api&P=0&h=180" alt="" />
                <div className="bg-blue-900 w-5 h-5 rounded-full text-center left-9 ml-24 ">
                    <span className="text-white"><MdOutlineEdit className="ml-1" /></span>
                </div>
            </div>
            

        </div>
    )
}
