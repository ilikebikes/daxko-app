import * as React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

const CartItem = function createCartItem(props) {
  const { item, removeFromCart } = props;
  // eslint-disable-next-line
  console.debug(item);
  return (
    <Box>
      <Typography variant="h6">{item.brandOwner}</Typography>
      <Box className="information">
        <Typography>Description: {item.description}</Typography>
        <Typography>Calories: {item.calories} </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconButton
          variant="outlined"
          size="medium"
          color="secondary"
          onClick={() => removeFromCart(item.id)}
        >
          <RemoveIcon />
        </IconButton>
        <p>{item.amount}</p>
      </Box>
    </Box>
  );
};

export default CartItem;
