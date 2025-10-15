import React from 'react'

export default function UrlData({response}) {
  return (
    
    <div className='container m-10 overflow-x-auto'>

        <table className='className="min-w-ful"'>

            <thead>
                <tr className='border-1 '>
                    <th className='py-2 border-1 px-4 text-left'>OriginalUrl</th>
                    <th className='py-2 px-4 text-left'>ShortUrl</th>
                    <th className='py-2 px-4 text-left'>Access Count</th>
                </tr>
            </thead>

            <tbody>
                    {
                    response.map((data)=>(
                        <div key={data.id}>
                                <tr>
                                    <td className='py-2 px-4 border-1'>{data.originalUrl}</td>
                                    <td className='py-2 px-4' >http://localhost:8081/api/s/{data.shortUrl}</td>
                                    <td className='py-2 px-4'>{data.accessCount}</td>
                                </tr>
                        </div>
                    ))
                }
            </tbody>
           
        </table>
    </div>
  )
}
