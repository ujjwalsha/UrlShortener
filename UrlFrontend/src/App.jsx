import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Components/NavBar'

function App() {

  const [originalUrl, setOriginalUrl] = useState('');
  const [trigger, setTrigger] = useState(false);
  const [shorturl, setShortUrl] = useState('');
  const [copyStatus, setCopystatus] = useState('')

  const shortUrl = async () => {

    console.log(originalUrl);
    

    if(!originalUrl) return;

    try{
      const response = await fetch('http://localhost:8081/api/create',
        { method : "POST",
          headers : {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({originalUrl:originalUrl}),
        });
  
        const data = await response.json();
        console.log(data);
        

        const url = data.shortUrl;
        setShortUrl(`http://localhost:8081/api/s/${url}`);
        
    
    }
    catch(error)
    {
      console.log("something wrong");
      
    }
  }

  const submitHandle = (e) =>{
      e.preventDefault();
     shortUrl();
    console.log(originalUrl);
      
  }

  const handleChange = (e) =>{
      setOriginalUrl(e.target.value);
  }

  const handleCopyclick = async () =>{
      try{
        await navigator.clipboard.writeText(shorturl);
        setCopystatus("copied!")
        console.log(shorturl);
        
        setTimeout(() => {
          setCopystatus('')
        }, 2000);
      }
      catch(error)
      {
        console.log("something wrong in copy");
        
      }
  }

  return (
    <>
      <NavBar/>
      <div className='grid justify-center gap-10 items-center p-20'>
          <div className='search-bar'>
              <input type="text" 
                className='text-xl font-semibold w-xl p-2 border'
                placeholder='Enter your Url'
                value={originalUrl}
                onChange={handleChange}
              />
              <button 
              className='text-xl font-semibold border bg-blue-900 p-2 hover:bg-blue-950 cursor-pointer'
              onClick={submitHandle}
              >Submit</button>
          </div>

          <div className='shorturl-container border grid  w-2xl h-xl'>

            <div className='flex justify-end'>
                <button 
                    className='text-[1em] p-2 cursor-pointer bg-gray-900 '
                    onClick={handleCopyclick}
                  >
                    {copyStatus ||'Copy'}
                  </button>
            </div>
            
              <p className='p-10 font-semibold'>{shorturl || "url here"}</p>

          </div>


      </div>
    </>
  )
}

export default App
