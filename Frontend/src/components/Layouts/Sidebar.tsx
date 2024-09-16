import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuChat from '../Icon/Menu/IconMenuChat';
import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '../Icon/Menu/IconMenuTodo';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '../Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '../Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '../Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '../Icon/Menu/IconMenuTables';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
import IconStar from '../Icon/IconStar';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';
import axios from 'axios';

const Sidebar = () => {
    const [role, setRole] = useState(null);
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchRole = async () => {
            try {
                // Get the Bearer token from localStorage

                // Fetch the user role from the API
                const response = await axios.get('http://localhost:8070/user/getRole', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRole(response.data);
            } catch (err) {
                console.log('An error occurred while fetching the role.');
            }
        };

        fetchRole();
    }, []);

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="ml-[5px] flex-none" src="/assets/images/logo.png" alt="logo" style={{ width: '120px' }} />
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0 pt-3">
                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/" className="group">
                                            <div className="flex items-center">
                                                <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {role === 'admin' && (
                                        <li className="nav-item">
                                            <NavLink to="/apps/users" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('users')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                    {role === 'admin' && (
                                        <li className="nav-item">
                                            <NavLink to="/apps/experts" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Experts')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                    {role === 'admin' && (
                                        <li className="nav-item">
                                            <NavLink to="/apps/payments" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Payments')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                    {role === 'user' && (
                                        <li className="nav-item">
                                            <NavLink to="/apps/paymentsUser" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Payments')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                    {role === 'admin' && (
                                        <li className="nav-item">
                                            <NavLink to="/apps/appointments" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />

                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Schedules')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                    {role === 'expert' && (
                                        <li className="nav-item">
                                            <NavLink to="/apps/expertSchedules" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />

                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Schedules')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}{' '}
                                    {role === 'user' && (
                                        <li className="nav-item">
                                            <NavLink to="/apps/userSchedules" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />

                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Schedules')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                    {role === 'expert' && (
                                        <li className="nav-item">
                                            <NavLink to="/apps/expertAppointments" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuForms className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Appointments')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                    {role === 'user' && (
                                        <li className="nav-item">
                                            <NavLink to="/apps/addAppointments" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuForms className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Appointments')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                
                                    <li className="nav-item">
                                        <NavLink to="/apps/todolist" className="group">
                                            <div className="flex items-center">
                                                <IconMenuTodo className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('todo_list')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/notes" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('notes')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {role === 'admin' && (
                                        <li className="nav-item">
                                            <NavLink to="/apps/feedbacks" className="group">
                                                <div className="flex items-center">
                                                    <IconStar className="group-hover:!text-primary shrink-0 text-gray-700" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Feedbacks')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                    {role === 'user' && (
                                        <li className="nav-item">
                                            <NavLink to="/apps/scrumboard" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuScrumboard className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Goal Planner')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <NavLink to="/apps/calendar" className="group">
                                            <div className="flex items-center">
                                                <IconMenuCalendar className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('calendar')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {role === 'user' && (
                                        <li className="nav-item">
                                            <NavLink to="/apps/ai" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuElements className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('AI Tools')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
