import { useEffect, useState } from 'react'
import React from 'react'

export default function NavBar({toggleComponent}) {

  return (
    <div className='navbar-content w-3xl border-1 flex justify-between items-center p-1'>
        <h1 className='font-bold text-2xl '>URL-SHORTENER</h1>
        <button
            className='cursor-pointer border-1 p-2 bg-blue-800 hover:bg-blue-900'
            onClick={toggleComponent}
        >URLS</button>
    </div>
  )
}


