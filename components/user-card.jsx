import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: theme.spacing(1)
  },
}));

export default function UserCard(props) {
  const classes = useStyles();

  return (
    <Card className={props.className}>
      <CardContent className={classes.info}>
        <Avatar className={classes.avatar} alt="Ricardo Vela"/>
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
    </Card>
  );
}
