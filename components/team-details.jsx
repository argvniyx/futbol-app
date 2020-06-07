import Container from '@material-ui/core/Container'
import Directory from '../components/directory'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

export default function TeamDetails(props) {
  const classes = useStyles();

  if(props.team) {
    return (
      <Container className={classes.container}>
        <Directory teamId={props.team.TeamID} token={props.token}/>
      </Container>
    );
  }
  else {
    return (
      <Container fixed className={classes.container}>
        <Typography variant="h4" align="center">
          Elige un equipo
        </Typography>
      </Container>
    );
  }
}
