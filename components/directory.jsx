import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Directory(props) {
  const [directory, setDirectory] = React.useState([]);

  React.useEffect(() => {
    fetch(`${process.env.API_URL}/teams/${props.teamId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        (result) => setDirectory(result),
        (error) => console.log(error)
      )
  }, [props.teamId])

  return (
    <TableContainer component={Paper} className={props.className}>
      <Table aria-label="phone directory">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Celular</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {directory.map((row) => (
            <TableRow key={row.UserID}>
              <TableCell component="th" scope="row">
                {row.isCoach ? `${row.FirstName} (Coach)` : row.FirstName}
              </TableCell>
              <TableCell>{row.LastName}</TableCell>
              <TableCell>{row.Email}</TableCell>
              <TableCell>{row.Phone ? row.Phone : null}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
