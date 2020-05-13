import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Header from '../components/header'
import Content from '../components/content-component'
import AdminList from '../components/admin-list'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
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

const InviteButton = () => {
  return (
    <Button color="inherit" size="large">
      Generar Invitación
    </Button>
  );
}

export default function Admin() {
  const classes = useStyles();
  const fixedHeightPaperT = clsx(classes.paper, classes.fixedHeightTop)

  return (
    <Box>
      <Header component={<InviteButton/>}/>
      <Content fullWidth>
        <AdminList className={fixedHeightPaperT}/>
      </Content>
    </Box>
  );
}
