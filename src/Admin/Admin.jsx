import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import logo from "../assets/images/logo.png";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { UserContext } from "../UserContext";


const Admin = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if(user)
    {
      history.push("/admindashboard/dashboard");
    }
  }, [user]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const fetchUserData = () => {
    axios
      .get("http://localhost:8080/api/getAllAdminAccounts")
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

    if (user) {
      console.log("Current user: ", user);
      setUser(user);
      history.push("/admindashboard/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-primary bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom">
      <div className="w-[500px] bg-white rounded-lg p-8">
        <div className="w-full flex items-center justify-center">
          <img src={logo} alt="Palit logo" className="w-[250px] h-[102px] mt-4" />
        </div>
        <h2 className="text-2xl font-bold text-grayy mt-4">Admin</h2>
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
            btnStyle="w-full bg-primary p-3 text-white rounded-[20px] mt-6"
            label="Log In"
            type="submit"
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Admin;
