import React from 'react';
import {Box, Typography} from '@material-ui/core';


const NoOrdersNotification: React.FC = () => {
    return <Box display="flex" margin="40px">
        <Box flexGrow="1" />
        <Box>
            <Typography>
                There are no items in this Order.
            </Typography>
            <Typography>
                Please add products from the select menu.
            </Typography>
        </Box>
        <Box flexGrow="1" />
    </Box>
}

export default NoOrdersNotification;