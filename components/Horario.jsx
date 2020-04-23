import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'


const Horario = () => {
  
  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']

  const [state, setState] = React.useState({
    checkedLunes: false,
    checkedmartes: false,
    checkedMiercoles: false,
    checkedJueves: false,
    checkedViernes: false,
    timeLunes: '',
    timeMartes: '',
    timeMiercoles: '',
    timeJueves: '',
    timeViernes: ''
  });

  const handleCheckboxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(event.target.checked)
  };

  const handleTimeChange = (event) => {
    console.log(event.target.value)
    if(!event.target.value){
      setState({...state, [event.target.name]: '00:00'})
    }
    else{
      setState({...state, [event.target.name]: event.target.value})
    }
  }

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
    >
      <Typography variant='h5'>Horario Entrenamientos</Typography>
      <FormGroup row>
        <FormGroup>
          <Typography variant='h6'>Dia</Typography>
          {days.map((day) => (
            <FormControlLabel
              control = {<Checkbox checked={state['checked' + day]} onChange={handleCheckboxChange} color='primary' name={'checked' + day}/>}
              label={day}
              key={day}
            />
          ))}
        </FormGroup>
        <FormGroup>
          <Typography variant='h6'>Hora</Typography>
          {days.map((day) => (
            <TextField 
              name={'time' + day}
              key={day}
              type='time'
              defaultValue='00:00'
              disabled = {!state['checked' + day]}
              margin = 'dense'
              onChange = {handleTimeChange}
              inputProps = {{
                step: 300
              }}
            />
          ))}
        </FormGroup>
      </FormGroup>
    </Grid>
  )
}

export default Horario;