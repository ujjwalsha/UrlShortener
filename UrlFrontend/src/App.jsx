import './App.css'
import NavBar from './Components/NavBar'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SearchPage from './Components/searchPage'
import AllUrl from './Components/AllUrl'
import Stats from './Components/Stats'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <NavBar/>
              <SearchPage/>
            </>
          }/>

          <Route path='/allUrl' element={
            <>
              <NavBar/>
              <AllUrl/>
            </>
            
          }/>

          <Route path='/Stats' element={
            <Stats/>
          }/>

        </Routes>
      </Router>
    </>
  )
}

export default App
