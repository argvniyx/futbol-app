import SelectTeam from '../components/select-team'
import Card from '@material-ui/core/Card'
import TeamDetails from '../components/team-details'

const getTeam = (teams, id) => teams.filter(x => x.TeamID == id)[0]

const AdminList = (props) => {
  const [teamId, setTeamId] = React.useState(0)
  const [currentTeam, setCurrentTeam] = React.useState(null)

  const teamRef = React.useCallback(node => {
    if(node != null) {
      setTeamId(node)
    }
  }, [])

  React.useEffect(() => {
    setCurrentTeam(getTeam(props.teams, teamId))
  }, [teamId])

  return (
      <Card className={props.className}>
        <SelectTeam teams={props.teams} ref={teamRef}/>
        <TeamDetails team={currentTeam} token={props.token}/>
      </Card>
  );
}
