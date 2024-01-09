import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateAttendance } from './attendanceSlice'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Select, FormControl, MenuItem } from '@mui/material';

const AttendanceSelect = params => {
  const dispatch = useDispatch();
  const handleChange = newValue => dispatch(updateAttendance({ ...params.row, newValue }));

  return (
    <FormControl sx={{ width: params.colDef.computedWidth }}>
      <Select
        data-testid={params.row.testid}
        value={params.value}
        onChange={({ target: { value } }) => handleChange(value)}
      >
        <MenuItem value={'Present'}>Present</MenuItem>
        <MenuItem value={'Absent'}>Absent</MenuItem>
      </Select>
    </FormControl >
  )
}

const columns = [
  {
    field: 'teacher',
    headerName: 'Teacher',
    flex: 1,
    editable: false,
    hideable: false,
    cellClassName: 'removePR',
  },
  {
    field: 'attendance',
    headerName: 'Attendance',
    headerAlign: 'center',
    flex: 1,
    editable: false,
    cellClassName: 'removeP',
    renderCell: params => <AttendanceSelect {...params} />
  },
];

export default function Attendance() {
  const rows = useSelector(state => state.attendance.rows);

  return (
    <Box
      sx={{ height: 450, width: '90%', m: '5%' }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{
          background: 'white',
          opacity: '0.8',
          boxShadow: 1,
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600
          },
          '& .removePR': {
            pr: 0
          },
          '& .removeP': {
            p: 0
          },
          '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            borderRight: `1px solid #f0f0f0`,
          },
          '& .MuiSelect-select, .MuiInputBase-root, .MuiDataGrid-columnHeader, .MuiButtonBase-root': {
            cursor: 'inherit',
          },
        }}
        slots={{
          toolbar: GridToolbar,
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}