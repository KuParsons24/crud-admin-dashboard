import { Box, Button, ButtonGroup, makeStyles } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import AddPopUp from "./AddPopUp";
import DeletePopUp from "./DeletePopUp";
import EditPopUp from "./EditPopUp";
import SimpleSnackbar from "./SnackBar";

const useStyles = makeStyles({
  box: {
    height: 'calc(100% - 100px)'
  },
});

export default function DbTable () {
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState([]);
  const [fetching, setFetching] = useState(true)
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [deletePopUpOpen, setDeletePopUpOpen] = useState(false);
  const [editPopUpOpen, setEditPopUpOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [addPopUpOpen, setAddPopUpOpen] = useState(false);
  const [addData, setAddData] = useState({});

  const classes = useStyles();

  const timeoutError = () => {
    setSnackBarMessage(`Request timed out.`);
    setSnackBarOpen(true);
  }

  const loadDb = () => {
    setFetching(true);
    fetch("/admin/contact/api")
    .then((res) => res.json())
    .then((json) => {
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
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 180,
      editable: false,
    },
    {
      field: 'message',
      headerName: 'Message',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      editable: false,
      flex: 1,
      minWidth: 400
    },
  ];

  const handleAdd = () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 5000);
    fetch('/admin/contact/api', {
      method: 'POST',
      headers :{
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify(addData)
    })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      const obj = JSON.parse(json);
      if (obj.addSuccess) {
        loadDb();
        setSnackBarMessage('Succesfully Added Entry!');
        setSnackBarOpen(true);
      } else {
        setSnackBarMessage('Error! Entry was not added.');
        setSnackBarOpen(true);
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'AbortError');
        timeoutError();
    })
  }

  const handleDelete = () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 5000);
    fetch('/admin/contact/api', {
      method: 'DELETE',
      headers :{
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify(selection)
    })
    .then((res) => {
      return res.json()   
    })
    .then((json) => {
      const obj = JSON.parse(json);
      if (obj.deleteSuccess) {
        loadDb();
        setSnackBarMessage('Succesfully Deleted Entry!');
        setSnackBarOpen(true);
      } else {
        setSnackBarMessage('Error! Entry was not deleted.');
        setSnackBarOpen(true);
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'AbortError');
        timeoutError();
    });
  }

  const handleEdit = () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 5000);
    fetch('/admin/contact/api', {
      method: 'PUT',
      headers :{
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify(editData)
    })
    .then((res) => {
      return res.json()   
    })
    .then((json) => {
      const obj = JSON.parse(json);
      if (obj.editSuccess){
        loadDb();
        setSnackBarMessage('Succesfully Modified Entry!');
        setSnackBarOpen(true);
      } else {
        setSnackBarMessage('Error! Entry was not changed.');
        setSnackBarOpen(true);
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'AbortError');
        timeoutError();
    });
  }

  return (
    <Box component='div' className={classes.box} >
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
        onSelectionModelChange={(newSelection) => {setSelection(newSelection);}}
      />
      <ButtonGroup>
        <Button
          variant='contained' 
          color='secondary'
          disabled={selection.length > 0 ? false : true}
          onClick={() => setDeletePopUpOpen(true)}
        >
          DELETE
        </Button>
        <Button
          variant='contained' 
          color='primary'
          disabled={selection.length > 0 && selection.length <= 1 ? false : true}
          onClick={() => {
            setEditPopUpOpen(true);
            setEditData(data[data.findIndex((entry) => entry.id === selection[0])]);
          }}
        >
          EDIT
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            setAddPopUpOpen(true);
            setAddData({
              name: '',
              email: '',
              message: ''
            });
          }}
        >
          ADD
        </Button>
      </ButtonGroup>
      <SimpleSnackbar message={snackBarMessage} open={snackBarOpen} setOpen={setSnackBarOpen}/>
      <DeletePopUp open={deletePopUpOpen} setOpen={setDeletePopUpOpen} handleAcknowledge={handleDelete} />
      <EditPopUp 
        open={editPopUpOpen}
        setOpen={setEditPopUpOpen}
        editData={editData}
        setEditData={setEditData} 
        handleAcknowledge={handleEdit}
      />
      <AddPopUp  
        open={addPopUpOpen}
        setOpen={setAddPopUpOpen}
        editData={addData}
        setEditData={setAddData}
        handleAcknowledge={handleAdd}
      />
    </Box>
  );
}

