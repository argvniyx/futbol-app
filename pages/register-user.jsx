import SideImageForm from '../components/side-image-form'
import UserTextFields from '../components/user-textfields'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function RegisterParent() {
    const classes = useStyles();

    return (
        <SideImageForm imgPath="register-user-image.jpg" title="Registro">
          <UserTextFields/>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Registrarse
        </Button>
        </SideImageForm>
    );
}
