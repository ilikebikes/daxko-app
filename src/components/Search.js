import * as React from 'react';
import { Box, TextField } from '@mui/material';
import https from 'https';

async function searchRequest(url, apiKey, term, setSearchedFoods) {
  const foodSearch = '/foods/search?format=json';
  const query = '&query=';
  const trail = '&sort=n&max=10&offset=0';
  const request = `${url + foodSearch + query + term + trail}&${apiKey}`;
  let foodSearchObject = null;
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
      foodSearchObject = JSON.parse(body);
      setSearchedFoods(foodSearchObject);
    });
  });
}

const Search = function SearchBox(props) {
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      const { url, apiKey, setSearchedFoods, setOpen } = props;
      searchRequest(url, apiKey, event.target.value, setSearchedFoods);
      setOpen(true);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <TextField id="outlined-search" label="Search field" type="search" onKeyDown={handleEnter} />
    </Box>
  );
};

export default Search;
