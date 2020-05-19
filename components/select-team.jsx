import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

const SelectTeam = (props) =>{

function convertToArray(){
  const teamsList = []
  props.teams.forEach(team => {
    teamsList.push({'name' : team.Name})
  });
  return teamsList
}

  return(
    <Autocomplete
      id="select-team"
      options={convertToArray()}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      fullWidth
    />
  )
}

const teamsList = [{name: "team1"}, {name: "team2"}, {name: "team3"}];

export default SelectTeam;
