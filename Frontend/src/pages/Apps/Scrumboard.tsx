import Dropdown from '../../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import { IRootState } from '../../store';
import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPlus from '../../components/Icon/IconPlus';
import IconPlusCircle from '../../components/Icon/IconPlusCircle';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconTag from '../../components/Icon/IconTag';
import IconCalendar from '../../components/Icon/IconCalendar';
import IconEdit from '../../components/Icon/IconEdit';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconX from '../../components/Icon/IconX';
import axios from 'axios';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const Scrumboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Scrumboard'));
    });
    const [projectList, setProjectList] = useState<any>([]);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                // Make the GET request to fetch all todos
                const response = await axios.get('http://localhost:8070/goal/getAllGoals ', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProjectList(response.data);
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

        fetchGoals();
    }, []);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };
    const [params, setParams] = useState<any>({
        id: '',
        title: '',
    });
    const [paramsTask, setParamsTask] = useState<any>({
        projectId: '',
        title: '',
        description: '',
        tags: '',
        date: '',
    });

    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [isAddProjectModal, setIsAddProjectModal] = useState(false);
    const [isAddTaskModal, setIsAddTaskModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const addEditProject = (project: any = null) => {
        setTimeout(() => {
            setParams({
                id: null,
                title: '',
            });
            if (project) {
                let projectData = JSON.parse(JSON.stringify(project));
                setParams(projectData);
            }
            setIsAddProjectModal(true);
        });
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

    const token = localStorage.getItem('token');

    const saveProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!params.title) {
            showMessage('Title is required.', 'error');
            return false;
        }

        if (params._id) {
            //update project

            try {
                const response = await axios
                    .put(
                        `http://localhost:8070/goal/updateGoalDetails/${params._id}`,
                        { title: params.title },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((response) => {
                        showMessage('Goal successfully updated!', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        setIsAddProjectModal(false);
                    })
                    .catch((error) => {
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'error',
                            title: error.response?.data?.error || 'Error updating goal ',
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
                    title: error.response?.data?.error || 'Error updating goal ',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        } else {
            try {
                const response = await axios
                    .post(
                        'http://localhost:8070/goal/addGoal',
                        { title: params.title },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((response) => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        showMessage('Goal created successfully.');
                        setIsAddProjectModal(false);
                    })
                    .catch((error) => {
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'error',
                            title: error.response?.data?.error || 'Error creating goal ',
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
                    title: error.response?.data?.error || 'Error creating goal ',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        }
    };

    const deleteProject = async (project: any) => {
        try {
            const response = await axios.delete(`http://localhost:8070/goal/deleteGoal/${project._id}`);

            // Notify success
            showMessage('Goal deleted successfully.');
            setIsDeleteModal(false);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error deleting goal:', error);

            // Notify failure
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while trying to delete the goal.',
            });
        }
    };

    const clearProjects = (project: any) => {
        setParamsTask((project.tasks = []));
    };

    const addTaskData = (e: any) => {
        const { value, id } = e.target;
        setParamsTask({ ...paramsTask, [id]: value });
    };

    const addEditTask = (projectId: any, task: any = null) => {
        setParamsTask({
            projectId: projectId,
            id: null,
            title: '',
            description: '',
            tags: '',
            date: '',
        });
        if (task) {
            let data = JSON.parse(JSON.stringify(task));
            data.projectId = projectId;
            data.tags = data.tags ? data.tags.toString() : '';
            setParamsTask(data);
        }
        setIsAddTaskModal(true);
    };

    const saveTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!paramsTask.title) {
            showMessage('Title is required.', 'error');
            return false;
        }

        if (paramsTask._id) {
            const taskData = {
                title: paramsTask.title,
                date: paramsTask.date,
                description: paramsTask.description,
                tags: paramsTask.tags?.length > 0 ? paramsTask.tags.split(',') : [],
            };

            try {
                const response = await axios
                    .put(`http://localhost:8070/goal/updateTaskInGoal/${paramsTask.projectId}/task/${paramsTask._id}`, taskData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        showMessage('Task Updated!', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        setIsAddTaskModal(false);
                    })
                    .catch((error) => {
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'error',
                            title: error.response?.data?.error || 'Error updating task ',
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
                    title: error.response?.data?.error || 'Error updating task ',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        } else {
            const taskData = {
                title: paramsTask.title,
                date: paramsTask.date,
                description: paramsTask.description,
                tags: paramsTask.tags?.length > 0 ? paramsTask.tags.split(',') : [],
            };

            try {
                const response = await axios
                    .post(`http://localhost:8070/goal/addTaskToGoal/${paramsTask.projectId}`, taskData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        showMessage('Task added!', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        setIsAddTaskModal(false);
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

    const deleteConfirmModal = (projectId: any, task: any = null) => {
        setSelectedTask({
            projectId: projectId,
            task: task._id,
        });
        setTimeout(() => {
            setIsDeleteModal(true);
        }, 10);
    };
    const deleteTask = async () => {
        try {
            const response = await axios.delete(`http://localhost:8070/goal/goal/${selectedTask.projectId}/task/${selectedTask.task}`);

            // Notify success
            Swal.fire({
                icon: 'success',
                title: 'Task Deleted',
                text: 'The task has been successfully removed.',
            });
            setIsDeleteModal(false);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error deleting task:', error);

            // Notify failure
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while trying to delete the task.',
            });
        }
    };

    return (
        <div>
            <div>
                <button
                    type="button"
                    className="btn btn-primary flex"
                    onClick={() => {
                        addEditProject();
                    }}
                >
                    <IconPlus className="w-5 h-5 ltr:mr-3 rtl:ml-3" />
                    Add Goal
                </button>
            </div>
            {/* project list  */}
            <div className="relative pt-5">
                <div className="perfect-scrollbar h-full -mx-2">
                    <div className="overflow-x-auto flex items-start flex-nowrap gap-5 pb-2 px-2">
                        {projectList.map((project: any) => {
                            return (
                                <div key={project._id} className="panel w-80 flex-none" data-group={project._id}>
                                    <div className="flex justify-between mb-5">
                                        <h4 className="text-base font-semibold">{project.title}</h4>

                                        <div className="flex items-center">
                                            <button onClick={() => addEditTask(project._id)} type="button" className="hover:text-primary ltr:mr-2 rtl:ml-2">
                                                <IconPlusCircle />
                                            </button>
                                            <div className="dropdown">
                                                <Dropdown
                                                    offset={[0, 5]}
                                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                    button={<IconHorizontalDots className="opacity-70 hover:opacity-100" />}
                                                >
                                                    <ul>
                                                        <li>
                                                            <button type="button" onClick={() => addEditProject(project)}>
                                                                Edit
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={() => deleteProject(project)}>
                                                                Delete
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>

                                    {project.tasks.map((task: any) => {
                                        return (
                                            <div className="sortable-list " key={project.id + '' + task.id}>
                                                <div className="shadow bg-[#f4f4f4] dark:bg-white-dark/20 p-3 pb-5 rounded-md mb-5 space-y-3 cursor-move">
                                                    {task.image ? <img src="/assets/images/carousel1.jpeg" alt="images" className="h-32 w-full object-cover rounded-md" /> : ''}
                                                    <div className="text-lg font-semibold">{task.title}</div>
                                                    <p className="break-all">{task.description}</p>
                                                    <div className="flex gap-2 items-center flex-wrap">
                                                        {task.tags?.length ? (
                                                            task.tags.map((tag: any, i: any) => {
                                                                return (
                                                                    <div key={i} className="btn px-2 py-1 flex btn-outline-primary">
                                                                        <IconTag className="shrink-0" />
                                                                        <span className="ltr:ml-2 rtl:mr-2">{tag}</span>
                                                                    </div>
                                                                );
                                                            })
                                                        ) : (
                                                            <div className="btn px-2 py-1 flex text-white-dark dark:border-white-dark/50 shadow-none">
                                                                <IconTag className="shrink-0" />
                                                                <span className="ltr:ml-2 rtl:mr-2">No Tags</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="font-medium flex items-center hover:text-primary">
                                                            <IconCalendar className="ltr:mr-3 rtl:ml-3 shrink-0" />
                                                            <span>{new Date(task.date).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <button onClick={() => addEditTask(project._id, task)} type="button" className="hover:text-info">
                                                                <IconEdit className="ltr:mr-3 rtl:ml-3" />
                                                            </button>
                                                            <button onClick={() => deleteConfirmModal(project._id, task)} type="button" className="hover:text-danger">
                                                                <IconTrashLines />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="pt-3">
                                        <button type="button" className="btn btn-primary mx-auto" onClick={() => addEditTask(project._id)}>
                                            <IconPlus />
                                            Add Task
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* add project modal */}
            <Transition appear show={isAddProjectModal} as={Fragment}>
                <Dialog as="div" open={isAddProjectModal} onClose={() => setIsAddProjectModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] px-4 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen">
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
                                        onClick={() => setIsAddProjectModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">{params._id ? 'Edit Goal' : 'Add Goal'}</div>
                                    <div className="p-5">
                                        <form onSubmit={saveProject}>
                                            <div className="grid gap-5">
                                                <div>
                                                    <label htmlFor="title">Name</label>
                                                    <input id="title" value={params.title} onChange={changeValue} type="text" className="form-input mt-1" placeholder="Enter Name" />
                                                </div>
                                            </div>

                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setIsAddProjectModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
            {/* add task modal */}
            <Transition appear show={isAddTaskModal} as={Fragment}>
                <Dialog as="div" open={isAddTaskModal} onClose={() => setIsAddTaskModal(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                <button onClick={() => setIsAddTaskModal(false)} type="button" className="absolute top-4 ltr:right-4 rtl:left-4 text-white-dark hover:text-dark">
                                    <IconX />
                                </button>
                                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">{paramsTask._id ? 'Edit Task' : 'Add Task'}</div>
                                <div className="p-5">
                                    <form onSubmit={saveTask}>
                                        <div className="grid gap-5">
                                            <div>
                                                <label htmlFor="taskTitle">Name</label>
                                                <input id="title" value={paramsTask.title} onChange={addTaskData} type="text" className="form-input" placeholder="Enter Name" />
                                            </div>
                                            <div>
                                                <label htmlFor="date">Date</label>
                                                <Flatpickr
                                                    id="date"
                                                    options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                    className="form-input placeholder:text-white-dark"
                                                    placeholder="Allocate a date"
                                                    value={paramsTask.date}
                                                    onChange={(selectedDates) => {
                                                        // Flatpickr passes selectedDates as an array, use the first value
                                                        setParamsTask({ ...paramsTask, date: selectedDates[0] });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="taskTag">Tag</label>
                                                <input id="tags" value={paramsTask.tags} onChange={addTaskData} type="text" className="form-input" placeholder="Enter Tag" />
                                            </div>
                                            <div>
                                                <label htmlFor="taskdesc">Description</label>
                                                <textarea
                                                    id="description"
                                                    value={paramsTask.description}
                                                    onChange={addTaskData}
                                                    className="form-textarea min-h-[130px]"
                                                    placeholder="Enter Description"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button onClick={() => setIsAddTaskModal(false)} type="button" className="btn btn-outline-danger">
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                {paramsTask._id ? 'Update' : 'Add'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* delete task modal */}
            <Transition appear show={isDeleteModal} as={Fragment}>
                <Dialog as="div" open={isDeleteModal} onClose={() => setIsDeleteModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden md:w-full max-w-lg w-[90%] my-8">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsDeleteModal(false);
                                        }}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-white-dark"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Delete Task</div>
                                    <div className="p-5 text-center">
                                        <div className="text-white bg-danger ring-4 ring-danger/30 p-4 rounded-full w-fit mx-auto">
                                            <IconTrashLines />
                                        </div>
                                        <div className="text-base sm:w-3/4 mx-auto mt-5">Are you sure you want to delete Task?</div>

                                        <div className="flex justify-center items-center mt-8">
                                            <button
                                                onClick={() => {
                                                    setIsDeleteModal(false);
                                                }}
                                                type="button"
                                                className="btn btn-outline-danger"
                                            >
                                                Cancel
                                            </button>
                                            <button onClick={deleteTask} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Delete
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
    );
};
export default Scrumboard;
