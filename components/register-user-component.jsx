import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Header from './header'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import SelectTeam from './select-team'

const RegisterUserComponent = () => {
  return(
    <Box>
      <Header/>
      <Grid container direction='column' alignItems='center'>
        <FormGroup>
          <TextField label='Nombre del hijo' margin='dense' variant='filled'></TextField>
          <TextField label='Telefono' margin='dense' variant='filled'></TextField>
        </FormGroup>
        <SelectTeam/>
      </Grid>
    </Box>  
  )
}

export default RegisterUserComponent;