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
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import moment from 'moment'

const placeholderEvent = {
  id: 0,
  Name: "",
  Place: "",
  Date: new Date(0),
  Duration: "",
  Description: "",
  TeamID: ""
};

const convertDate = (date) => new Date(date._seconds * 1000)
const displayHour = (date) => date.toLocaleTimeString()

const postEvent = (event, token) => {
  fetch(`${process.env.API_URL}/events/${event.id}`,{
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })
    .then(res => res.json())
    .then(
      (result) => console.log("success"),
      (err) => console.log(err)
    )
}

export default function EventDetails(props) {
  // We want to be able to manipulate the date as a Date object because that
  // is what the server expects in the PUT method
  const [currentEvent, modifyEvent] = React.useState(
    props.event
      ? {...props.event, Date: convertDate(props.event.Date)}
      : {...placeholderEvent, Date: convertDate(placeholderEvent.Date)}
  )

  React.useEffect(() => {
    if(props.event) modifyEvent({...props.event, Date: convertDate(props.event.Date)})
  }, [props.event])

  // Use as intermediate object before saving in dialog
  const [eventInfo, modifyEventInfo] = React.useState({...currentEvent})
  React.useEffect(() => modifyEventInfo(currentEvent), [currentEvent])

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    modifyEventInfo(currentEvent)
    setOpenEdit(false);
  }

  // Event modification
  const handleFieldChange = (event) => {
    modifyEventInfo({...eventInfo, [event.target.id]: event.target.value})
  }

  const handleTimeChange = (event) => {
    // The event value is the locale time string, so we convert it back to time
    // moment().toDate()
    const newDateString = `${eventInfo.Date.toLocaleDateString()} ${event.target.value}`
    const newDate = moment(newDateString, "DD-MM-YYYY HH:mm:ss").toDate()

    modifyEventInfo({
      ...eventInfo,
      Date: newDate
    })
  }

  // Modify the event and fire the signal
  const handleSaveClick = () => {
    modifyEvent(eventInfo)
    postEvent(
      {...eventInfo, timeDuration: eventInfo.Duration},
      props.token
    )
    props.setSignal(true)
    setOpenEdit(false)
  }

  return (
    <Card className={props.className}>
      <CardHeader title="Evento"/>
      {currentEvent
       ? <CardContent style={{flexGrow: 1}}>
          <Typography variant="h6">Nombre de Evento</Typography>
          <Typography variant="subtitle1" gutterBottom>{currentEvent.Name}</Typography>

          <Typography variant="h6">Lugar del Evento</Typography>
          <Typography variant="subtitle1" gutterBottom>{currentEvent.Place}</Typography>

          <Typography variant="h6">Hora</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {displayHour(currentEvent.Date)}
          </Typography>

          <Typography variant="h6">Duración</Typography>
          <Typography variant="subtitle1" gutterBottom>{currentEvent.Duration}</Typography>

          <Typography variant="h6">Comentarios</Typography>
          <Typography variant="subtitle1" gutterBottom>{currentEvent.Description}</Typography>

        </CardContent>
       : <Typography variant="h6">Elige un evento</Typography>
      }
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
          <ValidatorForm
            onSubmit={handleSaveClick}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              fullWidth
              margin="normal"
              id="Name"
              label="Nombre del evento"
              name="Name"
              value={eventInfo.Name}
              onChange={handleFieldChange}
              validators={['required']}
              errorMessages={['El nombre es obligatorio']}
            />

            <TextValidator
              fullWidth
              margin="normal"
              id="Place"
              label="Lugar del evento"
              name="Place"
              value={eventInfo.Place}
              onChange={handleFieldChange}
              validators={['required']}
              errorMessages={['El lugar es obligatorio']}
            />

            <TextValidator
              fullWidth
              margin="normal"
              InputLabelProps={{shrink: true}}
              type="time"
              id="Hour"
              label="Hora del evento"
              name="Hour"
              value={displayHour(eventInfo.Date)}
              onChange={handleTimeChange}
              validators={['required']}
              errorMessages={['La hora es obligatoria']}
            />

            <TextValidator
              fullWidth
              margin="normal"
              id="Duration"
              label="Duración del evento"
              name="Duration"
              value={eventInfo.Duration}
              onChange={handleFieldChange}
              validators={['required']}
              errorMessages={['La duración es obligatoria']}
            />

            <TextValidator
              fullWidth
              margin="normal"
              id="Description"
              label="Comentarios"
              name="Description"
              value={eventInfo.Description}
              onChange={handleFieldChange}
            />
          </ValidatorForm>

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
