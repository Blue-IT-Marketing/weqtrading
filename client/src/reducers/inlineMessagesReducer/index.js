import {combineReducers} from 'redux';
import {INLINE_MESSAGES_ACTIONS} from '../../actions';

let InlineMessageInitState = {
	display_message:'',
	display_message_type:'',
};


export const InlineMessageReducer = (state={...InlineMessageInitState},actions) => {
	console.log('Actions Type in Inline Messages Reducer', actions);
	switch ( actions.type ) {
	case INLINE_MESSAGES_ACTIONS.RESET_INLINE_MESSAGES:{
		return{
			...state,
			display_message:actions.payload.response.display_message,
			display_message_type:actions.payload.response.display_message_type,
		};
	}
	case INLINE_MESSAGES_ACTIONS.DISPLAY_INLINE_MESSAGE:{
		return{
			...state,
			display_message:actions.payload.response.display_message,
			display_message_type:actions.payload.response.display_message_type,
		};
	}
	default:{return{...state};}
	}
};