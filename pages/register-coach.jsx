import SideImageForm from '../components/side-image-form'
import UserTextFields from '../components/user-textfields.jsx'
import Horario from '../components/horario.jsx'
import SelectTeam from '../components/select-team'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  tabBar: {
    marginTop: theme.spacing(2)
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function RegisterCoach() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <SideImageForm imgPath='register-coach-image.jpg' title="Registro Entrenador">
      <UserTextFields/>

      <AppBar position="static" className={classes.tabBar}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="Team Selection Method">
          <Tab label="Crear Equipo" {...a11yProps(0)} />
          <Tab label="Unirse a Equipo" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Horario/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SelectTeam/>
      </TabPanel>


      <Button
        className={classes.submit}
        variant="contained"
        color="primary"
        fullWidth>
        Registrarse
      </Button>
    </SideImageForm>
  );
}
