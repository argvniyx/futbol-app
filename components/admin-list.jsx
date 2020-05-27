import SelectTeam from '../components/select-team'
import Card from '@material-ui/core/Card'
import TeamDetails from '../components/team-details'

export default function AdminList(props) {
    return (
        <Card className={props.className}>
          <SelectTeam/>
          <TeamDetails/>
        </Card>
    );
}
