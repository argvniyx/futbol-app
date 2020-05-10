import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function TeamDetails() {
    return (
      <List>
        <ListItem>
          <ListItemText primary="hello"
                        secondary="world"/>
        </ListItem>
      </List>
    );
}
