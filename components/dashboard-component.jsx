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

const getInitialTeamID = (parent) => {
  if(parent.children)
    return parent.children[0].TeamID
  else
    console.log("no kids") // Navigate to register child
}

const DashboardComponent = props => {
  const classes = useStyles();
  const fixedHeightPaperT = clsx(classes.paper, classes.fixedHeightTop);
  const fixedHeightPaperB = clsx(classes.paper, classes.fixedHeightBottom);

  // The user may be either a parent or a coach.
  // If
  // Parent: teamId = the TeamID of the first child. We must check that the parent has children
  // Coach: teamId = its own team id
  const [teamId, setTeamId] = props.user
        ? React.useState(getInitialTeamID(props.person.person))
        : React.useState(props.person.person.TeamID)

  // Likewise, if we have a parent, we'll pass the children to the header
  const [children, setChildren] = props.user
        ? React.useState(props.person.person.children)
        : React.useState([])

  return (
    <Box className={classes.root}>
      <Header user={props.user} items={children} handler={setTeamId}/>
      <Content>
      {/*   <Timeline */}
      {/*     className={fixedHeightPaperT} */}
      {/*     handler={handleEventDetails} */}
      {/*     user={props.person.person} */}
      {/*     ref = {eventsRef} */}
      {/*   /> */}
      {/*   <EventDetails className={fixedHeightPaperT} event={currentEvent} user={props.user}/> */}
        <Directory className={fixedHeightPaperB} teamId={teamId} token={props.person.person.token}/>
      {/*   <UserCard className={fixedHeightPaperB} person={props.person}/> */}
      </Content>
    </Box>
  );
}

export async function getServerSideProps(){
  
}

export default DashboardComponent;
