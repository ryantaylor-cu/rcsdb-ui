import NotFound from '../components/NotFound';
import ComputationForm from '../components/ComputationForm';
import ComputationResult from '../components/ComputationResult';
import Computations from '../components/Computations';
import ServerTable from '../components/ServerTable';

export default [
    {
        path: '/servers',
        component: ServerTable,
    },
    {
        path: '*',
        component: NotFound,
    },
];
