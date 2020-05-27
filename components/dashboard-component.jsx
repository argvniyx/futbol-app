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

const events = [
  {
    id: 0,
    name: "Partido",
    place: "Uro",
    date: new Date(2019, 4, 3).toDateString(),
    hour: "4:30",
    length: "2hrs",
    comments: "a"
  },
  {
    id: 1,
    name: "Entrenamiento",
    place: "Escuela",
    date: new Date(2019, 4, 5).toDateString(),
    hour: "3:30",
    length: "2hrs",
    comments: "b"
  },
  {
    id: 2,
    name: "Junta",
    place: "Escuela",
    date: new Date(2019, 4, 5).toDateString(),
    hour: "5:30",
    length: "30mins",
    comments: "c"
  },
  {
    id: 3,
    name: "Entrenamiento",
    place: "Escuela",
    date: new Date(2019, 4, 5).toDateString(),
    hour: "4:30",
    length: "2hrs",
    comments: "d"
  },
  {
    id: 4,
    name: "Entrenamiento",
    place: "Uro",
    date: new Date(2019, 4, 5).toDateString(),
    hour: "4:30",
    length: "2hrs",
    comments: "e"
  },
];

const DashboardComponent = props => {
  const classes = useStyles();
  const fixedHeightPaperT = clsx(classes.paper, classes.fixedHeightTop);
  const fixedHeightPaperB = clsx(classes.paper, classes.fixedHeightBottom);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [currentEvent, setCurrentEvent] = React.useState(events[selectedIndex]);

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
    setSelectedIndex(index);
    setCurrentEvent(events[index]);
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
          events={events}
          handler={handleEventDetails}
          user={props.user}
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
