import React, {useEffect, useContext} from 'react';

import {Container} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

import firebase from '../../commonLogical/firebase';
import * as firebaseui from 'firebaseui';
import { userContext } from '../../commonLogical/contexts';


const AUTH_NODE_ID = 'firebaseui-auth-container'


const SignIn: React.FC = () => {
    const history = useHistory();
    const { userId, setUserId } = useContext(userContext);
    const user = firebase.auth().currentUser;

    if (user && user.email) { // if you got here by mistake
        if (userId !== user.email) {
            setUserId(user.email as string);
        }
        history.replace('/');
    }

    const auth_config = {
        signInFlow: 'popup',
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false
            },
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                customParameters: {
                    // Forces account selection even when one account is available.
                    prompt: 'select_account'
                }
            },
        ],
        callbacks: {
            signInSuccessWithAuthResult: (authResult: firebase.auth.UserCredential, redirectUrl: string) => {
    
                setUserId((firebase.auth().currentUser as firebase.User).email as string);
                history.replace('/');
                return false;
            }
        }
    };
    
    useEffect(() => { 
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start(`#${AUTH_NODE_ID}`, auth_config);

        const cleanup = () => {
            ui.delete()
        }

        return cleanup;
    }, [auth_config, user]);
    
    return <Container>
        <div id={AUTH_NODE_ID}></div>
    </Container>
}

export default SignIn;