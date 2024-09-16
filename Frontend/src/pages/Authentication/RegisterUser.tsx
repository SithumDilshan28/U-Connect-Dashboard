import { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconPhoneCall from '../../components/Icon/IconPhoneCall';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconMenuContacts from '../../components/Icon/Menu/IconMenuContacts';
import IconMenuCalendar from '../../components/Icon/Menu/IconMenuCalendar';
import IconMenuFontIcons from '../../components/Icon/Menu/IconMenuFontIcons';
import MaskedInput from 'react-text-mask';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { Dialog, Transition } from '@headlessui/react';
import IconMenuDocumentation from '../../components/Icon/Menu/IconMenuDocumentation';
import axios from 'axios';
import IconX from '../../components/Icon/IconX';

const submitForm4 = Yup.object().shape({
    firstName: Yup.string().required('Please fill in the first name'),
    lastName: Yup.string().required('Please fill in the last name'),
    phone: Yup.string().required('Please fill in the phone number'),
    address: Yup.string().required('Please provide an address'),
    birthday: Yup.string().required('Please provide a birthday'),
    username: Yup.string().required('Please choose a username'),
    email: Yup.string().email('Invalid email format').required('Please fill in the email'),
    password: Yup.string().required('Please fill in the password'),
});

interface RegisterUserProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegisterUser = ({ isOpen, onClose }: RegisterUserProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register Cover'));
    });
    const navigate = useNavigate();

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    const submitForm = async (values) => {
        await axios
            .post('http://localhost:8070/user/register', values)
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
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                onClose();
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
    };

    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button type="button" onClick={onClose} className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none">
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Add User</div>
                                    <div className="p-5">
                                        {' '}
                                        <Formik
                                            initialValues={{
                                                firstName: '',
                                                lastName: '',
                                                phone: '',
                                                address: '',
                                                birthday: '',
                                                username: '',
                                                email: '',
                                                password: '',
                                            }}
                                            validationSchema={submitForm4}
                                            onSubmit={(values, { setSubmitting }) => {
                                                submitForm(values);
                                                setSubmitting(false);
                                            }}
                                        >
                                            {({ errors, submitCount, touched, values, setFieldValue, isSubmitting }) => (
                                                <Form className="space-y-5 dark:text-white">
                                                    <div className={submitCount ? (errors.firstName ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="firstName">First Name</label>
                                                        <div className="relative flex items-center">
                                                            <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                                <IconUser fill={true} />
                                                            </div>
                                                            <Field
                                                                name="firstName"
                                                                type="text"
                                                                id="firstName"
                                                                placeholder="Enter First Name"
                                                                className="form-input pl-10 placeholder:text-white-dark"
                                                            />
                                                        </div>
                                                        {submitCount ? (
                                                            errors.firstName ? (
                                                                <div className="text-danger mt-1">{errors.firstName}</div>
                                                            ) : (
                                                                <div className="text-success mt-1">Looks Good!</div>
                                                            )
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>

                                                    <div className={submitCount ? (errors.lastName ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="lastName">Last Name</label>
                                                        <div className="relative flex items-center">
                                                            <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                                <IconUser fill={true} />
                                                            </div>
                                                            <Field name="lastName" type="text" id="lastName" placeholder="Enter Last Name" className="form-input pl-10 placeholder:text-white-dark" />
                                                        </div>
                                                        {submitCount ? (
                                                            errors.lastName ? (
                                                                <div className="text-danger mt-1">{errors.lastName}</div>
                                                            ) : (
                                                                <div className="text-success mt-1">Looks Good!</div>
                                                            )
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>

                                                    <div className={submitCount ? (errors.phone ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="phone">Phone</label>
                                                        <div className="relative flex items-center">
                                                            <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                                <IconPhoneCall fill={true} />
                                                            </div>
                                                            <MaskedInput
                                                                name="phone"
                                                                id="phone"
                                                                type="text"
                                                                placeholder="(___) ___-____"
                                                                className="form-input ps-10 placeholder:text-white-dark"
                                                                mask={['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                                                                onChange={(e) => setFieldValue('phone', e.target.value)}
                                                            />
                                                        </div>
                                                        {submitCount ? (
                                                            errors.phone ? (
                                                                <div className="text-danger mt-1">{errors.phone}</div>
                                                            ) : (
                                                                <div className="text-success mt-1">Looks Good!</div>
                                                            )
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>

                                                    <div className={submitCount ? (errors.address ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="address">Address</label>
                                                        <div className="relative flex items-center">
                                                            <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                                <IconMenuContacts />
                                                            </div>
                                                            <Field name="address" type="text" id="address" placeholder="Enter Address" className="form-input pl-10 placeholder:text-white-dark" />
                                                        </div>
                                                        {submitCount ? (
                                                            errors.address ? (
                                                                <div className="text-danger mt-1">{errors.address}</div>
                                                            ) : (
                                                                <div className="text-success mt-1">Looks Good!</div>
                                                            )
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>

                                                    <div className={submitCount ? (errors.birthday ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="birthday">Birthday</label>
                                                        <div className="relative flex items-center">
                                                            <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                                <IconMenuCalendar />
                                                            </div>
                                                            <Flatpickr
                                                                options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                                className="form-input ps-10 placeholder:text-white-dark"
                                                                placeholder="Select a Date"
                                                                onChange={(date) => setFieldValue('birthday', date[0])}
                                                            />
                                                        </div>
                                                        {submitCount ? (
                                                            errors.birthday ? (
                                                                <div className="text-danger mt-1">{errors.birthday}</div>
                                                            ) : (
                                                                <div className="text-success mt-1">Looks Good!</div>
                                                            )
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>

                                                    <div className={submitCount ? (errors.username ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="username">Username</label>
                                                        <div className="relative flex items-center">
                                                            <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                                <IconMenuFontIcons />
                                                            </div>
                                                            <Field name="username" type="text" id="username" placeholder="Enter Username" className="form-input pl-10 placeholder:text-white-dark" />
                                                        </div>
                                                        {submitCount ? (
                                                            errors.username ? (
                                                                <div className="text-danger mt-1">{errors.username}</div>
                                                            ) : (
                                                                <div className="text-success mt-1">Looks Good!</div>
                                                            )
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>

                                                    <div className={submitCount ? (errors.email ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="email">Email</label>
                                                        <div className="relative flex items-center">
                                                            <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                                <IconMail fill={true} />
                                                            </div>
                                                            <Field name="email" type="email" id="email" placeholder="Enter email" className="form-input pl-10 placeholder:text-white-dark" />
                                                        </div>
                                                        {submitCount ? (
                                                            errors.email ? (
                                                                <div className="text-danger mt-1">{errors.email}</div>
                                                            ) : (
                                                                <div className="text-success mt-1">Looks Good!</div>
                                                            )
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>

                                                    <div className={submitCount ? (errors.password ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="password">Password</label>
                                                        <div className="relative flex items-center">
                                                            <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                                <IconLockDots fill={true} />
                                                            </div>
                                                            <Field
                                                                name="password"
                                                                type="password"
                                                                id="password"
                                                                placeholder="Enter password"
                                                                className="form-input pl-10 placeholder:text-white-dark"
                                                            />
                                                        </div>
                                                        {submitCount ? (
                                                            errors.password ? (
                                                                <div className="text-danger mt-1">{errors.password}</div>
                                                            ) : (
                                                                <div className="text-success mt-1">Looks Good!</div>
                                                            )
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                                        disabled={isSubmitting}
                                                    >
                                                        Add User
                                                    </button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default RegisterUser;
