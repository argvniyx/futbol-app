import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

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
  }
];

export default function Timeline() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Card className={classes.root}>
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
    </Card>
  );
}
