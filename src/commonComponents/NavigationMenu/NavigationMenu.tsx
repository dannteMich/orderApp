import React, {useState, useContext} from 'react';
import {List, ListItem, ListItemText, makeStyles, ListItemIcon, Collapse} from '@material-ui/core';

import {accountsContext} from '../../commonLogical/contexts';

import {Account} from '../../defs';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 400,
    }
})

const NavigationMenu: React.FC = () => {
    const {accounts} = useContext(accountsContext);
    const classes = useStyles();

    const res = accounts.map((account, i) => {
        return <ListItem key={i}>
            <ListItemText>
                {account.name}
            </ListItemText>
        </ListItem>
    })
    

    return <List component="nav" className={classes.root}>
        {res}
    </List>
}

export default NavigationMenu;
