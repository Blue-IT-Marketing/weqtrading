import firebase from 'firebase/app';
import 'firebase/auth';
const config = {
	apiKey: "AIzaSyBRJIk9O1Y8CAh9pQ9tKy9hPkDHnI4hjEc",
	authDomain: "weqtrading.firebaseapp.com",
	databaseURL: "https://weqtrading.firebaseio.com",
	projectId: "weqtrading",
	storageBucket: "weqtrading.appspot.com",
	messagingSenderId: "308547563709",
	appId: "1:308547563709:web:def203ccd0d35c07"

};


try{
	!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
}catch (e) {
	console.log('firebase app already configured');
}

const auth = firebase.auth();

export {auth,
	firebase
};