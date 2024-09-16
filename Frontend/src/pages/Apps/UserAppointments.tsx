import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconX from '../../components/Icon/IconX';
import axios from 'axios';
import IconStar from '../../components/Icon/IconStar';
import FeedbackForm from './FeedbackForm';

const UserAppointments = () => {
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

    const [defaultParams] = useState({
        _id: null,
        firstName: '',
        lastName: '',
        field: '',
        description: '',
        email: '',
        phone: '',
        birthday: '',
        username: '',
        address: '',
        note: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const [users, setUsers] = useState([]);
    const [filteredItems, setFilteredItems] = useState<any>(users);

    const token = localStorage.getItem('token');

    // Get all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8070/user/getAllExperts', {
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

    const saveUser = async () => {
        if (!params.note || params.note.trim() === '') {
            showMessage('Please add a note!', 'warning');
            return;
        }

        try {
            if (params._id) {
                //    add appointment
                await axios
                    .post(
                        'http://localhost:8070/request/addAppointment',
                        {
                            expertId: params._id,
                            note: params.note,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    )
                    .then((response) => {
                        setAddContactModal(false);
                        showAlert(2);
                    })
                    .catch((error) => {
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'error',
                            title: error.response?.data?.error || 'Request failed',
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
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Error sending requst',
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

    const [feedbackModal, setFeedbackModal] = useState<boolean>(false);
    const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);

    const openFeedbackModal = (expertId: string) => {
        setSelectedExpertId(expertId);
        setFeedbackModal(true);
    };

    const handleFeedbackSubmit = async (feedback: { expertId: string; rating: number; review: string }) => {
        try {
            const review = {
                expertId: feedback.expertId,
                rating: feedback.rating,
                review: feedback.review,
            };

            const response = await axios
                .post('http://localhost:8070/feedback/createFeedback', review, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    showMessage('Feedback Sent!', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                    setAddContactModal(false);
                })
                .catch((error) => {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: error.response?.data?.error || 'Error sending feedback ',
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
                title: error.response?.data?.error || 'Error sending feedback ',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };

    return (
        <div>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-5 w-full">
                {filteredItems.map((expert: any) => {
                    return (
                        <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative" key={expert._id}>
                            <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative">
                                <button type="button" className="btn btn-warning btn-sm absolute right-3 top-3" onClick={() => openFeedbackModal(expert._id)}>
                                    Give Feedback
                                </button>
                                <div
                                    className="bg-white/40 rounded-t-md bg-center bg-cover p-6 pb-0 bg-"
                                    style={{
                                        backgroundImage: `url('/assets/images/notification-bg.png')`,
                                        backgroundRepeat: 'no-repeat',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <img className="object-contain w-4/5 max-h-40 mx-auto" src={expert.profilePicture} alt="expert_image" />
                                </div>

                                <div className="px-6 pb-20 -mt-10 relative bg-transparent">
                                    <div className="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                                        <div className="text-xl">
                                            {expert.firstName} {expert.lastName}
                                        </div>
                                        <div className="text-white-dark">@ {expert.username}</div>
                                        <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right ml-4">
                                            <div className="flex items-center ml-4">
                                                <div className="flex-none text-white-dark ltr:mr-2 rtl:ml-2">Email :</div>
                                                <div className="truncate ">{expert.email}</div>
                                            </div>
                                            <div className="flex items-center ml-3">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2 text-white-dark">Phone :</div>
                                                <div>{expert.phone}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2 text-white-dark">Address :</div>
                                                <div>{expert.address}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                        <div className="flex items-center">
                                            <div className="flex-none text-white-dark ltr:mr-2 rtl:ml-2 ml-10">Field :</div>
                                            <div className="truncate">{expert.field}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex-none text-white-dark ltr:mr-2 rtl:ml-2">Description :</div>
                                            <div className="h-auto max-h-[5.5em] overflow-y-auto">{expert.description}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-1 flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 p-6">
                                    <button type="button" className="btn bg-primary w-full text-white" onClick={() => editUser(expert)}>
                                        Make an Appointment
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Feedback Modal */}
            <FeedbackForm isOpen={feedbackModal} onClose={() => setFeedbackModal(false)} onSubmit={handleFeedbackSubmit} expertId={selectedExpertId} />

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
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Make an Appointment</div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-8">
                                                <label htmlFor="name">Expert Information</label>
                                                <div className="bg-white dark:bg-gray-900 rounded-md px-2 ">
                                                    <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right ml-4">
                                                        <div className="flex items-center ml-4">
                                                            <div className="flex-none text-white-dark ltr:mr-2 rtl:ml-2">Name :</div>
                                                            <div className="truncate ">
                                                                {params.firstName} {params.lastName}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center ml-5">
                                                            <div className="flex-none text-white-dark ltr:mr-2 rtl:ml-2">Field :</div>
                                                            <div className="truncate ">{params.field}</div>
                                                        </div>
                                                        <div className="flex items-center ml-4">
                                                            <div className="flex-none text-white-dark ltr:mr-2 rtl:ml-2">Email :</div>
                                                            <div className="truncate ">{params.email}</div>
                                                        </div>
                                                        <div className="flex items-center ml-3">
                                                            <div className="flex-none ltr:mr-2 rtl:ml-2 text-white-dark">Phone :</div>
                                                            <div>{params.phone}</div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="flex-none ltr:mr-2 rtl:ml-2 text-white-dark">Address :</div>
                                                            <div>{params.address}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="address">Add Note</label>
                                                <textarea
                                                    id="note"
                                                    rows={3}
                                                    placeholder="Add a note which describes your appointment"
                                                    className="form-textarea resize-none min-h-[130px]"
                                                    value={params.note}
                                                    onChange={(e) => setParams({ ...params, note: e.target.value })}
                                                ></textarea>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    Send Appointment Request
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

export default UserAppointments;
