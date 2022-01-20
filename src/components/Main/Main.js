import React from 'react';
import clsx from 'clsx';
import { Switch } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Link,
    IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import {
    Brightness2 as LightModeIcon,
    Flare as DarkModeIcon,
    LockOpen as ClearSessionIcon,
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import jwt from 'jsonwebtoken';
import Logo from '../Logo';
import {
    useWindowSize,
    useService,
    useActions,
    useStore,
    useMount,
} from '../../hooks';
import { routes } from '../../config';
import UserMenu from './UserMenu';
import Drawer from '../Drawer';

export const useStyles = makeStyles(theme => ({
    toolbar: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    hamburgerButtonRoot: {
        // Todo need to use appBar height from theme
        height: 64,
        background: 'white',
    },
    hamburgerButton: {
        marginLeft: 2,
        marginRight: 2,
    },
    hamburgerButtonIcon: {
        margin: theme.spacing(1),
        fill: 'black',
    },
    appBar: {
        marginLeft: theme.spacing(2),
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        // Todo need to use appBar height from theme
        height: 64,
        alignItems: 'center',
    },
    content: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // TODO need to use appBar height from themes.
        paddingTop: 64,
    },
    contentShift: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 265,
        // TODO need to use appBar height from themes.
        paddingTop: 64,
    },
    hide: { visibility: 'hidden' },
}));

function Main() {
    const classes = useStyles();
    const dimensions = useWindowSize();
    const [historyService, interceptorService, routesAssemblerService] = useService('history', 'interceptor', 'routesAssembler');
    const userSessionActions = useActions('userSession');
    const theme = useStore('theme');
    const userSession = useStore('userSession');
    const themeActions = useActions('theme');
    const isDark = theme.palette.type === 'dark';
    const [t] = useTranslation('common');
    const storageService = useService('storage');
    const sessionService = useService('session');

    const { open: drawerOpen, enabled: drawerEnabled } = useStore('drawer');
    const { toggle: toggleDrawer } = useActions('drawer');
    
    const switchThemeMode = () => themeActions.setMode(!isDark ? 'dark' : 'light');

    const createSessionId = React.useCallback(() => {
        const sessionId = storageService.getItem('userSession.sessionId');
        if (sessionId) {
            userSessionActions.login(sessionId);
        } else {
            const sessionId = jwt.sign({ createdDate: new Date().toISOString() }, 'rcdc');
            userSessionActions.register(sessionId);
        }
    }, [storageService, userSessionActions]);

    const clearSession = async () => {
        userSessionActions.clearSession();
        historyService.replace('/');
        createSessionId();
        try { await sessionService.clear(); } catch (err) {}
    };

    useMount(() => {
        createSessionId();
        interceptorService.registerDataTransformInterceptor();
        interceptorService.registerUnhandledInterceptor(() => console.error('Server failed to send back a response or has crashed.'));
    });

    React.useEffect(() => {
        if (userSession.sessionId) {
            interceptorService.registerRequestInterceptor(request => (request.headers.Authorization = `Bearer ${userSession.sessionId}`));
        }
    }, [interceptorService, userSession]);

    return (
        <>
                <AppBar position='fixed'>
                    <Toolbar className={classes.toolbar}>
                        <Box className={classes.hamburgerButtonRoot}>
                            <IconButton
                                className={clsx(
                                    classes.hamburgerButton,
                                    { hide: !drawerEnabled },
                                )}
                                onClick={() => toggleDrawer()}
                            >
                                <MenuIcon className={classes.hamburgerButtonIcon} />
            </IconButton>
                        </Box>
                        <Logo />
                        <Box className={classes.appBar}>
                            <Typography
                                className={
                                    clsx(
                                        { [classes.hide]: dimensions.width < 690 },
                                    )
                                }
                                variant='h5'
                            >
                                Aptamer Database
                            </Typography>
                            <UserMenu
                                displayName="Hello World"
                                dropdowns={[
                                     {
                                         title: `${!isDark ? 'Dark' : 'Light'} Theme`,
                                         Icon: !isDark ? <LightModeIcon /> : <DarkModeIcon />,
                                         handler: switchThemeMode,
                                     },
                                ]}
        />
        </Box>
        </Toolbar>
        </AppBar>
        <Drawer
        />
          <main className={classes.content}>
            <Switch>{routesAssemblerService.assemble(routes)}</Switch>
          </main>
        </>
    );
}

export default Main;
