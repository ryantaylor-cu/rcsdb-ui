import React from 'react';
//import PropTypes from 'prop-types';
import { Paper, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    Refresh as RefreshIcon,
    CheckCircle as CheckCircleIcon,
    GetApp as DownloadIcon,
    PausePresentation as PendingIcon,
    Cancel as FailureIcon,
    HourglassEmpty as RetryIcon,
} from '@material-ui/icons';
import MaterialTable from 'material-table';
//import NotFound from '../NotFound';
//import Ripple from '../Ripple';
//import { useToast } from '../ToastContext';
import { useService, useStore, useActions } from '../../hooks';
import Layout from '../Layout';
import Button from '../Button';

/* const useStyles = makeStyles(theme => ({
 *     root: {
 *         display: 'flex',
 *         flexDirection: 'column',
 *         alignItems: 'center',
 *         justifyContent: 'center',
 *         width: 600,
 *         marginTop: theme.spacing(8),
 *         padding: theme.spacing(5),
 *         textAlign: 'center',
 *         '@media (max-width:780px)': { width: 450 },
 *         '@media (max-width:610px)': { width: 350 },
 *         '@media (max-width:554px)': { width: 300 },
 *         '@media (max-width:504px)': { width: 350 },
 *     },
 *     subtitle: { marginTop: theme.spacing(2) },
 *     checkCircleIcon: {
 *         fill: theme.palette.success.main,
 *         width: 50,
 *         height: 50,
 *         marginBottom: theme.spacing(2),
 *     },
 *     pendingIcon: {
 *         fill: theme.palette.warning.main,
 *         width: 50,
 *         height: 50,
 *         marginBottom: theme.spacing(2),
 *     },
 *     failedIcon: {
 *         fill: theme.palette.error.main,
 *         width: 50,
 *         height: 50,
 *         marginBottom: theme.spacing(2),
 *     },
 *     retryIcon: {
 *         fill: theme.palette.warning.main,
 *         width: 50,
 *         height: 50,
 *         marginBottom: theme.spacing(2),
 *     },
 *     button: {
 *         marginTop: theme.spacing(3),
 *         textTransform: 'none',
 *     },
 *     buttonIcon: { fill: theme.palette.primary.main },
 * }));
 *  */
function VMTable(props) {
    const [data, setData] = React.useState([]);
    const vmService = useService('vm');
    
    const columns = [
        {
            title: 'VM',
            field: 'hostname'
        },
        {
            title: 'Cores',
            field: 'cores'
        },
        {
            title: 'RAM (GB)',
            field: 'ram'
        },
        {
            title: 'Disk (GB)',
            field: 'root_disk_size'
        },
        {
            title: 'IP Address',
            field: 'ip'
        },
    ];
    React.useEffect(() => {
        vmService.vmList().then(newData => {
            setData(newData)
        });
    },
    [setData]);
        
        
    return (
        <Box ml={10} mr={10} mt={3}>
          <MaterialTable
              columns={columns}
              data={data}
          //isLoading={loading}
          /* options={{
              *     filtering: true,
              *     pageSize: 5,
              * }} */
              style={{
                  padding: 10,
                  minWidth: 480,
              }}
              title='Virtual Machines'
          />
        </Box>
        );
}

//ComputationResult.propTypes = { match: PropTypes.object.isRequired };

export default VMTable;
