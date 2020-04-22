import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import SoccerBall from '@material-ui/icons/SportsSoccer'
import Button from '@material-ui/core/Button'

const Home = () => (
  <Grid
    container
    direction="column"
    alignItems="center"
    justify="center">

    <Typography variant="h1" align="center">
      Futbol App
    </Typography>

    <SoccerBall style={{fontSize: "20em"}}/>

    <Grid container justify="center" spacing={2}>
      {["Registrarse", "Iniciar Sesión"].map((value, i) =>(
        <Grid key={i} item>
          <Button
            variant="contained"
            color="primary"
            size="large">

            {value}
          </Button>
        </Grid>
      ))}
    </Grid>

    <style global jsx>{`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            height: 100%;
            overflow-x: hidden;
          }
     `}</style>
  </Grid>
);

export default Home
