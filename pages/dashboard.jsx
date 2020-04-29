import DashboardComponent from '../components/dashboard-component'
import UserCard from '../components/user-card'
import EventDetails from '../components/event-details'
import Directory from '../components/directory'

const Dashboard = () => (
    <DashboardComponent>
      <EventDetails/>
      <UserCard/>
      <Directory/>
    </DashboardComponent>
);

export default Dashboard;
