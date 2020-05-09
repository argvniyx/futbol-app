import SideImageForm from '../components/side-image-form'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    names: {
        display: "flex",
        justifyContent: "space-between"
    }
}));

export default function RegisterUserTest() {
    const classes = useStyles();
    return (
        <SideImageForm imgPath="register-user-image.jpg" title="Registro">
          <div className={classes.names}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              id="Nombre"
              label="Nombre"
              name="nombre"
              autoComplete="name"
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              id="lastName"
              label="Apellido"
              name="apellido"
              autoComplete="name"
            />
          </div>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Teléfono"
            name="Phone"
            autoComplete="phone"
          />

        </SideImageForm>
    );
}
