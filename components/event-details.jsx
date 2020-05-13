import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography';

export default function EventDetails(props) {
  const {name, place, date, hour, length, comments} = props.event;
  return (
    <Card className={props.className}>
      <CardHeader title="Evento"/>
      <CardContent style={{flexGrow: 1}}>
        <Typography variant="h6">Nombre de Evento</Typography>
        {name}
        <Typography variant="h6">Asistencia</Typography>
        {}
        <Typography variant="h6">Lugar del Evento</Typography>
        {place}
        <Typography variant="h6">Hora</Typography>
        {hour}
        <Typography variant="h6">Duración</Typography>
        {length}
        <Typography variant="h6">Comentarios</Typography>
        {comments}
      </CardContent>
      {props.user ? null :
       <CardActions>
         <IconButton>
           <Edit/>
         </IconButton>
       </CardActions>
      }
    </Card>
  );
}
