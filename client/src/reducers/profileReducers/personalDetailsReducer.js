import {PERSONAL_DETAILS_ACTIONS} from '../../actions/personalDetailsActions';
import {personal_details_type, personal_details_type_errors} from '../../types';


let PersonalDetailsInitState ={
	user_personal_info : {...personal_details_type},
	personal_details_errors : {...personal_details_type_errors},
	form_response : '',
	response_code: 200
};
const userPersonalDetailsReducer = (state={...PersonalDetailsInitState},actions) => {
	switch (actions.type) {
	case PERSONAL_DETAILS_ACTIONS.LOAD_PERSONAL_DETAILS :
		return {...state,
			form_response:actions.payload.message,
			response_code:actions.payload.code,
			user_personal_info:{...actions.payload.response}
		};
	case PERSONAL_DETAILS_ACTIONS.SAVE_PERSONAL_DETAILS:
		return {...state,
			form_response:actions.payload.message,
			response_code:actions.payload.code,
			user_personal_info:{...actions.payload.response}
		};
	case PERSONAL_DETAILS_ACTIONS.UPDATE_PERSONAL_DETAILS:
		return {...state,
			form_response:actions.payload.message,
			response_code:actions.payload.code,
			user_personal_info:{...actions.payload.response}
		};
	case PERSONAL_DETAILS_ACTIONS.DELETE_PERSONAL_DETAILS:
		return {...state,
			form_response:actions.payload.message,
			response_code:actions.payload.code,
			user_personal_info:{...actions.payload.response}
		};
	default: return {...state};
	}
};


export default userPersonalDetailsReducer;