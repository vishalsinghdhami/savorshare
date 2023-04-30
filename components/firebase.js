import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyANTKvnFFcPSp2r5upgw8cOKYuvv8zWWY0",
  authDomain: "ineuron8-52cc4.firebaseapp.com",
  projectId: "ineuron8-52cc4",
  storageBucket: "ineuron8-52cc4.appspot.com",
  messagingSenderId: "304454951117",
  appId: "1:304454951117:web:32178d6e89038d0a8bc984"
};
// Initialize Firebase
const app1 = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app1);
export default app1
