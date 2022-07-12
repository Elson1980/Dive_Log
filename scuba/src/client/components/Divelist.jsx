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

const url = `http://localhost:4002/divelist`;

let headerElement = [
    'Dive Number', 'Dive Date', 'Dive Location',
 'City', 'State', 'Dive Buddy', 'Dive Activity', 'Tank Type', 
 'Tank Contents', 'Starting Pressure', 'Starting Volume', 'Ending Pressure',
'Ending Volume', 'Weight', 'Suit Type', 'Suit Thickness', 'Hood', 'Gloves', 'Boots',
'Water Type', 'Dive Entry', 'Dive Visibility', 'Water Temperature', 'Dive Computer Used'
];

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

  const addDives = () => {
    axios.post(`${url}`).then((getDives) => {
        setColumns(getDives.data)
  }) 
}

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headerElement.map((header) => {
                //   console.log(header); 
                  return (                  
                  <TableCell
                  key={header}
                //   align={header.align}
                //   style={{ minWidth: header.minWidth }}
                  >
                  {header}
                </TableCell>
              )})}
            </TableRow>
          </TableHead>
          <TableBody>
            {columns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((column) => {
                // console.log(column)                
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={column.div_id}>
                  {/* {columns.map((column, key, value) => {  
                       
                      console.log(value)               
                    return (
                      <> */}
                      <TableCell key={column.dive_num}>
                        {column.dive_num}
                      </TableCell>
                        <TableCell key={column.div_date}>
                       {column.div_date}
                      </TableCell>
                      <TableCell key={column.div_location}>
                       {column.div_location}
                      </TableCell>
                      <TableCell key={column.city}>
                       {column.city}
                      </TableCell>
                      <TableCell key={column.us_state}>
                       {column.us_state}
                      </TableCell>
                      <TableCell key={column.div_buddy}>
                       {column.div_buddy}
                      </TableCell>
                      <TableCell key={column.div_activity}>
                       {column.div_activity}
                      </TableCell>
                      <TableCell key={column.dive_tank}>
                       {column.dive_tank}
                      </TableCell>
                      <TableCell key={column.tank_air}>
                       {column.tank_air}
                      </TableCell>
                      <TableCell key={column.tank_starting_pressure}>
                       {column.tank_starting_pressure}
                      </TableCell>
                      <TableCell key={column.tank_starting_volume}>
                       {column.tank_starting_volume}
                      </TableCell>
                      <TableCell key={column.tank_endinging_pressure}>
                       {column.tank_endinging_pressure}
                      </TableCell>
                      <TableCell key={column.tank_endinging_volume}>
                       {column.tank_endinging_volume}
                      </TableCell>
                      <TableCell key={column.dive_weight}>
                       {column.dive_weight}
                      </TableCell>
                      <TableCell key={column.dive_suit_type}>
                       {column.dive_suit_type}
                      </TableCell>
                      <TableCell key={column.dive_suit_thickness}>
                       {column.dive_suit_thickness}
                      </TableCell>
                      <TableCell key={column.dive_hood}>
                       {column.dive_hood}
                      </TableCell>
                      <TableCell key={column.dive_gloves}>
                       {column.dive_gloves}
                      </TableCell>
                      <TableCell key={column.dive_boots}>
                       {column.dive_boots}
                      </TableCell>
                      <TableCell key={column.dive_water_type}>
                       {column.dive_water_type}
                      </TableCell>
                      <TableCell key={column.dive_entry}>
                       {column.dive_entry}
                      </TableCell>
                      <TableCell key={column.dive_visibilty}>
                       {column.dive_visibilty}
                      </TableCell>
                      <TableCell key={column.dive_water_temperature}>
                       {column.dive_water_temperature}
                      </TableCell>
                      <TableCell key={column.dive_computer_used}>
                       {column.dive_computer_used}
                      </TableCell>
                      {/* </>                      
                    );
                  } */}
                  {/* )} */}
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

// let headerElement = [
//     { id: 'name', label: 'Name' }, 
//     { div_num: 'Dive Number', dive_date: 'Dive Date', div_location: 'Dive Location',
//  city: 'City', us_state: 'State', div_buddy:  'Dive Buddy', div_activity: 'Dive Activity', dive_tank: 'Tank Type', 
//  tank_air: 'Tank Contents', tank_starting_pressure: 'Starting Pressure', tank_starting_volume: 'Starting Volume', 
//  tank_endinging_pressure: 'Ending Pressure',tank_endinging_volume: 'Ending Volume', dive_weight: 'Weight', dive_suit_type: 'Suit Type', 
//  dive_suit_thickness: 'Suit Thickness', dive_hood:  'Hood', dive_gloves: 'Gloves', dive_boots: 'Boots',
//  dive_water_type: 'Water Type', dive_entry: 'Dive Entry', dive_visibilty: 'Dive Visibility', dive_water_temperature: 'Water Temperature', 
//  dive_computer_used: 'Dive Computer Used' }
// ];

// function createHeader(div_num, dive_date, div_location, city, us_state, div_buddy, div_activity, dive_tank, 
// tank_air, tank_starting_pressure, tank_starting_volume, tank_endinging_pressure,tank_endinging_volume, dive_weight, dive_suit_type, 
// dive_suit_thickness, dive_hood, dive_gloves, dive_boots,
// dive_water_type, dive_entry, dive_visibilty, dive_water_temperature, 
// dive_computer_used) {
//     return {div_num, dive_date, div_location, city, us_state, div_buddy, div_activity, dive_tank, 
//         tank_air, tank_starting_pressure, tank_starting_volume, tank_endinging_pressure,tank_endinging_volume, dive_weight, dive_suit_type, 
//         dive_suit_thickness, dive_hood, dive_gloves, dive_boots,
//         dive_water_type, dive_entry, dive_visibilty, dive_water_temperature, 
//         dive_computer_used}
// }