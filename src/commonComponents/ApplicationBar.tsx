import React from 'react';
import {AppBar, Toolbar, Typography, makeStyles, Button} from '@material-ui/core';

// import firebase from '../commonLogical/firebase'; // TODO: uncomment this
import { mockUser } from '../mockData';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
    signinButton: {
        color: '#ffffff',
    }
})

interface Props {
    caption: string
}

const ApplicationBar: React.FC<Props> = ({caption}) => {
    const classes = useStyles();
    // const user = firebase.auth().currentUser; // TODO: uncomment this
    const user = mockUser;
    const endNode = user ? <UserDisplay displayName={user.email}/> : <LoginButton />;

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" className={classes.title}>
                    {caption}
                </Typography>
                {endNode}
            </Toolbar>
        </AppBar>
    );
}

export default ApplicationBar;

const LoginButton: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    return <Button variant="text" className={classes.signinButton} onClick={() => history.push('/signin')}>
        Sign in
    </Button>
}

interface UserDisplayProps {
    displayName: string
}
const UserDisplay: React.FC<UserDisplayProps> = ({displayName}) => {
    return <Typography >
        {displayName}
    </Typography>
}