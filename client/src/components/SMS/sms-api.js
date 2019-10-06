
import axios from 'axios';
import {routes} from '../../constants';


/**
 * this function should fetch balances from sms-crud api
 * i could control sms-crud api from justice ndou app
 * @param uid
 * @returns {Promise<void>}
 */
export const fetchBalancesAPI = async uid => {
	// TODO- finish this up by writing axios.get api's to access the balances for the user
	// who is logged in
};


/**
 * this function will fetch sms bundles from sms-crud api
 * i could control sms-crud api from justice ndou app
 * @param uid
 * @returns {Promise<void>}
 */
export const fetchSMSBundles = async (uid) => {
	
	// TODO- fetch available SMS Bundles list from my server UID is used for logging purposes
	// The internal application server will make the request through python
	// this method will insure local app record and also that
	const  results = { status: false, payload: [], error: {} };

	await axios.get(routes.api_sms_endpoint + `/bundles/${uid}`).then(response => {
		if (response.status === 200) {
      		return response.data;
		} else {
		throw new Error("there was an error fetching SMS Bundles");
		}
	}).then(bundles => {
		results.status = true;
		results.payload = [...bundles];
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = [];
		results.error = {};
	});

	return results;
};


//TODO payment information must be sent direct to sasms crud app

export const sendSMS = async (uid,sms_message) => {
	// TODO send the message to sasms crud use the uid
	// to check if the user has some credits
	const results = { status: false, payload: {}, error: {} };

	await axios.post(routes.api_sms_endpoint + `/send/${uid}`,sms_message).then(response => {
		if(response.status === 200){
			return response.data;
		}else{
			throw new Error('there was an error sending sms message');
		}
	}).then(sms_message => {
		results.status = true;
		results.payload = {...sms_message};
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = {};
		results.error = {...error};
	});

	return results;
};


export const fetchContactLists = async uid => {
	
	const results = { status: false, payload: [], error: {} };

	await axios.get(routes.api_sms_endpoint + `/contact-lists/${uid}`).then(response => {
		if (response.status === 200){
			return response.data
		}else{
			throw new Error('there was an error fetching contact lists');
		}
	}).then(contact_lists => {
		results.status = true;
		results.payload = [...contact_lists];
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = [];
		results.error = {...error};
	});

	return results;
};


export const saveContactsList = async (uid,json_contacts_list) => {
	const results = { status: false, payload: [], error: {} };

	const prepared_route = routes.api_sms_endpoint + `/contact-lists/${uid}`;

	await axios.post(prepared_route, json_contacts_list).then(response => {
		if(response.status === 200){
			return response.data
		}else{
			throw new Error('there was an error creating contact lists');
		}
	}).then(contacts_lists => {
		results.status = true;
		results.payload = [...contacts_lists];
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = [];
		results.error = {};
	});

	return results;
};


export const saveContact= async (uid,json_contact) => {

	const results = { status: false, payload: [], error: {} };
	const prepared_route = routes.api_sms_endpoint + `/smscontact/${uid}`;

	await axios.post(prepared_route,json_contact).then(response => 
		{
			if(response.status === 200){
				return response.data;
			}else{
				throw new Error('there was an error adding contact to contact list');
		}
		}).then(contact_list => {
			results.status = true;
			results.payload = [...contact_list];
			results.error = {};
		}).catch(error => {
			results.status = false;
			results.payload = [];
			results.error ={...error};
	});

	return results;
};

export const updateContact = async(uid, contact_details) => {
		const results = { status: false, payload: [], error: {} };

		return results;
};

export const fetchContactsByListName = async (uid,listname) => {
	const results = { status: false, payload: [], error: {} };

	await axios.get(routes.api_sms_endpoint + `/contacts/bylistname/${listname}/${uid}`).then(response => {
		if (response.status === 200) {
      		return response.data;
		} else {
			throw new Error("there was an error fetching by listname");
		}
	}).then(contact_list => {
		results.status = true;
		results.payload = [...contact_list];
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = [];
		results.error = {...error};
	});

	return results;
};

export const fetchContactListByContactID = async (uid,list_id) => {
	const results = { status: false, payload: [], error: {} };

	await axios.get(routes.api_sms_endpoint + `/contacts/bycontactid/${list_id}/${uid}`).then(response => {
		if(response.status === 200){
			return response.data;
		}else{
			throw new Error('there was an error fetching contact list by contact id')
		}
	}).then(contact_list => {
		results.status = true;
		results.payload = [...contact_list];
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = [];
		results.error = {...error};
	});
	return results;
};


export const fetchContactListByUserID = async (uid) => {
	const results = { status: false, payload: [], error: {} };

	await axios
    .get(routes.api_sms_endpoint + `/contacts/byuid/${uid}`)
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("there was an error fetching contact lists by user id");
      }
    })
    .then(contact_list => {
      results.status = true;
      results.payload = [...contact_list];
      results.error = {};
    })
    .catch(error => {
      results.status = false;
      results.payload = [];
      results.error = { ...error };
    });
  return results;
};