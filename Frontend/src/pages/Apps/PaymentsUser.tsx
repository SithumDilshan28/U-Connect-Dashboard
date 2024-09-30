import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setPageTitle } from '../../store/themeConfigSlice';

const PaymentsUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        dispatch(setPageTitle('Pricing Tables'));
    }, [dispatch]);

    const [codeArr, setCodeArr] = useState<string[]>([]);
    const [yearlyPrice, setYearlyPrice] = useState<boolean>(false);

    // Prices
    const cloudHostingMonthly = 3500;
    const businessHostingMonthly = 9900;

    const cloudHostingYearly = 33600;
    const businessHostingYearly = 95000;

    // Function to navigate with plan details
    const handleBuyNow = (packageType: string, amount: number, paymentMethod: string) => {
        navigate('/users/addPayment', { state: { packageType, amount, paymentMethod } });
    };

    return (
        <div>
            <div className="panel">
                <div className="mb-5">
                    <div className="max-w-[320px] md:max-w-[1140px] mx-auto dark:text-white-dark">
                        <div className="mt-3 md:mt-5 text-center flex justify-center space-x-4 rtl:space-x-reverse font-semibold text-base">
                            <span className={`${!yearlyPrice ? 'text-primary' : 'text-white-dark'}`}>Monthly</span>
                            <label className="w-12 h-6 relative">
                                <input
                                    id="custom_switch_checkbox1"
                                    type="checkbox"
                                    className="custom_switch absolute ltr:left-0 rtl:right-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer peer"
                                    onChange={() => setYearlyPrice(!yearlyPrice)}
                                />
                                <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute ltr:before:left-1 rtl:before:right-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center ltr:peer-checked:before:left-7 rtl:peer-checked:before:right-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                            </label>
                            <span className={`relative ${yearlyPrice ? 'text-primary' : 'text-white-dark'}`}>
                                Yearly
                                <span className="badge bg-success rounded-full absolute ltr:left-full rtl:right-full whitespace-nowrap ltr:ml-2 rtl:mr-2 my-auto">20% Off</span>
                            </span>
                        </div>

                        <div className="md:flex space-y-4 md:space-y-0 mt-2 md:mt-5 text-white-dark justify-center">
                            {/* Regular Plan */}
                            <div className="p-4 lg:p-9 border ltr:md:border-r-0 rtl:md:border-l-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-r-none rtl:md:rounded-l-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                                <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Regular Plan</h3>

                                <div className="my-7 p-2.5 text-center text-lg">
                                    <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl text-primary">LKR {yearlyPrice ? cloudHostingYearly : cloudHostingMonthly}</strong> /{' '}
                                    {yearlyPrice ? 'yearly' : 'monthly'}
                                </div>
                                <div className="mb-14">
                                    <strong className="text-black dark:text-white-light text-[15px] mb-3 inline-block">Regular Plan Features</strong>
                                    <ul className="space-y-3">
                                        <li>10 sessions with experts</li>
                                        <li>Access to AI tools</li>
                                        <li>24/7 Customer Support </li>
                                        <li>Personalized Growth Plans </li>
                                    </ul>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary w-full"
                                    onClick={() => handleBuyNow('Regular', yearlyPrice ? cloudHostingYearly : cloudHostingMonthly, yearlyPrice ? 'Yearly' : 'Monthly')}
                                >
                                    Buy Now
                                </button>
                            </div>

                            <div className="border-white-light border"></div>

                            {/* Premium Plan */}
                            <div className="p-4 lg:p-9 border ltr:md:border-l-0 rtl:md:border-r-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-l-none rtl:md:rounded-r-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                                <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Premium Plan</h3>

                                <div className="my-7 p-2.5 text-center text-lg">
                                    <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl text-primary">
                                        LKR {yearlyPrice ? businessHostingYearly : businessHostingMonthly}
                                    </strong>{' '}
                                    / {yearlyPrice ? 'yearly' : 'monthly'}
                                </div>
                                <div className="mb-6">
                                    <strong className="text-black dark:text-white-light text-[15px] mb-3 inline-block">Premium Plan Features</strong>
                                    <ul className="space-y-3">
                                        <li>30 sessions with experts</li>
                                        <li>Access to AI tools</li>
                                        <li>24/7 Customer Support </li>
                                        <li>Personalized Growth Plans </li>
                                        <li>Dedicated Account Manager</li>
                                    </ul>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary w-full"
                                    onClick={() => handleBuyNow('Premium', yearlyPrice ? businessHostingYearly : businessHostingMonthly, yearlyPrice ? 'Yearly' : 'Monthly')}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentsUser;
