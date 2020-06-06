import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core';
import Header from './header'
import UserCard from '../components/user-card'
import EventDetails from '../components/event-details'
import Directory from '../components/directory'
import Timeline from '../components/timeline'
import Content from '../components/content-component'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
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

const PlaceholderEvent = 
  {
    id: 0,
    name: "",
    place: "",
    date: "",
    hour: "",
    length: "",
    comments: ""
  }

const DashboardComponent = props => {
  const classes = useStyles();
  const fixedHeightPaperT = clsx(classes.paper, classes.fixedHeightTop);
  const fixedHeightPaperB = clsx(classes.paper, classes.fixedHeightBottom);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [currentEvent, setCurrentEvent] = React.useState(PlaceholderEvent);
  const eventsRef = React.useRef(null)

  // The current child is the first child on first load
  // A coach does not have children
  const [children, setChildren] = React.useState(
    props.person.person.children ?
      props.person.person.children : null
  )
  const [currentChild, setCurrentChild] = React.useState(children ? children[0] : null)
  const [teamId, setTeamId] = React.useState(
    currentChild ?
      currentChild.TeamID : props.person.person.TeamID
  );

  React.useEffect(() => {
    setTeamId(currentChild ? currentChild.TeamID : teamId)
  }, [currentChild ? currentChild : null])

  // Handle the event details logic. This is a callback to propagate changes upwards
  // from Timeline (child) to DashboardComponent (parent) so that EventDetails can be set
  const handleEventDetails = (index) => {

    if(index == -1){
      setCurrentEvent(PlaceholderEvent)
    }
    else{
      setSelectedIndex(index);
      setCurrentEvent(eventsRef.current[index]);
    }
  }

  // Another callback. This time, to the Header, since the header determines the
  // current child (for team information loading)
  const handleHeaderList = (selectedChild) => {
    setCurrentChild(selectedChild)
  }

  return (
    <Box className={classes.root}>
      <Header user={props.user} items={children} handler={handleHeaderList}/>
      <Content>
        <Timeline
          className={fixedHeightPaperT}
          handler={handleEventDetails}
          user={props.person.person}
          ref = {eventsRef}
        />
        <EventDetails className={fixedHeightPaperT} event={currentEvent} user={props.user}/>
        <Directory className={fixedHeightPaperB} teamId={teamId} token={props.person.person.token}/>
        <UserCard className={fixedHeightPaperB} person={props.person}/>
      </Content>
    </Box>
  );
}

export async function getServerSideProps(){
  
}

export default DashboardComponent;
