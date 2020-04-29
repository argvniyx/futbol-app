import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
}));

export default function DirectoryCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Evento"/>
      <CardContent>
        <Typography variant="h6">Nombre de Evento</Typography>
        <Typography variant="h6">Asistencia</Typography>
        <Typography variant="h6">Lugar del Evento</Typography>
        <Typography variant="h6">Hora</Typography>
        <Typography variant="h6">Duración</Typography>
        <Typography variant="h6">Comentarios</Typography>
      </CardContent>
    </Card>
  );
}
