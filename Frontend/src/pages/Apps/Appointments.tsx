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

const ExpertAppointments = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Contacts'));
    });

    const [value, setValue] = useState<any>('list');
    const [defaultParams] = useState({
        id: null,
        firstName: '',
        lastName: '',
        requestedDate: '',
        note: '',
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

    const [search, setSearch] = useState<any>('');

    const [requests, setRequests] = useState([]);
    const [filteredItems, setFilteredItems] = useState<any>(requests);

    const token = localStorage.getItem('token');

    // Get all requests
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8070/schedule/getAllSchedules', {
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

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, dateOptions);
        return { formattedDate };
    };

    const formatTime = (timeString) => {
        const time = new Date(timeString);
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        const formattedTime = time.toLocaleTimeString(undefined, timeOptions);
        return formattedTime;
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Appointments History</h2>
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
                                    <th>User</th>

                                    <th>Expert</th>
                                    <th>Link</th>
                                    <th>Scheduled Date</th>
                                    <th>Note</th>
                                    {/* <th className="!text-center">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((request: any) => {
                                    const { formattedDate } = formatDateTime(request.date);
                                    const formattedTime = formatTime(request.timeslot);
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

                                            <td className="whitespace-nowrap">
                                                <div>
                                                    {request.expertId.firstName} {request.expertId.lastName}
                                                </div>
                                            </td>
                                            <td>{request.link}</td>
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

                                            {/* <td>
                                                <div className="flex gap-4 items-center justify-center">
                                                    <div className="flex hover:text-dark text-primary cursor-pointer" onClick={() => viewUser(request)}>
                                                        <IconEye />
                                                    </div>
                                                    <div className="flex hover:text-dark text-success cursor-pointer" onClick={() => editUser(request)}>
                                                        <IconEdit />
                                                    </div>
                                                </div>
                                            </td> */}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpertAppointments;
