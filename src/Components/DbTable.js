import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export default function DbTable (props) {
  const data = props.data;

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 180,
      editable: true,
    },
    {
      field: 'message',
      headerName: 'Message',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 700,
      // valueGetter: (params) =>
      //   `${params.getValue(params.id, 'firstName') || ''} ${
      //     params.getValue(params.id, 'lastName') || ''
      //   }`,
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

