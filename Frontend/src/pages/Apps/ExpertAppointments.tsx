import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconSearch from '../../components/Icon/IconSearch';
import IconUser from '../../components/Icon/IconUser';
import IconX from '../../components/Icon/IconX';
import axios from 'axios';
import IconEdit from '../../components/Icon/IconEdit';
import IconEye from '../../components/Icon/IconEye';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import IconMenuCalendar from '../../components/Icon/Menu/IconMenuCalendar';
import IconMail from '../../components/Icon/IconMail';
import IconMenuDocumentation from '../../components/Icon/Menu/IconMenuDocumentation';

const ExpertAppointments = () => {
    const showAlert = async (type: number) => {
        if (type === 2) {
            Swal.fire({
                icon: 'success',
                title: 'Request Sent Successfully!',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        }
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Contacts'));
    });
    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [viewUserModal, setViewUser] = useState<any>(false);

    const [value, setValue] = useState<any>('list');
    const [defaultParams] = useState({
        userId: { firstName: '', lastName: '', email: '' },
        note: '',
        link: '',
        birthday: '',
        timeslot: '',
        description: '',
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

    const [requests, setRequests] = useState([]);
    const [filteredItems, setFilteredItems] = useState<any>(requests);

    const token = localStorage.getItem('token');

    // Get all requests
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8070/request/getAllAppointments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRequests(response.data);
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
            return requests.filter((item: any) => {
                return item.userId.firstName.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, requests]);

    const saveUser = async () => {
        // Perform validation before proceeding
        if (!params.userId._id) {
            showMessage('User ID is required.', 'error');
            return;
        }
        if (!params.link) {
            showMessage('Link is required.', 'error');
            return;
        }
        if (!params.birthday) {
            showMessage('Date is required.', 'error');
            return;
        }
        if (!params.timeslot) {
            showMessage('Timeslot is required.', 'error');
            return;
        }
        if (!params.description) {
            showMessage('Note is required.', 'error');
            return;
        }

        // Prepare the data for the API request
        const appointmentData = {
            userId: params.userId._id,
            link: params.link,
            date: params.birthday,
            timeslot: params.timeslot,
            note: params.description,
            status: null,
        };

        try {
            // Send POST request to the backend to schedule the appointment
            const response = await axios
                .post('http://localhost:8070/schedule/addSchedule', appointmentData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setAddContactModal(false);
                    showAlert(2);
                })
                .catch((error) => {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: error.response?.data?.error || 'Error scheduling appointment',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                });
        } catch (error) {
            console.error('Error scheduling appointment:', error);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: error.response?.data?.error || 'Error scheduling appointment',
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

    // Format date and time
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

        const formattedDate = date.toLocaleDateString(undefined, dateOptions);
        const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

        return { formattedDate, formattedTime };
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Appointment Requests</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="relative">
                        <input type="text" placeholder="Search Appointments" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                    <th>Requested Date</th>
                                    <th>Note</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((request: any) => {
                                    const { formattedDate, formattedTime } = formatDateTime(request.requestedDate);
                                    return (
                                        <tr key={request._id}>
                                            <td>
                                                <div className="flex items-center w-max">
                                                    {request.userId.profilePicture && (
                                                        <div className="w-max">
                                                            <img src={request.userId.profilePicture} className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                                        </div>
                                                    )}
                                                    {!request.userId.profilePicture && request.name && (
                                                        <div className="grid place-content-center h-8 w-8 ltr:mr-2 rtl:ml-2 rounded-full bg-primary text-white text-sm font-semibold"></div>
                                                    )}
                                                    {!request.userId.profilePicture && !request.name && (
                                                        <div className="border border-gray-300 dark:border-gray-800 rounded-full p-2 ltr:mr-2 rtl:ml-2">
                                                            <IconUser className="w-4.5 h-4.5" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        {request.userId.firstName} {request.userId.lastName}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{request.userId.email}</td>
                                            <td className="whitespace-nowrap">
                                                <div className="flex flex-col items-start">
                                                    <div className="text-sm font-semibold text-gray-800">{formattedDate}</div>
                                                    <div className="text-xs text-gray-600">{formattedTime}</div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap">
                                                {request.note.split(' ').slice(0, 4).join(' ')}
                                                {request.note.split(' ').length > 4 && '.....'}
                                            </td>

                                            <td>
                                                <div className="flex gap-4 items-center justify-center">
                                                    <div className="flex hover:text-dark text-primary cursor-pointer" onClick={() => viewUser(request)}>
                                                        <IconEye />
                                                    </div>
                                                    <div className="flex hover:text-dark text-success cursor-pointer" onClick={() => editUser(request)}>
                                                        <IconEdit />
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
                                            <img src={params?.userId?.profilePicture ? params.userId.profilePicture : 'N/A'} alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
                                            <p className="font-semibold text-primary text-xl">
                                                {params?.userId?.firstName ? params.userId.firstName : 'N/A'} {params?.userId?.lastName ? params.userId.lastName : 'N/A'}
                                            </p>
                                        </div>
                                        <ul className="mt-5 flex flex-col max-w-[250px]  m-auto space-y-4 font-semibold text-white-dark">
                                            <li>
                                                <button className="flex items-center gap-2">
                                                    <IconMail className="w-5 h-5 shrink-0" fill={true} />
                                                    <span className="text-primary truncate">{params?.userId?.email ? params.userId.email : 'N/A'}</span>
                                                </button>
                                            </li>

                                            <li className="flex items-center gap-2">
                                                <IconMenuCalendar className="shrink-0" />
                                                {new Date(params.requestedDate).toLocaleDateString('en-CA')}
                                            </li>

                                            <li className="flex  gap-2">
                                                <IconMenuDocumentation className="shrink-0" fill={true} />
                                                {params.note}
                                            </li>
                                        </ul>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

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
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Schedule Appointment</div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-8">
                                                <label htmlFor="name">User Information</label>
                                                <div className="bg-white dark:bg-gray-900 rounded-md px-2 ">
                                                    <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right ml-4">
                                                        <div className="flex items-center ml-4">
                                                            <div className="flex-none text-white-dark ltr:mr-2 rtl:ml-2">Name :</div>
                                                            <div className="truncate ">
                                                                {params?.userId?.firstName ? params.userId.firstName : 'N/A'} {params?.userId?.lastName ? params.userId.lastName : 'N/A'}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center ml-4">
                                                            <div className="flex-none text-white-dark ltr:mr-2 rtl:ml-2">Email :</div>
                                                            <div className="truncate ">{params?.userId?.email ? params.userId.email : 'N/A'}</div>
                                                        </div>
                                                        <div className="flex items-center ml-5">
                                                            <div className="flex-none text-white-dark ltr:mr-2 rtl:ml-2">Note :</div>
                                                            <div className="truncate ">{params.note}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="link">Link</label>
                                                <input id="link" type="text" placeholder="Enter Link" className="form-input" value={params.link || ''} onChange={changeValue} />
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="birthday">Select a Date</label>
                                                <Flatpickr
                                                    id="birthday"
                                                    options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                    className="form-input placeholder:text-white-dark"
                                                    placeholder="Allocate a date"
                                                    value={params.birthday}
                                                    onChange={(selectedDates) => {
                                                        changeValue({ target: { id: 'birthday', value: selectedDates[0] } });
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="birthday">Timeslot</label>
                                                <Flatpickr
                                                    options={{
                                                        noCalendar: true,
                                                        enableTime: true,
                                                        dateFormat: 'H:i',
                                                        position: isRtl ? 'auto right' : 'auto left',
                                                    }}
                                                    className="form-input"
                                                    placeholder="Allocate a timeslot"
                                                    value={params.timeslot || ''}
                                                    onChange={(selectedDates) => {
                                                        changeValue({ target: { id: 'timeslot', value: selectedDates[0] } });
                                                    }}
                                                />
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="description">Note</label>
                                                <textarea
                                                    id="description"
                                                    rows={2}
                                                    placeholder="Enter Note"
                                                    className="form-textarea resize-none min-h-[130px]"
                                                    value={params.description}
                                                    onChange={(e) => changeValue(e)}
                                                ></textarea>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    Schedule Appointment
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
        </div>
    );
};

export default ExpertAppointments;
