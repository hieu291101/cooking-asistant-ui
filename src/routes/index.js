import Login from '~/pages/Login';
import Home from '~/pages/Home';
import Register from '~/pages/Register';
import ForgetPassword from '~/pages/ForgetPassword/ForgetPassword';
import { LayoutWithSidebar } from '~/layouts';
import RecipeList from '~/pages/Filter';
import ChangePasswordP from '~/pages/ChangePasswordP/ChangePasswordP';
import Sidebar from '~/layouts/components/Sidebar';
import StorageForm from '~/layouts/components/StorageForm/StorageForm';
import Storage from '~/pages/Storage';
import ShoppingForm from '~/layouts/components/ShoppingForm';
import Shopping from '~/pages/Shopping';
import PlannerSidebar from '~/layouts/components/PlannerSidebar';
import Planner from '~/pages/Planner';
import RecipeDetail from '~/pages/RecipeDetail';

//Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forget-password', component: ForgetPassword },
    { path: '/change-password', component: ChangePasswordP },
    { path: '/filter', component: RecipeList, layout: LayoutWithSidebar, sidebar: Sidebar },
    { path: '/shopping', component: Shopping, layout: LayoutWithSidebar, sidebar: ShoppingForm },
    { path: '/storage', component: Storage, layout: LayoutWithSidebar, sidebar: StorageForm },
    { path: '/planner', component: Planner, layout: LayoutWithSidebar, sidebar: PlannerSidebar },
    {
        path: '/recipe-detail',
        component: StorageForm,
        layout: LayoutWithSidebar,
        sidebar: RecipeDetail,
        col1md: 9,
        col2md: 3,
    },
];

//must login to access
const privateRoutes = {};

export { publicRoutes, privateRoutes };
