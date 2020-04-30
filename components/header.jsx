import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectForm: {
    color: "white"
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  }
}));

const Header = () => {
  const classes = useStyles();
  const [team, setTeam] = React.useState('');

  const handleChange = (event) => {
    setTeam(event.target.value);
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <FormControl className={classes.formControl}>
          <InputLabel id='team-select-label'
                      classes={{root: classes.selectForm}}
          >
            Equipo
          </InputLabel>
          <Select
            labelId='team-select-label'
            id='team-select'
            value={team}
            onChange={handleChange}
            classes={{
              root: classes.selectForm,
              icon: classes.selectForm
            }}
            disableUnderline
          >
            <MenuItem value={1}>Team 1</MenuItem>
            <MenuItem value={2}>Team 2</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h5" className={classes.title}>
          Futbol App
        </Typography>
        <Button color="inherit" size="large">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
