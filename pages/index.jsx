import firebase from "firebase";
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Icon from '@mdi/react'
import { mdiGoogle } from '@mdi/js'
import { makeStyles } from '@material-ui/core/styles';
import SideImageForm from '../components/side-image-form'
import Router from "next/router"
import Cookies from '../node_modules/js-cookie'
var $ = require( "jquery" );

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

const LoginError = props => {
  let errorText = "";
  if(props.code == 1)
    errorText = "No existe un usuario asociado a ese correo. Verifica que esté bien escrito, o regístrate si no lo has hecho."
  else if(props.code == 2)
    errorText = "La contraseña proporcionada es incorrecta. Inténtalo de nuevo."

  return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle>{"No se pudo iniciar sesión"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {errorText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleClose}
          >
            Entendido
          </Button>
        </DialogActions>
      </Dialog>

  );
}

export default function Index() {
  const classes = useStyles();
  const [userInfo, setInfo] = React.useState({
    email: '',
    password: ''
  })
  const [open, setOpen] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState(0)
  const handleCloseDialog = () => setOpen(false);

  const handleUserInfo = (event) => {
    setInfo({...userInfo, [event.target.name]: event.target.value})
  }

  function getOtherParams(result, googleLogin){
    if (!googleLogin){
      $.ajax({
        method: 'GET',
        url: `${process.env.API_URL}/user/fillOtherUserParams`,
        headers: {
          authorization: 'Bearer ' + result['user']['xa']
        },
      }).then((otherParams) => {
        console.log(otherParams)
        if(otherParams.Role == 1){ // the user is an admin
          // Route to admin dashboard
          let userData = {'uid': result.user.uid, 'token': result.user.xa }
          Cookies.set('user', JSON.stringify(userData))
          Router.push(`/admin/${result.user.uid}`)
        }
        else if (otherParams.Role == 2){ // the user is a coach
          let userData = {'displayName': result.user.displayName, 'email': result.user.email, 'phone': result.user.phoneNumber,
                          'uid': result.user.uid, 'token': result.user.xa,  'role': otherParams.Role, 'TeamID': otherParams.TeamID}
          Cookies.set('user', JSON.stringify(userData))
          Router.push('/dashboard/' + result.user.uid)
        }
        else if (otherParams.Role == 3){ // the user is a parent
          routeLogin(result)
        }

      }).catch((error) => {
        console.log(error.message)
      })
    }
    else{
      routeLogin(result)
    }
  }

  function routeLogin(result){
    $.ajax({
      method: 'GET',
      url: `${process.env.API_URL}/parent/children`,
      headers: {
        authorization: 'Bearer ' + result['user']['xa']
      }
    }).then((children) => {
      if (children.length > 0){
        let userData = {'displayName': result.user.displayName, 'email': result.user.email, 'phone': result.user.phoneNumber, 
                        'uid': result.user.uid, 'token': result.user.xa, 'role': 3, 'children': children}
        Cookies.set('user', JSON.stringify(userData))
        Router.push('/dashboard/' + result.user.uid)
      }
      else{
        let userData = {'displayName': result.user.displayName, 'email': result.user.email, 'phone': result.user.phoneNumber, 
                        'uid': result.user.uid, 'token': result.user.xa, 'role': 3}
        Cookies.set('user', JSON.stringify(userData))
        Router.push('/register-child')
        
      }
    })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(
        userInfo['email'],
        userInfo['password']
    ).then(
        (result) => {
          getOtherParams(result, false)
        },
        (err) => {
          if(err.code == "auth/invalid-email")
            setErrorCode(1);
          else
            setErrorCode(2);
          setOpen(true);
        }
    );
  }

  const handleLoginGoogle = (event) => {
    event.preventDefault();
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        getOtherParams(result, true)
      }).catch((error) => {
          console.log(error.message);
          console.log(result)
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
      <LoginError
        open={open}
        handleClose={handleCloseDialog}
        code={errorCode}
      />
    </SideImageForm>
  );
}
