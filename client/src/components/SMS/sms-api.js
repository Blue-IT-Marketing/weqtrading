
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
};


//TODO payment information must be sent direct to sasms crud app

export const sendSMS = async (uid,sms_message) => {
	// TODO send the message to sasms crud use the uid
	// to check if the user has some credits
};