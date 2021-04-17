import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyDeeEzsuPxJOv_JR9WkjzT58Dsp38pWCjM',
	authDomain: 'ferrisbot-6e0f1.firebaseapp.com',
	databaseURL: 'https://ferrisbot-6e0f1.firebaseio.com',
	projectId: 'ferrisbot-6e0f1',
	appId: '1:479457116766:web:56a4445e135279d5fbeacf',
	measurementId: 'G-B6LVJ99H13',
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const app = firebase;

var db = app.firestore();

if (process.env.NODE_ENV == 'development') {
	db.useEmulator('localhost', 8080);
}

export { db, firebase };

export default app;
