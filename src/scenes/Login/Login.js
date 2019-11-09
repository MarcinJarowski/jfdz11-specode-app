import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as styles from "./Login.module.css";
import * as firebase from "firebase";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { MealsContext } from "../../contexts/mealsContext";

let { navLink } = styles;

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn = props => {
  const {
    setUserId,
    setUserEmail,
    changeIsLoggedIn,
    setUserFirstName
  } = useContext(UserContext);
  const {
    setUserCustomMeals,
    setUserScheduledMealsArray,
    setCommonMealsFromFirebase,
    setConcatedArray
  } = useContext(MealsContext);

  const classes = useStyles();
  const [passwordValue, changePasswordValue] = useState();
  const [emailValue, changeEmailValue] = useState();
  const auth = firebase.auth();

  const signInFunction = (emailValue, passwordValue) => {
    auth
      .signInWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            setUserId(user.uid);
            setUserEmail(emailValue);
            setUserFirstName(user.displayName);
            setCommonMealsFromFirebase();
            setUserScheduledMealsArray(user.uid);
            setUserCustomMeals();
            setConcatedArray();
            changeIsLoggedIn();
          }
        });
      })
      .then(() => {
        props.history.push("/dashboard");
        alert("Zalogowano pomyślnie");
      })
      .catch(e => {
        alert(e.message);
        console.log(e.message);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Zaloguj się
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => changeEmailValue(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => changePasswordValue(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={event => {
              event.preventDefault();
              signInFunction(emailValue, passwordValue);
            }}
          >
            Zaloguj
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Zapomniałeś hasła?
              </Link>
            </Grid> */}
            <Grid item>
              <Link>
                <NavLink className={navLink} exact to="/sign-up">
                  Nie masz jeszcze konta? Zarejestruj się! :)
                </NavLink>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(SignIn);
