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
import { useRef } from 'react';
import firebase from "firebase";
import Cookies from '../node_modules/js-cookie'
import Router from "next/router"
var $ = require( "jquery" );

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

const RegisterCoach = (props) => {
  const ref = useRef(null)
  const teamRef = useRef(null)
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleRegister = () => {
    let valid = true
    console.log(ref.current.textState)
    if (!ref.current.validateFields()){
      valid = false
    }
    //TODO: add logic to decide when to create or use existing team
    if(!teamRef.current){
      valid = false
    }
    if (valid){
      $.ajax({
        method: 'POST',
        url: 'http://localhost:5001/futbol-app-8b521/us-central1/app/coach/sign-up',
        data: {
          'FirstName' : ref.current.textState.FirstName,
          'LastName' : ref.current.textState.LastName,
          'Email' : ref.current.textState.Email,
          'Password' : ref.current.textState.Password,
          'Phone' : ref.current.textState.Phone,
          'TeamID' : teamRef.current
        }
      }).then(() => {
        firebase.auth().signInWithEmailAndPassword(
          ref.current.textState.Email,
          ref.current.textState.Password
        ).then((result) =>{
          console.log(result)
          let userData = {'displayName': result.user.displayName, 'email': result.user.email, 'phone': result.user.phoneNumber, 
                        'uid': result.user.uid, 'token': result.user.xa, 'role': 2}
          Cookies.set('user', JSON.stringify(userData))
          Router.push('/dashboard/' + result.user.uid)
        })
      }).catch((err) => {
        console.log(err.message)
      })
      console.log('Intento de registro')
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <SideImageForm imgPath='register-coach-image.jpg' title="Registro Entrenador">
      <UserTextFields ref={ref}/>

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
        <SelectTeam ref={teamRef} teams={props.teams}/>
      </TabPanel>


      <Button
        className={classes.submit}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}>
        Registrarse
      </Button>
    </SideImageForm>
  );
}

RegisterCoach.getInitialProps = async context => {

  let res = await fetch('http://localhost:5001/futbol-app-8b521/us-central1/app/teams/noCoach', {
      method: 'GET',
  })
  let teams = await res.json()

  return {
      'teams' : teams
  }
}

export default RegisterCoach;