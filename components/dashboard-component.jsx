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

const DashboardComponent = props => {
  const classes = useStyles();
  const fixedHeightPaperT = clsx(classes.paper, classes.fixedHeightTop);
  const fixedHeightPaperB = clsx(classes.paper, classes.fixedHeightBottom);

  return (
    <Box className={classes.root}>
      <Header/>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Timeline className={fixedHeightPaperT}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <EventDetails className={fixedHeightPaperT}/>
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
