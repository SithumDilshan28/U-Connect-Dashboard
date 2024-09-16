import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import { IRootState } from '../../store';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconPhoneCall from '../../components/Icon/IconPhoneCall';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconMenuContacts from '../../components/Icon/Menu/IconMenuContacts';
import IconMenuCalendar from '../../components/Icon/Menu/IconMenuCalendar';
import { GoogleLogin } from '@react-oauth/google';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { jwtDecode } from 'jwt-decode';
import MaskedInput from 'react-text-mask';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios';

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

const Register = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register Cover'));
    });

    const [images, setImages] = useState<any>([]);
    const [images2, setImages2] = useState<any>([]);

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };

    const onChange2 = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages2(imageList as never[]);
    };

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
                .post('http://localhost:8070/user/register', data)
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
                    navigate('/auth/login');
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
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link to="/" className="w-48 block lg:w-72 ms-10">
                            <img src="/assets/images/auth/logo192.png" alt="Logo" className="w-full" />
                            </Link>
                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/auth/register.svg" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link to="/" className="w-8 block lg:hidden">
                                <img src="/assets/images/logo.svg" alt="Logo" className="mx-auto w-10" />
                            </Link>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign Up</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to register</p>
                            </div>
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
                                                <Field name="firstName" type="text" id="firstName" placeholder="Enter First Name" className="form-input pl-10 placeholder:text-white-dark" />
                                            </div>
                                            {submitCount ? errors.firstName ? <div className="text-danger mt-1">{errors.firstName}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                        </div>

                                        <div className={submitCount ? (errors.lastName ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="lastName">Last Name</label>
                                            <div className="relative flex items-center">
                                                <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                    <IconUser fill={true} />
                                                </div>
                                                <Field name="lastName" type="text" id="lastName" placeholder="Enter Last Name" className="form-input pl-10 placeholder:text-white-dark" />
                                            </div>
                                            {submitCount ? errors.lastName ? <div className="text-danger mt-1">{errors.lastName}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
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
                                            {submitCount ? errors.phone ? <div className="text-danger mt-1">{errors.phone}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                        </div>

                                        <div className={submitCount ? (errors.address ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="address">Address</label>
                                            <div className="relative flex items-center">
                                                <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                    <IconMenuContacts />
                                                </div>
                                                <Field name="address" type="text" id="address" placeholder="Enter Address" className="form-input pl-10 placeholder:text-white-dark" />
                                            </div>
                                            {submitCount ? errors.address ? <div className="text-danger mt-1">{errors.address}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
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
                                            {submitCount ? errors.birthday ? <div className="text-danger mt-1">{errors.birthday}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                        </div>

                                        <div className={submitCount ? (errors.username ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="username">Username</label>
                                            <div className="relative flex items-center">
                                                <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">@</div>
                                                <Field name="username" type="text" id="username" placeholder="Enter Username" className="form-input pl-10 placeholder:text-white-dark" />
                                            </div>
                                            {submitCount ? errors.username ? <div className="text-danger mt-1">{errors.username}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                        </div>

                                        <div className={submitCount ? (errors.email ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="email">Email</label>
                                            <div className="relative flex items-center">
                                                <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                    <IconMail fill={true} />
                                                </div>
                                                <Field name="email" type="email" id="email" placeholder="Enter email" className="form-input pl-10 placeholder:text-white-dark" />
                                            </div>
                                            {submitCount ? errors.email ? <div className="text-danger mt-1">{errors.email}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                        </div>

                                        <div className={submitCount ? (errors.password ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="password">Password</label>
                                            <div className="relative flex items-center">
                                                <div className="absolute inset-y-0 left-0 flex items-center px-3 text-white-dark">
                                                    <IconLockDots fill={true} />
                                                </div>
                                                <Field name="password" type="password" id="password" placeholder="Enter password" className="form-input pl-10 placeholder:text-white-dark" />
                                            </div>
                                            {submitCount ? errors.password ? <div className="text-danger mt-1">{errors.password}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
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
                                            disabled={isSubmitting} // Disables button while form is submitting
                                        >
                                            Sign up
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                            <div className="mb-10 md:mb-[60px]">
                                <ul className="flex justify-center gap-3.5 text-white">
                                    <li>
                                        <GoogleLogin
                                            onSuccess={(credentialResponse) => {
                                                var credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                                                console.log(credentialResponseDecoded);
                                            }}
                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center dark:text-white">
                                Already have an account ?&nbsp;
                                <Link to="/auth/login" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN IN
                                </Link>
                            </div>
                        </div>
                        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}.UConnect All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
