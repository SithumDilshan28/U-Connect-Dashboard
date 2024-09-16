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
import IconPencil from '../../components/Icon/IconPencil';
import MaskedInput from 'react-text-mask';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import IconMenuDocumentation from '../../components/Icon/Menu/IconMenuDocumentation';
import Swal from 'sweetalert2';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconX from '../../components/Icon/IconX';
import IconCode from '../../components/Icon/IconCode';

const submitForm4 = Yup.object().shape({
    firstName: Yup.string().required('Please fill in the first name'),
    lastName: Yup.string().required('Please fill in the last name'),
    phone: Yup.string().required('Please fill in the phone number'),
    address: Yup.string().required('Please provide an address'),
    birthday: Yup.string().required('Please provide a birthday'),
    username: Yup.string().required('Please choose a username'),
    field: Yup.string().required('Please provide a field'),
    description: Yup.string().required('Please enter a description'),
    email: Yup.string().email('Invalid email format').required('Please fill in the email'),
    password: Yup.string().required('Please fill in the password'),
});

interface RegisterUserProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegisterExpert = ({ isOpen, onClose }: RegisterUserProps) => {
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
    const [images, setImages] = useState<any>([]);

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };

    const onChange2 = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages2(imageList as never[]);
    };

    const defaultAvatar = ''; // default avatar image URL

    const submitForm = async (values) => {
        try {
            // Create a copy of the form values
            const data = { ...values };

            // Only add profilePicture if an image is uploaded
            if (images.length > 0) {
                data.profilePicture = images[0].dataURL;
            }

            await axios
                .post('http://localhost:8070/user/registerExpert', data)
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
                    }, 2000);
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
        } catch (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: error.response?.data?.error || 'Registration failed',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
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
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Add Expert</div>
                                    <div className="p-5">
                                        <Formik
                                            initialValues={{
                                                firstName: '',
                                                lastName: '',
                                                phone: '',
                                                address: '',
                                                birthday: '',
                                                field: '',
                                                description: '',
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

                                                    <div className={submitCount ? (errors.field ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="field">Field</label>
                                                        <div className="relative flex items-center">
                                                            <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                                <IconPencil fill={true} />
                                                            </div>
                                                            <Field name="field" type="text" id="field" placeholder="Enter Field" className="form-input pl-10 placeholder:text-white-dark" />
                                                        </div>
                                                        {submitCount ? (
                                                            errors.field ? (
                                                                <div className="text-danger mt-1">{errors.field}</div>
                                                            ) : (
                                                                <div className="text-success mt-1">Looks Good!</div>
                                                            )
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>

                                                    <div className={submitCount ? (errors.description ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="description">Description</label>
                                                        <div className="relative flex items-center">
                                                            <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                                <IconMenuDocumentation />
                                                            </div>
                                                            <Field
                                                                name="description"
                                                                type="text"
                                                                id="description"
                                                                placeholder="Enter a Description"
                                                                className="form-input pl-10 placeholder:text-white-dark"
                                                            />
                                                        </div>
                                                        {submitCount ? (
                                                            errors.description ? (
                                                                <div className="text-danger mt-1">{errors.description}</div>
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

                                                    <div className="panel bg-transparent shadow-none p-0 relative" id="single_file" style={{ position: 'relative', height: '100px' }}>
                                                        <div className="flex justify-between">
                                                            <label className="text-black">Upload Profile Picture (optional)</label>
                                                            <button
                                                                type="button"
                                                                className="custom-file-container__image-clear"
                                                                title="Clear Image"
                                                                onClick={() => {
                                                                    setImages([]);
                                                                }}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                        <ImageUploading value={images} onChange={(imageList) => setImages(imageList)} maxNumber={1} dataURLKey="dataURL">
                                                            {({ imageList, onImageUpload }) => (
                                                                <div className="upload__image-wrapper">
                                                                    {/* Change the button type to 'button' to prevent form submission */}
                                                                    <button
                                                                        type="button"
                                                                        className="custom-file-container__custom-file__custom-file-control"
                                                                        onClick={onImageUpload}
                                                                        style={{ width: 'fit-content' }}
                                                                    >
                                                                        Choose Picture...
                                                                    </button>

                                                                    {/* Display the selected image */}
                                                                    {imageList.map((image, index) => (
                                                                        <div key={index} className="custom-file-container__image-preview relative p-0 m-0">
                                                                            <img src={image.dataURL} alt="img" className="m-auto h-20 object-cover" />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </ImageUploading>
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                                        disabled={isSubmitting}
                                                    >
                                                        Add Expert
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

export default RegisterExpert;
