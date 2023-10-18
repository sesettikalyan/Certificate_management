import React, { useRef, useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Branches } from '../helpers/Branches';
import { AiOutlineRight } from 'react-icons/ai';

const Search = () => {
    // const searchref = useRef(null);
    const navigate = useNavigate();
    const [searchPin, setSearchPin] = useState('');
    const [searchResult, setSearchResult] = useState([]);


    const showStudentDetails = (branch, pin) => {
        navigate(`/${branch}/${pin}`);
    }

   
    const handleSearch = (e) => {
        const input = e.target.value;
        setSearchPin(input);

        if (input === '') {
            // Clear the search result when the input is empty
            setSearchResult([]);
            return;
          }
    
        // Search for the student in the branches
        const foundStudents = Branches.reduce((acc, branch) => {
          const matchingStudents = branch?.students.filter(
            (student) =>
            student?.name.toLowerCase().includes(input.toLowerCase()) || 
            student?.pin.includes(input)
          );
          return acc.concat(matchingStudents);
        }, []);
    
        setSearchResult(foundStudents);
      };


    const goBack = () => {
        navigate("/principal")
    }

    return (
        <div>
            <div onClick={goBack} className="flex my-4">
                <MdArrowBackIosNew className="my-1 mx-2 ml-4" />
                <p> Back</p>
            </div>
            <div className='mt-6 relative w-[90%] mx-auto '>
                <input type="text" 
                value={searchPin}
                onChange={handleSearch} placeholder='Search' className='pl-14 pr-4 py-4 w-full border-2 rounded-full shadow-lg shadow-grey' />
                <span className='absolute left-2 top-5  mx-4'>
                    <FaSearch className='text-lg' />
                </span>
            </div>
            {
                searchResult.length > 0 ? ( 
                    <div className="bg-white  drop-shadow my-6 shadow-lg w-[90%] py-3 mx-auto rounded-lg">
                    {searchResult.map((student) => (
                        <div className="w-[90%] p-2 border-b-2 border-[rgba(0, 0, 0, 1)] mx-auto my-2 flex flex-row items-end justify-between">
                            <div className="flex flex-row items-center">
                                <img src={student?.image} className="w-12 h-12 rounded-full" alt="" />
                                <div className="flex flex-col items-start ml-3">
                                    <h1 className="text-lg">{student?.name}</h1>
                                    <p className="text-base">{student?.pin}</p>
                                </div>
                            </div>
                        <div className="flex">
                            <button className="flex items-center justify-center" onClick={() => showStudentDetails(Branches.find((b) => b.students.includes(student))?.name, student?.pin)} >view details  <AiOutlineRight className="text-sm ml-1 mt-1" /> </button>
                        </div>
                    </div>
                    ))}
                    </div>  
                )

                : 
                    searchPin === "" ? (
                        null
                ) : (
                         <p className='text-lg flex items-center justify-center h-[330px]'>No matching students found.</p>
                )
          
            }
            
        </div>
    );
}

export default Search;