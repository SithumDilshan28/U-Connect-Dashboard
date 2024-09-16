import { useState } from 'react';
import MaskedInput from 'react-text-mask';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Package details from previous page
    const { packageType = 'No Plan Selected', amount = 0, paymentMethod = 'N/A' } = location.state || {};

    // Form state for payment method
    const [cardNumber, setCardNumber] = useState('');
    const [holderName, setHolderName] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiry, setExpiry] = useState('');

    // Validation state
    const [errors, setErrors] = useState({ cardNumber: '', holderName: '', cvv: '', expiry: '' });

    // Handle Cancel button
    const handleCancel = () => {
        navigate(-1);
    };

    // Validation function
    const validateForm = () => {
        let valid = true;
        const newErrors = { cardNumber: '', holderName: '', cvv: '', expiry: '' };

        if (cardNumber.length < 16) {
            newErrors.cardNumber = 'Invalid card number';
            valid = false;
        }
        if (holderName.trim() === '') {
            newErrors.holderName = 'Holder name is required';
            valid = false;
        }
        if (cvv.length !== 3) {
            newErrors.cvv = 'Invalid CVV';
            valid = false;
        }
        if (expiry.length !== 5 || !/^\d{2}\/\d{2}$/.test(expiry)) {
            newErrors.expiry = 'Invalid expiry date';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (validateForm()) {
            // Perform submission logic for package details only
            const paymentDetails = { packageType, amount, paymentMethod };

            await axios
                .post('http://localhost:8070/payment/addPayment', paymentDetails, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((response) => {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    navigate('/apps/paymentsUser');
                })
                .catch((error) => {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: error.response?.data?.error || 'Registration failed',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                });
        }
    };

    return (
        <div>
            <div className="pt-5">
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-semibold text-lg mb-4">Payment Details</h5>
                                <p>
                                    Changes your New <span className="text-primary">Package</span> Information.
                                </p>
                            </div>
                            <div className="mb-5">
                                <form>
                                    <div className="mb-5">
                                        <label htmlFor="billingName">Package</label>
                                        <input id="billingName" type="text" className="form-input" value={packageType} disabled />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="billingEmail">Payment Method</label>
                                        <input id="billingEmail" type="text" className="form-input" value={paymentMethod} disabled />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="billingAddress">Amount</label>
                                        <input id="billingAddress" type="text" className="form-input" value={`LKR ${amount.toFixed(2)}`} disabled />
                                    </div>
                                    <button type="button" className="btn btn-primary ml-auto" onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-semibold text-lg mb-4">Add Payment Method</h5>
                                <p>
                                    Changes to your <span className="text-primary">Payment Method</span> information will take effect starting with scheduled payment and will be reflected on your next
                                    invoice.
                                </p>
                            </div>
                            <div className="mb-5">
                                <form>
                                    <div className="mb-5">
                                        <div>
                                            <label className="flex items-center cursor-pointer">
                                                <input type="radio" name="custom_radio2" className="form-radio" defaultChecked />
                                                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                                    <div className="flex items-start py-3 ml-3">
                                                        <div className="flex-none ltr:mr-4 rtl:ml-4 mt-2">
                                                            <img src="/assets/images/card-mastercard.svg" alt="img" />
                                                        </div>
                                                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                            Mastercard
                                                            <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">XXXX XXXX XXXX XXXX</span>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="flex items-center cursor-pointer">
                                                <input type="radio" name="custom_radio2" className="form-radio" />
                                                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                                    <div className="flex items-start py-3 ml-3">
                                                        <div className="flex-none ltr:mr-4 rtl:ml-4 mt-2">
                                                            <img src="/assets/images/card-americanexpress.svg" alt="img" />
                                                        </div>
                                                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                            American Express
                                                            <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">XXXX XXXX XXXX XXXX</span>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="flex items-center cursor-pointer">
                                                <input type="radio" name="custom_radio2" className="form-radio" />
                                                <div>
                                                    <div className="flex items-start py-3 ml-3">
                                                        <div className="flex-none ltr:mr-4 rtl:ml-4 mt-2">
                                                            <img src="/assets/images/card-visa.svg" alt="img" />
                                                        </div>
                                                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                            Visa
                                                            <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">XXXX XXXX XXXX XXXX</span>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="payNumber">Card Number</label>
                                            <MaskedInput
                                                id="payNumber"
                                                className="form-input"
                                                placeholder="Card Number"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                                mask={[/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            />
                                            {errors.cardNumber && <span className="text-red-500">{errors.cardNumber}</span>}
                                        </div>

                                        <div>
                                            <label htmlFor="payHolder">Holder Name</label>
                                            <input id="payHolder" type="text" className="form-input" value={holderName} onChange={(e) => setHolderName(e.target.value)} placeholder="Holder Name" />
                                            {errors.holderName && <span className="text-red-500">{errors.holderName}</span>}
                                        </div>
                                    </div>

                                    <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="payCvv">CVV</label>
                                            <MaskedInput id="payCvv" className="form-input" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} mask={[/\d/, /\d/, /\d/]} />
                                            {errors.cvv && <span className="text-red-500">{errors.cvv}</span>}
                                        </div>

                                        <div>
                                            <label htmlFor="payExp">Card Expiry</label>
                                            <MaskedInput
                                                id="payExp"
                                                className="form-input"
                                                placeholder="MM/YY"
                                                value={expiry}
                                                onChange={(e) => setExpiry(e.target.value)}
                                                mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                                            />
                                            {errors.expiry && <span className="text-red-500">{errors.expiry}</span>}
                                        </div>
                                    </div>

                                    <button type="button" className="btn btn-primary ml-auto" onClick={handleSubmit}>
                                        Pay Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPayment;
