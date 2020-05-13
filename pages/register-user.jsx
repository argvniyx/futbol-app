import SideImageForm from '../components/side-image-form'
import UserTextFields from '../components/user-textfields'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { useRef } from 'react';
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
                url: 'http://localhost:5001/futbol-app-8b521/us-central1/app/parent/sign-up',
                data: ref.current.textState
            }).done(() => {
                console.log('finished sign-up')
                window.location.href = 'http://localhost:3000'
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
