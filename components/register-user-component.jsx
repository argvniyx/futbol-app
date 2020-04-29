import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Header from './header'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import SelectTeam from './select-team'
import Button from '@material-ui/core/Button'

const RegisterUserComponent = () => {
  return(
    <Box>
      <Header/>
      <Grid container direction='column' alignItems='center'>
        <FormGroup>
          <TextField label='Nombre del hijo' margin='dense' variant='filled'></TextField>
          <TextField label='Telefono' margin='dense' variant='filled'></TextField>
        </FormGroup>
        <Box>
          <SelectTeam/>
          <Button variant='contained' color='primary'>Unirse a Equipo</Button>
        </Box>
      </Grid>
    </Box>  
  )
}

export default RegisterUserComponent;