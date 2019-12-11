import React, {useContext} from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import {Theme, makeStyles, createStyles} from '@material-ui/core'; 
import {EditSharp, Toc} from '@material-ui/icons'
import {Account} from '../../defs';
import {useHistory} from 'react-router-dom';
import {userContext} from '../../commonLogical/contexts';

const useStyles = makeStyles({
    nested: {
        paddingLeft: 35,
    }
});


interface SingleAccountNavigationProps {
    account: Account;
}

const SingleAccountNavigationInner: React.FC<SingleAccountNavigationProps> = ({account}) => {
    const {userId} = useContext(userContext);
    const history = useHistory();
    const {owner, managers, members} = account;
    const classes = useStyles();

    const [userIsManager, userIsMember] = [
        owner === userId || managers.includes(userId), 
        members.includes(userId)
    ];
    const buttons = [];

    if (userIsManager || userIsManager){
        const onOrdersClick = () => history.push(`/accounts/${account.id}/orders/`)
        buttons.push(<ListItem button key={1} onClick={onOrdersClick} className={classes.nested}>
            <ListItemIcon>
                <Toc />
            </ListItemIcon>
            <ListItemText>
                Orders
            </ListItemText>
        </ListItem>)
    }

    if (userIsManager || userIsMember) {
        const onAccountClick = () => history.push(`/accounts/${account.id}/manage/}`)
        buttons.push(<ListItem button key={2} onClick={onAccountClick} className={classes.nested}>
            <ListItemIcon>
                <EditSharp />
            </ListItemIcon>
            <ListItemText>
                Account
            </ListItemText>
        </ListItem>);
    }

    return <List component="div" disablePadding>
        {buttons}
    </List>
}

export default SingleAccountNavigationInner;