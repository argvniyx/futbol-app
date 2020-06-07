import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function TeamDetails(props) {
  if(props.team && props.team != "") {
    return (
        <List>
          <ListItem>
            <ListItemText primary="Coach"
                          secondary="ID"/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Nombre"
                          secondary="Equipo1"/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Inicio de Temporada"
                          secondary="Fecha"/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Fin de Temporada"
                          secondary="Fecha"/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Miembro 1"
                          secondary="Nombre"/>
          </ListItem>
        </List>
    );
  }
  else {
    return (
      <Container fixed>
        <Typography variant="h3" align="center">
          Elige un equipo
        </Typography>
      </Container>
    );
  }
}
