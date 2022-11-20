import React from "react";
import { useState } from "react";
import "./LoginForm.css";

// Login and Registration Functionality
function LoginForm({ login, register, setUser }) {
  // State Variables
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const [mode, setMode] = useState("");
  const [password2, setPassword2] = useState("");

  // Handles login of returning user
  const submitLoginHandler = (e) => {
    e.preventDefault();
    login(details);
  };

  // Handles registration of new user
  const submitRegisterHandler = (e) => {
    e.preventDefault();

    // Handles password confirmation
    if (password2 !== details.password) {
      alert("passwords do not match");
    } else {
      register(details);
    }
  };

  // Sets page mode to register
  const switchToRegister = (e) => {
    e.preventDefault();
    setUser({...details, username:"", password:"", portfolio:[]})
    setMode("register");
  };

  // Sets page mode to login
  const switchToLogin = (e) => {
    e.preventDefault();
    setUser({...details, username:"", password:"", portfolio:[]})
    setMode("");
  };

  return (
    <div>
      {mode === "" ? (
        <div className="form-wrapper">
          <form onSubmit={submitLoginHandler} className="login-form">
            <div className="form-inner">
              <h2>Login</h2>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="usernameLogin"
                  onChange={(e) =>
                    setDetails({ ...details, username: e.target.value })
                  }
                  value={details.username}
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="passwordLogin"
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                  value={details.password}
                ></input>
              </div>

              <input type="submit" value="LOGIN" className="btn" />

              <div className="register-link" onClick={switchToRegister}>
                Register a new user
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="form-wrapper">
          <form onSubmit={submitRegisterHandler}>
            <div className="form-inner">
              <h2>Register </h2>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="usernameRegister"
                  id="usernameRegister"
                  onChange={(e) =>
                    setDetails({ ...details, username: e.target.value })
                  }
                  value={details.username}
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="passwordRegister"
                  id="passwordRegister"
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                  value={details.password}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="password"> Re-type Password</label>
                <input
                  type="password"
                  name="passwordRegister"
                  id="passwordRegister2"
                  onChange={(e) => setPassword2(e.target.value)}
                ></input>
              </div>

              <input type="submit" value="REGISTER" className="btn" />

              <div className="register-to-login-link" onClick={switchToLogin}>
                Have an account? Login
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
