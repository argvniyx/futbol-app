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
  const {Name, Place, Hour, Duration, comments} = currentEvent;
  const DateOfEvent = currentEvent['Date']

  function convertDate(date){
    if (!date){
      return ""
    }
    let aux = new Date()
    aux.setTime(date._seconds * 1000)
    return aux.toLocaleTimeString()
  }

  React.useEffect(() => {
    modifyEvent(props.event)
  }, [props.event]);

  // Use as intermediate object before saving in dialog
  const [eventInfo, modifyEventInfo] = React.useState(props.event)

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    modifyEventInfo(currentEvent)
    setOpenEdit(false);
  }

  const handleFieldChange = (event) => {
    modifyEventInfo({...eventInfo, [event.target.id]: event.target.value})
  }

  const handleSaveClick = () => {
    modifyEvent(eventInfo)
    setOpenEdit(false)
  }

  return (
    <Card className={props.className}>
      <CardHeader title="Evento"/>
      <CardContent style={{flexGrow: 1}}>
        <Typography variant="h6">Nombre de Evento</Typography>
        {Name}
        <Typography variant="h6">Asistencia</Typography>
        {}
        <Typography variant="h6">Lugar del Evento</Typography>
        {Place}
        <Typography variant="h6">Hora</Typography>
        {convertDate(DateOfEvent)}
        <Typography variant="h6">Duración</Typography>
        {Duration}
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
            defaultValue={convertDate(currentEvent.hour)}
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
            onClick={handleSaveClick}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
