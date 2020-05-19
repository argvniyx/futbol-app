import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button';

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
  let children = ''
  let childFullName = ''
  if (props.person.person.role == 3){
    children = user.children;
    childFullName = children[0].FirstName + " " + children[0].LastName
  }


  //// Used as intermediate object before saving
  const [userInfo, modifyUserInfo] = React.useState({...props.person.person, firstName: split.firstName, lastName: split.lastName})

  // Dialog open/close
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    // If there is no change, we should rollback the state
    modifyUserInfo(user)
    setOpenEdit(false);
  }

  // Post to server
  const handleSaveClick = () => {
    modifyUser(userInfo)
  }

  const handleFieldChange = (event) => {
    modifyUserInfo({...userInfo, [event.target.id]: event.target.value})
  }
 
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
          {props.person.person.role == 3 ? 
            <div>
            <Typography variant="body2">
              Hijo: {childFullName}
            </Typography>
            <Typography variant="subtitle2">
              Faltas: {children[0].Absence}
            </Typography>
            </div>
            : null}
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
          <TextField
            margin="dense"
            id="firstName"
            label="Nombre"
            type="name"
            defaultValue={user.firstName}
            onChange={handleFieldChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Apellido"
            type="name"
            defaultValue={user.lastName}
            onChange={handleFieldChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            label="Correo Electrónico"
            type="email"
            defaultValue={user.email}
            onChange={handleFieldChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="phone"
            label="Teléfono"
            type="tel"
            defaultValue={user.phone}
            onChange={handleFieldChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClick}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
