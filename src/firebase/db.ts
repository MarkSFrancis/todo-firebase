import firebase from "firebase/app";

export function getDb(name?: string) {
  return firebase.app(name).firestore();
}

export function mapToData<T extends { id: string }>(data: firebase.firestore.QuerySnapshot): T[] {
  return data.docs.map(d => ({
    ...d.data(),
    id: d.id
  })) as T[];
}

export class Db {
  constructor(public db = getDb()) {
  }

  todos(userId: string) {
    return this.db.collection(`users/${userId}/todos`);
  }
}