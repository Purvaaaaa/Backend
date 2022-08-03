import { useRef, useState, useEffect } from "react";
import SelectBucket from "./SelctBucket";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userAuth, setuserAuth] = useState("default");

  const getrequestOptions = {
    method: "GET",
  };

  const onSubmit = async (event) => {
    //Submit the event, and send the username and password to backend
    event.preventDefault();
    console.log({ email, password });

    try {
      const res = await fetch("http://127.0.0.1:5001/api/creds/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const response = await fetch(
        "http://127.0.0.1:5001/api/auth/",
        getrequestOptions
      )
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

  return (
    //Create a form and send it
    <>
      {userAuth == "great success" && <SelectBucket></SelectBucket>}
      {userAuth=='fail' && <div>Authentication failed</div>}
      {userAuth != "great success" && (
        <div className="Login">
          <form onSubmit={onSubmit}>
            Email ID
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            Password
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input type="submit" value="Login" />
          </form>
        </div>
      )}
    </>
  );
};
export default Login;
