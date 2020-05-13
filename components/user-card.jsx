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

export default function UserCard(props) {
  const classes = useStyles();
  const {firstName, lastName, email, phone, children} = props.person;
  const fullName = firstName + " " + lastName;
  const childFullName = children[0].firstName + " " + children[0].lastName

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleSaveClick = () => console.log('clicked');
 
  return (
    <Card className={props.className}>
      <CardContent className={classes.content}>
        <div className={classes.info}>
          <Typography component="h5" variant="h5">
            {fullName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {email}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {phone}
          </Typography>
          <Typography variant="body2">
            Hijo: {childFullName}
          </Typography>
          <Typography variant="subtitle2">
            Faltas: {children[0].absenceCount}
          </Typography>
        </div>
        <Avatar className={classes.avatar} alt={fullName} src="/broken.jpg"/>
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
            fullWidth
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Apellido"
            type="name"
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            label="Correo Electrónico"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="phone"
            label="Teléfono"
            type="tel"
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
