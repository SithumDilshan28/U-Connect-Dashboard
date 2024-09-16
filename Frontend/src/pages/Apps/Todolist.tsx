import { useState, useEffect, Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Swal from 'sweetalert2';
import { Dialog, Transition } from '@headlessui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropdown from '../../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconClipboardText from '../../components/Icon/IconClipboardText';
import IconListCheck from '../../components/Icon/IconListCheck';
import IconThumbUp from '../../components/Icon/IconThumbUp';
import IconStar from '../../components/Icon/IconStar';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconSquareRotated from '../../components/Icon/IconSquareRotated';
import IconPlus from '../../components/Icon/IconPlus';
import IconSearch from '../../components/Icon/IconSearch';
import IconMenu from '../../components/Icon/IconMenu';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconUser from '../../components/Icon/IconUser';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import IconX from '../../components/Icon/IconX';
import IconRestore from '../../components/Icon/IconRestore';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import axios from 'axios';

const Todolist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Todolist'));
    });
    const defaultParams = {
        id: null,
        title: '',
        description: '',
        descriptionText: '',
        assignee: '',
        path: '',
        tag: '',
        priority: 'low',
        date: '',
        time: '',
    };

    const [selectedTab, setSelectedTab] = useState('');
    const [isShowTaskMenu, setIsShowTaskMenu] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [viewTaskModal, setViewTaskModal] = useState(false);
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const [allTasks, setAllTasks] = useState([]);

    const [filteredTasks, setFilteredTasks] = useState<any>(allTasks);
    const [pagedTasks, setPagedTasks] = useState<any>(filteredTasks);
    const [searchTask, setSearchTask] = useState<any>('');
    const [selectedTask, setSelectedTask] = useState<any>(defaultParams);
    const [isPriorityMenu] = useState<any>(null);
    const [isTagMenu] = useState<any>(null);

    const [pager] = useState<any>({
        currentPage: 1,
        totalPages: 0,
        pageSize: 10,
        startIndex: 0,
        endIndex: 0,
    });

    useEffect(() => {
        searchTasks();
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [selectedTab, searchTask, allTasks]);

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const searchTasks = (isResetPage = true) => {
        if (isResetPage) {
            pager.currentPage = 1;
        }
        let res;
        if (selectedTab === 'complete' || selectedTab === 'important' || selectedTab === 'trash') {
            res = allTasks.filter((d) => d.status === selectedTab);
        } else {
            res = allTasks.filter((d) => d.status !== 'trash');
        }

        if (selectedTab === 'team' || selectedTab === 'update') {
            res = res.filter((d) => d.tag === selectedTab);
        } else if (selectedTab === 'high' || selectedTab === 'medium' || selectedTab === 'low') {
            res = res.filter((d) => d.priority === selectedTab);
        }
        setFilteredTasks([...res.filter((d: any) => d.title?.toLowerCase().includes(searchTask))]);
        getPager(res.filter((d: any) => d.title?.toLowerCase().includes(searchTask)));
    };

    const getPager = (res: any) => {
        setTimeout(() => {
            if (res.length) {
                pager.totalPages = pager.pageSize < 1 ? 1 : Math.ceil(res.length / pager.pageSize);
                if (pager.currentPage > pager.totalPages) {
                    pager.currentPage = 1;
                }
                pager.startIndex = (pager.currentPage - 1) * pager.pageSize;
                pager.endIndex = Math.min(pager.startIndex + pager.pageSize - 1, res.length - 1);
                setPagedTasks(res.slice(pager.startIndex, pager.endIndex + 1));
            } else {
                setPagedTasks([]);
                pager.startIndex = -1;
                pager.endIndex = -1;
            }
        });
    };

    const setPriority = (task: any, name: string = '') => {
        let item = filteredTasks.find((d: any) => d.id === task.id);
        item.priority = name;
        searchTasks(false);
    };

    const setTag = (task: any, name: string = '') => {
        let item = filteredTasks.find((d: any) => d.id === task.id);
        item.tag = name;
        searchTasks(false);
    };

    const tabChanged = () => {
        setIsShowTaskMenu(false);
    };

    const taskComplete = async (task: any = null) => {
        let item = filteredTasks.find((d: any) => d.id === task.id);
        item.status = item.status === 'complete' ? '' : 'complete';

        console.log(task._id);

        try {
            const response = await axios.put(
                `http://localhost:8070/todo/updateTaskStatus/${task._id}`,
                { status: item.status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: error.response ? error.response.data.message : error.message || 'Error updating task ',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };

    const setImportant = async (task: any = null) => {
        let item = filteredTasks.find((d: any) => d.id === task.id);
        item.status = item.status === 'important' ? '' : 'important';

        try {
            const response = await axios.put(
                `http://localhost:8070/todo/updateTaskStatus/${task._id}`,
                { status: item.status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: error.response ? error.response.data.message : error.message || 'Error updating task ',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };

    const viewTask = (item: any = null) => {
        setSelectedTask(item);
        setTimeout(() => {
            setViewTaskModal(true);
        });
    };

    const addEditTask = (task: any = null) => {
        setIsShowTaskMenu(false);
        let json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (task) {
            let json1 = JSON.parse(JSON.stringify(task));
            setParams(json1);
        }
        setAddTaskModal(true);
    };

    const deleteTask = async (task: any, type: string = '') => {
        if (type === 'delete') {
            task.status = 'trash';
        } else if (type === 'restore') {
            task.status = '';
        }

        try {
            const response = await axios.put(
                `http://localhost:8070/todo/updateTaskStatus/${task._id}`,
                { status: task.status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: error.response ? error.response.data.message : error.message || 'Error updating task ',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };
    const token = localStorage.getItem('token');

    const deleteTodo = async (todoId: any) => {
        try {
            // Make the DELETE request to delete the To-Do
            const response = await axios.delete(`http://localhost:8070/todo/deleteTodo/${todoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                showMessage('Task deleted successfully!', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: error.response?.data?.error || 'Error deleting task ',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                // Make the GET request to fetch all todos
                const response = await axios.get('http://localhost:8070/todo/getAllTodo ', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setAllTasks(response.data);
            } catch (error) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: error.response?.data?.error || 'Error creating task ',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        };

        fetchTodos();
    }, []);

    const saveTask = async () => {
        if (!params.title) {
            showMessage('Title is required.', 'error');
            return false;
        }
        if (!params.date) {
            showMessage('Date is required.', 'error');
            return false;
        }
        if (!params.time) {
            showMessage('Time is required.', 'error');
            return false;
        }
        if (!params.description) {
            showMessage('Description is required.', 'error');
            return false;
        }

        if (params._id) {
            //update task
            setAllTasks(
                allTasks.map((d: any) => {
                    if (d.id === params.id) {
                        d = params;
                    }
                    return d;
                })
            );
        } else {
            // Prepare data to send
            const taskData = {
                title: params.title,
                date: params.date,
                time: params.time,
                description: params.description,
                tag: params.tag,
                priority: params.priority,
            };

            try {
                const response = await axios
                    .post('http://localhost:8070/todo/addTodo', taskData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        showMessage('Task saved successfully!', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        setAddTaskModal(false);
                    })
                    .catch((error) => {
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'error',
                            title: error.response?.data?.error || 'Error creating task ',
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
                    title: error.response?.data?.error || 'Error creating task ',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
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

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

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
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                <div
                    className={`panel p-4 flex-none w-[240px] max-w-full absolute xl:relative z-10 space-y-4 xl:h-auto h-full xl:block ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none hidden ${
                        isShowTaskMenu && '!block'
                    }`}
                >
                    <div className="flex flex-col h-full pb-16">
                        <div className="pb-5">
                            <div className="flex text-center items-center">
                                <div className="shrink-0">
                                    <IconClipboardText />
                                </div>
                                <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">Todo list</h3>
                            </div>
                        </div>
                        <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b] mb-5"></div>
                        <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                            <div className="space-y-1">
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                        selectedTab === '' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                    }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconListCheck className="w-4.5 h-4.5 shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">Inbox</div>
                                    </div>
                                    <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                                        {allTasks && allTasks.filter((d) => d.status !== 'trash').length}
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                        selectedTab === 'complete' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('complete');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconThumbUp className="w-5 h-5 shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">Done</div>
                                    </div>
                                    <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                                        {allTasks && allTasks.filter((d) => d.status === 'complete').length}
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                        selectedTab === 'important' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('important');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconStar className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">Important</div>
                                    </div>
                                    <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                                        {allTasks && allTasks.filter((d) => d.status === 'important').length}
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                        selectedTab === 'trash' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('trash');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconTrashLines className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">Trash</div>
                                    </div>
                                </button>
                                <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                                <div className="text-white-dark px-1 py-3">Tags</div>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-success ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${
                                        selectedTab === 'team' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('team');
                                    }}
                                >
                                    <IconSquareRotated className="fill-success shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">Team</div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-warning ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${
                                        selectedTab === 'low' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('low');
                                    }}
                                >
                                    <IconSquareRotated className="fill-warning shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">Low</div>
                                </button>

                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-primary ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${
                                        selectedTab === 'medium' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('medium');
                                    }}
                                >
                                    <IconSquareRotated className="fill-primary shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">Medium</div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-danger ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${
                                        selectedTab === 'high' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('high');
                                    }}
                                >
                                    <IconSquareRotated className="fill-danger shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">High</div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-info ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${
                                        selectedTab === 'update' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('update');
                                    }}
                                >
                                    <IconSquareRotated className="fill-info shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">Update</div>
                                </button>
                            </div>
                        </PerfectScrollbar>
                        <div className="ltr:left-0 rtl:right-0 absolute bottom-0 p-4 w-full">
                            <button className="btn btn-primary w-full" type="button" onClick={() => addEditTask()}>
                                <IconPlus className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                Add New Task
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden ${isShowTaskMenu && '!block xl:!hidden'}`} onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}></div>
                <div className="panel p-0 flex-1 overflow-auto h-full">
                    <div className="flex flex-col h-full">
                        <div className="p-4 flex sm:flex-row flex-col w-full sm:items-center gap-4">
                            <div className="ltr:mr-3 rtl:ml-3 flex items-center">
                                <button type="button" className="xl:hidden hover:text-primary block ltr:mr-3 rtl:ml-3" onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}>
                                    <IconMenu />
                                </button>
                                <div className="relative group flex-1">
                                    <input
                                        type="text"
                                        className="form-input peer ltr:!pr-10 rtl:!pl-10"
                                        placeholder="Search Task..."
                                        value={searchTask}
                                        onChange={(e) => setSearchTask(e.target.value)}
                                        onKeyUp={() => searchTasks()}
                                    />
                                    <div className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                                        <IconSearch />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center sm:justify-end sm:flex-auto flex-1">
                                <p className="ltr:mr-3 rtl:ml-3">{pager.startIndex + 1 + '-' + (pager.endIndex + 1) + ' of ' + filteredTasks.length}</p>
                                <button
                                    type="button"
                                    disabled={pager.currentPage === 1}
                                    className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                    onClick={() => {
                                        pager.currentPage--;
                                        searchTasks(false);
                                    }}
                                >
                                    <IconCaretDown className="w-5 h-5 rtl:-rotate-90 rotate-90" />
                                </button>
                                <button
                                    type="button"
                                    disabled={pager.currentPage === pager.totalPages}
                                    className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 disabled:opacity-60 disabled:cursor-not-allowed"
                                    onClick={() => {
                                        pager.currentPage++;
                                        searchTasks(false);
                                    }}
                                >
                                    <IconCaretDown className="w-5 h-5 rtl:rotate-90 -rotate-90" />
                                </button>
                            </div>
                        </div>
                        <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

                        {pagedTasks.length ? (
                            <div className="table-responsive grow overflow-y-auto sm:min-h-[300px] min-h-[400px]">
                                <table className="table-hover">
                                    <tbody>
                                        {pagedTasks.map((task: any) => {
                                            const { formattedDate } = formatDateTime(task.date);
                                            const formattedTime = formatTime(task.time);
                                            return (
                                                <tr className={`group cursor-pointer ${task.status === 'complete' ? 'bg-white-light/30 dark:bg-[#1a2941]' : ''}`} key={task._id}>
                                                    <td className="w-1">
                                                        <input
                                                            type="checkbox"
                                                            id={`chk-${task._id}`}
                                                            className="form-checkbox"
                                                            disabled={selectedTab === 'trash'}
                                                            onClick={() => taskComplete(task)}
                                                            defaultChecked={task.status === 'complete'}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div onClick={() => viewTask(task)}>
                                                            <div className={`group-hover:text-primary font-semibold text-base whitespace-nowrap ${task.status === 'complete' ? 'line-through' : ''}`}>
                                                                {task.title}
                                                            </div>
                                                            <div
                                                                className={`text-white-dark overflow-hidden min-w-[300px] line-clamp-1 ${task.status === 'complete' ? 'line-through' : ''}`}
                                                                dangerouslySetInnerHTML={{ __html: task.description }}
                                                            ></div>
                                                        </div>
                                                    </td>
                                                    <td className="w-1">
                                                        <div className="flex items-center ltr:justify-end rtl:justify-start space-x-2 rtl:space-x-reverse">
                                                            {task.priority && (
                                                                <div className="dropdown">
                                                                    <Dropdown
                                                                        offset={[0, 5]}
                                                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                                        btnClassName="align-middle"
                                                                        button={
                                                                            <span
                                                                                className={`badge rounded-full capitalize hover:top-0 hover:text-white ${
                                                                                    task.priority === 'medium'
                                                                                        ? 'badge-outline-primary hover:bg-primary'
                                                                                        : task.priority === 'low'
                                                                                        ? 'badge-outline-warning hover:bg-warning'
                                                                                        : task.priority === 'high'
                                                                                        ? 'badge-outline-danger hover:bg-danger'
                                                                                        : task.priority === 'medium' && isPriorityMenu === task.id
                                                                                        ? 'text-white bg-primary'
                                                                                        : task.priority === 'low' && isPriorityMenu === task.id
                                                                                        ? 'text-white bg-warning'
                                                                                        : task.priority === 'high' && isPriorityMenu === task.id
                                                                                        ? 'text-white bg-danger'
                                                                                        : ''
                                                                                }`}
                                                                            >
                                                                                {task.priority}
                                                                            </span>
                                                                        }
                                                                    >
                                                                        <ul className="text-sm text-medium">
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    className="w-full text-danger ltr:text-left rtl:text-right"
                                                                                    onClick={() => setPriority(task, 'high')}
                                                                                >
                                                                                    High
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    className="w-full text-primary ltr:text-left rtl:text-right"
                                                                                    onClick={() => setPriority(task, 'medium')}
                                                                                >
                                                                                    Medium
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    className="w-full text-warning ltr:text-left rtl:text-right"
                                                                                    onClick={() => setPriority(task, 'low')}
                                                                                >
                                                                                    Low
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </Dropdown>
                                                                </div>
                                                            )}

                                                            {task.tag && (
                                                                <div className="dropdown">
                                                                    <Dropdown
                                                                        offset={[0, 5]}
                                                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                                        btnClassName="align-middle"
                                                                        button={
                                                                            <span
                                                                                className={`badge rounded-full capitalize hover:top-0 hover:text-white ${
                                                                                    task.tag === 'team'
                                                                                        ? 'badge-outline-success hover:bg-success'
                                                                                        : task.tag === 'update'
                                                                                        ? 'badge-outline-info hover:bg-info'
                                                                                        : task.tag === 'team' && isTagMenu === task.id
                                                                                        ? 'text-white bg-success '
                                                                                        : task.tag === 'update' && isTagMenu === task.id
                                                                                        ? 'text-white bg-info '
                                                                                        : ''
                                                                                }`}
                                                                            >
                                                                                {task.tag}
                                                                            </span>
                                                                        }
                                                                    >
                                                                        <ul className="text-sm text-medium">
                                                                            <li>
                                                                                <button type="button" className="text-success" onClick={() => setTag(task, 'team')}>
                                                                                    Team
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button type="button" className="text-info" onClick={() => setTag(task, 'update')}>
                                                                                    Update
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button type="button" onClick={() => setTag(task, '')}>
                                                                                    None
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </Dropdown>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td style={{ width: '200px' }}>
                                                        <div className="flex flex-col items-start">
                                                            <div className="text-sm font-semibold text-gray-800">{formattedDate}</div>
                                                            <div className="text-xs text-gray-600">{formattedTime}</div>
                                                        </div>
                                                    </td>
                                                    <td className="w-1">
                                                        <div className="flex items-center justify-between w-max ltr:ml-auto rtl:mr-auto">
                                                            <div className="dropdown">
                                                                <Dropdown
                                                                    offset={[0, 5]}
                                                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                                    btnClassName="align-middle"
                                                                    button={<IconHorizontalDots className="rotate-90 opacity-70" />}
                                                                >
                                                                    <ul className="whitespace-nowrap">
                                                                        {selectedTab !== 'trash' && (
                                                                            <>
                                                                                <li>
                                                                                    <button type="button" onClick={() => addEditTask(task)}>
                                                                                        <IconPencilPaper className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                        Edit
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="button" onClick={() => deleteTask(task, 'delete')}>
                                                                                        <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                        Delete
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="button" onClick={() => setImportant(task)}>
                                                                                        <IconStar className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                        <span>{task.status === 'important' ? 'Not Important' : 'Important'}</span>
                                                                                    </button>
                                                                                </li>
                                                                            </>
                                                                        )}
                                                                        {selectedTab === 'trash' && (
                                                                            <>
                                                                                <li>
                                                                                    <button type="button" onClick={() => deleteTodo(task._id)}>
                                                                                        <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                        Permanent Delete
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="button" onClick={() => deleteTask(task, 'restore')}>
                                                                                        <IconRestore className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                        Restore Task
                                                                                    </button>
                                                                                </li>
                                                                            </>
                                                                        )}
                                                                    </ul>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center sm:min-h-[300px] min-h-[400px] font-semibold text-lg h-full">No data available</div>
                        )}
                    </div>
                </div>

                <Transition appear show={addTaskModal} as={Fragment}>
                    <Dialog as="div" open={addTaskModal} onClose={() => setAddTaskModal(false)} className="relative z-[51]">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
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
                                            onClick={() => setAddTaskModal(false)}
                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <IconX />
                                        </button>
                                        <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                            {params._id ? 'Edit Task' : 'Add Task'}
                                        </div>
                                        <div className="p-5">
                                            <form>
                                                <div className="mb-5">
                                                    <label htmlFor="title">Title</label>
                                                    <input id="title" type="text" placeholder="Enter Task Title" className="form-input" value={params.title} onChange={(e) => changeValue(e)} />
                                                </div>
                                                <div className="mb-5 flex justify-between gap-4">
                                                    <div className="flex-1">
                                                        <label htmlFor="date">Date</label>
                                                        <Flatpickr
                                                            id="date"
                                                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                            className="form-input placeholder:text-white-dark"
                                                            placeholder="Allocate a date"
                                                            value={params.date}
                                                            onChange={(selectedDates) => {
                                                                changeValue({ target: { id: 'date', value: selectedDates[0] } });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label htmlFor="time">Time</label>
                                                        <Flatpickr
                                                            id="time"
                                                            options={{
                                                                noCalendar: true,
                                                                enableTime: true,
                                                                dateFormat: 'H:i',
                                                                position: isRtl ? 'auto right' : 'auto left',
                                                            }}
                                                            className="form-input"
                                                            placeholder="Allocate a time"
                                                            value={params.time || ''}
                                                            onChange={(selectedDates) => {
                                                                changeValue({ target: { id: 'time', value: selectedDates[0] } });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-5 flex justify-between gap-4">
                                                    <div className="flex-1">
                                                        <label htmlFor="tag">Tag</label>
                                                        <select id="tag" className="form-select" value={params.tag} onChange={(e) => changeValue(e)}>
                                                            <option value="">Select Tag</option>
                                                            <option value="team">Team</option>
                                                            <option value="update">Update</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex-1">
                                                        <label htmlFor="priority">Priority</label>
                                                        <select id="priority" className="form-select" value={params.priority} onChange={(e) => changeValue(e)}>
                                                            <option value="">Select Priority</option>
                                                            <option value="low">Low</option>
                                                            <option value="medium">Medium</option>
                                                            <option value="high">High</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mb-5">
                                                    <label>Description</label>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={params.description}
                                                        defaultValue={params.description}
                                                        onChange={(content, delta, source, editor) => {
                                                            params.description = content;
                                                            params.descriptionText = editor.getText();
                                                            setParams({
                                                                ...params,
                                                            });
                                                        }}
                                                        style={{ minHeight: '200px' }}
                                                    />
                                                </div>
                                                <div className="ltr:text-right rtl:text-left flex justify-end items-center mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setAddTaskModal(false)}>
                                                        Cancel
                                                    </button>
                                                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => saveTask()}>
                                                        {params._id ? 'Update' : 'Add'}
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

                <Transition appear show={viewTaskModal} as={Fragment}>
                    <Dialog as="div" open={viewTaskModal} onClose={() => setViewTaskModal(false)} className="relative z-[51]">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
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
                                            onClick={() => setViewTaskModal(false)}
                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <IconX />
                                        </button>
                                        <div className="flex items-center flex-wrap gap-2 text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                            <div>{selectedTask.title}</div>
                                            {selectedTask.priority && (
                                                <div
                                                    className={`badge rounded-3xl capitalize ${
                                                        selectedTask.priority === 'medium'
                                                            ? 'badge-outline-primary'
                                                            : selectedTask.priority === 'low'
                                                            ? 'badge-outline-warning '
                                                            : selectedTask.priority === 'high'
                                                            ? 'badge-outline-danger '
                                                            : ''
                                                    }`}
                                                >
                                                    {selectedTask.priority}
                                                </div>
                                            )}
                                            {selectedTask.tag && (
                                                <div
                                                    className={`badge rounded-3xl capitalize ${
                                                        selectedTask.tag === 'team' ? 'badge-outline-success' : selectedTask.tag === 'update' ? 'badge-outline-info ' : ''
                                                    }`}
                                                >
                                                    {selectedTask.tag}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <div className="text-base prose" dangerouslySetInnerHTML={{ __html: selectedTask.description }}></div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setViewTaskModal(false)}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
};

export default Todolist;
