import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDZ6cHVLdJFkuQkz388NbEDB0kmp3t7kfc",
    authDomain: "jotchart.firebaseapp.com",
    databaseURL: "https://jotchart.firebaseio.com",
    projectId: "jotchart",
    storageBucket: "",
    messagingSenderId: "164084187360"
};
firebase.initializeApp(config);
export default firebase;