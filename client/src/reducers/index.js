import {combineReducers} from 'redux';
import profileReducers from './profileReducers';
import {walletReducer} from './walletReducers';
import {InlineMessageReducer} from './inlineMessagesReducer';

export let rootReducer = combineReducers({
	profile : profileReducers,
	wallet :walletReducer,
	inline_message:InlineMessageReducer
});
//export {profileReducers};

