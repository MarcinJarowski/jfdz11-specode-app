import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./userContext";
import * as firebase from "firebase";
//install uuid and manage meals id in firebase etc
// updateMealId = () => {
//     this.setState({ newMealId: this.state.newMealId + 1 });
//   };
export const MealsContext = createContext();

const MealsContextProvider = props => {
  const { userId } = useContext(UserContext);

  const [userCustomMealsArray, setUserCustomMealsArray] = useState([]);
  const [userScheduledMeals, setUserScheduledMeals] = useState([]);
  const [commonMealsForAll, setCommonMealsForAll] = useState([]);
  const [concatedCommonAndCustom, setConcatedCommonAndCustom] = useState([]);

  useEffect(()=>{
console.log(userScheduledMeals);
console.log('user scheduled ^^')
console.log(userCustomMealsArray);
console.log('user Custom ^^')
console.log(commonMealsForAll);
console.log('common4all ^^');
console.log(concatedCommonAndCustom);
console.log('concated ^^')
  }, [userCustomMealsArray, userScheduledMeals, commonMealsForAll, concatedCommonAndCustom])
  const setUserCustomMeals = userId => {
    firebase
      .database()
      .ref("customMeals/" + userId)
      .on("value", snapshot => {
        const mealsListObject = snapshot.val() || [];
        let customMealsFirebase = Object.values(mealsListObject).map(entry => {
          return { ...entry };
        });
        setUserCustomMealsArray([...customMealsFirebase]);
      });
  };
  const setUserScheduledMealsArray = id => {
    firebase
      .database()
      .ref("scheduledMeals/" + id)
      .on("value", snapshot => {
        const scheduledMealsSnapshot = snapshot.val() || [];
        let scheduledUserMealsFirebase = Object.entries(
          scheduledMealsSnapshot
        ).map(entry => {
          const [id, meal] = entry;
          return {
            ...meal,
            id
          };
        });
        setUserScheduledMeals([...scheduledUserMealsFirebase]);
      });
  };
  const setCommonMealsFromFirebase = () => {
    firebase
      .database()
      .ref("mealsArray")
      .on("value", snapshot => {
        let commonMeals = snapshot.val();
        let commonMealsArr = Object.values(commonMeals).map(element => {
          return { ...element };
        });
        setCommonMealsForAll([...commonMealsArr]);
      });
  };

  const addMealToSchedule = mealObjectToSchedule => {
    let mealWithDate = {
      ...mealObjectToSchedule,
      date: mealObjectToSchedule.date.toDate().toISOString()
    };
    setUserScheduledMeals([...userScheduledMeals, mealWithDate]);
  };

  const addMealToCustom = mealObjectToCustom => {
    let { date, ...mealWithoutDate } = mealObjectToCustom;
    setUserCustomMealsArray([...userCustomMealsArray, mealWithoutDate]);
  };

  const setConcatedArray = () => {
    setConcatedCommonAndCustom([...commonMealsForAll, ...userCustomMealsArray]);
    debugger;
  };

  return (
    <MealsContext.Provider
      value={{
        userCustomMealsArray,
        userScheduledMeals,
        concatedCommonAndCustom,
        setCommonMealsFromFirebase,
        addMealToCustom,
        addMealToSchedule,
        setUserCustomMeals,
        setUserScheduledMealsArray,
        setConcatedArray
      }}
    >
      {props.children}
    </MealsContext.Provider>
  );
};

export default MealsContextProvider;
