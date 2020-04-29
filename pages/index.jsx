import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import SoccerBall from '@material-ui/icons/SportsSoccer'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  login: {
    width: 'auto',
    padding: '20px',
    backgroundColor: theme.palette.background.paper,
    position:'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-45%, -50%)'
  }
}))

const Home = () => {

  const [open, setOpen] = React.useState(false);
  const [userInfo, setInfo] = React.useState({
    username: '',
    password: ''
  })
  const classes = useStyles()

  const handleOpen = (event) =>{
    console.log('login')
    setOpen(true)
  } 

  const handleClose = (event) => {
    console.log('close')
    setOpen(false)
  }

  const handleUserInfo = (event) => {
    setInfo({...userInfo, [event.target.name]: event.target.value})
  }

  const handleLogin = (event) => {
    console.log(userInfo['username'])
    console.log(userInfo['password'])
    setOpen(false)
  }

  return(
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center">

      <Typography variant="h1" align="center">
        Futbol App
      </Typography>

      <SoccerBall style={{fontSize: "20em"}}/>

      <Grid container justify="center" spacing={2}>
        {["Registrarse", "Iniciar Sesión"].map((value, i) =>(
          <Grid key={i} item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={value == 'Iniciar Sesión' ? handleOpen : null}>

              {value}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}>
        <div className={classes.login}>
          <Grid container direction='column' alignItems='center'>
            <Typography variant='h2'>Ingresa tus datos</Typography>
            <TextField label='Nombre' margin='dense' variant='filled' name='username' onChange={handleUserInfo}></TextField>
            <TextField label='Contrase;a' margin='dense' variant='filled' type='password' name='password' onChange={handleUserInfo}></TextField>
            <Box style={{marginTop:'10px'}}>
              <Button color='primary' variant='contained' size='medium' onClick={handleLogin}>Login</Button>
            </Box>
          </Grid>
        </div>
      </Modal>

      <style global jsx>{`
            html,
            body,
            body > div:first-child,
            div#__next,
            div#__next > div {
              height: 100%;
              overflow-x: hidden;
            }
      `}</style>
    </Grid>
  )
};

export default Home
