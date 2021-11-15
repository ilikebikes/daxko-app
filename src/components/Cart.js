import * as React from 'react';
import { Box, Typography } from '@mui/material';
import CartItem from './CartItem';
import { enhanceData } from './Table';

const Cart = function createCart(props) {
  const toRender = [];

  const { cartItems, foodList, searchedFoods } = props;
  // only one should be populated
  if (searchedFoods) {
    cartItems.forEach((elem) => {
      toRender.push(searchedFoods[elem]);
    });
  } else if (foodList) {
    cartItems.forEach((elem) => {
      toRender.push(foodList[elem]);
    });
  }
  const enhancedRender = enhanceData(toRender);
  const calorieTotal = enhancedRender.reduce((acc, item) => acc + item.calories, 0);
  return (
    <Box>
      <Box>
        <Typography variant="h3">Your Cart</Typography>
        {toRender.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          enhancedRender.map((item) => <CartItem item={item} />)
        )}
      </Box>
      <Box>
        <Typography>Caloric Total: {calorieTotal}</Typography>
      </Box>
    </Box>
  );
};
/*
{cartItems.map((item) => (
  <Typography>{item.fdcId}</Typography>
))}
*/
export default Cart;
