import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProfileEdit = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        profession: '',
        country: '',
        address: '',
        location: '',
        phone: '',
        email: '',
        website: '',
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put('http://localhost:8070/user/updateProfile', user, {
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
            <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                <h6 className="text-lg font-bold mb-5">Edit Your Profile</h6>
                <div className="flex flex-col sm:flex-row">
                    <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                        <img src="/assets/images/profile-34.jpeg" alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" type="text" value={user.firstName} onChange={handleInputChange} className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input id="lastName" type="text" value={user.lastName} onChange={handleInputChange} className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="profession">Profession</label>
                            <input id="profession" type="text" value={user.profession} onChange={handleInputChange} className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="country">Country</label>
                            <select id="country" value={user.country} onChange={handleInputChange} className="form-select text-white-dark">
                                <option value="United States">United States</option>
                                <option value="India">India</option>
                                <option value="Japan">Japan</option>
                                <option value="China">China</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Norway">Norway</option>
                                <option value="Canada">Canada</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input id="address" type="text" value={user.address} onChange={handleInputChange} className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="location">Location</label>
                            <input id="location" type="text" value={user.location} onChange={handleInputChange} className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input id="phone" type="text" value={user.phone} onChange={handleInputChange} className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" value={user.email} onChange={handleInputChange} className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="website">Website</label>
                            <input id="website" type="text" value={user.website} onChange={handleInputChange} className="form-input" />
                        </div>

                        <div className="sm:col-span-2 mt-3">
                            <button type="button" onClick={handleSave} className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="panel space-y-5">
                <h5 className="font-semibold text-lg mb-4">Delete Account</h5>
                <p>Once you delete the account, there is no going back. Please be certain.</p>
                <button className="btn btn-danger btn-delete-account">Delete my account</button>
            </div>
        </div>
    );
};

export default ProfileEdit;
