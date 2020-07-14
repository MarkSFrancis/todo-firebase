import firebase from "firebase/app";

export async function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);

  return result?.user;
}

export async function signOut() {
  await firebase.auth().signOut();
}

export function isLoggedIn() {
  return !!firebase.auth().currentUser;
}

export function getUserId(): string | undefined {
  return firebase.auth().currentUser?.uid;
}

export function onSignInOrOut(
  nextOrObserver:
    | firebase.Observer<any>
    | ((a: firebase.User | null) => any),
  error?: (a: firebase.auth.Error) => any
): firebase.Unsubscribe {
  return firebase.auth().onAuthStateChanged(nextOrObserver, error);
}
