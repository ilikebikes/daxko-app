import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

const SimpleDialog = function createSimpleDialog(props) {
  const { data, open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Additional Information</DialogTitle>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="center">Additional Description</TableCell>
              <TableCell align="center">Brand Owner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.fdcId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.description}
                </TableCell>
                <TableCell align="center">n/a</TableCell>
                <TableCell align="center">{row.brandOwner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
};

export default SimpleDialog;
