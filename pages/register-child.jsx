import SideImageForm from '../components/side-image-form'
import UserTextFields from '../components/user-textfields'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import SelectTeam from '../components/select-team'
import { useRef } from 'react';
import Cookies from '../node_modules/js-cookie'
import Router from "next/router"
var $ = require( "jquery" );

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const FormSection = (props) => {
  return(
    <div>
      <UserTextFields child ref={props.refs.fields}/>
      <SelectTeam teams={props.teams} ref={props.refs.team}/>
    </div>
  )
  
}
  

const RegisterChild = (props) => {

  const classes = useStyles();
  const [formSections, setSections] = React.useState([1])
  const [refList, setRefs] = React.useState([{fields: useRef(null), team: useRef(null)}])
  
  const handleRegister = () => {
    let i = 1
    const children = []
    let valid = true
    refList.forEach(refs => {
      let n = children.length
      children.push({})
      if(!refs.fields.current.validateFields()){
        valid = false
      }
      if(refs.team.current == ''){
        console.log('jgdgf')
        valid = false
      }
      if(valid){
        children[n]['TeamID'] = refs.team.current
        children[n]['FirstName'] = refs.fields.current.textState.FirstName
        children[n]['LastName'] = refs.fields.current.textState.LastName
        children[n]['TeamNumber'] = 1
      }
    });

    if (valid){
        console.log(children.length)
        $.ajax({
          method: 'POST',
          url: 'http://localhost:5001/futbol-app-8b521/us-central1/app/parent/children',
          data : {children},
          headers: {
            authorization: 'Bearer ' + JSON.parse(Cookies.get('user'))['token']
          }
        }).then((resullt) => {
            let userData = JSON.parse(Cookies.get('user'))
            userData['children'] = children
            Cookies.set('user', JSON.stringify(userData))
            Router.push('/dashboard/' + userData['uid'])
        })
    }
    console.log(refList)
  }
      
  const handleAddChild = () => {
    const n = formSections.length - 1
    setRefs(refList.concat({fields: React.createRef(null), team: React.createRef(null)}))
    setSections(formSections.concat(formSections[n] + 1))
  }

  return (
    <SideImageForm imgPath="register-child-image.jpg" title="Registro Hijo">
      {formSections.map(x => <FormSection {...props} key={x} refs={refList[x - 1]}/>)}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        className={classes.submit}
        onClick = {handleAddChild}
      >
        Anadir otro hijo
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.submit}
        onClick = {handleRegister}
      >
        Registrarse
      </Button>
    </SideImageForm>
  )
}

RegisterChild.getInitialProps = async context => {

  let res = await fetch('http://localhost:5001/futbol-app-8b521/us-central1/app/teams/listTeams', {
    method: 'GET',
  })
  let teams = await res.json()
  
  return {
    'teams' : teams
  }
}

export default RegisterChild;