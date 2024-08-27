// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyBTbbgPhE7yoLafTzzD126cN2X592_-4GA",
	authDomain: "codequest-auth.firebaseapp.com",
	projectId: "codequest-auth",
	storageBucket: "codequest-auth.appspot.com",
	messagingSenderId: "533102621913",
	appId: "1:533102621913:web:377c284c6e391e8d713ac8",
	measurementId: "G-QW9JY2H4ML",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
