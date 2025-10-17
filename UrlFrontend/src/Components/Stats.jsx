import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function Stats() {

  const location = useLocation();
  const [statsData, setStatsData] = useState([]);
  const params = new URLSearchParams(location.search)
  const code = params.get("urlcode") || "No data found";

  useEffect(()=>{
    fetch(`http://localhost:8081/api/stats/${code}`)
    .then(response => response.json())
    .then(data => setStatsData(data))
    .catch(Error => console.log(Error)
    )
  },[])

  console.log(statsData);

  return (

    <div className='stats-container border-1 flex justify-center gap-20 h-[30em]'>
            {
                statsData.length  ? 
                    (
                        statsData.map((stats)=>(
                            <div key={stats.id}>
                                <div className='url-section h-xl border-1 h-40 flex flex-col justify-center gap-2 p-10 items-start'>
                                    <p className='font-semibold'>Your Short Url : <a href=""></a>http://localhost:8081/api/r/${stats.shortUrl}</p>
                                    <p> Access Time:  {stats.accessedAt}</p>
                                </div>

                                <div className='border-1 flex flex-col justify-between h-40 p-7'>
                                    <h2 className='top font-semibold'>Access Count</h2>
                                    <p className='text-5xl font-semibold'>{stats.accessCount}</p>
                                </div>
                            </div>
                        ))
                    )
                :
                (
                    <p>No Data found</p>
                )
            }
    </div>
  )
}
