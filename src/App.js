import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import MuiContainer from '@mui/material/Container';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
// import Alert from './components/layout/Alert';

import Landing from './components/pages/Landing';

const Container = styled(MuiContainer)(({ theme }) => ({
  padding: theme.spacing(6, 0),
}));

function MainContainer(props) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
      {...props}
    ></div>
  );
}
const App = () => {
  return (
    <Router>
      <MainContainer>
        <Navbar></Navbar>
        <Container maxWidth='md' component='main'>
          {/* <Alert /> */}
          <Routes>
            <Route path='/' element={<Landing />} />
          </Routes>
        </Container>
        <Footer></Footer>
      </MainContainer>
    </Router>
  );
};

export default App;
