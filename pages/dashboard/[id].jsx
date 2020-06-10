import DashboardComponent from '../../components/dashboard-component'
import {useRouter} from 'next/router'
import cookies from '../../node_modules/next-cookies'

var $ = require( "jquery" );

const Dashboard = (person) => {
    return <DashboardComponent user={person.person.role > 2} person={person}/>
};

Dashboard.getInitialProps = async context => {

    let {user} = cookies(context)
    return {
        person : user
    }
}

export default Dashboard;
