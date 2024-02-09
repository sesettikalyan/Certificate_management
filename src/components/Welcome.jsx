import React from "react"
import image from "../assets/Animation.gif";
import abtpg from "../assets/aboutpage.png"
import ReactSwipe from 'react-swipe';
import { IoChevronBack } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
const Welcome = () => {

    let reactSwipeEl;
    return (
        <div className="h-[100%]">
            <div >
                <div>
                    <ReactSwipe
                        className="carousel"
                        swipeOptions={{ continuous: false }}
                        ref={el => (reactSwipeEl = el)}
                    >
                        <div>
                            <h1 className="font-bold text-xl md:w-[50%] my-[10%] justify-center items-center flex">Welcome</h1>
                            <div className="justify-center flex">
                                <img className="h-[50%]" src={image} alt="Learn" />
                            </div>
                            <div className="p-[10%] mt-20"><p><b>SDMS</b> is one platform where users can attend different mock-exams with ease of our mobile and web app This not just provides the mock-exams, it gives user the better uderstanding of the topics. </p>
                            </div>
                            <div className="flex justify-center list-none mt-36">
                                <li className="text-primary"><GoDotFill /></li>
                                <li className="text-slate-300"><GoDotFill /></li>
                                <li className="text-slate-300"><GoDotFill /></li>
                            </div>
                            <div className="w-[100%] flex justify-center mt-4">
                                {/* <button className="text-xl mr-6 text-primary rounded-md bg-slate-200 border-2px border-blue-950 p-2" onClick={() => reactSwipeEl.prev()}><IoChevronBack /></button> */}
                                <button className="text-white  bg-blue-900 rounded-md p-4 px-20" onClick={() => reactSwipeEl.next()}>Continue</button>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1 className="font-bold text-xl md:w-[50%] mt-[10%] justify-center items-center flex">About</h1>
                                <div className="my-14 mx-24">
                                    <img className="h-[20%]" src={abtpg} alt="Learn" />
                                </div>
                                <div className="p-[10%]">
                                    <p>All mock exam contains details explanation of each question, you will have opportunity to view details. You can open test in learning mode of Exam mode.</p>
                                </div>
                                <div className="flex justify-center mt-20 list-none">
                                    <li className="text-slate-300"><GoDotFill /></li>
                                    <li className="text-primary"><GoDotFill /></li>
                                    <li className="text-slate-300"><GoDotFill /></li>
                                </div>
                            </div>
                            <div className="w-[100%] flex justify-center mt-4 ">
                                <button className="text-xl mr-6 text-primary rounded-md bg-slate-200 border-2px border-blue-950 p-2" onClick={() => reactSwipeEl.prev()}><IoChevronBack /></button>
                                <button className="text-white  bg-blue-900 rounded-md p-4 px-20" onClick={() => reactSwipeEl.next()}>Continue</button>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <h1 className="font-bold text-xl md:w-[50%] mt-[10%] justify-center items-center flex">Content consent <br />and user agreement</h1>
                                    <div className="my-14 mx-24">
                                        <img className="h-[20%]" src={image} alt="Learn" />
                                    </div>
                                    <div className="p-[10%]">
                                        <p>All mock exam contains details explanation of each question, you will have opportunity to view details. You can open test in learning mode of Exam mode.</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At harum dolore aperiaarum repellendus amet iusto perferendis corporis delectus cupiditate, error quam.</p>
                                    </div>
                                    <div className="flex justify-center list-none">
                                        <li className="text-slate-300"><GoDotFill /></li>
                                        <li className="text-slate-300"><GoDotFill /></li>
                                        <li className="text-primary"><GoDotFill /></li>
                                    </div>
                                </div>
                                <div className="w-[100%] flex justify-center mt-2">
                                    <button className="text-xl mr-6 text-primary rounded-md bg-slate-200 border-2px border-blue-950 p-2" onClick={() => reactSwipeEl.prev()}><IoChevronBack /></button>
                                    <button className="text-white  bg-blue-900 rounded-md p-4 px-20" onClick={() => reactSwipeEl.next()}>I Agree</button>
                                </div>
                            </div>
                        </div>
                    </ReactSwipe>

                </div>

                {/* <div className="w-[100%] flex justify-center mt-2">
                    <button className="text-xl mr-6 text-primary rounded-md bg-slate-200 border-2px border-blue-950 p-2" onClick={() => reactSwipeEl.prev()}><IoChevronBack /></button>
                    <button className="text-white  bg-blue-900 rounded-md p-4 px-20" onClick={() => reactSwipeEl.next()}>Continue</button>
                </div> */}

            </div>

        </div>
    )
}
export default Welcome;

