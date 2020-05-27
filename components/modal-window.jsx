import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core'
import { forwardRef, useImperativeHandle } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  login: {
    width: 'auto',
    padding: '20px',
    backgroundColor: theme.palette.background.paper,
    position:'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-45%, -50%)'
  }
}))
  
const ModalWindow = forwardRef((props, ref) => {
  const classes = useStyles()
  
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState('');
  
  const handleOpen = (name) =>{
    if (name){
      setAction(name.toLowerCase())
    }
    setOpen(true)
  }
  
  const handleClose = (event) => {
    console.log('close')
    setOpen(false)
  }
  
  const handleAccept = () => {
    console.log('Si')
  }
  
  const handleDecline = () => {
    console.log('No')
  }
  
  useImperativeHandle(ref, () => {
    return {
      handleOpen: handleOpen
    }
  })
  
  return(
    <Modal
      open={open}
      onClose={handleClose}>
      <div className={classes.login}>
        <Grid container direction='column' alignItems='center'>
          <Typography variant='h4'>Esta seguro que desea {action}?</Typography>
          <Box style={{marginTop:'10px', marginBottom:'10px', width:'50%'}}>
            <Grid container alignItems='center' justify='space-evenly'>
              <Button style={{backgroundColor: '#4CAF50', width:'25%'}} onClick={handleAccept}>Si</Button>
              <Button style={{backgroundColor: '#f44336', width:'25%'}} onClick={handleDecline}>No</Button>
            </Grid>
          </Box>
        </Grid>
      </div>
    </Modal>
  )
  
})

export default ModalWindow;
