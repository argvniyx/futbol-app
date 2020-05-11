import SideImageForm from '../components/side-image-form'
import UserTextFields from '../components/user-textfields'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { useRef } from 'react';
import { useImperativeHandle } from 'react'

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
