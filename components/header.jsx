import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import firebase from "firebase";
import Router from "next/router"
import Cookies from '../node_modules/js-cookie'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiFormLabel-root, & .MuiSelect-icon': {
      color: theme.palette.background.default
    },
  },
  input: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: theme.palette.background.default,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  }
}));

const handleLogout = (event) => {
  firebase.auth().signOut()
  Cookies.remove('user')
  Router.push('/')
}

const Header = (props) => {
  const classes = useStyles();
  const [children, setChildren] = React.useState(props.items)

  // A coach does not have registered children,
  // If children is null, we are in a coach dashboard, and should use a dummy value
  const [currentChild, setCurrentChild] =
        React.useState(children.length == 0 ? 0 : children[0]);

  const handleChange = (event) => {
    setCurrentChild(children[event.target.value]);
  };

  // When we have selected a child, we propagate that selection to the Dashboard
  // with the callback
  React.useEffect(() => {
    if(props.handler)
      props.handler(currentChild.TeamID)
  }, [currentChild])

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>

        {/* If the header is used in a "user" or parent dashboard, we want child select */}
        {props.user ?
          <TextField
            select
            label="Equipo"
            SelectProps={{className: classes.input, disableUnderline: true}}

            /* i.e. the first child is the default */
            defaultValue={0}
            onChange={handleChange}
          >
            {children.map((i, k) => (
              <MenuItem
                key={k}
                label={i.FirstName}
                value={i.FirstName}
              >{i.FirstName}</MenuItem>
            ))}
        </TextField>
         :
         null}

        {/* The admin page uses the header component with a button} */}
        {props.component ? props.component : null}

        <Typography variant="h5" className={classes.title}>
          Futbol App
        </Typography>

        <Button color="inherit" size="large" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
