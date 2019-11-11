import React from 'react';
import { Card, CardContent, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {Seller} from '../../defs';

const useStyles = makeStyles({
    card: {
        width: 300,
        padding: 10,
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: 650,
        marginBottom: 10,
    },
    cardInfo: {
        marginBottom: 5,
    }
})

type Props = Omit<Seller, 'products'>

const SellerCard: React.FC<Props> = ({ name, mobile, email }) => {
    const classes = useStyles();
    return <Card className={classes.card}>
        <CardContent>
            <Typography className={classes.cardHeader}>{name}</Typography>
            {email && <CardLine bolded="Email">{email}</CardLine>}
            {mobile && <CardLine bolded="Phone">{mobile}</CardLine>}
        </CardContent>
    </Card>

}

interface CardLineProps {
    bolded: string;
}

const CardLine: React.FC<CardLineProps> = ({bolded, children}) => {
    const classes = useStyles(); // IMPR: should this be of itself?
    
    return <Typography className={classes.cardInfo}>
        {bolded && <b>{bolded }: </b>}
        {children}
    </Typography>
}

export default SellerCard