
import './App.css'
import NavBar from './Components/NavBar'
import SearchPage from './Components/searchPage'
import { use, useState } from 'react'
import AllUrl from './Components/AllUrl'

function App() {

  const [isActive, setActive] = useState(true);

  const toggleComponent = () =>{
    setActive(!isActive);
  }
  

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
          <NavBar toggleComponent= {toggleComponent}/>
          {isActive ? <SearchPage/> : <AllUrl toggleComponent={toggleComponent}/>}
      </div>
    </>
  )
}

export default App
