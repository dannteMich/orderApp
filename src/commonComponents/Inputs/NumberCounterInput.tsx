import React from 'react';
import _ from 'lodash';
import {Typography, makeStyles, IconButton, Box} from '@material-ui/core';
import {RemoveCircle, AddCircle} from '@material-ui/icons'


const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    label: {
        textAlign: 'center',
    },
    button: {
        flexGrow: 0
    }
})

interface Props{
    handleNewValue: (n: number) => void;
    value?: number;
    minimum?: number;
    maximum?: number;
    interval?: number;
    units?: string;
}

const NumberCounterInput: React.FC<Props> = ({
    handleNewValue, value = 0, units,
    minimum=null, maximum=null, interval=1,
}) => {
    const classes = useStyles();
    const handleIncrease = () => {
        const newValue = value + interval;
        if (_.isNull(maximum) || newValue <= maximum) {
            handleNewValue(newValue);
        }
    }

    const handleDecrease = () => {
        const newValue = value - interval;
        if (_.isNull(minimum) || newValue >= minimum) {
            handleNewValue(newValue);
        }
    }

    return <div className={classes.root}>
        <IconButton className={classes.button} onMouseDown={handleDecrease}>
            <RemoveCircle />
        </IconButton>
        <Box flexGrow={0} minWidth={40} display="flex" flexDirection="column">
            <Box flexGrow={1} />
            <Typography variant="h6" className={classes.label}>
                {value}{units && ' ' + units}
            </Typography>
            <Box flexGrow={1} />
        </Box>
        <IconButton className={classes.button} onMouseDown={handleIncrease}>
            <AddCircle />
        </IconButton>
    </div>
}

export default NumberCounterInput;