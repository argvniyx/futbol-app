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
import { TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
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
  const [teamName, setTeamName] = React.useState('')
  const [teamNameInvalid, setTeamNameInvalid] = React.useState(false)

  const handleRegister = () => {
    let valid = true
    let userData = {
          'FirstName' : ref.current.textState.FirstName,
          'LastName' : ref.current.textState.LastName,
          'Email' : ref.current.textState.Email,
          'Password' : ref.current.textState.Password,
          'Phone' : ref.current.textState.Phone,
          'TeamID' : ''
        }
    if (!ref.current.validateFields()){
      valid = false
    }

    if(value == 0 && teamName == ''){
      valid = false
      setTeamNameInvalid(true)
    }
    else{
      userData['TeamID'] = ''
      setTeamNameInvalid(false)
    }

    if(!teamRef.current && value == 1){
      valid = false
      userData['TeamID'] = ''
    }
    else if(value == 1){
      userData['TeamID'] = teamRef.current
    }


    console.log(userData)
    if (valid){
        $.ajax({
          method: 'POST',
          url: `${process.env.API_URL}/coach/sign-up`,
          data: userData
        }).then(() => {
          firebase.auth().signInWithEmailAndPassword(
            ref.current.textState.Email,
            ref.current.textState.Password
          ).then((result) =>{
            let userData = {'displayName': result.user.displayName, 'email': result.user.email, 'phone': result.user.phoneNumber, 
                            'uid': result.user.uid, 'token': result.user.xa, 'role': 2}
            Cookies.set('user', JSON.stringify(userData))
            if (value == 0){
              $.ajax({
                method: 'POST',
                url: `${process.env.API_URL}/teams`,
                data: {
                  Name : teamName,
                  ColorFont : 'ColorFont',
                  ColorBackground : 'ColorBackground',
                  SeasonStart : 'SeasonStart',
                  SeasonEnd : 'SeasonEnd',
                  CoachID : result.user.uid
                }
              }).then(() =>{
                Router.push('/dashboard/' + result.user.uid)
              })
            }
            else if (value == 1){
              Router.push('/dashboard/' + result.user.uid)
            }
          })
        })
      
      console.log('Intento de registro')
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTextChange = (event) => {
    setTeamName(event.target.value)
  }

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
        <Grid container direction='column' alignItems='center'>
          <TextField
            margin='dense'
            variant='outlined'
            label='Nombre Equipo'
            autoComplete="name"
            onChange = {handleTextChange}
            error = {teamNameInvalid}
            helperText = {teamNameInvalid ? 'Necesita escribir el nombre del equipo' : ''}
          />
        </Grid>
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

  let res = await fetch(`${process.env.API_URL}/teams/noCoach`, {
      method: 'GET',
  })
  let teams = await res.json()

  return {
      'teams' : teams
  }
}

export default RegisterCoach;
