import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function TeamDetails() {
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
