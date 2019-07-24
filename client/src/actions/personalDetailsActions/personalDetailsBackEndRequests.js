import {myStore} from '../../localStorage';
import {localStorageKey} from '../../constants/program_constants';



import {
	load_user_personal_details_route,
	save_user_personal_details_route,
	update_user_personal_details_route,
	delete_user_personal_details_route,
	make_private_user_personal_details_route
} from './routes';

import {
	personal_details_type
} from '../../types';

export const doLoadUserPersonalDetailsServer = async (user_personal_id) => {
	let result = {};
	let stateKey = localStorageKey + user_personal_id + '_user_personal_details';

	let getInit = {method :'get',
		headers : {headers: new Headers({'content-type': 'application/json'}),
			mode: 'no-cors'},body:{}
	};
	user_personal_id ?
		await fetch(load_user_personal_details_route + user_personal_id,getInit)
			.then(result => {
				if (result.ok){
					return result.json();
				}else{
					throw new Error('there was an error loading user personal details');
				}
			}).then( json_data => {
				let user_personal_details = JSON.parse(json_data);
				result = {status : true,response:{...user_personal_details}};
				myStore.setState(user_personal_id,stateKey,user_personal_details).then( result =>{
					// eslint-disable-next-line no-console
					console.log('Store Set State successful',result);
				});

			}).catch( err =>{
				result = {status : true,response:{...personal_details_type},error:{...err}};
			})
		: result = {status:false,error:{message:'there was an error loading user personal details',code:500},response:{...personal_details_type}};
	return result;
};

export const doLoadUserPersonalDetails = async (user_personal_id) => {
	let result = {};
	let stateKey = localStorageKey + user_personal_id + '_user_personal_details';
	user_personal_id ?
		await myStore.getState(user_personal_id,stateKey)
			.then( response => {
				if (!(response)){doLoadUserPersonalDetailsServer(user_personal_id)
					.then( response => {result = {...response};});
				}else{result = {status : true,response:{...response}};}
			}).catch( () => {
				doLoadUserPersonalDetailsServer(user_personal_id).then(response => {
					result = {...response};
				});
			})
		:result =
            {status : false,error:{message:'there was an error loading user personal details',code:500},
            	response:{...personal_details_type}
            };

	return result;
};

export const doSaveUserPersonalDetails = async(user_personal_details) => {
	let result = {};
	let user_personal_id = user_personal_details.user_personal_id;
	let stateKey = localStorageKey + user_personal_id + '_user_personal_details';

	let getInit = {method :'post',
		headers : {headers: new Headers({'content-type': 'application/json'}),
			mode: 'no-cors'},body:JSON.stringify(user_personal_details)
	};

	user_personal_id ?
		await fetch(save_user_personal_details_route,getInit)
			.then(response => {
				if (response.ok){
					return response.data;
				}else{
					throw new Error('there was an error saving user personal details');
				}
			}).then( json_data => {
				let user_personal_details = JSON.parse(json_data);
				myStore.setState(user_personal_id,stateKey,user_personal_details).then( result => {
                    // eslint-disable-next-line no-console
					console.log('Saved user personal details',result);

				});
				result = {status : true,response:{...user_personal_details}};
			}).catch( err =>{
				result = {status:false,error:{...err},response:{...user_personal_details}};
			})
		:result = {status:false,error:{
			message:'there was an error saving user personal details',
			code:500
		},response:{...user_personal_details}};

	return result;
};

export const doUpdateUserPersonalDetails = async (user_personal_details) => {
	let result = {};
	let user_personal_id = user_personal_details.user_personal_id;
	let stateKey = localStorageKey + user_personal_id + '_user_personal_details';

	let getInit = {method :'put',
		headers : {headers: new Headers({'content-type': 'application/json'}),
			mode: 'no-cors'},body:JSON.stringify(user_personal_details)
	};
	user_personal_id ?
		await fetch(update_user_personal_details_route,getInit)
			.then(response => {
				if (response.ok){
					return response.data;
				}else{
					throw new Error('there was an error updating user personal details');
				}
			}).then( json_data => {
				let user_personal_details = JSON.parse(json_data);
				myStore.setState(user_personal_id,stateKey,user_personal_details).then( result => {
                    // eslint-disable-next-line no-console
					console.log('user personal details updated : ',result);

				});
				result = {status : true,response:{...user_personal_details}};
			}).catch( err =>{
				result = {status:false,error:{...err},response:{...user_personal_details}};
			}):result = {status:false,error:{
			message:'there was an error updating user personal details',
			code:500
		},response:{...user_personal_details}};

	return result;
};

export const doDeleteUserPersonalDetails = async user_personal_details => {
	let result = {};
	let user_personal_id = user_personal_details.user_personal_id;
	let stateKey = localStorageKey + user_personal_id + '_user_personal_details';

	let getInit = {method :'delete',
		headers : {headers: new Headers({'content-type': 'application/json'}),
			mode: 'no-cors'},body:JSON.stringify(user_personal_details)
	};
	user_personal_id ?
		await fetch(delete_user_personal_details_route+user_personal_id,getInit)
			.then(response => {
				if (response.ok){
					return response.data;
				}else{
					throw new Error('there was an error deleting user personal details');
				}
			}).then( json_data => {
				let user_personal_details = JSON.parse(json_data);
				myStore.setState(user_personal_id,stateKey,user_personal_details).then( result => {
				    // eslint-disable-next-line no-console
					console.log('user personal details deleted');

				});
				result = {status : true,response:{...user_personal_details}};
			}).catch( err =>{
				result = {status:false,error:{...err},response:{...user_personal_details}};
			}):result = {status:false,error:{
			message:'there was an error deleting user personal details',
			code:500
		},response:{...user_personal_details}};

	return result;
};


