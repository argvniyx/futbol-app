import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SoccerBall from '@material-ui/icons/SportsSoccer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: props => `url(/${props.imgPath})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.secondary,
    width: theme.spacing(15),
    height: theme.spacing(15),
    color: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const classes = useStyles(props);

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SoccerBall className={classes.avatar}/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Futbol App
          </Typography>
          <Typography component="h1" variant="h6">
            {props.title == null ? "" : props.title}
          </Typography>
          <form className={classes.form} noValidate>
            {props.children}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
