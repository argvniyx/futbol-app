import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Header from './header'
import Horario from './Horario'
import {useRef} from 'react'
import ModalWindow from './modal-window'

const ConfigComponent = () => {

  const ref = useRef(null)
  const buttonsList = ['Reiniciar las Asistencias', 'Borrar el Equipo']

  const handleModalOpen = (event) => {
    if (event.target.name){
      ref.current.handleOpen(event.target.name)
    }
    else{
      ref.current.handleOpen(event.target.innerText)
    }
  }

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
            {buttonsList.map((value, i) => (
              <Grid item key={i}>
                <Button
                  variant='outlined'
                  color='primary'
                  size='medium'
                  name={value}
                  onClick={handleModalOpen}>

                  {value}
                </Button>
              </Grid>
            ))}
          </Grid>
          <ModalWindow ref={ref}/>
        </main>
      </Grid>
    </Box>
  )
}

export default ConfigComponent;