import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function UserCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Andrés Ricardo Garza Vela
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            aricav96@gmail.com
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            8166699777
          </Typography>
          <Typography variant="body2">
            Hijo: Fulano
          </Typography>
          <Typography variant="subtitle2">
            Faltas: 2
          </Typography>
        </CardContent>
        <div className={classes.controls}>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="/user-icon.png"
        title="Profile picture"
      />
    </Card>
  );
}
