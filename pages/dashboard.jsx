import DashboardComponent from '../components/dashboard-component'
import UserCard from '../components/user-card'
import EventDetails from '../components/event-details'

const Dashboard = () => (
    <DashboardComponent>
      <EventDetails/>
      <UserCard/>
    </DashboardComponent>
);

export default Dashboard;
