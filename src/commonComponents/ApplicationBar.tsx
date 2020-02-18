import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Button, IconButton, 
    SwipeableDrawer, Popover, Card, CardContent, CardActions} from '@material-ui/core';
import {Menu as MenuIcon, AccountCircle} from '@material-ui/icons';
import { useHistory } from 'react-router';

import firebase from '../commonLogical/firebase';
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
    const userId = useContext(userContext);
    const [navMenuOpen, setNavMenuOpen] = useState(false);
    const classes = useStyles();
    
    const endNode = userId !== '' ? <UserDisplay displayName={userId}/> : <LoginButton />;
    const openDrawer = () => setNavMenuOpen(true);
    const closeDrawer = () => setNavMenuOpen(false); 

    return <div style={{display:'flex'}}>
        <AppBar position="static">
            <Toolbar variant="dense">
                {userId !== '' && 
                    <IconButton edge="start" color="inherit" onClick={openDrawer}>
                        <MenuIcon />
                    </IconButton>
                }
                <Typography variant="h6" className={classes.title}>
                    {caption}
                </Typography>
                {endNode}
            </Toolbar>
        </AppBar>
        {userId !== '' && 
            <SwipeableDrawer 
                anchor="left"
                open={navMenuOpen}
                onOpen={openDrawer}
                onClose={closeDrawer}
            >
                <NavigationMenu afterClick={closeDrawer}/>
            </SwipeableDrawer>
        }
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
    onSignOutClick?: () => Promise<void>;
}
const UserDisplay: React.FC<UserDisplayProps> = ({displayName}) => {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const openMenu = () => setOpen(true);
    const closeMenu = () => setOpen(false);
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        !anchorEl && setAnchorEl(event.currentTarget);
        openMenu()
    };
    
    const handleLogout = () => firebase.auth().signOut().then(() => {
        // TODO: should go here to signin or it happens automatically
    })

    return <div>
        <IconButton color="inherit" onClick={handleClick}>
            <AccountCircle />
        </IconButton>
        <Popover keepMounted 
            open={open} 
            onClose={closeMenu} 
            anchorEl={anchorEl}
            transformOrigin={{horizontal: 0, vertical: -40}}
        >
            <Card>
                <CardContent>
                    <Typography variant="body2">{displayName}</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleLogout}>
                        Logout
                    </Button>
                </CardActions>
            </Card>
        </Popover>
    </div>
}