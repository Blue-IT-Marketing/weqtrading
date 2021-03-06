


export const sms_message_init = {
	id : '',
	uid : '',
	message : '',
	to_cell : '',
	from_cell : '',
	date_created : '',
	scheduled_datetime : '',
	date_time_sent : '',
	delivered : false

};

export const sms_message_errors_init = {
	message_error : '',
	to_error : '',
	from_error : '',
};

export const sms_balance_init = {
	uid : '',
	total_sms : '0',
	free_sms : '0',
	sms_value : '0',
};

export const sms_bundle_init = {
	id : '',
	name : '',
	description : '',
	total_sms : '0',
	purchase_price : '0'
};


export const payment_details_init ={
	uid : '',
	id : '',
	bundle_id : '',
	payment_method :'',
	payment_amount : '',
	payment_date : '',
	payment_time : '',
	approved : false,
};

export const default_bundles = [
	{
		id: '11111111',
		name : 'starter bundle',
		description : 'entry level bundle which you need to start operating',
		total_sms : '250',
		purchase_price : '90'
	},
	{
		id: '11111112',
		name : 'basic bundle',
		description : 'entry level bundle which you need to start operating',
		total_sms : '500',
		purchase_price : '200'
	},
	{
		id: '11111113',
		name : 'advanced bundle',
		description : 'entry level bundle which you need to start operating',
		total_sms : '1000',
		purchase_price : '400'
	},
	{
		id: '11111113',
		name : 'super bundle',
		description : 'entry level bundle which you need to start operating',
		total_sms : '2500',
		purchase_price : '800'
	}
];


export const contact_lists_init = {
	uid : '',
	id : '',
	name : '',
	description : '',
	total_contacts : '',	
};

export const contact_lists_errors_init = {
	name_error : '',
	description_error : '',
	total_contacts : '0',	
};


export const contacts_init = {
    id  : '',
	uid  : '',
	list_id : '',
	list_name : '',
    name  : '', 
    surname  : '',
    relationship  : '',
    tel  : '',
    cell  : '',
    email  : '',	
};


export const contacts_errors_init = {
	name_error: "",
	surname_error: "",
	relationship_error: "",
	tel_error: "",
	cell_error: "",
	email_error: ""
};


