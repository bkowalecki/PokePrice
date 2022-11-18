import "./App.css";
import { getUsers, addUser, db, addCard } from "./firebase";
import pokemon from "pokemontcgsdk";
import LoginForm from "./Components/Login/LoginForm";
import UpperPanelContainer from "./Components/UpperPanel/UpperPanelContainer/UpperPanelContainer";
import LowerPanelContainer from "./Components/LowerPanel/LowerPanelContainer/LowerPanelContainer";
import Portfolio from "./Components/LowerPanel/Portfolio/Portfolio";
import { useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore/lite";

function App() {
  // API key to access pokemon card api
  pokemon.configure({ apiKey: "d47970f2-3447-4b91-92f8-8b3427ebb339" });

  // Database State Variable
  const [dbRef, setdbRef] = useState([]); 

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
    img: "https://images.pokemontcg.io/base/1.png",
    price: "",
    id: null,
  });

  // State for temp cards when populating portfolio
  const [tempCard, setTempCard] = useState({
    cardName : "",
    cardId : "",
    cardPrice : "",
    cardImg : "",
    cardSet : "",
    cardNumber : ""
})

const [cardPortfolio, setCardPortfolio] = useState([])


  // Allows for "side effects"
  // Runs on every render
  useEffect(() => {

    // Fetch list of users
    async function fetchDB() {
      const userList = await getUsers(db);
      setdbRef(userList);
    }
    fetchDB();
    
  }, []);


  // Login function
  const login = async (details) => {
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
        portfolio: foundEntry.portfolio
      });

  
    }

    //login failure
    else {
      alert("Login Failed. Try again.");
    }
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

  const addCardToPortfolio = async (details) => {
    // const newCard = await addCard(db, details);
    alert("added card");
    await addCard(db, details, fetchedCard.id);
    //setUser({ ...details, portfolio: [fetchedCard.id] });
  };

  // Logs user out by setting username to ""
  const logout = (e) => {
    e.preventDefault();
    setUser({...user, username:""})
  };


  return (
    <div className="App">
      {user.username !== "" ? (
        <div className="dashboard">
          <div className="header-banner">
            <div>Hello, {user.username}</div>
            <div className="logout-btn" onClick={logout}>
              Logout
            </div>
          </div>
          <div className="upper-panel">
            <UpperPanelContainer
              props={setUser}
              searchData={searchData}
              setSearchData={setSearchData}
              fetchedCard={fetchedCard}
              setFetchedCard={setFetchedCard}
              addCardToPortfolio={addCardToPortfolio}
            />
          </div>
          <div className="lower-panel">
            <Portfolio
              addCardToPortfolio={addCardToPortfolio}
              setUser={setUser}
              user={user}
              tempCard = {tempCard}
              setTempCard = {setTempCard}
              cardPortfolio = {cardPortfolio}
              setCardPortfolio = {setCardPortfolio}
            />
          </div>
        </div>
      ) : (
        <LoginForm 
        login={login} 
        register={register}
        setUser={setUser} 
        />
      )}
    </div>
  );
}

export default App;
