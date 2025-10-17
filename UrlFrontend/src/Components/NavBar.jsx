import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function NavBar() {

  const navigate = useNavigate();
  const location = useLocation();

  const navigateAllurlTab = () =>{

    if(location.pathname === "/")
        navigate("/allUrl")
    else
      navigate("/");
  }

  return (
    <div className='w-full flex justify-center'>
      <div className='w-3xl border-1 flex justify-between items-center p-1'>
          <h1 className='font-bold text-2xl '>URL-SHORTENER</h1>
            <button
                className='cursor-pointer border-1 p-2 bg-blue-800 hover:bg-blue-900'
                onClick={navigateAllurlTab}
            >URLS</button>
      </div>   
    </div>
  )
}


