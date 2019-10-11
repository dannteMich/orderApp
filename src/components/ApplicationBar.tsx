import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

const ApplicationBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6">
                    Application bar
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default ApplicationBar;