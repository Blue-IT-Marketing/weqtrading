import axios from 'axios';
import {routes} from '../../constants';

import {fetchBankingDetails } from '../Market/api-requests';

export { fetchBankingDetails };

export const fetchPayments = async uid => {

	let results = {status:true,payload:{},error:{}};

	await axios.get(routes.api_dashboard_endpoint+`/payments/${uid}`).then(results => {
		if(results.status === 200){
			return results.data;
		}else{
			throw new Error('there was an error fetching transactions');
		}
	}).then(transactions => {
		results.status = true;
		results.payload = [...transactions];
		results.error ={};
	}).catch(error => {
		results.status = false;
		results.payload = [];
		results.error = {...error};
	});

	return results;
};


export const approvePayment = async (processing,uid) => {
	let results = {status : true,payload:{},error:{}};

	await axios.put(routes.api_dashboard_endpoint + `/payments/approve/${uid}`,processing).then(results => {
		if(results.status === 200){
			return results.data;
		}else{
			throw new Error('there was an error approving payment');
		}
	}).then(payment => {
		results.payload = {...payment};
		results.error = {};
		results.status = true;
	}).catch(error => {
		results.error = {...error};
		results.payload = {};
		results.status  = false;
	});
	return results;
};

export const rejectPayment = async (processing,uid) => {
	let results = {status : true,payload:{},error:{}};

	await axios.put(routes.api_dashboard_endpoint + `/payments/reject/${uid}`,processing).then(results => {
		if(results.status === 200){
			return results.data;
		}else{
			throw new Error('there was an error rejecting payment');
		}      
	}).then(payment => {
		results.payload = {...payment};
		results.error = {};
		results.status = true;
	}).catch(error => {
		results.error = {...error};
		results.payload = {};
		results.status = false;
	});
	return true;
};


export const fetchUserContactForm = async(uid) => {
	const results = {status:true,payload:{},error:{}};

	await axios.get(routes.api_dashboard_endpoint + `/contacts/${uid}`).then(results => {
		if(results.status === 200){
			return results.data;
		}else{
			throw new Error('there was an error fetching contacts');
		}
	}).then(contacts => {
		results.status = true;
		results.payload = [...contacts];
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = [];
		results.error = {};
	});
	return results;
};


export const fetchUsersAPI = async uid => {
	const results = { status: true, payload: {}, error: {} };

	await axios
		.get(routes.api_dashboard_endpoint + `/users/${uid}`)
		.then(results => {
			if (results.status === 200) {
				return results.data;
			} else {
				throw new Error('there was an error fetching users');
			}
		})
		.then(users => {
			results.status = true;
			results.payload = [...users];
			results.error = {};
		})
		.catch(error => {
			results.status = false;
			results.payload = [];
			results.error = { ...error };
		});

	return results;
};


export const onUpdateUser = async (manageUser,uid) => {
	const results = { status: true, payload: {}, error: {} };

	await axios.put(routes.api_dashboard_endpoint + `/user/${uid}`,manageUser).then(result => {
		if(result.status === 200){
			return result.data;
		}else{
			throw new Error('error updating user');
		}
	}).then(user => {
		results.status = true;
		results.payload = {...user};
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = {};
		results.error = {...error};
	});

	return results;
};


export const sendResponse = async(uid, response_message) => {
	const results = { status: true, payload: {}, error: {} };

	// fetch admin user details

	// compile a response message and send to firebase.com function to send
	// sms messages
	let route = routes.api_dashboard_endpoint + `/contact/respond/${uid}`;
	await axios.post(route, response_message).then(results => {
		if(results.status === 200){
			return results.data;
		}else{
			throw new Error('there was an error sending response');
		}
	}).then(response => {
		results.status = true;
		results.payload = {...response};
		results.error = {};
	}).catch(error => {
		results.status  = true;
		results.payload = {};
		results.error = {...error};
	});

	return results;
};


export const saveBankAccount = async(uid,account) => {
	const results = { status: true, payload: {}, error: {} };

	await axios.post(routes.api_dashboard_endpoint + `/banking/${uid}`,account).then(results => {
		if(results.status === 200){
			return results.data;
		}else{
			throw new Error('there was an error saving banking details');
		}
	}).then(banking => {
		results.status = true;
		results.payload ={...banking};
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = {};
		results.error = {...error};
	});

	return results;

};


export const deleteBankingDetails = async(uid,banking_id) => {
	const results = { status: true, payload: [], error: {} };

	const action = routes.api_dashboard_endpoint + `/banking/delete/${uid}/${banking_id}`;

	await axios.delete(action).then(results => {
		if(results.status === 200){
			return results.data;
		}else{
			throw new Error('error deleting bank account please advice your adminstrator');
		}
	}).then(banking_details => {
		results.status = true;
		results.payload = [...banking_details];
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload =[];
		results.error = {...error};
	});
	return results;
};