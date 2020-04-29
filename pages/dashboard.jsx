import DashboardComponent from '../components/dashboard-component'
import UserCard from '../components/user-card'
import EventDetails from '../components/event-details'
import Directory from '../components/directory'
import Timeline from '../components/timeline'

const Dashboard = () => (
    <DashboardComponent>
      <Timeline/>
      <EventDetails/>
      <UserCard/>
      <Directory/>
    </DashboardComponent>
);

export default Dashboard;
