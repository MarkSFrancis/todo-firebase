import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDSQBLZx_N-OQePQidIFVj6M0dQAHzboEE",
  authDomain: "phoenix-auth-267f5.firebaseapp.com",
  databaseURL: "https://phoenix-auth-267f5.firebaseio.com",
  projectId: "phoenix-auth-267f5",
  storageBucket: "phoenix-auth-267f5.appspot.com",
  messagingSenderId: "539891207271",
  appId: "1:539891207271:web:9031e013baeddb8461d8c2",
  measurementId: "G-Y9MLBD45WW",
};

export function setup(config: Object) {
  const app = firebase.initializeApp(config);

  if (process.env.NODE_ENV === "development") {
    (window as any).firebase = firebase;
    (window as any).firebaseApp = app;
  }

  return app;
}
