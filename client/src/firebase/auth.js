import {
	auth,firebase
} from './firebase';

import {account_details_type} from '../types';

import {sendOneTimePin} from '../sms';

//singup
export const doCreateUserWithEmailAndPassword = async  (username, password) => {
	let result;
	try{
		let user = auth.createUserWithEmailAndPassword(username, password);
		let user_account = {...account_details_type};
		user_account = {...user};
		user_account.user_signed_in = true;
		result = {status: true, response: {...user_account}};
	}catch (e) {
		result = {status:false,error:{...e}};
	}

	return result;
};


// Sign In
export const doSignInWithEmailAndPassword = async (username, password) => {
	let result;
	try {
		let {user} = await auth.signInWithEmailAndPassword(username, password);
		let user_account = {...account_details_type};
		user_account = {...user};
		user_account.user_signed_in = true;
		result = {status: true, response: {...user_account}};
	}catch (e) {
		result = {status:false,error:{...e}};
	}

	return result;
};


// Sign out
export const doSignOut = async () =>{
	let result = {};
	await firebase.auth().signOut().then( () => {
		result = {status:true,error:{}};
	}).catch( (err) => {
		result = {status:false,error:{...err}};
	});
	return result;
};

// Password Reset
export const doPasswordReset = async (email_address) => {
	// auth.sendPasswordResetEmail(email);
	let result = {};

	await firebase.auth().sendPasswordResetEmail(email_address)
		.then(() => { result = {status:true,error:{}};
		}).catch((err) => {result = {status:false,error:{...err}};
		});

	return result;
};
// Password Change
export const doPasswordUpdate = async (password) =>{
//	auth.currentUser.updatePassword(password);
	let result = {};

	await firebase.auth().currentUser.updatePassword(password)
		.then( () => {result = {status : true,error: {}};
		})
		.catch( (err) => {result = {status: false,error:{...err}};
		});
	return result;
};

//Delete User

export const doDeleteUser = async (user) => {
	let result = {};

	await user.delete().then( () => {
		result = {status : true,error:{}};
	}).catch( (err) => {
		result = {status: false,error:{...err}};
	});
	return result;
};

export const doSendEmailVerification = async (user) => {
	let result = {};
	console.log(user);
	await firebase.auth().currentUser.sendEmailVerification().then(function() {
		result = {status:true,error:{}};
	}).catch((err) => {
		// An error happened.
		result = {status:false,error:{...err}};
	});
	return result;
};

export const doSendOneTimePin = async (cell_number) => {
	let result = {status:true,error:{}};
	await sendOneTimePin(cell_number);
	return result;



};

//Re-Authenticate

//


