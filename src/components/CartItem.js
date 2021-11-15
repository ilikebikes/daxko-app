import * as React from 'react';
import { Box, TableHead, TableBody, Button, Table, TableRow, TableCell } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

const CartItem = function createCartItem(props) {
  const { item, setEnhanced } = props;
  const removeFromCart = (toRemove) => {
    const test = (element) => element.fdcId === toRemove.fdcId;

    setEnhanced((prevArray) => {
      const remove = prevArray.findIndex(test);

      if (remove === 0) return [...prevArray.pop()];
      prevArray.splice(remove, 1);
      return [...prevArray];
    });
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '100%' }}>Description</TableCell>
            <TableCell sx={{ width: '100%' }}>Calories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={item.fdcId}>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.calories} </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box sx={{ textAlign: 'center', paddingTop: '5px' }}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => removeFromCart(item)}
          endIcon={<RemoveIcon />}
        >
          Remove
        </Button>
        <p>{item.amount}</p>
      </Box>
    </Box>
  );
};

export default CartItem;
