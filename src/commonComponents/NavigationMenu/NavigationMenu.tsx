import React, {useState, useContext, ReactNode} from 'react';
import {List, ListItem, ListItemText, makeStyles, Collapse} from '@material-ui/core';

import {accountsContext} from '../../commonLogical/contexts';
import SingleAccountNavigationInner, {} from './SingleAccountNavigation';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 350,
        minWidth: 180,
    },
})

interface Props {
    afterClick?: () => void; // should I make a context for the isDrawerOpen?
}

const NavigationMenu: React.FC<Props> = ({afterClick}) => {
    const {accounts} = useContext(accountsContext);
    const classes = useStyles();
    const [openArray, setOpenArray] = useState(accounts.map(() => false));

    const toggleArrayAt = (i: number) => {
        const newArray = openArray.slice()
        newArray[i] = !openArray[i];
        setOpenArray(newArray);
    }

    const res = [] as ReactNode[];
    accounts.forEach((account, i) => {
        res.push(<ListItem key={2*i} button onClick={() => toggleArrayAt(i)}>
            <ListItemText>
                {account.name}
            </ListItemText>
            {openArray[i] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>)
        res.push(<Collapse in={openArray[i]} timeout="auto" key={2*i+1}>
            <SingleAccountNavigationInner {...{account, afterClick}}/>
        </Collapse>)
    })
    

    return <List component="nav" className={classes.root}>
        {res}
    </List>
}

export default NavigationMenu;
