import { lazy } from 'react';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Index = lazy(() => import('../pages/Index'));
const Todolist = lazy(() => import('../pages/Apps/Todolist'));
const Mailbox = lazy(() => import('../pages/Apps/Mailbox'));
const Notes = lazy(() => import('../pages/Apps/Notes'));
const Users = lazy(() => import('../pages/Apps/Users'));
const Experts = lazy(() => import('../pages/Apps/Experts'));
const Feedbacks = lazy(() => import('../pages/Apps/Feedbacks'));
const Appointments = lazy(() => import('../pages/Apps/Appointments'));
const UserSchedules = lazy(() => import('../pages/Apps/UserSchedules'));
const ExpertSchedules = lazy(() => import('../pages/Apps/ExpertSchedules'));
const UserAppointments = lazy(() => import('../pages/Apps/UserAppointments'));
const ExpertAppointments = lazy(() => import('../pages/Apps/ExpertAppointments'));
const Payments = lazy(() => import('../pages/Apps/Payments'));
const PaymentsUser = lazy(() => import('../pages/Apps/PaymentsUser'));
const Chat = lazy(() => import('../pages/Apps/Chat'));
const AITools = lazy(() => import('../pages/Apps/AITools'));
const Scrumboard = lazy(() => import('../pages/Apps/Scrumboard'));
const Calendar = lazy(() => import('../pages/Apps/Calendar'));
const Preview = lazy(() => import('../pages/Apps/Invoice/Preview'));
const Add = lazy(() => import('../pages/Apps/Invoice/Add'));
const Edit = lazy(() => import('../pages/Apps/Invoice/Edit'));
const Tabs = lazy(() => import('../pages/Components/Tabs'));
const Accordians = lazy(() => import('../pages/Components/Accordians'));
const Modals = lazy(() => import('../pages/Components/Modals'));
const Cards = lazy(() => import('../pages/Components/Cards'));
const Carousel = lazy(() => import('../pages/Components/Carousel'));
const Countdown = lazy(() => import('../pages/Components/Countdown'));
const Counter = lazy(() => import('../pages/Components/Counter'));
const SweetAlert = lazy(() => import('../pages/Components/SweetAlert'));
const Timeline = lazy(() => import('../pages/Components/Timeline'));
const Notification = lazy(() => import('../pages/Components/Notification'));
const MediaObject = lazy(() => import('../pages/Components/MediaObject'));
const ListGroup = lazy(() => import('../pages/Components/ListGroup'));
const PricingTable = lazy(() => import('../pages/Components/PricingTable'));
const LightBox = lazy(() => import('../pages/Components/LightBox'));
const Alerts = lazy(() => import('../pages/Elements/Alerts'));
const Avatar = lazy(() => import('../pages/Elements/Avatar'));
const Badges = lazy(() => import('../pages/Elements/Badges'));
const Breadcrumbs = lazy(() => import('../pages/Elements/Breadcrumbs'));
const Buttons = lazy(() => import('../pages/Elements/Buttons'));
const Buttongroups = lazy(() => import('../pages/Elements/Buttongroups'));
const Colorlibrary = lazy(() => import('../pages/Elements/Colorlibrary'));
const DropdownPage = lazy(() => import('../pages/Elements/DropdownPage'));
const Infobox = lazy(() => import('../pages/Elements/Infobox'));
const Jumbotron = lazy(() => import('../pages/Elements/Jumbotron'));
const Loader = lazy(() => import('../pages/Elements/Loader'));
const Pagination = lazy(() => import('../pages/Elements/Pagination'));
const Popovers = lazy(() => import('../pages/Elements/Popovers'));
const Progressbar = lazy(() => import('../pages/Elements/Progressbar'));
const Search = lazy(() => import('../pages/Elements/Search'));
const Tooltip = lazy(() => import('../pages/Elements/Tooltip'));
const Treeview = lazy(() => import('../pages/Elements/Treeview'));
const Typography = lazy(() => import('../pages/Elements/Typography'));
const Widgets = lazy(() => import('../pages/Widgets'));
const FontIcons = lazy(() => import('../pages/FontIcons'));
const DragAndDrop = lazy(() => import('../pages/DragAndDrop'));
const Tables = lazy(() => import('../pages/Tables'));
const Basic = lazy(() => import('../pages/DataTables/Basic'));
const Advanced = lazy(() => import('../pages/DataTables/Advanced'));
const Skin = lazy(() => import('../pages/DataTables/Skin'));
const OrderSorting = lazy(() => import('../pages/DataTables/OrderSorting'));
const MultiColumn = lazy(() => import('../pages/DataTables/MultiColumn'));
const MultipleTables = lazy(() => import('../pages/DataTables/MultipleTables'));
const AltPagination = lazy(() => import('../pages/DataTables/AltPagination'));
const Checkbox = lazy(() => import('../pages/DataTables/Checkbox'));
const RangeSearch = lazy(() => import('../pages/DataTables/RangeSearch'));
const Export = lazy(() => import('../pages/DataTables/Export'));
const ColumnChooser = lazy(() => import('../pages/DataTables/ColumnChooser'));
const Profile = lazy(() => import('../pages/Users/Profile'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const AddPayment = lazy(() => import('../pages/Users/AddPayment'));
const KnowledgeBase = lazy(() => import('../pages/Pages/KnowledgeBase'));
const ContactUsBoxed = lazy(() => import('../pages/Pages/ContactUsBoxed'));
const ContactUsCover = lazy(() => import('../pages/Pages/ContactUsCover'));
const Faq = lazy(() => import('../pages/Pages/Faq'));
const ComingSoonBoxed = lazy(() => import('../pages/Pages/ComingSoonBoxed'));
const ComingSoonCover = lazy(() => import('../pages/Pages/ComingSoonCover'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const Maintenence = lazy(() => import('../pages/Pages/Maintenence'));
const Login = lazy(() => import('../pages/Authentication/Login'));
const Register = lazy(() => import('../pages/Authentication/Register'));
const Reset = lazy(() => import('../pages/Authentication/Reset'));
const Unlock = lazy(() => import('../pages/Authentication/Unlock'));
const About = lazy(() => import('../pages/About'));
const Error = lazy(() => import('../components/Error'));
const Charts = lazy(() => import('../pages/Charts'));
const FormBasic = lazy(() => import('../pages/Forms/Basic'));
const FormInputGroup = lazy(() => import('../pages/Forms/InputGroup'));
const FormLayouts = lazy(() => import('../pages/Forms/Layouts'));
const Validation = lazy(() => import('../pages/Forms/Validation'));
const InputMask = lazy(() => import('../pages/Forms/InputMask'));
const Select2 = lazy(() => import('../pages/Forms/Select2'));
const Touchspin = lazy(() => import('../pages/Forms/TouchSpin'));
const CheckBoxRadio = lazy(() => import('../pages/Forms/CheckboxRadio'));
const Switches = lazy(() => import('../pages/Forms/Switches'));
const Wizards = lazy(() => import('../pages/Forms/Wizards'));
const FileUploadPreview = lazy(() => import('../pages/Forms/FileUploadPreview'));
const QuillEditor = lazy(() => import('../pages/Forms/QuillEditor'));
const MarkDownEditor = lazy(() => import('../pages/Forms/MarkDownEditor'));
const DateRangePicker = lazy(() => import('../pages/Forms/DateRangePicker'));
const Clipboard = lazy(() => import('../pages/Forms/Clipboard'));

const routes = [
    // dashboard
    {
        path: '/',

        element: (
            <PrivateRoute>
                <Index />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/todolist',
        element: (
            <PrivateRoute>
                {' '}
                <Todolist />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/notes',
        element: (
            <PrivateRoute>
                {' '}
                <Notes />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/users',
        element: (
            <PrivateRoute>
                {' '}
                <Users />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/experts',
        element: (
            <PrivateRoute>
                {' '}
                <Experts />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/feedbacks',
        element: (
            <PrivateRoute>
                {' '}
                <Feedbacks />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/mailbox',
        element: (
            <PrivateRoute>
                {' '}
                <Mailbox />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/payments',
        element: (
            <PrivateRoute>
                {' '}
                <Payments />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/paymentsUser',
        element: (
            <PrivateRoute>
                {' '}
                <PaymentsUser />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/appointments',
        element: (
            <PrivateRoute>
                {' '}
                <Appointments />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/expertSchedules',
        element: (
            <PrivateRoute>
                {' '}
                <ExpertSchedules />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/userSchedules',
        element: (
            <PrivateRoute>
                {' '}
                <UserSchedules />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/addAppointments',
        element: (
            <PrivateRoute>
                {' '}
                <UserAppointments />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/expertAppointments',
        element: (
            <PrivateRoute>
                {' '}
                <ExpertAppointments />
            </PrivateRoute>
        ),
    },
    // Apps page
    {
        path: '/apps/chat',
        element: (
            <PrivateRoute>
                {' '}
                <Chat />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/ai',
        element: (
            <PrivateRoute>
                {' '}
                <AITools />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/scrumboard',
        element: (
            <PrivateRoute>
                {' '}
                <Scrumboard />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/calendar',
        element: (
            <PrivateRoute>
                {' '}
                <Calendar />
            </PrivateRoute>
        ),
    },
    // preview page
    {
        path: '/apps/invoice/preview',
        element: (
            <PrivateRoute>
                {' '}
                <Preview />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/invoice/add',
        element: (
            <PrivateRoute>
                {' '}
                <Add />
            </PrivateRoute>
        ),
    },
    {
        path: '/apps/invoice/edit',
        element: (
            <PrivateRoute>
                {' '}
                <Edit />
            </PrivateRoute>
        ),
    },
    // components page
    {
        path: '/components/tabs',
        element: (
            <PrivateRoute>
                {' '}
                <Tabs />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/accordions',
        element: (
            <PrivateRoute>
                {' '}
                <Accordians />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/modals',
        element: (
            <PrivateRoute>
                {' '}
                <Modals />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/cards',
        element: (
            <PrivateRoute>
                {' '}
                <Cards />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/carousel',
        element: (
            <PrivateRoute>
                {' '}
                <Carousel />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/countdown',
        element: (
            <PrivateRoute>
                {' '}
                <Countdown />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/counter',
        element: (
            <PrivateRoute>
                {' '}
                <Counter />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/sweetalert',
        element: (
            <PrivateRoute>
                {' '}
                <SweetAlert />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/timeline',
        element: (
            <PrivateRoute>
                {' '}
                <Timeline />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/notifications',
        element: (
            <PrivateRoute>
                {' '}
                <Notification />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/media-object',
        element: (
            <PrivateRoute>
                {' '}
                <MediaObject />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/list-group',
        element: (
            <PrivateRoute>
                {' '}
                <ListGroup />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/pricing-table',
        element: (
            <PrivateRoute>
                {' '}
                <PricingTable />
            </PrivateRoute>
        ),
    },
    {
        path: '/components/lightbox',
        element: (
            <PrivateRoute>
                {' '}
                <LightBox />
            </PrivateRoute>
        ),
    },
    // elements <PrivateRoute> pag</PrivateRoute>e
    {
        path: '/elements/alerts',
        element: (
            <PrivateRoute>
                {' '}
                <Alerts />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/avatar',
        element: (
            <PrivateRoute>
                {' '}
                <Avatar />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/badges',
        element: (
            <PrivateRoute>
                {' '}
                <Badges />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/breadcrumbs',
        element: (
            <PrivateRoute>
                {' '}
                <Breadcrumbs />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/buttons',
        element: (
            <PrivateRoute>
                {' '}
                <Buttons />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/buttons-group',
        element: (
            <PrivateRoute>
                {' '}
                <Buttongroups />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/color-library',
        element: (
            <PrivateRoute>
                {' '}
                <Colorlibrary />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/dropdown',
        element: (
            <PrivateRoute>
                {' '}
                <DropdownPage />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/infobox',
        element: (
            <PrivateRoute>
                {' '}
                <Infobox />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/jumbotron',
        element: (
            <PrivateRoute>
                {' '}
                <Jumbotron />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/loader',
        element: (
            <PrivateRoute>
                {' '}
                <Loader />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/pagination',
        element: (
            <PrivateRoute>
                {' '}
                <Pagination />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/popovers',
        element: (
            <PrivateRoute>
                {' '}
                <Popovers />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/progress-bar',
        element: (
            <PrivateRoute>
                {' '}
                <Progressbar />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/search',
        element: (
            <PrivateRoute>
                {' '}
                <Search />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/tooltips',
        element: (
            <PrivateRoute>
                {' '}
                <Tooltip />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/treeview',
        element: (
            <PrivateRoute>
                {' '}
                <Treeview />
            </PrivateRoute>
        ),
    },
    {
        path: '/elements/typography',
        element: (
            <PrivateRoute>
                {' '}
                <Typography />
            </PrivateRoute>
        ),
    },

    // charts page
    {
        path: '/charts',
        element: (
            <PrivateRoute>
                {' '}
                <Charts />
            </PrivateRoute>
        ),
    },
    // widgets page
    {
        path: '/widgets',
        element: (
            <PrivateRoute>
                {' '}
                <Widgets />
            </PrivateRoute>
        ),
    },
    //  font-icons page
    {
        path: '/font-icons',
        element: (
            <PrivateRoute>
                {' '}
                <FontIcons />
            </PrivateRoute>
        ),
    },
    //  Drag And Drop page
    {
        path: '/dragndrop',
        element: (
            <PrivateRoute>
                {' '}
                <DragAndDrop />
            </PrivateRoute>
        ),
    },
    //  Tables page
    {
        path: '/tables',
        element: (
            <PrivateRoute>
                {' '}
                <Tables />
            </PrivateRoute>
        ),
    },
    // Data Tables
    {
        path: '/datatables/basic',
        element: (
            <PrivateRoute>
                {' '}
                <Basic />
            </PrivateRoute>
        ),
    },
    {
        path: '/datatables/advanced',
        element: (
            <PrivateRoute>
                {' '}
                <Advanced />
            </PrivateRoute>
        ),
    },
    {
        path: '/datatables/skin',
        element: (
            <PrivateRoute>
                {' '}
                <Skin />
            </PrivateRoute>
        ),
    },
    {
        path: '/datatables/order-sorting',
        element: (
            <PrivateRoute>
                {' '}
                <OrderSorting />
            </PrivateRoute>
        ),
    },
    {
        path: '/datatables/multi-column',
        element: (
            <PrivateRoute>
                {' '}
                <MultiColumn />
            </PrivateRoute>
        ),
    },
    {
        path: '/datatables/multiple-tables',
        element: (
            <PrivateRoute>
                {' '}
                <MultipleTables />
            </PrivateRoute>
        ),
    },
    {
        path: '/datatables/alt-pagination',
        element: (
            <PrivateRoute>
                {' '}
                <AltPagination />
            </PrivateRoute>
        ),
    },
    {
        path: '/datatables/checkbox',
        element: (
            <PrivateRoute>
                {' '}
                <Checkbox />
            </PrivateRoute>
        ),
    },
    {
        path: '/datatables/range-search',
        element: (
            <PrivateRoute>
                {' '}
                <RangeSearch />
            </PrivateRoute>
        ),
    },
    {
        path: '/datatables/export',
        element: (
            <PrivateRoute>
                {' '}
                <Export />
            </PrivateRoute>
        ),
    },
    {
        path: '/datatables/column-chooser',
        element: (
            <PrivateRoute>
                {' '}
                <ColumnChooser />
            </PrivateRoute>
        ),
    },
    // Users page
    {
        path: '/users/profile',
        element: (
            <PrivateRoute>
                {' '}
                <Profile />
            </PrivateRoute>
        ),
    },
    {
        path: '/users/user-account-settings',
        element: (
            <PrivateRoute>
                {' '}
                <AccountSetting />
            </PrivateRoute>
        ),
    },
    {
        path: '/users/addPayment',
        element: (
            <PrivateRoute>
                {' '}
                <AddPayment />
            </PrivateRoute>
        ),
    },
    // pages
    {
        path: '/pages/knowledge-base',
        element: (
            <PrivateRoute>
                {' '}
                <KnowledgeBase />
            </PrivateRoute>
        ),
    },
    {
        path: '/pages/contact-us-boxed',
        element: (
            <PrivateRoute>
                {' '}
                <ContactUsBoxed />
            </PrivateRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/pages/contact-us-cover',
        element: (
            <PrivateRoute>
                {' '}
                <ContactUsCover />
            </PrivateRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/pages/faq',
        element: (
            <PrivateRoute>
                {' '}
                <Faq />
            </PrivateRoute>
        ),
    },
    {
        path: '/pages/coming-soon-boxed',
        element: (
            <PrivateRoute>
                {' '}
                <ComingSoonBoxed />
            </PrivateRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/pages/coming-soon-cover',
        element: (
            <PrivateRoute>
                {' '}
                <ComingSoonCover />
            </PrivateRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/pages/error404',
        element: (
            <PrivateRoute>
                {' '}
                <ERROR404 />
            </PrivateRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/pages/error500',
        element: (
            <PrivateRoute>
                {' '}
                <ERROR500 />
            </PrivateRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/pages/error503',
        element: (
            <PrivateRoute>
                {' '}
                <ERROR503 />
            </PrivateRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/pages/maintenence',
        element: (
            <PrivateRoute>
                {' '}
                <Maintenence />
            </PrivateRoute>
        ),
        layout: 'blank',
    },
    //Authentication
    {
        path: '/auth/login',
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/auth/register',
        element: (
            <PublicRoute>
                <Register />
            </PublicRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/auth/reset',
        element: (
            <PublicRoute>
                <Reset />
            </PublicRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/auth/unlock',
        element: (
            <PublicRoute>
                <Unlock />
            </PublicRoute>
        ),
        layout: 'blank',
    },
    //forms page
    {
        path: '/forms/basic',
        element: (
            <PrivateRoute>
                {' '}
                <FormBasic />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/input-group',
        element: (
            <PrivateRoute>
                {' '}
                <FormInputGroup />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/layouts',
        element: (
            <PrivateRoute>
                {' '}
                <FormLayouts />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/validation',
        element: (
            <PrivateRoute>
                {' '}
                <Validation />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/input-mask',
        element: (
            <PrivateRoute>
                {' '}
                <InputMask />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/select2',
        element: (
            <PrivateRoute>
                {' '}
                <Select2 />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/touchspin',
        element: (
            <PrivateRoute>
                {' '}
                <Touchspin />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/checkbox-radio',
        element: (
            <PrivateRoute>
                {' '}
                <CheckBoxRadio />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/switches',
        element: (
            <PrivateRoute>
                {' '}
                <Switches />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/wizards',
        element: (
            <PrivateRoute>
                {' '}
                <Wizards />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/file-upload',
        element: (
            <PrivateRoute>
                {' '}
                <FileUploadPreview />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/quill-editor',
        element: (
            <PrivateRoute>
                {' '}
                <QuillEditor />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/markdown-editor',
        element: (
            <PrivateRoute>
                {' '}
                <MarkDownEditor />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/date-picker',
        element: (
            <PrivateRoute>
                {' '}
                <DateRangePicker />
            </PrivateRoute>
        ),
    },
    {
        path: '/forms/clipboard',
        element: (
            <PrivateRoute>
                {' '}
                <Clipboard />
            </PrivateRoute>
        ),
    },
    {
        path: '/about',
        element: (
            <PrivateRoute>
                {' '}
                <About />
            </PrivateRoute>
        ),
        layout: 'blank',
    },
    {
        path: '*',
        element: (
            <PrivateRoute>
                {' '}
                <Error />
            </PrivateRoute>
        ),
        layout: 'blank',
    },
];

export { routes };
