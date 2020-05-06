import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core';
import Header from './header'
import UserCard from '../components/user-card'
import EventDetails from '../components/event-details'
import Directory from '../components/directory'
import Timeline from '../components/timeline'
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  content: {
    height: '100vh',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
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

let son = {
  firstName: "Fulano",
  lastName: "Uno",
  teamNumber: 1,
  absenceCount: 4
};

let person = {
  firstName: "Andrés Ricardo",
  lastName: "Garza Vela",
  email: "aricav96@gmail.com",
  phone: "8166699778",
  children: [son]
};

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
  const [currentEvent, setCurrentEvent] = React.useState(events[0]);

  // Handle the event details logic
  const handleEventDetails = (index) => {
    setSelectedIndex(index);
    setCurrentEvent(events[index]);
  }

  return (
    <Box className={classes.root}>
      <Header/>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Timeline className={fixedHeightPaperT} events={events} handler={handleEventDetails}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <EventDetails className={fixedHeightPaperT} event={currentEvent}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Directory className={fixedHeightPaperB}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <UserCard className={fixedHeightPaperB} person={person}/>
            </Grid>
          </Grid>
        </Container>
      </main>
    </Box>
  );
}

export default DashboardComponent;
