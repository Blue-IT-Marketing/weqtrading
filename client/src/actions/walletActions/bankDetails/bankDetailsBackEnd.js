// export const USER_BANKING_ACTIONS = {
// 	LOAD_BANK_ACCOUNT : 'LOAD_BANK_ACCOUNT',
// 	SAVE_BANK_ACCOUNT : 'SAVE_BANK_ACCOUNT',
// 	UPDATE_BANK_ACCOUNT : 'UPDATE_BANK_ACCOUNT',
// 	DELETE_BANK_ACCOUNT : 'DELETE_BANK_ACCOUNT',
// 	VERIFY_BANK_ACCOUNT : 'VERIFY_BANK_ACCOUNT'
// };



import {localStorageKey} from '../../../constants/program_constants';
import Axios from 'axios';
import {myStore} from '../../../localStorage';
import {Utils} from '../../../constants/utilities';
import {bank_account_errors_details} from '../../../types';

export const doSaveBankAccountDetails = async user_bank_account_details => {
	let result = {};
	let bank_id = user_bank_account_details.bank_id;
	if ((bank_id !== '') && (bank_id !== null) && (bank_id !== undefined)) {
		let stateKey = localStorageKey + bank_id +  '-user-bank-account';
		let banking_details = JSON.stringify(user_bank_account_details);
		let save_banking_details_url = '/api/wallet/bank-account/save';

		console.log('Running do save bank account details actions',user_bank_account_details);
		user_bank_account_details.bank_id ?

			await Axios.post(save_banking_details_url, '&data=' + banking_details).then((response) => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error('Error saving account');
				}
			}).then(user_bank_account_details => {

				result = {status: true, response: {...user_bank_account_details}};
				console.log('sending response with',user_bank_account_details);

				myStore.setState(bank_id, stateKey, user_bank_account_details).then(bank_account => {
					console.log('Bank Account saved to myStore', bank_account);
				});


			}).catch(err => {
				result = {status: true, response: {...user_bank_account_details}, error: {...err}};
				myStore.setState(bank_id, stateKey, user_bank_account_details).then(bank_account => {
					console.log('Bank Account saved to myStore ', bank_account,'With error saving to backend',err);
					//even though bank account details are saved to myStore they are not saved to
					//back end a worker must be deployed to try and save this details to back end
					let sync_data = {
						backend_url: save_banking_details_url,
						payload: user_bank_account_details,
						method_type: 'post'
					};


					// self.worker.postMessage(sync_data);
					// TODO- web workers still need debugging
					//console.log('NOTE: web workers not launching needs debugging');
				}).catch(() => {
					//console.log('an error occured while saving offline data deploy worker to try and save the data later');
					//TODO- make sure there is a way for the user to check if back ground tasks are completed
					//TODO- and also verify that he or she wants to make sure the data is saved later
				});
			})
			:
			result = {
				status: true,
				response: {...user_bank_account_details},
				error: {message: 'there was an error saving bank account details', code: 500}
			};

	}else{
		result = {
			status:true,
			response:{...user_bank_account_details},
			error:{message:'there was an error saving bank account details',code:500}};
	}

	console.log('Save Bank Account Result : ', result);
	return result;
};

export const doUpdateBankAccountDetails = async user_bank_account_details => {
	let result = {};
	let bank_id = user_bank_account_details.bank_id;
	if (bank_id !== '') {
		let stateKey = localStorageKey + bank_id +  '-user-bank-account';
		user_bank_account_details.bank_id = bank_id;
		let banking_details = JSON.stringify(user_bank_account_details);
		let save_banking_details_url = '/api/wallet/bank-account';


		user_bank_account_details.bank_id ?
			await Axios.put(save_banking_details_url, '&data=' + banking_details).then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error('Error updating account');
				}
			}).then(function (user_bank_account_details)  {
				myStore.setState(bank_id,stateKey,user_bank_account_details).then( bank_account => {
					//console.log('Bank Account saved to myStore', bank_account);
				});
				result = {status:true,response:{...user_bank_account_details}};

			}).catch(function (err) {
				result = {status:true,response:{...user_bank_account_details},error:{...err}};
				myStore.setState(bank_id,stateKey,user_bank_account_details).then( bank_account => {
					//console.log('Bank Account saved to myStore', bank_account);
					//even though bank account details are saved to myStore they are not saved to
					//back end a worker must be deployed to try and save this details to back end
					let sync_data = {
						backend_url : save_banking_details_url,
						payload:user_bank_account_details,
						method_type:'post'
					};

					// self.worker.postMessage(sync_data);
					// TODO- web workers still need debugging
					//console.log('NOTE: web workers not launching needs debugging');
				}).catch( () => {
					//console.log('an error occured while saving offline data deploy worker to try and save the data later');
					//TODO- make sure there is a way for the user to check if back ground tasks are completed
					//TODO- and also verify that he or she wants to make sure the data is saved later
				});
			}):
			result = {status:true,
				response:{...user_bank_account_details},
				error:{message:'there was an error saving bank account details',code:500}};

	}else{
		result = {status:true,
			response:{...user_bank_account_details},
			error:{message:'there was an error saving bank account details',code:500}};
	}

	return result;
};

export const doDeleteBankAccountDetails = async user_bank_account_details => {
	let result = {};
	let bank_id = user_bank_account_details.bank_id;
	if (bank_id !== '') {
		let stateKey = localStorageKey + bank_id +  '-user-bank-account';
		user_bank_account_details.bank_id = bank_id;
		let banking_details = JSON.stringify(user_bank_account_details);
		let save_banking_details_url = '/api/wallet/bank-account';


		user_bank_account_details.bank_id ?
			await Axios.delete(save_banking_details_url, '&data=' + banking_details).then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error('Error deleting bank account');
				}
			}).then(function (user_bank_account_details)  {
				myStore.setState(bank_id,stateKey,user_bank_account_details).then( bank_account => {
					//console.log('Bank Account saved to myStore', bank_account);
				});
				result = {status:true,response:{...user_bank_account_details}};

			}).catch(function (err) {
				result = {status:true,response:{...user_bank_account_details},error:{...err}};
				myStore.setState(bank_id,stateKey,user_bank_account_details).then( bank_account => {
					//console.log('Bank Account saved to myStore', bank_account);
					//even though bank account details are saved to myStore they are not saved to
					//back end a worker must be deployed to try and save this details to back end
					let sync_data = {
						backend_url : save_banking_details_url,
						payload:user_bank_account_details,
						method_type:'post'
					};

					// self.worker.postMessage(sync_data);
					// TODO- web workers still need debugging
					//console.log('NOTE: web workers not launching needs debugging');
				}).catch( () => {
					//console.log('an error occured while saving offline data deploy worker to try and save the data later');
					//TODO- make sure there is a way for the user to check if back ground tasks are completed
					//TODO- and also verify that he or she wants to make sure the data is saved later
				});
			}):
			result = {status:true,
				response:{...user_bank_account_details},
				error:{message:'there was an error saving bank account details',code:500}};

	}else{
		result = {status:true,
			response:{...user_bank_account_details},
			error:{message:'there was an error saving bank account details',code:500}};
	}

	return result;
};

export const doCheckBankAccountErrors = async user_bank_account_details => {
	let bank_account_errors = {...bank_account_errors_details};
	let isError = false;


	let docheck = async () => {
		const check_account_holder = () => {
			if (Utils.isEmpty(user_bank_account_details.account_holder) === true) {
				bank_account_errors.account_holder_error = 'Account Holder cannot be empty';
				return true;
			}
			return false;
		};

		const check_bank_name = () => {
			if (Utils.isEmpty(user_bank_account_details.bank_name) === true) {
				bank_account_errors.bank_name_error = 'Please select a bank name';
				return true;
			}
			return false;
		};

		const check_branch_code = () => {
			if (Utils.isEmpty(user_bank_account_details.branch_code) === true) {
				bank_account_errors.branch_code_error = 'Please enter your bank branch code';
				return true;
			}
			return false;
		};

		const check_account_number = () => {
			if (Utils.isEmpty(user_bank_account_details.account_number) === true) {
				bank_account_errors.account_number_error = 'Please enter your account number';
				return true;
			}
			return false;
		};

		const check_account_type = () => {
			if (Utils.isEmpty(user_bank_account_details.account_type) === true) {
				bank_account_errors.account_type_error = 'Please select your bank account type';
				return true;
			}
			return false
		};

		await check_account_holder();
		await check_bank_name();
		await check_branch_code();
		await check_account_number();
		await check_account_type();

		return isError;
	};

	let status = await docheck();

	return {status:status,bank_account_errors:{...bank_account_errors}};
};

