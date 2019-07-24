import firebase from 'firebase/app';
import 'firebase/auth';
const config = {
apiKey: "AIzaSyBtzdAXIhZ0CWOwfSrJ8S0nFKt8fPNHvXU",
	authDomain: "bigfeather.firebaseapp.com",
	databaseURL: "https://bigfeather.firebaseio.com",
	projectId: "bigfeather",
	storageBucket: "bigfeather.appspot.com",
	messagingSenderId: "1038866503460",
	appId: "1:1038866503460:web:5fb05ca8648994ac"
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