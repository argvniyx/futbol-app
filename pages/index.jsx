import Head from 'next/head'
import SoccerBall from '@material-ui/icons/SportsSoccer'
import Button from '@material-ui/core/Button'

const Home = () => (
  <div className="container">
    <Head>
      <title>Futbol App</title>
      <link rel="icon" href="/favicon.png" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>

    <main>
      <h1>Futbol App</h1>
      <SoccerBall fontSize="large"/>
      <Button variant="contained" color="primary">Registrarse</Button>
      <Button variant="contained" color="primary">Iniciar Sesión</Button>
    </main>
  </div>
)

export default Home
