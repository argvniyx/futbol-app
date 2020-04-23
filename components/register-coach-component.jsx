import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import Header from './header'
import Horario from './Horario'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    equipoExistente: {
        width: 150,
        marginTop: '75%',
        marginBottom: '75%'
    }
}))

const RegisterCoachComponent = () => {

  const classes = useStyles()

  return (
    <Box>
      <Header/>
      <Grid container direction='column' alignItems='center' >
        <FormGroup>
          <TextField label='Nombre' margin='dense' variant='filled'></TextField>
          <TextField label='Telefono' margin='dense' variant='filled'></TextField>
          <TextField label='Correo' margin='dense' variant='filled'></TextField>
        </FormGroup>
        <Grid>
            <Grid container direction='row'>
              <Box>
                <Grid container direction='column' alignItems='center'>
                  <Box>
                    <Horario/>
                    <Grid container direction='column' alignItems='center'>
                      <Button variant='contained' color='primary'>Crear Equipo</Button>
                    </Grid>
                  </Box>
                </Grid>
               </Box>
               <Box>
                  <Grid container direction='column' alignItems='center'>
                      {/*<InputLabel id='equipo'>Equipo existente</InputLabel>
                      <Select labelId='equipo'>
                        <MenuItem value={'Equipo1'}>Equipo1</MenuItem>
                        <MenuItem value={'Equipo2'}>Equipo2</MenuItem>
                        <MenuItem value={'Equipo3'}>Equipo3</MenuItem>
                        </Select> */}
                        <TextField
                        select
                        label='Equipo existente'
                        className={classes.equipoExistente}>
                        <MenuItem value={'Equipo1'}>Equipo1</MenuItem>
                        <MenuItem value={'Equipo2'}>Equipo2</MenuItem>
                        <MenuItem value={'Equipo3'}>Equipo3</MenuItem>
                        </TextField>
                        <Grid container direction='column' alignItems='center'>
                        <Button variant='contained' color='primary'>Unirse a Equipo</Button>
                    </Grid>
                  </Grid>
                </Box>
            </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RegisterCoachComponent;