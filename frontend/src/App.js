import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TransactionsData from './components/TransactionsData';
import Statistics from './components/Statistics';
import NavBar from './components/NavBar';


const App = () => {
  return (
    <>
      <Router>
        <main>
          <NavBar />
          <Routes>
            <Route path='/' element={<TransactionsData />}></Route>
            <Route path='/statistics' element={<Statistics />}></Route>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App

