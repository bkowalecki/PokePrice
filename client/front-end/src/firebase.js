
import {initializeApp} from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, arrayUnion, doc } from 'firebase/firestore/lite';


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


  // Read in whole databse
  export async function getUsers(db) {
    const usersCol = collection(db, 'Users');
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map(doc => doc.data());
    return userList;
  }


 // add user
 export async function addUser(db, user) {
  try {
    const docRef = await addDoc(collection(db, "Users"), user);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
}

 // add card to user
 export async function addCard(db, cardID) {
  try {
    const docRef = await doc(db, "Users", "portfolio");
    
    await updateDoc(docRef, {
      portfolio: arrayUnion(cardID)
    })
  } catch (e) {
    console.error("Error adding card", e);
  }
  
}


  export default firebaseapp;