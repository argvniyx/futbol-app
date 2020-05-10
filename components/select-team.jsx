import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

const SelectTeam = () =>{
  return(
    <Autocomplete
      id="select-team"
      options={teams}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      fullWidth
    />
  )
}

const teams = [{name: "team1"}, {name: "team2"}, {name: "team3"}];

export default SelectTeam;
