import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import * as styles from "./ProfilePage.module.css";
import { UserContext } from '../../contexts/userContext'

const ProfilePage = props => {
  const { profilePageWrapper, profilePic, emailAddress, profilePicWrapper, button, paragraph} = styles;
  const { userEmailValue, deleteUserAccountAndClearFirebaseData, userCreationTime, userLastLogin, sendUpdateUserPasswordEmail} = useContext(UserContext);

  return (
    <div className={profilePageWrapper}>
      <div className={profilePicWrapper}>
        <img className={profilePic} src='https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' alt="profilowe"/>
      </div>
      <div className={emailAddress}>{userEmailValue}</div>
      <button class={button} onClick={(e)=>window.confirm('Jestes')}>Zmień zdjęcie profilowe</button>
      <button className={button} onClick={() => {
        sendUpdateUserPasswordEmail(userEmailValue);
      }}>Zmień hasło</button>
      <button className={button} onClick={() => {
        deleteUserAccountAndClearFirebaseData();
      }}>Usuń konto</button>
      <div className={paragraph}>Ostatnio zalogowano: {userLastLogin} </div>
      <div className={paragraph}>Dołączono: {userCreationTime} </div>
    </div>
  );
};

export default withRouter(ProfilePage);
