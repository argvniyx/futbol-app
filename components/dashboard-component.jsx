import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const DashboardComponent = () => (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Borrar Cuenta</Button>
          <Typography variant="h6">
            Nombre de Equipo
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
);

export default DashboardComponent;
