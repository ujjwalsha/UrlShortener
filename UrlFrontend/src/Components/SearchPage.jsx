import { useEffect, useEffectEvent, useState } from 'react'
import React from 'react'

export default function SearchPage() {

  const [originalUrl, setOriginalUrl] = useState('');

  const [shorturl, setShortUrl] = useState('');
  const [urlcode, setUrlcode] = useState('');
  const [copyStatus, setCopystatus] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [response, setresponse] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [accessCount, setAccessCount] = useState(0);

  const shortUrl = async () => {

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
        const url = data.shortUrl;
        
        
        
        setShortUrl(`http://localhost:8081/api/s/${url}`);

        setUrlcode(url);
    }
    catch(error)
    {
      console.log("something wrong");
      
    }
  }

  useEffect(()=>{

    fetch('http://localhost:8081/api/all')
    .then(Response => Response.json())
    .then(data => setresponse(data))

  }, []);
  


  const handleSubmitStatus = async () =>{

    setSubmitStatus('Loading... ')
    setTimeout(() => {
        setSubmitStatus('')
      }, 500);
  }

  const submitHandle = (e) =>{
      e.preventDefault();
    shortUrl();
    handleSubmitStatus();
    setTrigger(true);
    console.log("url code is : ", urlcode);
    AccessCount(urlcode);
  }

  const AccessCount = (url) =>{

    console.log(response);
    const n = response.length;
    for(let i = 0; i < n; i++)
    {
        if(url === response[i].shortUrl)
        {
            setAccessCount(response[i].accessCount)
            return;
        }
    }
  }
  
  



  const handleChange = (e) =>{
      setOriginalUrl(e.target.value);
  }

  const handleCopyclick = async () =>{
      try{
        await navigator.clipboard.writeText(shorturl);
        setCopystatus("copied!")
        
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
        >{submitStatus || 'Submit'}</button>
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
        <p className='p-10 font-semibold'>{shorturl || "your short url would be shown here!😊"}</p>
        {trigger ? <p className='font-semibold'>your Long Url :  <a href={originalUrl} type='link'>{originalUrl}</a></p> : ''}
        {trigger ? <p className='font-semibold'> No of click this url:  {accessCount}</p> : ''} 
    </div>
</div>
  )
}
