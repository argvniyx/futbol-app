import firebase from "firebase";
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Icon from '@mdi/react'
import { mdiGoogle } from '@mdi/js'
import { makeStyles } from '@material-ui/core/styles';
import SideImageForm from '../components/side-image-form'

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const GoogleIcon = () => {
  return (
    <Icon path={mdiGoogle} size={1} color="white"/>
  )
}

export default function Index() {
  const classes = useStyles();
  const [userInfo, setInfo] = React.useState({
    username: '',
    password: ''
  })

  const handleUserInfo = (event) => {
    setInfo({...userInfo, [event.target.name]: event.target.value})
  }

  const handleLogin = (event) => {
    firebase.auth().signInWithEmailAndPassword(
        userInfo['username'],
        userInfo['password']
    ).then(
        (result) => {
          getUserToken();
        },
        (err) => {
          alert("Oops " + err.message);
        }
    );
  }

  const handleLoginGoogle = (event) => {
      event.preventDefault()

      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
          console.log(result);
          getUserToken();
      }).catch((error) => {
          console.log(error.message);
      });
  }

  const getUserToken = () => {
      firebase.auth().currentUser.getIdToken(true).then((result) => {
          console.log(result);
      });
  }

  return (
    <SideImageForm imgPath="index-image.jpg">
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={handleUserInfo}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={handleUserInfo}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleLogin}
      >
        Iniciar Sesión
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        startIcon={<GoogleIcon/>}
        onClick={handleLoginGoogle}
      >
        Iniciar Sesión con Google
      </Button>
      <Grid container>
        <Grid item>
          <Link href="register-user">
            <a> {"¿No tienes cuenta? Regístrate"} </a>
          </Link>
        </Grid>
      </Grid>
    </SideImageForm>
  );
}
