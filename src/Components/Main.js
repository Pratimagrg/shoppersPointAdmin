import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CategoryPage from "./Category/Category";
import SpecificCategory from "./Category/SpecificCategory";
import Dashboard from "./Home/Dashboard";
import Home from "./Home/Home";
import HomePage from "./Home/HomePage";
import Login from "./login/login";
import Loginn from "./login/Loginn";

function Main(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {!isLoggedIn ? (
        <Loginn
          onLoggedIn={() => {
            setIsLoggedIn(true);
          }}
        />
      ) : (
        <div>
          <HomePage />
        </div>
      )}
    </div>
  );
}
export default Main;
