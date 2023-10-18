import React from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    return (
        <div>
            <div className="flex my-4">
                <MdArrowBackIosNew className="my-1 mx-2 ml-4" />
                <p> Back</p>
            </div>
            <div className='mt-6 relative w-[90%] mx-auto '>
                <input type="text" placeholder='Search' className='pl-14 pr-4 py-4 w-full border-2 rounded-full shadow-lg shadow-grey' />
                <span className='absolute left-2 top-5  mx-4'>
                    <FaSearch className='text-lg' />
                </span>
            </div>
        </div>
    );
}

export default Search;