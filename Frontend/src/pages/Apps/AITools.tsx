import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setPageTitle } from '../../store/themeConfigSlice';

const AITools = () => {
    return (
        <div className="container mx-auto px-4">
            {/* Grid layout for 6 cards, responsive to 3, 2, or 1 per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
                <div
                    className="group bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none transition-all duration-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600"
                    style={{
                        transitionDelay: '500ms',
                    }}
                >
                    <div className="py-7 px-6">
                        <div className="-mt-7 mb-7 -mx-6 rounded-tl-xl rounded-tr-xl h-[300px] overflow-hidden">
                            {/* Image with hover transition */}
                            <img src="/assets/images/ai1.jpg" alt="cover" className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110" />
                        </div>
                        <h5 className="text-[#3b3f5c] text-xl font-bold mb-4 dark:text-white-light group-hover:text-white transition-colors duration-700">Personal Growth Coaching</h5>
                        <p className="text-white-dark group-hover:text-gray-200 transition-colors duration-700">
                            Get tailored coaching sessions that focus on your personal development goals, helping you achieve success and fulfillment.
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary mt-6 group-hover:bg-white group-hover:text-black transition-colors duration-700 ml-auto"
                            onClick={() => window.open('https://www.google.com', '_blank')}
                        >
                            Explore More
                        </button>
                    </div>
                </div>
                <div
                    className="group bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none transition-all duration-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600"
                    style={{
                        transitionDelay: '500ms',
                    }}
                >
                    <div className="py-7 px-6 ">
                        <div className="-mt-7 mb-7 -mx-6 rounded-tl-xl rounded-tr-xl h-[300px] overflow-hidden">
                            {/* Image with hover transition */}
                            <img src="/assets/images/ai2.jpg" alt="cover" className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110" />
                        </div>

                        <h5 className="text-[#3b3f5c] text-xl font-bold mb-4 dark:text-white-light group-hover:text-white transition-colors duration-700">AI-Driven Insights</h5>
                        <p className="text-white-dark group-hover:text-gray-200 transition-colors duration-700">
                            Utilize our AI tools to gain actionable insights that can drive your personal and professional growth.
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary mt-6 group-hover:bg-white group-hover:text-black transition-colors duration-700 ml-auto"
                            onClick={() => window.open('https://www.google.com', '_blank')}
                        >
                            Explore More
                        </button>
                    </div>
                </div>
                <div
                    className="group bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none transition-all duration-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600"
                    style={{
                        transitionDelay: '500ms',
                    }}
                >
                    <div className="py-7 px-6">
                        <div className="-mt-7 mb-7 -mx-6 rounded-tl-xl rounded-tr-xl h-[300px] overflow-hidden">
                            {/* Image with hover transition */}
                            <img src="/assets/images/ai3.jpg" alt="cover" className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110" />
                        </div>
                        <h5 className="text-[#3b3f5c] text-xl font-bold mb-4 dark:text-white-light group-hover:text-white transition-colors duration-700"> Expert Consultation </h5>
                        <p className="text-white-dark group-hover:text-gray-200 transition-colors duration-700">
                            Connect with industry experts who can provide you with the guidance you need in various fields
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary mt-6 group-hover:bg-white group-hover:text-black transition-colors duration-700 ml-auto"
                            onClick={() => window.open('https://www.google.com', '_blank')}
                        >
                            Explore More
                        </button>
                    </div>
                </div>
                <div
                    className="group bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none transition-all duration-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600"
                    style={{
                        transitionDelay: '500ms',
                    }}
                >
                    <div className="py-7 px-6">
                        <div className="-mt-7 mb-7 -mx-6 rounded-tl-xl rounded-tr-xl h-[300px] overflow-hidden">
                            {/* Image with hover transition */}
                            <img src="/assets/images/ai4.jpg" alt="cover" className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110" />
                        </div>
                        <h5 className="text-[#3b3f5c] text-xl font-bold mb-4 dark:text-white-light group-hover:text-white transition-colors duration-700">Career Development</h5>
                        <p className="text-white-dark group-hover:text-gray-200 transition-colors duration-700">
                            Enhance your career with strategic advice and support tailored to your professional aspirations.
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary mt-6 group-hover:bg-white group-hover:text-black transition-colors duration-700 ml-auto"
                            onClick={() => window.open('https://www.google.com', '_blank')}
                        >
                            Explore More
                        </button>
                    </div>
                </div>
                <div
                    className="group bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none transition-all duration-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600"
                    style={{
                        transitionDelay: '500ms',
                    }}
                >
                    <div className="py-7 px-6">
                        <div className="-mt-7 mb-7 -mx-6 rounded-tl-xl rounded-tr-xl h-[300px] overflow-hidden">
                            {/* Image with hover transition */}
                            <img src="/assets/images/ai5.jpg" alt="cover" className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110" />
                        </div>
                        <h5 className="text-[#3b3f5c] text-xl font-bold mb-4 dark:text-white-light group-hover:text-white transition-colors duration-700">Mental Wellness Support </h5>
                        <p className="text-white-dark group-hover:text-gray-200 transition-colors duration-700">
                            Access mental health resources and support to help you maintain balance and wellness in your life.
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary mt-6 group-hover:bg-white group-hover:text-black transition-colors duration-700 ml-auto"
                            onClick={() => window.open('https://www.google.com', '_blank')}
                        >
                            Explore More
                        </button>
                    </div>
                </div>
                <div
                    className="group bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none transition-all duration-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600"
                    style={{
                        transitionDelay: '500ms',
                    }}
                >
                    <div className="py-7 px-6">
                        <div className="-mt-7 mb-7 -mx-6 rounded-tl-xl rounded-tr-xl h-[300px] overflow-hidden">
                            {/* Image with hover transition */}
                            <img src="/assets/images/ai6.jpg" alt="cover" className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110" />
                        </div>
                        <h5 className="text-[#3b3f5c] text-xl font-bold mb-4 dark:text-white-light group-hover:text-white transition-colors duration-700">Business Strategy Planning</h5>
                        <p className="text-white-dark group-hover:text-gray-200 transition-colors duration-700">
                            Receive strategic business planning services to drive your company's success and growth.
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary mt-6 group-hover:bg-white group-hover:text-black transition-colors duration-700 ml-auto"
                            onClick={() => window.open('https://www.google.com', '_blank')}
                        >
                            Explore More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AITools;
