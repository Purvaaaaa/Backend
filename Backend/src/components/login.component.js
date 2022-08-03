import { useRef, useState, useEffect } from "react";
import AuthContext from "../context/auth-context";
import Shoping from "./shoping";

const Login = () => {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");

  // Destructring values from useSate returned array
  const [userAuth, setuserAuth] = useState("default");

  // userAut = 'Success'
  // setuserAuth("succes")

  const getrequestOptions = {
    method: "GET",
  };

  const onSubmitHandler = async (event) => {
    //Submit the event, and send the username and password to backend
    event.preventDefault();
    console.log({ id, password });

    try {
      // AJAX Call
      // fetch is a asynchrounous fn
      await fetch("http://127.0.0.1:5001/api/creds/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      await fetch("http://127.0.0.1:5001/api/auth/", getrequestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setuserAuth(data["authetication"]);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (userAuth != "default" && userAuth != "1") {
      console.log(userAuth);
    }
  }, [userAuth]);

  const IDChangeHandler = (e) => {
    setID(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  return (
    <AuthContext.Provider value={userAuth}>
      {userAuth == "great success" && <Shoping></Shoping>}
      {userAuth == "fail" && <div>Authentication failed</div>}
      {userAuth != "great success" && (
        <form onSubmit={onSubmitHandler}>
          <h3>Log In - Welcome</h3>

          <div className="mb-3">
            <label>User ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter ID"
              value={id}
              onChange={IDChangeHandler}
              onFocus={() => setuserAuth("pending")}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={passwordChangeHandler}
              onFocus={() => setuserAuth("pending")}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>
          <br></br>
          <p className="forgot-password text-right">
            New user? <a href="./sign-up">Sign Up</a>
          </p>
        </form>
      )}
    </AuthContext.Provider>
  );
};

export default Login;
