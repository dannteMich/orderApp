import React from 'react';
import {CircularProgress, Typography, makeStyles} from '@material-ui/core';

interface Props {
    topMessage?: string;
    bottomMessage?: string;
}

const GUTTER = 6;
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    item: {
        alignSelf: 'center',

    },
    topDiv: {
        marginBottom: GUTTER,
    },
    bottomDiv: {
        marginTop: GUTTER,
    },
})

const LoadingBlob: React.FC<Props> = ({topMessage, bottomMessage}) => {
    const classes = useStyles();

    return <div className={classes.root}>
        {topMessage && topMessage.length !== 0 && 
            <Typography className={`${classes.item} ${classes.topDiv}`}>
                {topMessage}
            </Typography>
        }
        
        <div className={classes.item}><CircularProgress /></div>
        
        {bottomMessage && bottomMessage.length !== 0 &&
            <Typography className={`${classes.item} ${classes.bottomDiv}`}>
                {bottomMessage}
            </Typography>
        }
    </div>;
}

export default LoadingBlob;