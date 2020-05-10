import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    }
}));

const Content = (props) => {
  const classes = useStyles();
  const children = React.Children.toArray(props.children)

  return (
    <main className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {children.map((child, index) => (
            <Grid item xs={12} lg={6} key={index}>
              {child}
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}

export default Content;
