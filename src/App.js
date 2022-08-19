import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Container from '@mui/material/Container';
// import { makeStyles } from '@mui/material/styles';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
// import Alert from './components/layout/Alert';

import Landing from './components/pages/Landing';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//   },
//   pageContent: {
//     padding: theme.spacing(6, 0),
//   },
// }));

const App = () => {
  const classes = {};

  return (
    <Router>
      <div className={classes.root}>
        <Navbar></Navbar>
        <Container
          maxWidth='md'
          component='main'
          className={classes.pageContent}
        >
          {/* <Alert /> */}
          <Routes>
            <Route path='/' element={<Landing />} />
          </Routes>
        </Container>
        <Footer></Footer>
      </div>
    </Router>
  );
};

export default App;
