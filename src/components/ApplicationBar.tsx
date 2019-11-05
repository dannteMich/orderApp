import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

interface Props {
    caption: string
}

const ApplicationBar: React.FC<Props> = ({caption}) => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6">
                    {caption}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default ApplicationBar;