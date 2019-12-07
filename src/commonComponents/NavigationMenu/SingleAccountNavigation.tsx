import React, {useContext} from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import {EditSharp, Toc} from '@material-ui/icons'
import {Account} from '../../defs';
import {useHistory} from 'react-router-dom';
import {userContext} from '../../commonLogical/contexts';




interface SingleAccountNavigationProps {
    account: Account;
}

const SingleAccountNavigationInner: React.FC<SingleAccountNavigationProps> = ({ account}) => {
    const {userId} = useContext(userContext);
    const history = useHistory();
    const {owner, managers, members} = account;

    const [userIsManager, userIsMember] = [
        owner === userId || managers.includes(userId), 
        members.includes(userId)
    ];
    const buttons = [];

    if (userIsManager || userIsManager){
        const onOrdersClick = () => history.push(`/accounts/${account.id}/orders/`)
        buttons.push(<ListItem button key={1} onClick={onOrdersClick}>
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
        buttons.push(<ListItem button key={2} onClick={onAccountClick}>
            <ListItemIcon>
                <EditSharp />
            </ListItemIcon>
            <ListItemText>
                Account
            </ListItemText>
        </ListItem>);
    }

    return <List>
        {buttons}
    </List>
}

export default SingleAccountNavigationInner;