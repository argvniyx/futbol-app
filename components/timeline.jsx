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
import LinearProgress from '@material-ui/core/LinearProgress'
import ErrorDialog from '../components/error-dialog'
import { Typography } from '@material-ui/core';

const convertToDate = (date) => new Date(date._seconds * 1000).toDateString()

const getEvents = (props, page) => {
  return (
    fetch(`${process.env.API_URL}/events/${props.teamId}?Page=${page}&NumberToBring=5`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(res.ok)
          return res.json()
        else
          return {Events: []}
      })
  )
}

const Timeline = (props) => {
  // Events state
  //// Paging
  const [page, setPage] = React.useState(1)        // 1 is the first page...
  const [isStart, setStart] = React.useState(true) // ...and therefore we are at the start
  const [isEnd, setEnd] = React.useState(false)

  //// Events loading
  const [currentEvents, setCurrentEvents] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [isError, setError] = React.useState(false)

  //// Selection state
  const [selectedIndex, setSelectedIndex] = React.useState(props.index) // We default to the first event

  // This is the logic to open and close the add new event dialog
  const [openNewEvent, setOpenNewEvent] = React.useState(false)
  const handleNewEventOpen = () => setOpenNewEvent(true)
  const handleNewEventClose = () => setOpenNewEvent(false)

  // When the component is rendered (e.g. when the teamId changes)
  // We'll fetch the events from the database
  React.useEffect(() => {
    setLoading(true)
    getEvents(props, page)
      .then(
        (result) => {
          setCurrentEvents(result.Events)
          setStart(result.Start)
          setEnd(result.End)
          setLoading(false)
        },
        (error) => {
          setLoading(false)
          setCurrentEvents([])
          setError(true)
        }
      )
  }, [props.teamId, page])

  React.useEffect(() => {
    setLoading(true)
    getEvents(props, page)
      .then(
        (result) => {
          setCurrentEvents(result.Events)
          setLoading(false)
        },
        (error) => {
          setLoading(false)
          setCurrentEvents([])
          setError(true)
        }
      )
    props.setSignal(false)
  }, [props.signal])

  // Page Navigation
  const handleBack = () => loading || isStart || setPage(page - 1)
  const handleNext = () => loading || isEnd || setPage(page + 1)

  // Selection Logic
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
    props.setIndex(index)
  }

  // We make currentEvents a dependency so that when we have a page nav, we refresh
  // If we leave that out, this will not work for when we change page and have the first
  // element selected, since the effect is not triggered (i.e. selectedIndex remains 0)
  React.useEffect(() => {
    if(currentEvents.length != 0)
      props.handler(currentEvents[selectedIndex])
    else
      props.handler(null)
    // When we toggle between an eventless team, this cleans up EventDetails
  }, [selectedIndex, currentEvents])

  // If I change pages, I should
  // a) focus the first element if I have selected an out of range index
  // b) the selected index
  // B is for when we update an event
  React.useEffect(() => {
    selectedIndex >= currentEvents.length
    ? setSelectedIndex(0)
    : setSelectedIndex(selectedIndex)
  }, [currentEvents])


  // Rendering
  if(isError) {
    return <ErrorDialog/>
  }

  return (
    <Card className={props.className}>
      <CardHeader title="Timeline"/>

      <CardContent style={{flexGrow: 1}}>
        {loading
         ? <LinearProgress/>
         : <List>
            {currentEvents.length == 0
             ? <Typography variant="h5">No hay eventos</Typography>
             : currentEvents.map((e) => (
                <ListItem
                  key={e.id}
                  button
                  selected={selectedIndex === currentEvents.indexOf(e)}
                  onClick={(event) => handleListItemClick(event, currentEvents.indexOf(e))}
                >
                  <ListItemText primary={e.Name}
                                secondary={convertToDate(e.Date)}/>
                </ListItem>
            ))}
           </List>
        }
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
            id="Name"
            label="Nombre del evento"
            type="name"
            /* defaultValue={currentEvent.name} */
            /* onChange={handleFieldChange} */
            fullWidth
          />
          <TextField
            margin="normal"
            id="Place"
            label="Lugar del evento"
            type="name"
            /* defaultValue={currentEvent.name} */
            /* onChange={handleFieldChange} */
            fullWidth
          />
          <TextField
            margin="normal"
            id="Date"
            type="date"
            label="Fecha del evento"
            InputLabelProps={{shrink: true}}
            /* defaultValue={currentEvent.name} */
            /* onChange={handleFieldChange} */
            fullWidth
          />
          <TextField
            margin="normal"
            id="Hour"
            label="Hora del evento"
            type="time"
            InputLabelProps={{shrink: true}}
            /* defaultValue={currentEvent.name} */
            /* onChange={handleFieldChange} */
            fullWidth
          />
          <TextField
            margin="normal"
            id="timeDuration"
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

export default Timeline;
