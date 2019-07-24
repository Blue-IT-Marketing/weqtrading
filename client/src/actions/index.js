
import {
	USER_ACCOUNT_ACTIONS,
} from './userAccountActions';

import {
	CONTACT_DETAILS_ACTIONS
} from './contactDetailsActions';
import {
	PERSONAL_DETAILS_ACTIONS
} from './personalDetailsActions';

import {
	INLINE_MESSAGES_ACTIONS
} from './InlineMessagesActions';

import {
	doDispatchResetInlineMessages,
	doDispatchDisplayInlineMessage
} from './InlineMessagesActions';

import {
	doDispatchUserSignedIn,
	doDispatchUserSignedOut,
	doDispatchCreateUser,
	doDispatchLoginUser,
	doDispatchLogOutUser,
	doDispatchDeleteUser,
	doDispatchChangePassword,
	doSendVerificationEmail,
	doSendOneTimePin
} from './userAccountActions';

import {
	doDispatchLoadUserContactDetails,
	doDispatchSaveUserContactDetails,
	doDispatchUpdateUserContactDetails,
	doDispatchDeleteUserContactDetails,
	doDispatchSendCellVerificationSMS,
	doDispatchVerifyUserContactDetailsCell,
	doDispatchSendEmailVerificationLink,
	doDispatchVerifyEmailLink
} from './contactDetailsActions';


import {
	doDispatchLoadUserPersonalDetails,
	doDispatchSaveUserPersonalDetails,
	doDispatchUpdateUserPersonalDetails,
	doDispatchDeleteUserPersonalDetails
} from './personalDetailsActions';


//**************************ewallet actions

import {
	USER_BANKING_ACTIONS,
	USER_PAYPAL_ACTIONS,
	USER_EWALLET_ACTIONS
} from './walletActions';


import {
	doDispatchLoadUserBankAccountDetails,
	doDispatchLoadUserEWalletAccountDetails,
	doDispatchLoadUserPayPalAccountDetails
} from './walletActions';


export {
	USER_ACCOUNT_ACTIONS,
	CONTACT_DETAILS_ACTIONS,
	PERSONAL_DETAILS_ACTIONS
};

export {
	doDispatchUserSignedIn,
	doDispatchUserSignedOut,
	doDispatchCreateUser,
	doDispatchLoginUser,
	doDispatchLogOutUser,
	doDispatchDeleteUser,
	doDispatchChangePassword,
	doSendVerificationEmail,
	doSendOneTimePin
};

export {
	doDispatchLoadUserContactDetails,
	doDispatchSaveUserContactDetails,
	doDispatchUpdateUserContactDetails,
	doDispatchDeleteUserContactDetails,
	doDispatchSendCellVerificationSMS,
	doDispatchVerifyUserContactDetailsCell,
 	doDispatchVerifyEmailLink
};

export {
	doDispatchLoadUserPersonalDetails,
	doDispatchSaveUserPersonalDetails,
	doDispatchUpdateUserPersonalDetails,
	doDispatchDeleteUserPersonalDetails
};


///***********************ewallet actions


export {
	USER_BANKING_ACTIONS,
	USER_PAYPAL_ACTIONS,
	USER_EWALLET_ACTIONS
};

export {
	doDispatchLoadUserBankAccountDetails,
	doDispatchLoadUserEWalletAccountDetails,
	doDispatchLoadUserPayPalAccountDetails
};


//*************************INLINE MESSAGES ACTIONS

export {
	INLINE_MESSAGES_ACTIONS
};

export {
	doDispatchResetInlineMessages,
	doDispatchDisplayInlineMessage
};

