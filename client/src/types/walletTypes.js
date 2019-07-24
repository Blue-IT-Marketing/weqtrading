export let paypal_init = {
	deposit_id : '',
	env : 'sandbox', // you can set here to 'production' for production
	currency : 'ZAR', // or you can set this value from your props or state
	deposit : 0,
	success: false,
	cancelled: false,

};

export let paypal_keys_init = {
	sandbox: 'ATRxpThjtp-e8_DjFQPVfsa3r8rpHATJvyLMm2P6PiTPOQfoxUs-MNP6yu8uzpRnRy8sj3NKbmLRlqj6',
	client_secret: 'EHKygL0qZqFetuFev52k0MSYi6dUE-0HnJcKCd3YrzUjGMK-wm_ocFzUaAGoj1s20Y9IotNk7dtn5gxW',
	production: 'ATIerHv_l-vNEibCenGsyrtIAzLowgD7_JtiQvm2fAc_CVuPzpcTGVhuLUVXxL5voT_0kvP1QBQvgmjN',
};

export let bank_account_details = {
	bank_id : '',
	account_holder: '',
	bank_name:'',
	branch_code:'',
	account_number:'',
	account_type:'',
};

export let bank_account_errors_details = {
	account_holder_error : '',
	bank_name_error : '',
	branch_code_error : '',
	account_number_error : '',
	account_type_error:''
};

export let paypal_account_details = {
	paypal_id : '',
	paypal_email : ''
};

export let paypal_account_errors = {
	paypal_email_error : ''
};

export let ewallet_account_details = {
	ewallet_id : '',
	ewallet_number : '',
	ewallet_system : '',
};

export let ewallet_account_errors = {
	ewallet_number_error : ''
};

//bank details will be replaced by relevant account details
export let bank_details = {
	bank_id: '',
	account_holder : '',
	bank_name : '',
	branch_code : '',
	account_number : '',
	account_type : '',
	paypal_email : '',
	e_wallet : '' // cell phone number for e-wallet transactions
};

export let wallet_details = {
	wallet_id : '',
	wallet_balance : 0,
	total_funds_received : 0,
	total_funds_sent : 0,
	total_deposits: 0,
	total_withdrawals: 0,
	withdrawal_limit: 0
};

export let withdrawal_methods = {
	withdrawal_methods : ['bank-deposit', 'paypal', 'e-wallet']
};

export let withdrawals_details = {
	withdrawal_id : '', //same as user id
	transaction_id : '', //id for this particular transaction unique in every way
	wallet_balance : 0,
	withdrawal_amount : 0,
	withdrawal_method : '',
	date_scheduled : '',
	time_transaction : '',
	transaction_status: 'waiting_approval',
	withdrawal_type: 'normal' // express , express withdrawals are processed a

	// withdrawal methods // paypal or ewallet and bank account

	// waiting_approval : true, // transaction is awaiting approval by our moderators
	// approved: true, // transaction is approved
	// pending: true, // transaction is pending
	// completed:true, // transaction is completed
	// failed : true, // transaction has failed
	// fundsheld : true, // transaction not completed because your funds where held
};

export let withdrawal_details_errors = {
	wallet_balance_errors : '',
	withdrawal_amount_errors : '',
	withdrawal_method_errors : '',
};

export let deposits_details = {
	deposits_id : '',
	transaction_id : '',
	deposited_amount : '',
	date_deposited : '',
	method_of_deposit : '', // direct deposit/ paypal / e-wallet
	deposit_approved : false,
};

export let ewallet_number_details = {
	ewallet_number : '',
	used_count : 0,
	number_id : '',
	red_flagged: false,
};

export let ewallet_numbers_details_error = {
	ewallet_number_error : '',

};

export let ewallet_deposit_details = {
	deposits_id : '',
	transaction_id:'',
	deposited_amount:0,
	date_deposited: '',
	time_deposited: '',
	deposit_approved: false,
	date_approved : '',
	time_approved : '',
	ewallet_pin:'',
	voucher_number : '',
	number_id:'',
};

export let ewallet_deposit_details_errors = {
	deposited_amount_error : '',
};


