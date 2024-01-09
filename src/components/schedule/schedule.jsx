import * as React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const rows = [
  { id: 1, student: 'Harry Potter', subject: 'Potions Master', teacher: 'Horace Slughorn', attendance: 'Present' },
  { id: 2, student: 'Hermione Granger', subject: 'Potions Master', teacher: 'Rubeus Hagrid', attendance: 'Present' },
  { id: 3, student: 'Ron Weasley', subject: 'Potions Master', teacher: 'Severus Snape', attendance: 'Present' },
  { id: 4, student: 'Draco Malfoy', subject: 'Potions Master', teacher: 'Horace Slughorn', attendance: 'Present' },
  { id: 5, student: 'Padma Patil', subject: 'Potions Master', teacher: 'Rubeus Hagrid', attendance: 'Present' },
  { id: 6, student: 'Luna Lovegood', subject: 'Potions Master', teacher: 'Severus Snape', attendance: 'Present' },
]

export default function Schedule() {
  const backup = useSelector(state => state.attendance.backup);
  const columns = [
    {
      field: 'student',
      headerName: 'Student',
      flex: 1,
      editable: false,
      hideable: false,
    },
    {
      field: 'subject',
      headerName: 'Subject',
      flex: 1,
      editable: false,
    },
    {
      field: 'teacher',
      headerName: 'Teacher',
      flex: 1,
      editable: false,
      renderCell: params => backup[params.value]
    },
  ];

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
              pageSize: 6,
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
        disableRowSelectionOnClick
        pageSizeOptions={[6]}
      />
    </Box>
  );
}