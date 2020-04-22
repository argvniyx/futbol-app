import Box from '@material-ui/core/Box'
import Header from './header'

const DashboardComponent = props => {
  return (
    <Box>
      <Header/>
      <main>
        {props.children}
      </main>
    </Box>
  );
}

export default DashboardComponent;
