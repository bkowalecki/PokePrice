import "./App.css";
import { getUsers, addUser, db, addCard } from "./firebase";

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

  // User State
  const [user, setUser] = useState({
    username: "",
    password: "",
    portfolio: [],
  });

  // Card Search Data State
  const [searchData, setSearchData] = useState({
    name: "",
    set: "",
    number: "",
  });

  // Fetched Card State
  const [fetchedCard, setFetchedCard] = useState({
    img: "",
    price: "",
    id: null,
    name: "",
    set: "",
    number: "",
  });

  // State for temp cards when populating portfolio
  const [tempCard, setTempCard] = useState({
    cardName: "",
    cardId: "",
    cardPrice: 0,
    cardImg: "",
    cardSet: "",
    cardNumber: "",
  });

  // User's portfolio
  // Contains array of fetched card objects
  const [cardPortfolio, setCardPortfolio] = useState([]);

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
      });
    }

    //login failure
    else {
      alert("Login Failed. Try again.");
    }
  };

  // Logs user out by setting username to ""
  const logout = (e) => {
    e.preventDefault();
    setUser({ ...user, username: "" });
  };

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
      await addUser(db, details);
      setUser({
        username: details.username,
        password: details.password,
        portfolio: [],
      });
    }
  };

  const deleteUser = async (details) => {
    const foundEntry = dbRef.find(
      (entry) => entry.username === details.username
    );

    if (foundEntry) {
      await deleteDoc(doc(dbRef, "users"));
    } else {
      alert("Unable to delete");
    }
  };

  const addCardToPortfolio = async () => {
    // const newCard = await addCard(db, details);
    await addCard(db, user, fetchedCard.id);
    setUser({ ...user, portfolio: [...user.portfolio, fetchedCard.id] });
    updatePortfolio();
  };

  // Runs when search button clicked
  const handleSearchSubmit = async (event) => {
    // prevent page refresh
    event.preventDefault();

    //Query to Pokemon API
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

  const updatePortfolio = async () => {
    const tempPortfolio = [...cardPortfolio];
    for(const id of user.portfolio) {

      const card = await pokemon.card.find(id)

      const tempCard = {
        cardImg: card.images.small,
        cardPrice: card.cardmarket.prices.trendPrice,
        cardName: card.name,
        cardSet: card.set.name,
        cardNumber: card.number,
        cardId: card.id,
      };
      tempPortfolio.push(tempCard);
      
    };
    setCardPortfolio(tempPortfolio);
  };

  return (
    <div className="App">
      {user.username !== "" ? (
        // Shows Home Page
        <div className="dashboard">
          <Header user={user} logout={logout} />

          <div className="upper-panel">
            <CardSearch
              handleSearchSubmit={handleSearchSubmit}
              searchData={searchData}
              setSearchData={setSearchData}
            />
            <CardInfo
              fetchedCard={fetchedCard}
              searchData={searchData}
              user={user}
              setUser={setUser}
              updatePortfolio={updatePortfolio}
              addCardToPortfolio={addCardToPortfolio}
            />
          </div>

          <div className="lower-panel">
            <Portfolio
              setUser={setUser}
              user={user}
              tempCard={tempCard}
              setTempCard={setTempCard}
              cardPortfolio={cardPortfolio}
              setCardPortfolio={setCardPortfolio}
              updatePortfolio={updatePortfolio}
            />
          </div>
        </div>
      ) : (
        //Shows Login/Register Page
        <LoginForm login={login} register={register} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
