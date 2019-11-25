import React from 'react';
import { Card, CardContent, CardActionArea, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {NewSeller} from '../../defs';

const useStyles = makeStyles({
    card: {
        width: 300,
    },
    cardInner: {
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

interface Props  {
    seller: NewSeller;
    onClick: () => void;
}

const SellerCard: React.FC<Props> = ({ seller, onClick }) => {
    const classes = useStyles();
    const {name, email, whatsapp} = seller
    return <Card className={classes.card}>
        <CardActionArea className={classes.cardInner} onClick={onClick}>
            <CardContent>
                <Typography className={classes.cardHeader}>{name}</Typography>
                {email && <CardLine bolded="Email">{email}</CardLine>}
                {whatsapp && <CardLine bolded="Whatsapp">{whatsapp}</CardLine>}
            </CardContent>
        </CardActionArea>
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