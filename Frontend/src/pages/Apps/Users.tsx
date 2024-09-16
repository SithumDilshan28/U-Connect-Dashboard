import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconSearch from '../../components/Icon/IconSearch';
import IconUser from '../../components/Icon/IconUser';
import IconX from '../../components/Icon/IconX';
import axios from 'axios';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconEdit from '../../components/Icon/IconEdit';
import IconEye from '../../components/Icon/IconEye';
import RegisterUser from '../Authentication/RegisterUser';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import MaskedInput from 'react-text-mask';
import IconMenuContacts from '../../components/Icon/Menu/IconMenuContacts';
import IconMenuCalendar from '../../components/Icon/Menu/IconMenuCalendar';
import IconMail from '../../components/Icon/IconMail';
import IconPhoneCall from '../../components/Icon/IconPhoneCall';
import IconLockDots from '../../components/Icon/IconLockDots';

const Users = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Contacts'));
    });
    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [viewUserModal, setViewUser] = useState<any>(false);

    const [isRegisterUserModalOpen, setIsRegisterUserModalOpen] = useState<boolean>(false);

    const openRegisterUserModal = () => setIsRegisterUserModalOpen(true);
    const closeRegisterUserModal = () => setIsRegisterUserModalOpen(false);

    const [value, setValue] = useState<any>('list');
    const [defaultParams] = useState({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthday: '',
        username: '',
        address: '',
    });

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

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>('');

    const [users, setUsers] = useState([]);
    const [filteredItems, setFilteredItems] = useState<any>(users);

    const token = localStorage.getItem('token');

    // Get all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8070/user/getAllUsers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
                setFilteredItems(response.data);
            } catch (error) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: error.response?.data?.error || 'Error fetching users',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        setFilteredItems(() => {
            return users.filter((item: any) => {
                return item.firstName.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, users]);

    const saveUser = async () => {
        if (!params.firstName) {
            showMessage('First Name is required.', 'error');
            return true;
        }
        if (!params.lastName) {
            showMessage('Last Name is required.', 'error');
            return true;
        }
        if (!params.email) {
            showMessage('Email is required.', 'error');
            return true;
        }
        if (!params.phone) {
            showMessage('Phone is required.', 'error');
            return true;
        }
        if (!params.username) {
            showMessage('Username is required.', 'error');
            return true;
        }
        if (!params.birthday) {
            showMessage('Birthday is required.', 'error');
            return true;
        }
        if (!params.address) {
            showMessage('Address is required.', 'error');
            return true;
        }

        try {
            if (params._id) {
                // Update user
                const response = await axios
                    .put(`http://localhost:8070/user/updateUser/${params._id}`, {
                        userId: params._id,
                        firstName: params.firstName,
                        lastName: params.lastName,
                        email: params.email,
                        phone: params.phone,
                        birthday: params.birthday,
                        username: params.username,
                        address: params.address,
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
                        setAddContactModal(false);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                    .catch((error) => {
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'error',
                            title: error.response?.data?.error || 'Updating failed',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                    });
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'User ID is missing',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Error updating user',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };

    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setAddContactModal(true);
    };

    const viewUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setViewUser(true);
    };

    const deleteUser = async (id) => {
        try {
            await axios
                .delete(`http://localhost:8070/user/deleteUser/${id}`)
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
                })
                .catch((error) => {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: error.response?.data?.error || 'Delete failed',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                });
        } catch (error) {
            console.error('Error updating user:', error);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Error deleting user',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Users</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => setIsRegisterUserModalOpen(true)}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Add User
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Users" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Username</th>

                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((contact: any) => {
                                    return (
                                        <tr key={contact._id}>
                                            <td>
                                                <div className="flex items-center w-max">
                                                    {contact.profilePicture && (
                                                        <div className="w-max">
                                                            <img src={contact.profilePicture} className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                                        </div>
                                                    )}
                                                    {!contact.profilePicture && contact.name && (
                                                        <div className="grid place-content-center h-8 w-8 ltr:mr-2 rtl:ml-2 rounded-full bg-primary text-white text-sm font-semibold"></div>
                                                    )}
                                                    {!contact.profilePicture && !contact.name && (
                                                        <div className="border border-gray-300 dark:border-gray-800 rounded-full p-2 ltr:mr-2 rtl:ml-2">
                                                            <IconUser className="w-4.5 h-4.5" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        {contact.firstName} {contact.lastName}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{contact.email}</td>
                                            <td className="whitespace-nowrap">{contact.phone}</td>
                                            <td className="whitespace-nowrap">{contact.username}</td>

                                            <td>
                                                <div className="flex gap-4 items-center justify-center">
                                                    <div className="flex hover:text-dark text-primary cursor-pointer" onClick={() => viewUser(contact)}>
                                                        <IconEye />
                                                    </div>
                                                    <div className="flex hover:text-dark text-primary cursor-pointer" onClick={() => editUser(contact)}>
                                                        <IconEdit />
                                                    </div>

                                                    <div className="flex hover:text-dark text-danger cursor-pointer " onClick={() => deleteUser(contact._id)}>
                                                        <IconTrashLines />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-[51]">
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
                                    <button
                                        type="button"
                                        onClick={() => setAddContactModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Edit User</div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="firstName">First Name</label>
                                                <input id="firstName" type="text" placeholder="Enter First Name" className="form-input" value={params.firstName} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="lastName">Last Name</label>
                                                <input id="lastName" type="text" placeholder="Enter Last Name" className="form-input" value={params.lastName} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="email" placeholder="Enter Email" className="form-input" value={params.email} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="username">Username</label>
                                                <input id="username" type="text" placeholder="Enter Username" className="form-input" value={params.username} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="phone">Phone </label>
                                                <fieldset>
                                                    <MaskedInput
                                                        id="phone"
                                                        type="text"
                                                        placeholder="(___) ___-____"
                                                        className="form-input"
                                                        value={params.phone}
                                                        onChange={(e) => changeValue(e)}
                                                        mask={['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                                                    />
                                                </fieldset>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="birthday">Birthday</label>
                                                <Flatpickr
                                                    id="birthday"
                                                    options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                    className="form-input placeholder:text-white-dark"
                                                    placeholder="Select a Date"
                                                    value={params.birthday}
                                                    onChange={(selectedDates) => {
                                                        changeValue({ target: { id: 'birthday', value: selectedDates[0] } });
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="address">Address</label>
                                                <textarea
                                                    id="address"
                                                    rows={2}
                                                    placeholder="Enter Address"
                                                    className="form-textarea resize-none min-h-[130px]"
                                                    value={params.address}
                                                    onChange={(e) => changeValue(e)}
                                                ></textarea>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    Update
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* View User */}
            <Transition appear show={viewUserModal} as={Fragment}>
                <Dialog as="div" open={viewUserModal} onClose={() => setViewUser(false)} className="relative z-[51]">
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
                                    <button
                                        type="button"
                                        onClick={() => setViewUser(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Profile</div>
                                    <div className="mb-5">
                                        <div className="flex flex-col justify-center items-center">
                                            <img src={params.profilePicture} alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
                                            <p className="font-semibold text-primary text-xl">
                                                {params.firstName} {params.lastName}
                                            </p>
                                            <p className="font-semibold text-md text-white-dark">@ {params.username}</p>
                                        </div>
                                        <ul className="mt-5 flex flex-col max-w-[250px]  m-auto space-y-4 font-semibold text-white-dark">
                                            <li>
                                                <button className="flex items-center gap-2">
                                                    <IconMail className="w-5 h-5 shrink-0" fill={true} />
                                                    <span className="text-primary truncate">{params.email}</span>
                                                </button>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <IconPhoneCall className="shrink-0" fill={true} />
                                                {params.phone}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <IconMenuCalendar className="shrink-0" />
                                                {new Date(params.birthday).toLocaleDateString('en-CA')}
                                            </li>

                                            <li>
                                                <button className="flex items-center gap-2">
                                                    <IconMenuContacts className="w-5 h-5 shrink-0" />

                                                    <span className="truncate">{params.address}</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <RegisterUser isOpen={isRegisterUserModalOpen} onClose={closeRegisterUserModal} />
        </div>
    );
};

export default Users;
