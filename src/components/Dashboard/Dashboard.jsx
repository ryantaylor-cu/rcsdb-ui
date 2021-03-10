import _ from 'lodash';
import React from 'react';
import MaterialTable from 'material-table';
import {Link} from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Dashboard() {
    const links = [
        {
            title: 'List of Compute Servers',
            url: '/servers'
        },
        {
            title: 'List of VMs',
            url: '/vms'
        },
    ];
    const renderLinks = (row) => {
        return (
            <Card className='dashboard-card-container'
                  style={{ marginLeft: 100, marginRight: 100 }}
            >
              <CardContent>
                <Typography
                    className="dashboard-card-title"
                    color="textSecondary"
                    gutterBottom
                />
                <Link
                    color='inherit'
                    href={row.url}
                    style={{ textDecoration: 'none' }}
                >
                  {row.title}
                </Link>
              </CardContent>
            </Card>
        );
    };
    return (
        <div className='row p-3'>
        {links.map(renderLinks)}
        </div>
    );
}


export default Dashboard;
