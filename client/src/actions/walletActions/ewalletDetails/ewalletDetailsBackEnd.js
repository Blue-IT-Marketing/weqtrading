import {localStorageKey} from '../../../constants/program_constants';
import {myStore} from '../../../localStorage';
import Axios from 'axios';
import {ewallet_account_details} from '../../../types';

let loadEwalletAccountFromServer = async (ewallet_id,stateKey) => {
	let result = {};
	let load_ewallet_account_url = '/api/wallet/load-ewallet-account/' + ewallet_id;
	await Axios.get(load_ewallet_account_url).then((response) => {
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error('error loading user ewallet account');
		}
	}).then(function (ewallet_account) {
		//self.setState({ewallet_account});
		result = {status:true,response:{...ewallet_account}};
		//console.log('Loaded ewallet account from server', ewallet_account);
		myStore.setState(ewallet_id, stateKey, ewallet_account).then(() => {
			//console.log('new Ewallet Account State was saved to myStore', storeSaved);
			//learn how we can use this to further enhance the store and our web application
		});
	}).catch((err) => {
		//let message = err.message;
		// self.setState({
		// 	form_response: message
		// });
		result = {status:false,error:{...err},response:{...ewallet_account_details}};
	});

	return result;
};

export const doLoadUserEWalletAccountDetails = async ewallet_id => {
	let result = {};
	let stateKey = localStorageKey + ewallet_id + '-user-ewallet-account';
	await myStore.getState(ewallet_id, stateKey).then((ewallet_account) => {
		//console.log('Successfully loaded ewallet_account from myStore : ', ewallet_account);
		//console.log(ewallet_account);
		if ((ewallet_account === undefined) || (ewallet_account.ewallet_id === null)) {
			result = loadEwalletAccountFromServer(ewallet_id,stateKey);
		} else {
			//console.log('State loaded from local storage : ', ewallet_account);
			//self.setState({ewallet_account});
			result = {status:true,response:{...ewallet_account}};
		}
	}).catch(() => {
		//console.log('there where errors loading ewallet account from store : ', err.message);
		result = loadEwalletAccountFromServer(ewallet_id,stateKey);
	});

	return result;
};

export const doSaveUserEwalletAccountDetails = async user_ewallet_account_details => {
	let result = {};

	let ewallet_id = user_ewallet_account_details.ewallet_id;
	let ewallet_account_details = JSON.stringify(user_ewallet_account_details);
	console.log(ewallet_account_details);
	let save_ewallet_details_url = '/api/wallet/ewallet/save';

	let stateKey = localStorageKey + ewallet_id + '-user-ewallet-account';

	await Axios.post(save_ewallet_details_url, '&data=' + ewallet_account_details).then(response => {
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error('Error saving ewallet account');
		}
	}).then(ewallet_account => {
		result = {status:true,response:{...ewallet_account}};
		myStore.setState(ewallet_id,stateKey,ewallet_account).then( result => {
			console.log('Successfully stored an updated ewallet account to myStore',result);
		}).catch( err => {
			console.log('failed to update the myStore with the new ewallet account info',ewallet_account);
			//TODO- consider a way to purge the store if all else fails, or maybe the store was never used before
		});

	}).catch(function (err) {
		result = {status:true,response:{...ewallet_account_details},error:{...err}};
		myStore.setState(ewallet_id,stateKey,user_ewallet_account_details).then( result => {
			console.log('Successfully updated ewallet account to myStore in offline mode',result);
			//TODO-consider allowing the user know of this and also fork a web worker to try and update the backend as soon as internet is available
		}).catch( err => {
			console.log('failed to update the myStore with the new ewallet account info',err);
			//TODO- consider a way to purge the store if all else fails, or maybe the store was never used before
		});
	});

	return result;

};