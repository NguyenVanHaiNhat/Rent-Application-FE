// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANsr1svQVxdP9BfwBqWnm3Igpop789_eM",
    authDomain: "imageuploaddb-35458.firebaseapp.com",
    projectId: "imageuploaddb-35458",
    storageBucket: "imageuploaddb-35458.appspot.com",
    messagingSenderId: "940034976933",
    appId: "1:940034976933:web:ee28a0795fc33411fb714c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;