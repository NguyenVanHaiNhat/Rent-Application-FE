// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAoOZrp6-dysqAyaq24siJuV2isbfeMBDc",
    authDomain: "imageuploaddb-8ee78.firebaseapp.com",
    projectId: "imageuploaddb-8ee78",
    storageBucket: "imageuploaddb-8ee78.appspot.com",
    messagingSenderId: "375408611046",
    appId: "1:375408611046:web:300c871169fb58eee13527",
    measurementId: "G-SHCNT4CJMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default analytics;