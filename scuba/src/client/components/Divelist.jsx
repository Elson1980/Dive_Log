import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Collapse from '@material-ui/core/Collapse';
// import Box from '@material-ui/core/Box';
// import IconButton from '@material-ui/core/IconButton';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";

const url = `http://localhost:4001/divelist`;
let headerElement = ['Dive Number', 'Dive Date', 'Dive Location',
 'City', 'State', 'Dive Buddy', 'Dive Activity', 'Tank Type', 
 'Tank Contents', 'Starting Pressure', 'Starting Volume', 'Ending Pressure',
'Ending Volume', 'Weight', 'Suit Type', 'Suit Thickness', 'Hood', 'Gloves', 'Boots',
'Water Type', 'Dive Entry', 'Dive Visibility', 'Water Temperature', 'Dive Computer Used'];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Divelist() {
  const classes = useStyles();

  const [columns, setColumns] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
      getDives();      
  }, []);

  const getDives = () => {
      axios.get(`${url}`).then((getDives) => {
        setColumns(getDives.data)
      }) 
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headerElement.map((headerElement) => (                  
                  <TableCell
                  key={headerElement}
                  align={headerElement.align}
                  style={{ minWidth: headerElement.minWidth }}
                  >
                  {headerElement}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {columns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((column) => {
                console.log(column.number_id)
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={column.number_id}>
                  {headerElement.map((headerElement) => {
                    const value = column[headerElement.id];
                    return (
                      <TableCell key={columns.number_id} align={headerElement.align}>
                        {headerElement.format && typeof value === 'number' ? headerElement.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={columns.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}