import "./App.css";
import { getUsers, addUser, db } from "./firebase";
import pokemon from "pokemontcgsdk";
import LoginForm from "./Components/Login/LoginForm";
import UpperPanelContainer from "./Components/UpperPanel/UpperPanelContainer/UpperPanelContainer";
import LowerPanelContainer from "./Components/LowerPanel/LowerPanelContainer/LowerPanelContainer";
import { useEffect, useState } from "react";

function App() {

  // API key to access pokemon card api
  pokemon.configure({ apiKey: "d47970f2-3447-4b91-92f8-8b3427ebb339" });


  // State variables
  const [dbRef, setdbRef] = useState([]);
  const [user, setUser] = useState({ username: "", password: "", portfolio:[] });
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDB() {
      const userList = await getUsers(db);
      console.log(userList);
      setdbRef(userList);
    }

    fetchDB();

  }, []);

  const login = async (details) => {

    const foundEntry = dbRef.find(entry => entry.username === details.username && entry.password === details.password)
    
    //Login success
    if(foundEntry){
      
      // Fetch users portfolio
      const userPortofolio = dbRef.find(entry => entry.username === details.username && entry.password === details.password)
      setUser({
        username: details.username,
        password: details.password,
        portfolio: details.portfolio
      });
    }

    //login failure
    else{
      console.log("Details do not match");
    }

  };

  const register = async (details) => {

    const foundEntry = dbRef.find(entry => entry.username === details.username)
    
    if(foundEntry){
      console.log("user already exists");
    }
    else{
      const newUser = await addUser(db, details);
      setUser({
        username: details.username,
        password: details.password,
        portfolio: []
      });
    }
  };

  const Logout = () => {
    console.log("logout;");
  };

 

  return (
    <div className="App">
      {user.username !== "" ? (
        <div className="dashboard">
          <div className="upper-panel">
            <UpperPanelContainer />
          </div>
          <div className="lower-panel">
            <LowerPanelContainer props = {user}/>
          </div>
        </div>
      ) : (
        <LoginForm login={login} register={register}/>
      )}
    </div>
  );
}

export default App;
