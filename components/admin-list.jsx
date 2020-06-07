import SelectTeam from '../components/select-team'
import Card from '@material-ui/core/Card'
import TeamDetails from '../components/team-details'

const AdminList = (props) => {
  const [teamId, setTeamId] = React.useState(0)

  const teamRef = React.useCallback(node => {
    if(node != null) {
      setTeamId(node)
    }
  }, [])

  return (
      <Card className={props.className}>
        <SelectTeam teams={props.teams} ref={teamRef}/>
        <TeamDetails team={teamId}/>
      </Card>
  );
}

export default AdminList;
