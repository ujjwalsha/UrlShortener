import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function Stats() {

  const location = useLocation();
  const [statsData, setStatsData] = useState([]);
  const [maxCount, setMaxCount] = useState(0);
  const [AccessAt, setAccessAt] = useState();
  const [Browser, setBrowser] = useState([]);
  const [AccessBrowser, setAccessBrowser] = useState([]);

  const params = new URLSearchParams(location.search)
  const code = params.get("urlcode") || "No data found";

  useEffect(()=>{
    fetch(`http://localhost:8081/api/stats/${code}`)
    .then(response => response.json())
    .then((data) => {
        setStatsData(data);
        FilterData(data);
    })
    .catch(Error => console.log(Error)
    )

    
  },[])


  const FilterData = (statsData) =>{
     let maxCount = 0;
     console.log(statsData);
     
     let n = statsData.length;
     for(let i = 0; i < statsData.length; i++)
     {
        if(statsData[i].accessCount > maxCount)
            maxCount = statsData[i].accessCount;

        if(statsData[i].shortUrl === code)
        {
            setBrowser(prev => [statsData[i].browser]);
            setAccessBrowser(statsData[i].accessedAt);
        }
        
     }
    
     setAccessAt(statsData[n-1].accessedAt)
     setMaxCount(maxCount);
    
     
  }

  console.log("browser", Browser);
  

  
  
  return (

    <div className='stats-container border-1 flex justify-center gap-20 h-[30em]'>
        <p className='font-semibold'>Your Short Url : <a href=""></a>http://localhost:8081/api/r/{code}</p>
        {statsData.length ? <p className='font-semibold text-xl'>Access Count: {maxCount}</p> : 0}
        {statsData.length ? <p className='font-semibold text-xl '>Last access At: {AccessAt}</p> : <p>NAN</p>}
        {
            statsData.length ? <p>Data</p> :
                <p>No Data Found</p>
        }
    </div>
  )
}
