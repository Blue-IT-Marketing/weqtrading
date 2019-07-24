import {myStore} from '../../localStorage';
import {localStorageKey} from '../../constants/program_constants';

import {
	load_user_contact_details_url,
	save_user_contact_details_url,
	update_user_contact_details_url,
	delete_user_contact_details_url,
	send_user_contact_details_verification_sms_url,
	verify_user_contact_details_sms,
	send_user_contact_details_verification_email_url,
	verify_user_contact_details_email

} from './routes';


import {
	contact_details_type
} from '../../types';

export const doLoadUserContactInfoServer = async (user_contact_id) => {
	let result = {};
	let stateKey = localStorageKey + user_contact_id + '_user_contact_details';
	let route =  load_user_contact_details_url+user_contact_id;
	let getInit = {method :'get',
		headers : {headers: new Headers({'content-type': 'application/json'}),
			mode: 'no-cors'},body:{}
	};

	await fetch(route,getInit).then( response => {
		if (response.ok){
			return response.json();
		}else{
			throw new Error('there was an error fetching contact details from server');
		}
	}).then( json_data => {
		let response = JSON.parse(json_data);
		result = {status : true,response:{...response}};
		myStore.setState(user_contact_id,stateKey,response).then( result =>{
			console.log(result);
		});
	}).catch( err => {
		result = {status : false,error: {...err},response:{...contact_details_type}};
	});

	return result;
};

export const doLoadUserContactInfo = async (user_contact_id) => {
	let result = {};
	let stateKey = localStorageKey + user_contact_id + '_user_contact_details';

	user_contact_id ?
		myStore.getState(user_contact_id,stateKey).then( response => {
			console.log('Returned user contact details ', response);
			if (response === undefined){
				doLoadUserContactInfoServer(user_contact_id).then(response => {
					result = {...response};
				});
			}else{
				result = {status : true,response : {...response}};
			}
		}).catch( () => {
			doLoadUserContactInfoServer(user_contact_id).then( response => {
				result = {...response};
			});
		})
		:result = {status : false,
			error : {
				message:'there was an error loading user contact details',
				code:500}};

	return result;
};

export const doSaveUserContactInfoServer = async (user_contact) => {
	let result = {};
	let user_contact_id = user_contact.user_contact_id;
	let stateKey = localStorageKey + user_contact_id + '_user_contact_details';
	let route = save_user_contact_details_url;
	let requestInit = {
		method :'post',
		headers : {headers: new Headers({'content-type': 'application/json'}),
			mode: 'no-cors'},body:JSON.stringify(user_contact)
	};

	// user contact information is just a single record
	user_contact_id ?
		await fetch(route,requestInit).then( response => {
			if (response.ok){
				return response.json();
			}else{
				throw new Error('There was an error saving user contact details to server');
			}
		}).then( json_data => {
			let user_contact_details = JSON.parse(json_data);

			myStore.setState(user_contact_id,stateKey,user_contact).then( response => {
				console.log('Saved user contact details', response);
				if (response === undefined){
					//this is a big error it might be that localstorage cant be saved to
					//TODO maybe we should retry later
				}else{
					//save to the back end
					//TODO- delay save to MyStore
				}
			}).catch( err => {
				console.log(...err);
			});

			result = {status:true,response:{...user_contact_details}};

		}).catch( err => {
			result = {status : false,
				error:{...err},
				response:{...user_contact}};
		})

		:result = {status:false,
			error:{
				message:'there was an error saving contact details',
				code : 403
			},
			response:{...user_contact}};


	return result;
};

export const doUpdateUserContactDetails = async user_contact_details => {
	let result ={};
	let user_contact_id = user_contact_details.user_contact_id;
	let stateKey = localStorageKey + user_contact_id + '_user_contact_details';
	let route = update_user_contact_details_url;

	let requestInit = {
		method :'put',
		headers : {headers: new Headers({'content-type': 'application/json'}),
			mode: 'no-cors'},
		body:JSON.stringify(user_contact_details)
	};

	await fetch(route,requestInit).then( result => {
		if (result.ok){
			return result.json();
		}else{
			throw new Error('there was an error updating contact details');
		}
	}).then( json_data => {
		let user_contact_details = JSON.parse(json_data);


		myStore.setState(user_contact_id,stateKey,user_contact_details).then( response => {
			console.log('Saved user contact details', response);
			if (response === undefined){
				//this is a big error it might be that localstorage cant be saved to
				//TODO maybe we should retry later
			}else{
				//save to the back end
				//TODO- delay save to MyStore
			}
		}).catch( err => {
			console.log(...err);
		});

		result = {status:true,response:{...user_contact_details}};
	}).catch(err => {
		result = {status:false,error:{...err},response:{...user_contact_details}};
	});

	return result;
};

export const doDeleteUserContactDetails = async user_contact_details => {
	let result = {};
	let user_contact_id = user_contact_details.user_contact_id;
	let stateKey = localStorageKey + user_contact_id + '_user_contact_details';
	let route = delete_user_contact_details_url;

	let requestInit = {
		method :'delete',
		headers : {headers: new Headers({'content-type': 'application/json'}),
			mode: 'no-cors'},
		body:JSON.stringify(user_contact_details)
	};

	user_contact_id ?
		await fetch(route,requestInit).then( result => {
			if (result.ok){
				return result.json();
			}else{
				throw new Error('there was an error deleting user contact details');
			}
		}).then( json_data => {
		//make sure the returned user_contact_details contains no information
			let user_contact_details = JSON.parse(json_data);
			myStore.setState(user_contact_id,stateKey,user_contact_details).then( response => {
				console.log('user contact details deleted', response);
				if (response === undefined){
				//this is a big error it might be that localstorage cant be saved to
				//TODO maybe we should retry later
				}else{
				//save to the back end
				//TODO- delay save to MyStore
				}
			}).catch( err => {
				console.log(...err);
			});
			result = {status:true,response:{...user_contact_details}};
		}).catch( err => {
			result = {status:false,error:{...err},response:{...user_contact_details}};
		})
		:result = {status:false,error:{
			message:'there was an error saving contact details',
			code : 403
		},response:{...user_contact_details}};

	return result;
};

export const doSendCellVerificationSMS = async user_contact_details => {
	let result = {};
	let user_contact_id = user_contact_details.user_contact_id;
	let stateKey = localStorageKey + user_contact_id + '_user_contact_details';
	let route = send_user_contact_details_verification_sms_url;

	let requestInit = {
		method :'put',
		headers : {headers: new Headers({'content-type': 'application/json'}),
			mode: 'no-cors'},
		body:JSON.stringify(user_contact_details)
	};

	user_contact_id ?

		await fetch(route,requestInit).then( result => {
			if (result.ok){
				return result.json();
			}else{
				throw new Error('there was an error sending cell verification sms');
			}
		}).then(json_data => {
			user_contact_details = JSON.parse(json_data);

			myStore.setState(user_contact_id,stateKey,user_contact_details).then( response => {
				console.log('Saved user contact details', response);
				if (response === undefined){
					//this is a big error it might be that localstorage cant be saved to
					//TODO maybe we should retry later
				}else{
					//save to the back end
					//TODO- delay save to MyStore
				}
			}).catch( err => {
				console.log(...err);
			});

			result = {status:true,response:{...user_contact_details}};

		}).catch( err => {
			result = {status : false,error:{...err},response:{...user_contact_details}};
		})
		:result = {status:false,error:{
			message:'there was an error saving contact details',
			code : 403
		},response:{...user_contact_details}};

	return result;
};

export const doVerifyUserContactDetailsCell = async user_contact_details => {
	let result = {};
	let user_contact_id = user_contact_details.user_contact_id;
	let stateKey = localStorageKey + user_contact_id + '_user_contact_details';
	let route = verify_user_contact_details_sms;

	let requestInit = {
		method :'put',
		headers : {headers: new Headers({'content-type': 'application/json'}),
			mode: 'no-cors'},
		body:JSON.stringify(user_contact_details)
	};

	user_contact_id ?

		await fetch(route,requestInit).then( result => {
			if (result.ok){
				return result.json();
			}else{
				throw new Error('there was an error sending cell verification sms');
			}
		}).then(json_data => {
			user_contact_details = JSON.parse(json_data);

			myStore.setState(user_contact_id,stateKey,user_contact_details).then( response => {
				console.log('Saved user contact details', response);
				if (response === undefined){
					//this is a big error it might be that localstorage cant be saved to
					//TODO maybe we should retry later
				}else{
					//save to the back end
					//TODO- delay save to MyStore
				}
			}).catch( err => {
				console.log(...err);
			});

			result = {status:true,response:{...user_contact_details}};

		}).catch( err => {
			result = {status : false,error:{...err},response:{...user_contact_details}};
		})
		:result = {status:false,error:{
			message:'there was an error saving contact details',
			code : 403
		},response:{...user_contact_details}};

	return result;
};

export const doSendEmailVerificationLink = async user_contact_details => {
	let result = {};
	let user_contact_id = user_contact_details.user_contact_id;
	let stateKey = localStorageKey + user_contact_id + '_user_contact_details';
	let route = send_user_contact_details_verification_email_url;

	let requestInit = {
		method :'put',
		headers : {headers: new Headers({'content-type': 'application/json'}),
			mode: 'no-cors'},
		body:JSON.stringify(user_contact_details)
	};

	user_contact_id ?

		await fetch(route,requestInit).then( result => {
			if (result.ok){
				return result.json();
			}else{
				throw new Error('There was an error sending email verification link');
			}
		}).then( json_data => {
			user_contact_details = JSON.parse(json_data);
			myStore.setState(user_contact_id,stateKey,user_contact_details).then( response => {
				console.log('Saved user contact details', response);
				if (response === undefined){
					//this is a big error it might be that localstorage cant be saved to
					//TODO maybe we should retry later
				}else{
					//save to the back end
					//TODO- delay save to MyStore
				}
			}).catch( err => {
				console.log(...err);
			});

			result = {status:true,response:{...user_contact_details}};

		}).catch( err => {
			result = {status : false,error:{...err},response:{...user_contact_details}};
		})
		:result = {status:false,error:{
			message:'there was an error saving contact details',
			code : 403
		},response:{...user_contact_details}};

	return result;
};

export const doVerifyEmailLink = async user_contact_details => {
	let result = {};
	let user_contact_id = user_contact_details.user_contact_id;
	let stateKey = localStorageKey + user_contact_id + '_user_contact_details';
	let route = verify_user_contact_details_email;

	let requestInit = {
		method :'put',
		headers : {headers: new Headers({'content-type': 'application/json'}),
			mode: 'no-cors'},
		body:JSON.stringify(user_contact_details)
	};

	user_contact_id ?

		await fetch(send_user_contact_details_verification_email_url,requestInit).then( result => {
			if (result.ok){
				return result.json();
			}else{
				throw new Error('There was an error sending email verification link');
			}
		}).then( json_data => {
			user_contact_details = JSON.parse(json_data);
			myStore.setState(user_contact_id,stateKey,user_contact_details).then( response => {
				console.log('Saved user contact details', response);
				if (response === undefined){
					//this is a big error it might be that localstorage cant be saved to
					//TODO maybe we should retry later
				}else{
					//save to the back end
					//TODO- delay save to MyStore
				}
			}).catch( err => {
				console.log(...err);
			});

			result = {status:true,response:{...user_contact_details}};

		}).catch( err => {
			result = {status : false,error:{...err},response:{...user_contact_details}};
		})
		:result = {status:false,error:{
			message:'there was an error saving contact details',
			code : 403
		},response:{...user_contact_details}};

	return result;
};

export const doSendEmail = async (user_contact_details,user_email_details) => {

};

export const doSendSMS = async (user_contact_details,user_cell_details) => {

};