import firebase from "firebase/app";

let db: Db | undefined;
export function getDb() {
  if (db) {
    return db;
  }

  const firestore = firebase.app().firestore();
  if (window.location.hostname === "localhost") {
    firestore.settings({
      host: "localhost:8080",
      ssl: false,
    });

    console.log('Changing settings');
  }

  return (db = new Db(firestore));
}

export function getNamedDb(name: string) {
  return firebase.app(name).firestore();
}

export function mapToData<T extends { id: string }>(
  data: firebase.firestore.QuerySnapshot
): T[] {
  return data.docs.map((d) => ({
    ...d.data(),
    id: d.id,
  })) as T[];
}

class Db {
  constructor(public db: firebase.firestore.Firestore) {}

  todos(userId: string) {
    return this.db.collection(`users/${userId}/todos`);
  }
}
