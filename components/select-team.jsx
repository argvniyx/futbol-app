import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { forwardRef, useImperativeHandle } from 'react'

const SelectTeam = forwardRef((props, ref) =>{

const [teamID, setTeamID] = React.useState('')
const handleTeamChange = (event, newValue) => {

  if(props.teams[event.target.value]){
    setTeamID(newValue['TeamID'])
  }
  else{
    setTeamID('')
  }
}

useImperativeHandle(ref, () =>{
  return teamID
})

  return(
    <Autocomplete
      id="select-team"
      options={props.teams}
      getOptionLabel={(option) => option.Name}
      renderInput={(params) => <TextField {...params} label="Seleccione un equipo" variant="outlined" />}
      fullWidth
      onChange={handleTeamChange}
    />
  )
})

export default SelectTeam;
