import * as React from 'react';
import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import Copyright from './components/Copyright';
import Home from './routes/Home';

const App = function createApp() {
  return (
    <Container maxWidth="md">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Copyright />
    </Container>
  );
};

export default App;
