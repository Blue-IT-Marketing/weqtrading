

////***************phasing this out

export let profile_details_type = {

	profile_name: '',
	names: '',
	surname: '',
	nickname: '',
	email: '',
	cell: '',
	website: '',
	paypal_email: '',
	introduction: '',
	mystory: '',
	photourl: '',
	userid: '',
	id_number: '',

	profile_active:false,
	profile_public:true,

	likes: 0,
	public_url: '',
//    note add shares
};

export let profile_details_errors  = {
	profile_name_error : '',
	names_error : '',
	surname_error : '',
	nickname_error : '',
	email_error : '',
	cell_error : '',
	website_error: '',
	paypal_email_error: '',
	introduction_error: '',
	mystory_error: '',
	photourl_error: '',
	userid_error: '',
	id_number_error: '',
};


//******* a user contact details type

export let contact_details_type = {
	user_contact_id : ' ',
	cell : '',
	email : '',
	website : '',
	facebook : '',
	twitter : '',

	contact_details_loaded:false,
	contact_details_saved:false,
	contact_details_updated:false,
	contact_details_deleted:false,
	verification_sms_sent : false,
	sms_verification_code: '',
	cell_verified:false,
	email_verification_sent: false,
	email_verification_link: '',
	email_verified:false
};
export let contact_details_type_errors = {
	cell_error : '',
	email_error : '',
	website_error : '',
	facebook_error : '',
	twitter_error : ''
};



//*********a type for user contact details sub => sending email messages

export let user_email_details_type = {
	user_email_id : '',
	email_id:'',
	to_email_address : '',
	email_subject:'',
	email_body:'',
	is_email_text : false,
	date_email_sent : '',
	time_email_sent : '',
	is_email_delivered : false,
	is_email_read : false,
};


//*************a type for contact details sub => sending sms's
export let user_cell_details_type = {
	user_cell_id : '',
	cell_id : '',
	to_cell_number : '',
	sms_body : '',
	date_sms_sent : '',
	time_sms_sent : '',
	is_sms_delivered : false,
};




//***************a type for user personal details
export let personal_details_type = {
	user_personal_id : '',
	names : '',
	surname : '',
	nickname : '',
	tagline : '',

};
export let personal_details_type_errors ={
	names_error : '',
	surname_error : '',
	nickname_error : '',
	tagline_error : ''
};





//****************** this is a type for account details

export let account_details_type = {
	uid : '',
	displayName : '',
	photoURL : '',
	email : '',
	password : '',
	emailVerified : false,
	phoneNumber : '',
	isAnonymous : false,
	providerId : 'password',

	signing_in : false,
	user_signed_in : false,
	user_deleted : false,
	password_changed : false,
	email_verification_sent : false,
	onetime_pin_sent: false,

};

export let account_details_type_error = {
	displayName_error : '',
	photoURL_error : '',
	email_error : '',
	password_error : '',
	phoneNumber_error : ''
};
