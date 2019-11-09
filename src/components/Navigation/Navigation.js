import React, { useContext, useEffect } from "react";
import * as styles from "./Navigation.module.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeRounded from "@material-ui/icons/HomeRounded";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
const Navigation = props => {
  const {
    changeIsLoggedIn,
    userIsLoggedIn: isLoggedIn,
    userFirstName,
    setAccountCreationAndLastLoginDate
  } = useContext(UserContext);
  const { navLoggedIn, navLoggedOut, navLink } = styles;
  let navId = isLoggedIn ? navLoggedIn : navLoggedOut;
  return (
    <nav id={navId}>
      <li>
        <AccountCircle fontSize="large" />
      </li>
      <li>{`Witaj ${isLoggedIn ? userFirstName : "użytkowniku!"}`}</li>
      {isLoggedIn ? (
        <li>
          <NavLink className={navLink} exact to="/dashboard">
            <HomeRounded />
          </NavLink>
        </li>
      ) : null}
      <li>
        {isLoggedIn ? (
          <NavLink onClick={()=>setAccountCreationAndLastLoginDate()} className={navLink} exact to="/profile">
            Profil
          </NavLink>
        ) : (
          <NavLink className={navLink} exact to="/sign-up">
            Zarejestruj się
          </NavLink>
        )}
      </li>
      <li>
        {isLoggedIn ? (
          <NavLink
            className={navLink}
            onClick={changeIsLoggedIn}
            exact
            to="/login"
          >
            Wyloguj
          </NavLink>
        ) : (
          <NavLink className={navLink} exact to="/login">
            Zaloguj się
          </NavLink>
        )}
      </li>
    </nav>
  );
};

export default Navigation;
