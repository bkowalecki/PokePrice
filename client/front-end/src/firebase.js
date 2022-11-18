import {initializeApp} from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, setDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove, doc } from 'firebase/firestore/lite';

// Configurations
const firebaseConfig = {
    apiKey: "AIzaSyBLTiWZOp523_SYwQzSUtafe7dfeSkrcrQ",
    authDomain: "pokeprice-c718c.firebaseapp.com",
    projectId: "pokeprice-c718c",
    storageBucket: "pokeprice-c718c.appspot.com",
    messagingSenderId: "526690648801",
    appId: "1:526690648801:web:b24a0a8ee24856bc84eda0"
  };

  // Init and export the database reference 
  const firebaseapp = initializeApp(firebaseConfig);
  export const db = getFirestore(firebaseapp);


  // Return list of users
  export async function getUsers(db) {
    const usersCol = collection(db, 'Users');
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map(doc => doc.data());
    return userList;
  }


 // Add user
 export async function addUser(db, user) {
  try {
    const docRef = await addDoc(collection(db, "Users"), user);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
}

// Delete User
export async function deleteUser(db, user){
  try {
    const docRef = await deleteDoc(collection(db, "Users"), user);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

 // Add card to user portfolio
 export async function addCard(db, user, cardID) {
  // const dbRef = doc(db, "Users", user);
  const docRef = doc(db, "Users", user);

// Atomically add a new region to the "regions" array field.
await updateDoc(docRef, {
    portfolio: arrayUnion(cardID)
});
}

// Deletes card from user portfolio
export async function deleteCard(db, cardID, user){

  try {
    const docRef = doc(db, "Users", user);
    
    await updateDoc(docRef, {
      portfolio: arrayRemove(cardID)
    })
  } catch (e) {
    console.error("Error deleting card", e);
  }

}


  export default firebaseapp;