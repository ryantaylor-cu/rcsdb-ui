import NotFound from '../components/NotFound';
import ComputationForm from '../components/ComputationForm';
import ComputationResult from '../components/ComputationResult';
import Computations from '../components/Computations';
import ServerTable from '../components/ServerTable';
import VMTable from '../components/VMTable';
import Dashboard from '../components/Dashboard';

export default [
    {
        path: '/',
        component: Dashboard,
    },
    {
        path: '/dashboard',
        component: Dashboard,
    },
    {
        path: '/servers',
        component: ServerTable,
    },
    {
        path: '/vms',
        component: VMTable,
    },
    {
        path: '*',
        component: NotFound,
    },
];
