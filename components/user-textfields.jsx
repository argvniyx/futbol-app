import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { forwardRef, useImperativeHandle } from 'react'

const UserTextFields = forwardRef((props, ref) => {

  // const {refTextValues, invalidTextRef} = ref
  const [textState, setText] = React.useState({
    nombre : '',
    apellido : '',
    email : '',
    password : '',
    phone : ''
  })

  const [nombreInvalid, setNombreInvalid] = React.useState(false)
  const [apellidoInvalid, setApellidoInvalid] = React.useState(false)
  const [emailInvalid, setEmailInvalid] = React.useState(false)
  const [passwordInvalid, setPasswordInvalid] = React.useState(false)
  const [phoneInvalid, setPhoneInvalid] = React.useState(false)

  const handleTextChange = (event) => {
    setText({...textState, [event.target.name]: event.target.value})
  }

  const validateFields = () =>{

    let counter = 0

    if(textState.nombre.trim() == ''){
      console.log('Necesita escribir su nombre')
      setNombreInvalid(true)
      counter++
    }
    else {
      setNombreInvalid(false)
    }

    if(textState.apellido.trim() == ''){
        console.log('Necesita escribir su apellido')
        setApellidoInvalid(true)
        counter++
    }
    else {
        setApellidoInvalid(false)
    }
    if(textState.email.trim() == ''){
        console.log('Necesita escribir un email')
        setEmailInvalid(true)
        counter++
    }
    else {
        setEmailInvalid(false)
    }

    if(textState.password.trim() == ''){
        console.log('Se necesita escribir un contrase;a')
        setPasswordInvalid(true)
    }
    else {
        setPasswordInvalid(false)
    }

    if(textState.phone.trim() == ''){
        console.log('Se necesita escribir un telefono')
        setPhoneInvalid(true)
    }
    else {
        setPhoneInvalid(false)
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
                name="nombre"
                autoComplete="name"
                onChange = {handleTextChange}
                error = {nombreInvalid}
                helperText = {nombreInvalid ? 'Necesita escribir su nombre' : ''}
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
                name="apellido"
                autoComplete="name"
                onChange = {handleTextChange}
                error = {apellidoInvalid}
                helperText = {apellidoInvalid ? 'Necesita escribir su apellido' : ''}
              />
            </Grid>
          </Grid>

          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
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
            name="password"
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
            id="phone"
            label="Teléfono"
            type="tel"
            name="phone"
            autoComplete="phone"
            onChange = {handleTextChange}
            error = {phoneInvalid}
            helperText = {phoneInvalid ? 'Necesita escribir su telefono' : ''}
          />

        </div>
    );
})

export default UserTextFields;
