import SelectTeam from '../components/select-team'
import Card from '@material-ui/core/Card'
import TeamDetails from '../components/team-details'

const AdminList = (props) => {
  const ref = React.useRef(null)

  return (
      <Card className={props.className}>
        <SelectTeam teams={props.teams} ref={ref}/>
        <TeamDetails/>
      </Card>
  );
}

export default AdminList;
