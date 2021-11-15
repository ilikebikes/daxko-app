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

  const [enhancedRender, setEnhanced] = React.useState(enhanceData(toRender));

  const calorieTotal = enhancedRender.reduce((acc, item) => acc + item.calories, 0);
  return (
    <Box>
      <Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3">Your Cart</Typography>
        </Box>
        {toRender.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          enhancedRender.map((item) => (
            <CartItem item={item} key={item.fdcId} setEnhanced={setEnhanced} />
          ))
        )}
      </Box>
      <Box>
        <Typography>Caloric Total: {calorieTotal}</Typography>
      </Box>
    </Box>
  );
};

export default Cart;
