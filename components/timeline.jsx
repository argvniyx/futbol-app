import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader'
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
        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText primary="Inbox"
                          secondary="Something"/>
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
        <List component="nav" aria-label="secondary mailbox folder">
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
