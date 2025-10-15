import React, { useEffect, useState } from 'react'
import UrlData from './UrlData';

export default function AllUrl({toggleComponent}) {

 const [response, setresponse] = useState([]);
 

 useEffect(()=>{

    fetch('http://localhost:8081/api/all')
    .then(Response => Response.json())
    .then(data => setresponse(data));

    
    

 }, [toggleComponent])

 console.log(response);

  return (

    <div>
         {response.length  ? (
             <UrlData response={response}/>
         ) : 
         (
           <p>No urls yet</p>
         )
        }
    </div>

    

  )
}
