import DashboardComponent from '../../components/dashboard-component'
import {useRouter} from 'next/router'
import cookies from '../../node_modules/next-cookies'

var $ = require( "jquery" );

const Dashboard = (person) => {
    return <DashboardComponent user={person.person.role > 2} person={person}/>
};

Dashboard.getInitialProps = async context => {
    // NO BORAR PLZ UWU
    // let {token} = cookies(context)
    // console.log(token)
    // let res = await fetch('http://localhost:5001/futbol-app-8b521/us-central1/app/parent/children', {
    //     method: 'GET',
    //     headers: {
    //       authorization: 'Bearer ' + token
    //     }
    // })
    // let json = await res.json()

    let {user} = cookies(context)
    return {
        person : user
    }
}

export default Dashboard;
