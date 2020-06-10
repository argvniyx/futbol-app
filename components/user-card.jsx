import firebase from 'firebase';
import admin from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(1),
    fontSize: theme.spacing(5)
  },
}));

function splitName(fullName) {
  const splitName = fullName.split(/[ ]/);
  const amountOfNames = splitName.length;
  return {
    firstName: splitName.slice(0, amountOfNames - 1).join(' '),
    lastName: splitName.slice(amountOfNames - 1).join(' ')
  }
}

export default function UserCard(props) {
  const classes = useStyles();

  // User info setup
  const split = splitName(props.person.person.displayName)
  const [user, modifyUser] = React.useState({...props.person.person, firstName: split.firstName, lastName: split.lastName})
  const {displayName, email, phone, firstName, lastName} = user;

  // Firebase setup
  const [fbUser, setFbUser] = React.useState(null)
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setFbUser(user)
      }
    });
  }, [])

  //// Used as intermediate object before saving
  const [userInfo, modifyUserInfo] = React.useState({...props.person.person, firstName: split.firstName, lastName: split.lastName})

  // Dialog open/close
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    // If there is no change, we should rollback the stat
    modifyUserInfo(user)
    setOpenEdit(false);
  }

  // Post to server
  const handleSaveClick = () => {
    // In Firebase
    let displayName = `${userInfo.firstName} ${userInfo.lastName}`

    //// Only update what has actually changed
    if(userInfo.firstName != user.firstName || userInfo.lastName != user.lastName) {
      fbUser.updateProfile({
        displayName: displayName,
        email: userInfo.email,
      })
            .then(() => console.log("success"))
            .catch((err) => console.log(err))
    }

    if(userInfo.email != user.email)
      fbUser.updateEmail(userInfo.email)

    // Locally
    modifyUser(userInfo)

    setOpenEdit(false)
  }

  const handleFieldChange = (event) => {
    modifyUserInfo({...userInfo, [event.target.id]: event.target.value})
  }

  // Render
  return (
    <Card className={props.className}>
      <CardContent className={classes.content}>
        <div className={classes.info}>
          <Typography component="h5" variant="h5">
            {firstName + ' ' + lastName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {email}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {phone}
          </Typography>
        </div>
        <Avatar className={classes.avatar} alt={firstName} src="/broken.jpg"/>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleOpenEdit}>
          <Edit/>
        </IconButton>
      </CardActions>

      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <DialogTitle>Editar Información</DialogTitle>
        <DialogContent>
          <DialogContentText>Aquí puedes editar tu información de usuario</DialogContentText>
          <ValidatorForm
            onSubmit={handleSaveClick}
            onError={(err) => console.log(err)}
          >
            <TextValidator
              fullWidth
              margin="normal"
              id="firstName"
              label="Nombre"
              value={userInfo.firstName}
              onChange={handleFieldChange}
              validators={['required']}
              errorMessages={['El nombre es obligatorio']}
            />

            <TextValidator
              fullWidth
              margin="normal"
              id="lastName"
              label="Apellido"
              value={userInfo.lastName}
              onChange={handleFieldChange}
              validators={['required']}
              errorMessages={['El apellido es obligatorio']}
            />

            <TextValidator
              fullWidth
              margin="normal"
              id="email"
              label="Correo Electrónico"
              value={userInfo.email}
              onChange={handleFieldChange}
              validators={['required', 'isEmail']}
              errorMessages={['El correo es obligatorio', 'No es un email válido']}
            />

            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Guardar
              </Button>
            </DialogActions>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
