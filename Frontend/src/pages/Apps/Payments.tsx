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
import IconPencil from '../../components/Icon/IconPencil';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconMenuDocumentation from '../../components/Icon/Menu/IconMenuDocumentation';
import RegisterExpert from '../Authentication/RegisterExpert';

const Payments = () => {
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
        field: '',
        description: '',
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
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:8070/payment/getAllPayments', {
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

        fetchPayments();
    }, []);

    useEffect(() => {
        setFilteredItems(() => {
            return users.filter((item: any) => {
                const { firstName, lastName } = item.userId;
                const { formattedDate } = formatDateTime(item.paymentDate);
                const lowerCaseSearch = search.toLowerCase();

                // Check if any field matches the search query
                return (
                    item._id.toString().includes(lowerCaseSearch) || // ID
                    `${firstName} ${lastName}`.toLowerCase().includes(lowerCaseSearch) || // Name
                    item.packageType.toLowerCase().includes(lowerCaseSearch) || // Package
                    item.paymentMethod.toLowerCase().includes(lowerCaseSearch) || // Payment Method
                    formattedDate.toLowerCase().includes(lowerCaseSearch) || // Date
                    item.amount.toString().includes(lowerCaseSearch) || // Amount
                    item.paymentStatus.toLowerCase().includes(lowerCaseSearch) // Status
                );
            });
        });
    }, [search, users]);

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
                <h2 className="text-xl">Payment History</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="relative">
                        <input type="text" placeholder="Search Payment" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Package</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((item: any, index: number) => {
                                    const { formattedDate, formattedTime } = formatDateTime(item.paymentDate);
                                    return (
                                        <tr key={item._id}>
                                            <td className="whitespace-nowrap">{index + 1}</td>
                                            <td>
                                                <div className="flex items-center w-max">
                                                    {item.userId.profilePicture && (
                                                        <div className="w-max">
                                                            <img src={item.userId.profilePicture} className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                                        </div>
                                                    )}
                                                    {!item.userId.profilePicture && item.name && (
                                                        <div className="grid place-content-center h-8 w-8 ltr:mr-2 rtl:ml-2 rounded-full bg-primary text-white text-sm font-semibold"></div>
                                                    )}
                                                    {!item.userId.profilePicture && !item.name && (
                                                        <div className="border border-gray-300 dark:border-gray-800 rounded-full p-2 ltr:mr-2 rtl:ml-2">
                                                            <IconUser className="w-4.5 h-4.5" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        {item.userId.firstName} {item.userId.lastName}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-col items-start">
                                                    <div className="text-sm font-semibold text-gray-800"> {item.packageType}</div>
                                                    <div className="text-xs text-gray-600"> {item.paymentMethod}</div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap">
                                                <div className="flex flex-col items-start">
                                                    <div className="text-sm font-semibold text-gray-800">{formattedDate}</div>
                                                    <div className="text-xs text-gray-600">{formattedTime}</div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap">{`LKR ${item.amount.toFixed(2)}`}</td>
                                            <td className="whitespace-nowrap">
                                                <span className={`badge whitespace-nowrap ${item.paymentStatus === 'Paid' ? 'bg-success ' : item.status === 'Pending' ? 'bg-danger' : 'bg-danger'}`}>
                                                    {item.paymentStatus}
                                                </span>
                                            </td>
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

export default Payments;
