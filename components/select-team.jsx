import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

const SelectTeam = () =>{
  return(
    <Autocomplete
      id="select-team"
      options={teams}
      getOptionLabel={(option) => option.name}
      style={{width: 300}}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
  )
}

const teams = [{name: "team1"}, {name: "team2"}, {name: "team3"}];

export default SelectTeam;
