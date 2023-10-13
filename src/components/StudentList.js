import { FaSearch } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
export default function StudentList() {
    const students = [
        { id: 1, pin: "21637-EC-001", name: 'John Doe', img: "https://w7.pngwing.com/pngs/334/403/png-transparent-student-cartoon-avatar-college-student-avatar-comics-face-heroes.png" },
        { id: 2, pin: "21637-EC-002", name: 'Jane Doe', img: "https://w7.pngwing.com/pngs/334/403/png-transparent-student-cartoon-avatar-college-student-avatar-comics-face-heroes.png" },
        { id: 3, pin: "21637-EC-003", name: 'John Smith', img: "https://w7.pngwing.com/pngs/334/403/png-transparent-student-cartoon-avatar-college-student-avatar-comics-face-heroes.png" },
        { id: 4, pin: "21637-EC-004", name: 'Jane Smith', img: "https://img.freepik.com/free-photo/young-smiling-confident-woman-using-laptop-computer-looking-camera-isolated-white-background_231208-9497.jpg?w=740&t=st=1697190069~exp=1697190669~hmac=eb14d8845ee36ea38a50c618df9354236d2bf37815227d59b634e8f6fce59e42" },
        { id: 5, pin: "21637-EC-005", name: 'John Wayne', img: "https://w7.pngwing.com/pngs/334/403/png-transparent-student-cartoon-avatar-college-student-avatar-comics-face-heroes.png" },
        { id: 6, pin: "21637-EC-006", name: 'Jane Wayne', img: "https://img.freepik.com/free-photo/young-smiling-confident-woman-using-laptop-computer-looking-camera-isolated-white-background_231208-9497.jpg?w=740&t=st=1697190069~exp=1697190669~hmac=eb14d8845ee36ea38a50c618df9354236d2bf37815227d59b634e8f6fce59e42" },
    ];
    return (
        <div className="bg-white border-[1px] border-gray-200 shadow-2xl rounded-lg">
            <div className="flex justify-between my-5">
            <h1 className="text-3xl text-blue-900 font-semibold ml-6">Students</h1>
            </div>
            {students.map((student) => (
                <div key={student.id} className="flex items-center border-b-2 border-gray-300 justify-between py-2 px-8 ">
                    <div className="flex">
                        <img src={student.img} alt={`${student.name} Image`} className="w-16 h-16 rounded-full object-cover" />
                    < div className="ml-4 py-2">
                        <p>{student.name}</p>
                        <p>{student.pin}</p>
                    </div>
                    </div>
                    <div className="text-black text-xs mt-6 flex"><a href="#">view details</a> <MdArrowForwardIos className="mt-1"/></div>
                </div>
            ))
            }
        </div>
    );
}
