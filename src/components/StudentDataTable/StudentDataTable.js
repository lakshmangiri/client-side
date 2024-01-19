import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const StudentDataTable = ({rows, columns, onSelectionModelChange }) => {

    return (
        <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      onRowSelectionModelChange={onSelectionModelChange}
      checkboxSelection
      disableColumnMenu={true}
    />
    );
};

export default StudentDataTable;