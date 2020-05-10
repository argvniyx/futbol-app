import Box from '@material-ui/core/Box'
import Header from '../components/header'
import Content from '../components/content-component'
import AdminList from '../components/admin-list'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeightTop: {
    height: 550
  },
  fixedHeightBottom: {
    height: 250
  }
}));

export default function Admin() {
    const classes = useStyles();
    return (
        <Box>
          <Header/>
          <Content>
            <AdminList/>
            <AdminList/>
          </Content>
        </Box>
    );
}
