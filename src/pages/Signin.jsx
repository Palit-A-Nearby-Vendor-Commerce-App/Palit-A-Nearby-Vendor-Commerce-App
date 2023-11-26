import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import logo from "../assets/images/logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { UserContext } from "../UserContext";

const Signin = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const fetchUserData = () => {
    axios
      .get("http://localhost:8080/api/getAllUsers")
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = userData.find(
      (user) => user.email === email && user.password === password
    );

    console.log("AKo si user", user);

    if (user) {
      console.log("Current user: ", user);
      // Update the user context with the retrieved user data
      setUser({
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        image: user.image,
        lastName: user.lastName,
        // ... 
      });

      history.push("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom ">
      <div className="w-[500px] m-auto">
        <div className="w-full flex items-center justify-center">
          <img
            src={logo}
            alt="Palit logo"
            className="w-[250px] h-[102px] mt-40"
          />
        </div>
        <h2 className="text-2xl font-bold text-grayy mt-8">Welcome!</h2>
        <p className="text-slate-500 mb-10">Log in to continue</p>

        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <label>Email address</label>
            <CustomInput
              type="email"
              name="email"
              placeholder="yourname@gmail.com"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mt-4">
            <label>Password</label>
            <CustomInput
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <CustomButton
            btnStyle="w-full bg-primary p-3 text-white rounded-[20px] mt-10"
            label="Log In"
            type="submit"
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
        <Link to="signup">
          <div className="text-center mt-4 pb-6">
            Don't have an account?
            <span className="text-primary underline cursor-pointer">
              {" "}
              Sign up
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
