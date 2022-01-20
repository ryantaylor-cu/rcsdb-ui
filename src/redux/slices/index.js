import userSession from './userSession';
import theme from './theme';
import computations from './computations';
import { clearSession } from '../actions';
import dashboard from './dashboard';
import drawer from './drawer';


export const actions = {
    userSession: Object.assign(userSession.actions, { clearSession }),
    theme: theme.actions,
    computations: computations.actions,
    drawer: drawer.actions,
    dashboard: dashboard.actions,
};

export const reducers = {
    userSession: userSession.reducer,
    theme: theme.reducer,
    computations: computations.reducer,
    drawer: drawer.reducer,
    dashboard: dashboard.reducer,
};
