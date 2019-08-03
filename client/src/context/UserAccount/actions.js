
import {
    USER_ACCOUNT_ACTIONS
} from '../../actions';
import {
    account_details_type,
    account_details_type_error
} from '../../types';

import { auth } from '../../firebase';

let UserAccountInitState = {
    user_account: {...account_details_type},
    user_account_errors: {...account_details_type_error},
    form_response: '',
    response_code: '',
};
    
export let loginUser = async (username, password) => {
    let user_account_state = {...UserAccountInitState};
    let user_account;
    let form_response;
    let response_code;

    await auth.doSignInWithEmailAndPassword(username, password).then(result => {
            

            if (result.status === true){
                user_account = {...result.response};
                form_response = 'User Logged In Successfully';
                response_code = 200;
            }else {
                user_account = {...result.response};
                form_response = result.error.message;
                response_code = result.error.code;
            }

    });
    
    user_account_state.user_account = {...user_account};    
    user_account_state.form_response = form_response;
    user_account_state.response_code = response_code;
    console.dir('USER ACCOUNT STATE',user_account_state);
    return {...user_account_state};
}

export let logOutUser = async() => {
        let user_account_state = {
            ...UserAccountInitState
        };
        let user_account;
        let form_response;
        let response_code;

    await auth.doSignOut().then(result => {
        if (result.status === true){
                user_account = {
                    ...account_details_type
                };
                form_response = 'User Logout Successfully';
                response_code = 200;
                }
                else {
                    user_account = {
                        ...account_details_type
                    };
                    form_response = result.error.message;
                    response_code = result.error.code;
                }
    });
    user_account_state.user_account = {
        ...user_account
    };
    user_account_state.form_response = form_response;
    user_account_state.response_code = response_code;
    console.dir('USER ACCOUNT STATE', user_account_state);
    return {
        ...user_account_state
    };

}


export let SendEmailVerification = async(user) => {
        let user_account_state = {
            ...UserAccountInitState
        };
        let user_account;
        let form_response;
        let response_code;

        console.log('Sending email verifications');

    await auth.doSendEmailVerification(user).then( result => {
        if (result.status === true){
            user_account={
                ...user,
                email_verification_sent : true
            };
            form_response= 'successfully sent email verifications';
            response_code= 200
        }else{
            user_account = {
                ...user,
                email_verification_sent: false
            };
            form_response= result.error.message;
            response_code= result.error.code
        }
    });
    user_account_state.user_account = {...user_account};
    user_account_state.form_response = form_response;
    user_account_state.response_code = response_code;

    return user_account_state;
}