import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Header from '../components/header'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Content from '../components/content-component'
import AdminList from '../components/admin-list'
import { makeStyles } from '@material-ui/styles'
import $ from 'jquery'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeightTop: {
    height: 550
  },
  fixedHeightBottom: {
    height: 250
  }
}));

const InviteButton = (props) => {
  return (
    <Button color="inherit" size="large" onClick={props.onClick}>
      Generar Invitación
    </Button>
  );
}

export default function Admin() {
  const classes = useStyles();
  const fixedHeightPaperT = clsx(classes.paper, classes.fixedHeightTop)

  // Handling the Dialog opening and closing
  const [open, setOpen] = React.useState(false);
  const handleCloseDialog = () => setOpen(false);
  const handleOpenDialog = () => setOpen(true);

  // State for invitation sending
  const [coach, modifyCoach] = React.useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const handleChange = (event) => modifyCoach({...coach, [event.target.id]: event.target.value})
  const sendInvitation = () => {
    fetch('http://localhost:5001/futbol-app-8b521/us-central1/app/admin/new-coach', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(coach)
    })
      .then(
        (result) => {
          console.log("in success")
          console.log(result)
        },
        (error) => {
          console.log('in error')
          console.log(error)
        }
      )
  }

  return (
    <Box>
      <Header component={<InviteButton onClick={handleOpenDialog}/>}/>
      <Content fullWidth>
        <AdminList className={fixedHeightPaperT}/>
      </Content>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Mandar invitación a entrenador</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese una dirección de correo electrónico para invitar a un entrenador.
            El sistema generará un correo con un token especial para su registro.
          </DialogContentText>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Nombre"
            name="name"
            autoComplete="name"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Apellido"
            name="lastName"
            autoComplete="name"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={sendInvitation}
          >
            Mandar Invitación
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
