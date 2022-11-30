import "./App.css";
import {
  getUsers,
  addUser,
  db,
  addCard,
  deleteCard,
  deleteUser,
} from "./firebase";
import pokemon from "pokemontcgsdk";
import Header from "./Components/Header/Header";
import CardSearch from "./Components/UpperPanel/CardSearch/CardSearch";
import CardInfo from "./Components/UpperPanel/CardInfo/CardInfo";
import LoginForm from "./Components/Login/LoginForm";
import Portfolio from "./Components/LowerPanel/Portfolio/Portfolio";
import { useEffect, useState } from "react";
import {
  deleteDoc,
  doc,
  getDocs,
  addDoc,
  collection,
  arrayUnion,
  updateDoc,
} from "firebase/firestore/lite";
import { async } from "@firebase/util";

function App() {
  // API key to access pokemon card api
  pokemon.configure({ apiKey: "d47970f2-3447-4b91-92f8-8b3427ebb339" });

  // Database State Variable
  const [dbRef, setdbRef] = useState([]);

  // User collections
  const usersCollectionRef = collection(db, "Users");

  // User State (Stored in Firebase)
  const [user, setUser] = useState({
    username: "",
    password: "",
    portfolio: [],
  });

  // Card Portfolio (Stored locally)
  const [cardPortfolio, setCardPortfolio] = useState([]);

  // Card Search Data State
  // Used to query Pokemon API
  const [searchData, setSearchData] = useState({
    name: "",
    set: "",
    number: "",
  });

  // Fetched Card State
  // Returned Card Object from Pokemon API
  const [fetchedCard, setFetchedCard] = useState({
    img: "",
    price: "",
    id: null,
    name: "",
    set: "",
    number: "",
  });

  // Allows for "side effects"
  // Runs on every render
  useEffect(() => {
    // Fetch list of users
    const fetchDB = async () => {
      const userList = await getDocs(usersCollectionRef);
      setdbRef(userList.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchDB();
  }, []);

  // Login function
  const login = async (details) => {
    // Look for log-in match
    const foundEntry = dbRef.find(
      (entry) =>
        entry.username === details.username &&
        entry.password === details.password
    );

    //Login success
    if (foundEntry) {
      setUser({
        username: foundEntry.username,
        password: foundEntry.password,
        portfolio: foundEntry.portfolio,
        id: foundEntry.id,
      });
    }

    //login failure
    else {
      alert("Login Failed. Try again.");
    }
  };

  // Logs user out by resetting user object
  const logout = async (e) => {
    e.preventDefault();
    setUser({ ...user, username: "", password: "", portfolio: [] });

    setCardPortfolio([]);
  };

  // Registers a new user
  const register = async (details) => {
    // Check username availability
    const foundEntry = dbRef.find(
      (entry) => entry.username === details.username
    );

    // If username is taken, alert and exit
    // If not taken, add new user to db and set user state
    if (foundEntry) {
      alert("Username taken");
    } else {
      // Add user to Firebase with blank portfolio
      const userDocRef = await addUser(db, { ...details, portfolio: [] });

      // Set the user locally
      setUser({
        username: details.username,
        password: details.password,
        portfolio: [],
        id: userDocRef.id,
      });
    }
  };

  // Deletes a user from Firebase
  const deleteUserFromDB = async (details) => {
    const foundEntry = dbRef.find(
      (entry) => entry.username === details.username
    );

    if (foundEntry) {
      // Delete user from firebase
      await deleteDoc(doc(db, "Users", user.id));

      console.log({user})

      // reset the user locally
      setUser({
        username: "",
        password: "",
        portfolio: [],
        id: "",
      });

      setCardPortfolio([]);
    } else {
      alert("Unable to delete");
    }
  };

  const addCardToPortfolio = async () => {
    let alreadyPresent = false;

    //TO-DO
    for (const card in user.portfolio) {
      if (user.portfolio[card] === fetchedCard.id) {
        alreadyPresent = true;
      }
    }
    //Deal with adding a duplicate card
    if (!alreadyPresent) {
      await addCard(db, user, fetchedCard.id);
      setUser({ ...user, portfolio: [...user.portfolio, fetchedCard.id] });
    }

    console.log({user})
  };

  const deleteCardFromPortfolio = async () => {
    // Delete card from DB
    await deleteCard(db, user, fetchedCard.id);
    setUser({
      ...user,
      portfolio: user.portfolio.filter((card) => {
        return card !== fetchedCard.id;
      }),
    });
  };

  // Runs when search button clicked
  const handleSearchSubmit = async (event) => {
    // prevent page refresh
    event.preventDefault();

    // Query to Pokemon API using name, set, and number parameters
    // Sets the fetched card object
    await pokemon.card
      .all({ q: `name:${searchData.name} number:${searchData.number}` })
      .then((result) => {
        result.forEach((cardRef) => {
          if (cardRef.set.name.toUpperCase() === searchData.set.toUpperCase()) {
            setFetchedCard({
              img: cardRef.images.small,
              price: cardRef.cardmarket.prices.trendPrice,
              id: cardRef.id,
              name: cardRef.name,
              set: cardRef.set.name,
              number: cardRef.number,
            });
          }
        });
      });
  };

  // Updates the local card portfolio object
  // Runs when a card is added/deleted
  // Possible run on startup?
  const updatePortfolio = async () => {
    const tempPortfolio = [];
    for (const id of user.portfolio) {
      const card = await pokemon.card.find(id);

      const tempCard = {
        cardImg: card.images.small,
        cardPrice: card.cardmarket.prices.trendPrice,
        cardName: card.name,
        cardSet: card.set.name,
        cardNumber: card.number,
        cardId: card.id,
      };

      if (user.portfolio[id] !== tempCard.cardId) {
        tempPortfolio.push(tempCard);
      }
    }
    setCardPortfolio(tempPortfolio);
    console.log("hello");
    console.log({ tempPortfolio });
    console.log({ user });
  };

console.log({cardPortfolio})

  // Returns LoginForm if username = ""
  // Returns dashboard wrapper if user is logged in
  return (
    <div className="App">
      {user.username !== "" ? (
        <div className="dashboard">
          <div className="header">
            <Header
              user={user}
              logout={logout}
              deleteUserFromDB={deleteUserFromDB}
            />
          </div>

          <div className="upper-panel">
            <CardSearch
              handleSearchSubmit={handleSearchSubmit}
              searchData={searchData}
              setSearchData={setSearchData}
            />
            <CardInfo
              fetchedCard={fetchedCard}
              addCardToPortfolio={addCardToPortfolio}
              deleteCardFromPortfolio={deleteCardFromPortfolio}
            />
          </div>

          <div className="lower-panel">
            <Portfolio
              cardPortfolio={cardPortfolio}
              updatePortfolio={updatePortfolio}
              user={user}
            />
          </div>
        </div>
      ) : (
        <LoginForm login={login} register={register} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
