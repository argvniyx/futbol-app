import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
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
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(1),
    fontSize: theme.spacing(5)
  },
}));

export default function UserCard(props) {
  const classes = useStyles();
  const {displayName, email, phone, children} = props.person.person;
  const childFullName = children[0].FirstName + " " + children[0].LastName

  return (
    <Card className={props.className}>
      <CardContent className={classes.content}>
        <div className={classes.info}>
          <Typography component="h5" variant="h5">
            {displayName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {email}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {phone}
          </Typography>
          <Typography variant="body2">
            Hijo: {childFullName}
          </Typography>
          <Typography variant="subtitle2">
            Faltas: {children[0].Absence}
          </Typography>
        </div>
        <Avatar className={classes.avatar} alt={displayName} src="/broken.jpg"/>
      </CardContent>
      <CardActions>
        <IconButton>
          <Edit/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
