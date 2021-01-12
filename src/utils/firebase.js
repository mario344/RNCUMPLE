import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDRDlm-pCuBgMoj8ULQUcuwJMJWRnBHSb0",
    authDomain: "birthday-7e607.firebaseapp.com",
    projectId: "birthday-7e607",
    storageBucket: "birthday-7e607.appspot.com",
    messagingSenderId: "975785136893",
    appId: "1:975785136893:web:9456138bd769430c42e494"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);