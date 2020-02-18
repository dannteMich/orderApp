import React, {useEffect} from 'react';

import {Container} from '@material-ui/core';

import firebase from '../../commonLogical/firebase';
import * as firebaseui from 'firebaseui';


const AUTH_NODE_ID = 'firebaseui-auth-container'


const SignIn: React.FC = () => {
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
        signInSuccessUrl: '.',
    };
    
    useEffect(() => { 
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        ui.start(`#${AUTH_NODE_ID}`, auth_config);
    });
    
    return <Container>
        <div id={AUTH_NODE_ID}></div>
    </Container>
}

export default SignIn;