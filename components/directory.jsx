import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(id, firstName, lastName, email, phone) {
  return {id, firstName, lastName, email, phone};
}

const rows = [
    createData(1, 'Ricardo', 'Vela', 'arica96@gmail.com', '811999666'),
    createData(2, 'Napoleon', 'Lazo', 'napo@gmail.com', '811787878')
];

export default function Directory(props) {
  const [directory, setDirectory] = React.useState([]);

  React.useEffect(() => {
    fetch(`http://localhost:5001/futbol-app-8b521/us-central1/app/teams/${props.teamId}`, {
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

  console.log(directory)
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
