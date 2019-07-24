import {localStorageKey} from '../../../constants/program_constants';
import {myStore} from '../../../localStorage';
import Axios from 'axios';

import {
	bank_account_details
} from '../../../types';



let loadBankAccountDetailsFromServer = async (bank_id,stateKey) => {
	let result = {};
	let load_banking_details_url = '/api/wallet/load-bank-account/' + bank_id;
	await Axios.get(load_banking_details_url).then(function (response) {
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error('Error fetching banking details');
		}
	}).then(function (bank_account) {
		//self.setState({bank_account});
		result = {status:true,response:{...bank_account}};
		//console.log('bank account has been loaded from server',bank_account);
		myStore.setState(bank_id,stateKey,bank_account).then(() => {
			//console.log('bank Account state has been saved to myStore',savedState);
		}).catch(() =>  {
			//console.log('there was an error saving bank account details to myStore',err.message);
		});


	}).catch((err) => {
		//console.log(err.message);
		result = {status:false,error:{...err},response:{...bank_account_details}};

	});

	return result;
};



// ++++++++++++++++ mystore requests using local storage +++//
export const doLoadUserBankAccountDetails = async (bank_id) => {
	console.log('loading User Banking Details with bank_id',bank_id);
	let result = {};

	let stateKey = localStorageKey + bank_id + '-user-bank-account';
	await myStore.getState(bank_id,stateKey).then((bank_account) => {
		console.log('Loaded Bank Account State ',bank_account);
		if ((bank_account === undefined) || (bank_account.account_number === null)){
			result = loadBankAccountDetailsFromServer(bank_id,stateKey);
		}else{
			console.log('State loaded from local storage',bank_account);
			//self.setState({bank_account});
			result = {status:true,response:{...bank_account}};

		}

	}).catch( () => {
		//console.log('there where errors loading user bank account from myStore : ',err.message);
		result = loadBankAccountDetailsFromServer(bank_id,stateKey);
	});

	console.log('Load User Bank account details result : ', result);
	return result;
};


export const doBankAccountDetailsChangeHandler = async user_bank_account_details => {
	let result = {};
	let bank_id = user_bank_account_details.bank_id;
	let stateKey = localStorageKey + bank_id + '-user-bank-account';

	await myStore.setState(bank_id,stateKey,user_bank_account_details).then(  response => {
		if (response !== undefined){
			result = {status : true, response: {...user_bank_account_details}};
		}else{
			result = {status : true, response: {...user_bank_account_details},error:{code: 501,message:'local storage is not functioning properly'}};
		}
	}).catch( err => {
		result = {status : false, response : {...user_bank_account_details}, error:{...err}};
	});

	return result;

};