import * as React from 'react';
import { Box, Typography, IconButton, Drawer } from '@mui/material';
import https from 'https';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EnhancedTable from './Table';
import Search from './Search';
import SimpleDialog from './Modal';
import Cart from './Cart';

const apiKey = 'api_key=InURJ29ywpKYuBQbs09yhWzaxb3Y5B6TZBmHtcJQ';
const url = 'https://api.nal.usda.gov/fdc/v1';

const Home = function createHome() {
  const [foodList, setFoodList] = React.useState([]);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [searchedFoods, setSearchedFoods] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [open, setOpen] = React.useState(true);

  const apiRequest = async () => {
    const foodPath = '/foods/list';
    const pageSize = '&pageSize=200';
    const request = `${url + foodPath}?${apiKey}${pageSize}`;
    let foodListObject = null;
    https.get(request, async (response) => {
      response.on('error', (e) => {
        // eslint-disable-next-line
        console.error('Request error: ', e);
      });

      response.setEncoding('utf8');
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });

      response.on('end', () => {
        foodListObject = JSON.parse(body);
        setFoodList(foodListObject);
      });
    });
  };
  React.useEffect(() => {
    apiRequest();
  }, []);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  // eslint-disable-next-line
  console.debug(cartItems);
  return (
    <Box>
      <Typography variant="h1" sx={{ textAlign: 'center' }}>
        Daxco Foods
      </Typography>
      <Box sx={{ textAlign: 'right', paddingRight: '8px' }}>
        <IconButton onClick={handleOpenDrawer}>
          <ShoppingCartIcon />
        </IconButton>
      </Box>
      {cartItems.length > 0 ? (
        <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <Cart cartItems={cartItems} searchedFoods={searchedFoods.foods} foodList={foodList} />
        </Drawer>
      ) : null}
      {foodList && !searchedFoods.foods && foodList.length > 0 ? (
        <EnhancedTable rows={foodList} paginationOption={5} setCartItems={setCartItems} />
      ) : null}
      {searchedFoods.foods && searchedFoods.foods.length > 0 ? (
        <EnhancedTable
          rows={searchedFoods.foods}
          paginationOption={10}
          setCartItems={setCartItems}
        />
      ) : null}
      <Search setSearchedFoods={setSearchedFoods} apiKey={apiKey} url={url} setOpen={setOpen} />
      {searchedFoods.foods && searchedFoods.foods.length > 0 ? (
        <SimpleDialog data={searchedFoods.foods.slice(0, 10)} open={open} setOpen={setOpen} />
      ) : null}
    </Box>
  );
};

export default Home;
