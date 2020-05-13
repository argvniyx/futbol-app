import DashboardComponent from '../../components/dashboard-component'
import {useRouter} from 'next/router'
import Cookies from '../../node_modules/js-cookie'

const Dashboard = () => {
    const router = useRouter()
    console.log(router.query)
    console.log(Cookies.get('token'))

    return <DashboardComponent user/>
};

export default Dashboard;
