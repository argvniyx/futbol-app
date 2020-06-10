import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'

export default function ErrorDialog() {
    return (
        <Dialog
          open={true}
        >
          <DialogTitle>Hubo un error</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Al parecer hubo un error en la red. Recarga la página e intenta de nuevo
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload(false)}
            >
              Recargar
            </Button>
          </DialogActions>
        </Dialog>
);
}
