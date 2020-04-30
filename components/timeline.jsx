import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore'

const events = [
  {
    id: 0,
    name: "Partido",
    date: new Date(2019, 4, 3).toDateString()
  },
  {
    id: 1,
    name: "Entrenamiento",
    date: new Date(2019, 4, 5).toDateString()
  },
  {
    id: 2,
    name: "Junta",
    date: new Date(2019, 4, 8).toDateString()
  },
  {
    id: 3,
    name: "Entrenamiento",
    date: new Date(2019, 4, 12).toDateString()
  },
  {
    id: 4,
    name: "Entrenamiento",
    date: new Date(2019, 4, 13).toDateString()
  },
];

export default function Timeline(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Card className={props.className}>
      <CardHeader title="Timeline"/>
      <CardContent>
        <List>
          {events.map((e) => (
            <ListItem
              key={e.id}
              button
              selected={selectedIndex === e.id}
              onClick={(event) => handleListItemClick(event, e.id)}
            >
              <ListItemText primary={e.name}
                            secondary={e.date}/>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <NavigateBefore/>
        </IconButton>
        <IconButton>
          <NavigateNext/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
