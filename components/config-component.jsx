import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Header from './header'
import Horario from './Horario'

const ConfigComponent = () => {
  return (
    <Box>
      <Header/>
      <Grid
        container
        direction='column'
        alignItems='center'>
        <main>
          <Typography variant='h5'>Nombre de Equipo</Typography>
          <Horario/>
          <Grid container spacing={1} direction='column' >
            {['Reiniciar Asistencias', 'Borrar Equipo'].map((value, i) => (
              <Grid item key={i}>
                <Button
                  variant='outlined'
                  color='primary'
                  size='medium'>
                  {value}
                </Button>
              </Grid>
            ))}
          </Grid>
        </main>
      </Grid>
    </Box>
  )
}

export default ConfigComponent;