import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Button, IconButton, SwipeableDrawer} from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';
import { useHistory } from 'react-router';

import {userContext} from '../commonLogical/contexts';
import NavigationMenu from './NavigationMenu/NavigationMenu';

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
    const {userId} = useContext(userContext);
    const [navMenuOpen, setNavMenuOpen] = useState(false);
    const classes = useStyles();
    
    const endNode = userId ? <UserDisplay displayName={userId}/> : <LoginButton />;
    const openDrawer = () => setNavMenuOpen(true);
    const closeDrawer = () => setNavMenuOpen(false); 

    return <div style={{display:'flex'}}>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" onClick={openDrawer}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {caption}
                </Typography>
                {endNode}
            </Toolbar>
        </AppBar>
        <SwipeableDrawer 
            anchor="left"
            open={navMenuOpen}
            onOpen={openDrawer}
            onClose={closeDrawer}
        >
            <NavigationMenu afterClick={closeDrawer}/>
        </SwipeableDrawer>
    </div>;
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