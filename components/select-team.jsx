import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    equipoExistente: {
        width: 150,
        marginTop: '75%',
        marginBottom: '75%'
    }
}))

const SelectTeam = () =>{

  const classes = useStyles()
    
  return(
    <Grid container direction='column' alignItems='center'>
    <Box>
    <TextField
      select
      label='Equipo existente'
      className={classes.equipoExistente}>
      <MenuItem value={'Equipo1'}>Equipo1</MenuItem>
      <MenuItem value={'Equipo2'}>Equipo2</MenuItem>
      <MenuItem value={'Equipo3'}>Equipo3</MenuItem>
    </TextField>
    </Box>
    </Grid>
  )   
}

export default SelectTeam;
