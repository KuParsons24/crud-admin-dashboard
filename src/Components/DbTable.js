import { Button } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import SimpleSnackbar from "./SnackBar";
import CustomizedSnackbars from "./SnackBar";

export default function DbTable () {
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState([]);
  const [fetching, setFetching] = useState(true)
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [pageSize, setPageSize] = useState(5);

  const loadDb = () => {
      setFetching(true);
      fetch("/admin/contact/api")
      .then((res) => res.json())
      .then((json) => {
          // setData(json);
          setFetching(false);
          setData(json)
      })
      .catch((error) => {
          console.error(error);
          setFetching(false);
      });      
  }

  useEffect(loadDb, []);

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
      editable: true,
      width: 700,
      // valueGetter: (params) =>
      //   `${params.getValue(params.id, 'firstName') || ''} ${
      //     params.getValue(params.id, 'lastName') || ''
      //   }`,
    },
  ];

  const isNotSelected = (entry) => {
    return selection.indexOf(entry.id) === -1; 
  }

  const handleDelete = () => {
    fetch('/admin/contact/api', {
      method: 'DELETE',
      headers :{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selection)
    })
    .then((res) => {
      console.log(res);
      return res.json()   
    })
    .then((json) => {
      const obj = JSON.parse(json);
      console.log(obj);
      if (obj.deleteSuccess) {
        loadDb();
        setSnackBarMessage('Succesfully Deleted Entry!');
        setSnackBarOpen(true);
        //let tableData = prevState;
        // setData((prevState) => {
        //   let filteredState = prevState.filter(isNotSelected);
        //   console.log(filteredState);
        //   return filteredState;
        //   //Stuff below does not work!!!
        //   // prevState.map((row) => {
        //   //   //console.log(row.id);
        //   //   if (selection.indexOf(row.id) !== -1) {
        //   //     console.log(row.id);
        //   //     prevState.splice(prevState.indexOf(row.id - 1), 1);
        //   //     //return prevState[row.id - 1];
        //     // }
        //   // });
        //   //return tableData;
        // });
      } else {

      }
    });
  }


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        loading={fetching}
        checkboxSelection
        disableSelectionOnClick
        editMode='row'
        //getRowId={(row) => row.id}
        onSelectionModelChange={(newSelection) => {setSelection(newSelection);}}
      />
      <Button
       variant='contained' 
       color='secondary'
       disabled={selection.length > 0 ? false : true}
       onClick={handleDelete}
       >
        DELETE ENTRY
      </Button>
      <SimpleSnackbar message={snackBarMessage} open={snackBarOpen} setOpen={setSnackBarOpen}/>
    </div>
  );
}

