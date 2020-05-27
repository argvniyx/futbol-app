import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { forwardRef, useImperativeHandle } from 'react'


const UserTextFields = forwardRef((props, ref) => {
  const [textState, setText] = React.useState({
    FirstName : '',
    LastName : '',
    Email : '',
    Password : '',
    Phone : ''
  })

  const [firstNameInvalid, setFirstNameInvalid] = React.useState(false)
  const [lastNameInvalid, setLastNameInvalid] = React.useState(false)
  const [emailInvalid, setEmailInvalid] = React.useState(false)
  const [passwordInvalid, setPasswordInvalid] = React.useState(false)
  const [phoneInvalid, setPhoneInvalid] = React.useState(false)

  const handleTextChange = (event) => {
    setText({...textState, [event.target.name]: event.target.value})
  }

  const validateFields = () =>{

    let counter = 0
    let fieldCounter = 0

    for (var key in textState){
      var attrName = key;
      var attrValue = textState[key];
      if(attrValue.trim() == ''){
        console.log(attrName + ' is missing')
        eval('set' + attrName + 'Invalid' + '(true)')
        counter++
      }
      else {
        eval('set' + attrName + 'Invalid' + '(false)')
      }
      fieldCounter++
      if (props.child && fieldCounter == 2){
        break
      }
    }

    if (counter > 0){
      return false
    }
    else{
      return true
    }

  }

  useImperativeHandle(ref, () => {
    return {validateFields, textState};
  })

    return (
        <div>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={6}>
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                id="Nombre"
                label="Nombre"
                name="FirstName"
                autoComplete="name"
                onChange = {handleTextChange}
                error = {firstNameInvalid}
                helperText = {firstNameInvalid ? 'Necesita escribir su nombre' : ''}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                id="lastName"
                label="Apellido"
                name="LastName"
                autoComplete="name"
                onChange = {handleTextChange}
                error = {lastNameInvalid}
                helperText = {lastNameInvalid ? 'Necesita escribir su apellido' : ''}
              />
            </Grid>
          </Grid>

          {!props.child ?
          <div>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="Email"
            autoComplete="email"
            onChange = {handleTextChange}
            error = {emailInvalid}
            helperText = {emailInvalid ? 'Necesita escribir su correo' : ''}
          />

          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="Password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {handleTextChange}
            error = {passwordInvalid}
            helperText = {passwordInvalid ? 'Necesita escribir su contrase;a' : ''}
          />

          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="Phone"
            label="Teléfono"
            type="tel"
            name="Phone"
            autoComplete="phone"
            onChange = {handleTextChange}
            error = {phoneInvalid}
            helperText = {phoneInvalid ? 'Necesita escribir su telefono' : ''}
          />
          </div>
          : null}

        </div>
    );
})

export default UserTextFields;
