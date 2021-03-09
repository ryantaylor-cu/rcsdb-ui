import NotFound from '../components/NotFound';
import ComputationForm from '../components/ComputationForm';
import ComputationResult from '../components/ComputationResult';
import Computations from '../components/Computations';
import RyanTest from '../components/RyanTest';

export default [
    {
        path: '/servers',
        component: RyanTest,
    },
    {
        path: '*',
        component: NotFound,
    },
];
