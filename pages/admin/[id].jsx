import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Header from '../../components/header'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Content from '../../components/content-component'
import AdminList from '../../components/admin-list'
import { makeStyles } from '@material-ui/styles'
import {useRouter} from 'next/router'
import cookies from '../../node_modules/next-cookies'


var $ = require( "jquery" );

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

const Admin = (props) => {
  const router = useRouter()
  const classes = useStyles();
  const fixedHeightPaperT = clsx(classes.paper, classes.fixedHeightTop)

  // Handling the Dialog opening and closing
  const [open, setOpen] = React.useState(false);
  const handleCloseDialog = () => setOpen(false);
  const handleOpenDialog = () => setOpen(true);

  // State for invitation sending
  const [coach, modifyCoach] = React.useState({
    FirstName: "",
    LastName: "",
    Email: ""
  });

  const handleChange = (event) => modifyCoach({...coach, [event.target.id]: event.target.value})
  const sendInvitation = () => {
    fetch(`${process.env.API_URL}/admin/new-coach`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${props.person.token}`,
        'Content-Type': 'application/json'
      },
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
        <AdminList
          className={fixedHeightPaperT}
          teams={props.teams}
          token={props.person.token}
        />
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
            id="Email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="FirstName"
            label="Nombre"
            name="name"
            autoComplete="name"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="LastName"
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
};

Admin.getInitialProps = async context => {
  let {user} = cookies(context)

  let res = await fetch(`${process.env.API_URL}/teams/listTeams`)
  let teams = await res.json()

  return {
    person : user,
    teams: teams
  }

}

export default Admin;
