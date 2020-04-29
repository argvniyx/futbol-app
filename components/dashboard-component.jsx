import Box from '@material-ui/core/Box'
import Header from './header'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    display: 'flex',
    flexGrow: 1
  }
}));

const DashboardComponent = props => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header/>
      <main className={classes.content}>
        {props.children}
      </main>
    </Box>
  );
}

export default DashboardComponent;
