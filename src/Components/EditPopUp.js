import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function EditPopUp(props) {
  const [confBtnEnabled, setConfBtnEnabled] = useState(false);

  //const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  //let { name, email, message } = props.editData;

  const handleCancel = () => {
    props.setOpen(false);
    setConfBtnEnabled(false);
  };

  const handleYes = () => {
      // props.setEditData({ name, email, message });
      props.handleAcknowledge();
      props.setOpen(false);
      setConfBtnEnabled(false);
  }

  const handleChange= (e) => {
    setConfBtnEnabled(true);
    if (e.target.id === 'message') {
      props.setEditData((prevState) => ({
        ...prevState,
        message: e.target.value
      }));
    } else if (e.target.id === 'email') {
      props.setEditData((prevState) => ({
        ...prevState,
        email: e.target.value
      }));
    } else if (e.target.id === 'name') {
      props.setEditData((prevState) => ({
        ...prevState,
        name: e.target.value
      }));
    }
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Editing Entry"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the selection?
          </DialogContentText> */}
        <form className={classes.root} noValidate autoComplete="off">
          <TextField required id="name" label="Name" value={props.editData.name} autoFocus onChange={handleChange} />
          <TextField required id="email" label="E-Mail" value={props.editData.email} onChange={handleChange} />
          <TextField required id="message" label="Message" value={props.editData.message} multiline rows={4} onChange={handleChange} fullWidth />
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleYes} color="primary" disabled={!confBtnEnabled} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}