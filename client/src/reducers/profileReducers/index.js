import {combineReducers} from 'redux';

import userContactDetailsReducer from './userContactDetailsReducer';
import userAccountReducer from './accountDetailsReducer';
import userPersonalDetailsReducer from './personalDetailsReducer';




let profileReducers = combineReducers({
	account_details : userAccountReducer,
	contact_details : userContactDetailsReducer,
	personal_details : userPersonalDetailsReducer
});

export default profileReducers;