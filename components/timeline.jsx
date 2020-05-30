import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import AddBox from '@material-ui/icons/AddBox'

export default function Timeline(props) {

  const [eventsList, setEvents] = React.useState([])
  const [needData, setNeedData] = React.useState(0)

  React.useEffect(() => {
    fetch(`${process.env.API_URL}/events/${props.user.children[1].TeamID}?Page=1&NumberToBring=5`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`,
        'Content-Type': 'application/json'
      },
      
    }).then((res) => {
      return res.json()
    }).then((res) => {
      setEvents(res.Events)
      console.log('Se consiguieron eventos')
    })
  }, [needData])
  // checar con eventlist si no se detiene

  // Handling the loading of event details
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.handler(index);
  };

  // Handling the new event dialog
  const [openNewEvent, setOpen] = React.useState(false)
  const handleNewEventOpen = () => setOpen(true)
  const handleNewEventClose = () => setOpen(false)

  // Handling navigation
  const handleBack = () => console.log('test: ', eventsList)
  const handleNext = () => console.log('click derecho')

  function convertDate(date){
    let aux = new Date()
    aux.setTime(date._seconds)
    console.log(date._seconds)
    console.log(aux)
    return aux.toDateString()
  }

  return (
    <Card className={props.className}>
      <CardHeader title="Timeline"/>
      <CardContent style={{flexGrow: 1}}>
        <List>
          {eventsList.map((e) => (
            <ListItem
              key={e.id}
              button
              selected={selectedIndex === e.id}
              onClick={(event) => handleListItemClick(event, e.id)}
            >
              <ListItemText primary={e.Name}
                            secondary={convertDate(e.Date)}/>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleBack}>
          <NavigateBefore/>
        </IconButton>
        <IconButton onClick={handleNext}>
          <NavigateNext/>
        </IconButton>
        {props.user ? null :
            <IconButton onClick={handleNewEventOpen}>
              <AddBox/>
            </IconButton>
        }
      </CardActions>
      <Dialog
        open={openNewEvent}
        onClose={handleNewEventClose}
      >
        <DialogTitle>Crear nuevo evento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Introduce la información del nuevo evento. Haz click en guardar para crear
            el evento, o presiona en cualquier área fuera del cuadro para cancelar.
          </DialogContentText>
          <TextField
            margin="normal"
            id="name"
            label="Nombre del evento"
            type="name"
            /* defaultValue={currentEvent.name} */
            /* onChange={handleFieldChange} */
            fullWidth
          />
          <TextField
            margin="normal"
            id="place"
            label="Lugar del evento"
            type="name"
            /* defaultValue={currentEvent.name} */
            /* onChange={handleFieldChange} */
            fullWidth
          />
          <TextField
            margin="normal"
            id="date"
            type="date"
            label="Fecha del evento"
            InputLabelProps={{shrink: true}}
            /* defaultValue={currentEvent.name} */
            /* onChange={handleFieldChange} */
            fullWidth
          />
          <TextField
            margin="normal"
            id="hour"
            label="Hora del evento"
            type="time"
            InputLabelProps={{shrink: true}}
            /* defaultValue={currentEvent.name} */
            /* onChange={handleFieldChange} */
            fullWidth
          />
          <TextField
            margin="normal"
            id="hour"
            label="Duración del evento"
            type="time"
            InputLabelProps={{shrink: true}}
            /* defaultValue={currentEvent.name} */
            /* onChange={handleFieldChange} */
            fullWidth
          />
          <TextField
            margin="normal"
            id="comments"
            label="Comentarios"
            type="name"
            /* defaultValue={currentEvent.name} */
            /* onChange={handleFieldChange} */
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            /* onClick={handleSaveClick} */
          >
            Listo
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
