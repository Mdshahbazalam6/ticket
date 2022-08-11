import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Home from './components/Home';
import {Routes, Route} from "react-router-dom" 
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SearchResult from './components/SearchResult';
import BookNow from './components/BookNow';
import MyBookings from './components/MyBookings';
import Navbar from './components/Navbar';

function App() {
  return (

    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
      
      <Route path='/' element={< Home />}></Route>
      <Route path='/signup' element={< SignUp />}></Route>
      <Route path='/signin' element={< SignIn />}></Route>
      <Route path='/searchresult' element={< SearchResult />}></Route>
      <Route path='/booknow' element={< BookNow />}></Route>
      <Route path='/mybookings' element={< MyBookings />}></Route>
      </Routes>
   
    </ChakraProvider>
  );
}

export default App;
