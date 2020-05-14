import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

export default function EventDetails(props) {
  const [currentEvent, modifyEvent] = React.useState(props.event)
  const {name, place, date, hour, length, comments} = currentEvent;

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleFieldChange = (event) => {
    modifyEvent({...currentEvent, [event.target.id]: event.target.value})
  }

  return (
    <Card className={props.className}>
      <CardHeader title="Evento"/>
      <CardContent style={{flexGrow: 1}}>
        <Typography variant="h6">Nombre de Evento</Typography>
        {name}
        <Typography variant="h6">Asistencia</Typography>
        {}
        <Typography variant="h6">Lugar del Evento</Typography>
        {place}
        <Typography variant="h6">Hora</Typography>
        {hour}
        <Typography variant="h6">Duración</Typography>
        {length}
        <Typography variant="h6">Comentarios</Typography>
        {comments}
      </CardContent>
      {props.user ? null :
       <CardActions>
         <IconButton onClick={handleOpenEdit}>
           <Edit/>
         </IconButton>
       </CardActions>
      }
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <DialogTitle>Editar detalles de evento</DialogTitle>
        <DialogContent>
          <DialogContentText>Aquí puedes editar la información del evento</DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Nombre del evento"
            type="name"
            defaultValue={currentEvent.name}
            onChange={handleFieldChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="place"
            label="Lugar del evento"
            type="name"
            defaultValue={currentEvent.place}
            onChange={handleFieldChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="hour"
            label="Hora del evento"
            type="name"
            defaultValue={currentEvent.hour}
            onChange={handleFieldChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="length"
            label="Duración del evento"
            type="name"
            defaultValue={currentEvent.length}
            onChange={handleFieldChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="comments"
            label="Comentarios"
            type="name"
            defaultValue={currentEvent.comments}
            onChange={handleFieldChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            /* onClick={handleSaveClick} */
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
