
import {CONTACT_DETAILS_ACTIONS} from '../../actions/contactDetailsActions';

import {contact_details_type, contact_details_type_errors} from '../../types';

let ContactDetailsInitState = {
	user_contacts : {...contact_details_type},
	contact_details_errors : {...contact_details_type_errors},
	form_response : '',
	response_code: ''
};


let userContactDetailsReducer = (state={...ContactDetailsInitState},actions) => {
	// eslint-disable-next-line no-console
	console.log('Contact Details User Actions ',actions);


	switch (actions.type) {
	case CONTACT_DETAILS_ACTIONS.LOAD_CONTACT_DETAILS :
		return {...state,
			form_response: actions.payload.message,
			response_code:actions.payload.code,
			user_contacts:{...actions.payload.response}
		};
	case CONTACT_DETAILS_ACTIONS.SAVE_CONTACT_DETAILS :
		return {...state,
			form_response: actions.payload.message,
			response_code:actions.payload.code,
			user_contacts:{...actions.payload.response}
		};

	case CONTACT_DETAILS_ACTIONS.UPDATE_CONTACT_DETAILS :
		return {...state,
			form_response: actions.payload.message,
			response_code:actions.payload.code,
			user_contacts:{...actions.payload.response}
		};

	case CONTACT_DETAILS_ACTIONS.DELETE_CONTACT_DETAILS :
		return {...state,
			form_response: actions.payload.message,
			response_code:actions.payload.code,
			user_contacts:{...actions.payload.response}
		};

	case CONTACT_DETAILS_ACTIONS.SEND_VERIFICATION_SMS:
		return {...state,
			form_response:actions.payload.message,
			response_code:actions.payload.code,
			user_contacts:{...actions.payload.response}
		};

	case CONTACT_DETAILS_ACTIONS.VERIFY_CELL :
		return {...state,
			form_response:actions.payload.message,
			response_code:actions.payload.code,
			user_contacts:{...actions.payload.response}
		};

	case CONTACT_DETAILS_ACTIONS.SEND_VERIFICATION_EMAIL:
		return {...state,
			form_response:actions.payload.message,
			response_code:actions.payload.code,
			user_contacts:{...actions.payload.response}
		};

	case CONTACT_DETAILS_ACTIONS.VERIFY_EMAIL:
		return {...state,
			form_response:actions.payload.message,
			response_code:actions.payload.code,
			user_contacts:{...actions.payload.response}
		};

	default: return {...state};

	}
};


export default userContactDetailsReducer;