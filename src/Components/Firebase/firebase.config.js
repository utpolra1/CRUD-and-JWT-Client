// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbhk7kFd2X0Zj9OzFvN-pYlA6qP8n-Diw",
  authDomain: "b9-crud-and-jwt-client.firebaseapp.com",
  projectId: "b9-crud-and-jwt-client",
  storageBucket: "b9-crud-and-jwt-client.appspot.com",
  messagingSenderId: "199233307929",
  appId: "1:199233307929:web:a73979a5ecc974b92c3188"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;