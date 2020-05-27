import SideImageForm from '../components/side-image-form'
import UserTextFields from '../components/user-textfields'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { useRef } from 'react';
import Router from "next/router"
import firebase from "firebase";
import Cookies from '../node_modules/js-cookie'
var $ = require( "jquery" );

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function RegisterParent() {
    const ref = useRef(null)
    const classes = useStyles();



    const handleRegister = () => {
        if (ref.current.validateFields()){
            console.log(ref.current.textState)
            $.ajax({
                method: 'POST',
                url: `${process.env.API_URL}/parent/sign-up`,
                data: ref.current.textState
            }).then(() => {
                firebase.auth().signInWithEmailAndPassword(
                    ref.current.textState.Email,
                    ref.current.textState.Password
                ).then((result) => {
                    let userData = {'displayName': result.user.displayName, 'email': result.user.email, 'phone': result.user.phoneNumber, 
                                    'uid': result.user.uid, 'token': result.user.xa, 'role': 3}
                    Cookies.set('user', JSON.stringify(userData))
                    //TODO: route to child creation
                    Router.push('/register-child')
                    console.log('sign up completado')
                })
            }).fail(() => {
                console.log('sign-up failed')
            }) 
        }
    }

    return (
        <SideImageForm imgPath="register-user-image.jpg" title="Registro">
          <UserTextFields ref = {ref}/>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            onClick = {handleRegister}
          >
            Registrarse
        </Button>
        </SideImageForm>
    );
}
