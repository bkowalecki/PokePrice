import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
} from "firebase/firestore/lite";

// Configurations
const firebaseConfig = {
  apiKey: "AIzaSyBLTiWZOp523_SYwQzSUtafe7dfeSkrcrQ",
  authDomain: "pokeprice-c718c.firebaseapp.com",
  projectId: "pokeprice-c718c",
  storageBucket: "pokeprice-c718c.appspot.com",
  messagingSenderId: "526690648801",
  appId: "1:526690648801:web:b24a0a8ee24856bc84eda0",
};

// Init and export the database reference
const firebaseapp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseapp);

// Return list of users
export async function getUsers(db) {
  const usersCol = collection(db, "Users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}

// Add user
export async function addUser(db, user) {
  try {
    const docRef = await addDoc(collection(db, "Users"), user);
    return docRef;
  } catch (e) {
    console.error("Error adding document (registering user): ", e);
  }
}

// Delete User
export async function deleteUser(db, user) {
  try {
    const docRef = await deleteDoc(collection(db, "Users"), user);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Add card to user portfolio
export async function addCard(db, user, fetchedCardId) {
  
  const docRef = doc(db, "Users", user.id);

  await updateDoc(docRef, {
    portfolio: arrayUnion(fetchedCardId)
});

}

// Delete card from user portfolio
export async function deleteCard(db, user, fetchedCardId) {
  try {
    const docRef = doc(db, "Users", user.id);

    await updateDoc(docRef, {
      portfolio: arrayRemove(fetchedCardId),
    });
  } catch (e) {
    console.error("Error deleting card", e);
  }
}

export default firebaseapp;
