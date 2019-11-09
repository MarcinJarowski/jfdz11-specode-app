import React, { createContext, useState } from "react";
import firebase from "firebase";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [userEmailValue, setUserEmailValue] = useState("");
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [userId, setUserNewId] = useState("");
  const [userFirstName, setUserFirstNameValue] = useState("");
  const [userPicture, setUserPictureUrl] = useState(null);
  const [userLastLogin, setUserLastLogin] = useState('');
  const [userCreationTime, setUserCreationTime] = useState('');

  const setUserEmail = email => {
    setUserEmailValue(email);
  };
  const changeIsLoggedIn = () => {
    setUserIsLoggedIn(!userIsLoggedIn);
  };
  const setUserId = id => {
    setUserNewId(id);
  };
  const setUserFirstName = userName => {
    setUserFirstNameValue(userName);
  };
  const setUserPicture = url => {
    setUserPictureUrl(url);
  };
  const setInitialStateAfterLogout = () => {
    setUserEmail("");
    setUserFirstName("");
    setUserPicture("");
    setUserId("");
    setUserIsLoggedIn(false);
  };
  const deleteUserAccountAndClearFirebaseData = () => {
    var user = firebase.auth().currentUser;
    if (window.confirm("Czy napewno chcesz usunąć konto?")) {
      user.delete()
        .then(() => window.alert('Konto zostało usunięte'))
        .then(() => setInitialStateAfterLogout())
        .catch(() => window.alert('Coś poszło nie tak'));
    }

  }
  const createNewUserInfoInFirebaseAndChangeState = (
    id,
    userFirstName,
    userEmail
  ) => {
    setUserEmail(userEmail);
    setUserFirstName(userFirstName);
    setUserId(id);
    changeIsLoggedIn();
    firebase
      .database()
      .ref("users/" + id)
      .set({
        userEmail,
        userImgUrl: "",
        userFirstName
      })
      .then(() => {
        console.log("user data update successful");
      })
      .catch(() => {
        console.log("user data update failed");
      });
  };

  const updateDisplayName = name => {
    let user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name
      })
      .then(() => {
        console.log("name update successful");
      })
      .catch(() => {
        console.log("name update failed");
      });
  };
  const sendUpdateUserPasswordEmail = (userEmail) => {
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(userEmail)
      .then(() => window.alert('Email do zresetowania hasła zostanie wysłany'))
      .catch(()=>window.alert('Error'))
  }
  const setAccountCreationAndLastLoginDate = () => {
    const user = firebase.auth().currentUser;
    const userCreation = new Date(user.metadata.creationTime);
    const userLastLogin = new Date(user.metadata.lastSignInTime);
    const userCreationTime = userCreation.toLocaleDateString();
    const userLastLoginTime = userLastLogin.toLocaleDateString();
    setUserCreationTime(userCreationTime);
    setUserLastLogin(userLastLoginTime);
  }

  return (
    <UserContext.Provider
      value={{
        deleteUserAccountAndClearFirebaseData,
        setAccountCreationAndLastLoginDate,
        sendUpdateUserPasswordEmail,
        userCreationTime,
        userLastLogin,
        userId,
        userFirstName,
        userEmailValue,
        userIsLoggedIn,
        setUserEmail,
        setUserFirstName,
        changeIsLoggedIn,
        setUserId,
        setUserPicture,
        setInitialStateAfterLogout,
        createNewUserInfoInFirebaseAndChangeState,
        updateDisplayName
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
