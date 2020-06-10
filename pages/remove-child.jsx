import SideImageForm from '../components/side-image-form'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import Cookies from '../node_modules/js-cookie'
import Router from "next/router"
import cookies from '../node_modules/next-cookies'
import List from '@material-ui/core/List'
import { ListItem, ListItemText } from '@material-ui/core'
var $ = require( "jquery" );

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function getTeamById(teams, teamId){
  let aux = ''
  teams.forEach(x => {
    if (x['TeamID'] == teamId){
      aux = x.Name
    }
  });
  return aux
}

const RemoveChild = (props) => {

  const classes = useStyles();
  
  const [selectedIndex, setSelected] = React.useState(-1)

  const handleListItemClick = (event, index) =>{
    setSelected(index)
  }

  const handleRemoval = () => {
    let userData = JSON.parse(Cookies.get('user'))
    $.ajax({
      url: `${process.env.API_URL}/parent/children/${props.children[selectedIndex].id}`,
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + userData['token']
      }
    }).done((res) => {
      userData['children'].splice(selectedIndex, 1)
      Cookies.set('user', JSON.stringify(userData))
      Router.push('/dashboard/' + userData['uid'])
    })
  }

  return (
    <SideImageForm imgPath="register-child-image.jpg" title="Remover Hijo">
      
      <List>
        {props.children.map(x => 
                              <ListItem
                                key={x.id}
                                button
                                selected={selectedIndex === props.children.indexOf(x)}
                                onClick={(event) => handleListItemClick(event, props.children.indexOf(x))}
                              >
            <ListItemText primary={x.FirstName + ' ' + x.LastName}
                          secondary={`Equipo: ${getTeamById(props.teams, x.TeamID)}`}/>
          </ListItem>)}
      </List>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.submit}
        onClick={handleRemoval}
      >
        Remover hijos
      </Button>
    </SideImageForm>
  )
}

RemoveChild.getInitialProps = async context => {

  let res = await fetch(`${process.env.API_URL}/teams/listTeams`, {
    method: 'GET',
  })
  let teams = await res.json()
  let {user} = cookies(context)
  
  return {
    'children' : user['children'],
    'teams' : teams
  }
}

export default RemoveChild;
