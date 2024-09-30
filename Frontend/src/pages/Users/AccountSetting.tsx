import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        // Confirmation dialog (optional)
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action will permanently delete your account!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await axios.delete('http://localhost:8070/user/deleteAccount', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    Swal.fire('Deleted!', 'Your account has been deleted.', 'success');

                    localStorage.removeItem('token');
                    localStorage.removeItem('isLogged');

                    // Navigate to login page
                    navigate('/auth/login');
                }
            } catch (error) {
                Swal.fire('Error', 'There was an issue deleting your account. Please try again later.', 'error');
            }
        }
    };

    const dispatch = useDispatch();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        email: '',
        username: '',
        profilePicture: '',
    });

    const token = localStorage.getItem('token');

    // Get the current user's profile
    useEffect(() => {
        dispatch(setPageTitle('Edit Profile'));

        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8070/user/getCurrentUser', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data); // Update user state with fetched data
            } catch (error) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: error.response?.data?.error || 'Error fetching user',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        };

        fetchUser();
    }, [dispatch, token]);

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        address: Yup.string().required('Address is required'),
        phone: Yup.string().required('Phone is required').matches(/^\d+$/, 'Phone must be a number').min(10, 'Phone must be at least 10 digits').max(10, 'Phone must be at 10 digits'),
    });

    const handleSave = async (values: any) => {
        try {
            await axios.put('http://localhost:8070/user/updateUser', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Profile updated successfully!',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: error.response?.data?.error || 'Error updating profile',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };

    return (
        <div>
            <Formik initialValues={user} enableReinitialize={true} validationSchema={validationSchema} onSubmit={handleSave}>
                {({ values, handleChange }) => (
                    <Form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                        <h6 className="text-lg font-bold mb-5">Edit Your Profile</h6>
                        <div className="flex flex-col sm:flex-row">
                            <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                <img src={values.profilePicture} alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                            </div>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="firstName">First Name</label>
                                    <Field id="firstName" name="firstName" type="text" className="form-input" />
                                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field id="lastName" name="lastName" type="text" className="form-input" />
                                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label htmlFor="address">Address</label>
                                    <Field id="address" name="address" type="text" className="form-input" />
                                    <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <Field id="phone" name="phone" type="text" className="form-input" />
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <Field disabled id="username" name="username" type="text" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <Field disabled id="email" name="email" type="email" className="form-input" />
                                </div>

                                <div className="sm:col-span-2 mt-3">
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="panel space-y-5">
                <h5 className="font-semibold text-lg mb-4">Delete Account</h5>
                <p>Once you delete the account, there is no going back. Please be certain.</p>
                <button className="btn btn-danger btn-delete-account" onClick={handleDeleteAccount}>
                    Delete my account
                </button>
            </div>
        </div>
    );
};

export default ProfileEdit;
