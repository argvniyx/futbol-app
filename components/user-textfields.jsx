import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

export default function UserTextFields() {
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
          />

          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="phone"
            label="Teléfono"
            name="Phone"
            autoComplete="phone"
          />

        </div>
    );
}
