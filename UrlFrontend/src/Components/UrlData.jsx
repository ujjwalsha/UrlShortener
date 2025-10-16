import React from 'react'

export default function UrlData({response}) {
  return (
    
    <div className='container m-10'>

        <table className=' border-collapse text-sm'>

            <thead className='bg-gray-800 uppercase text-gray-400 text-xs'>
                <tr className='border-1 w-xl '>
                    <th className='py-2 px-4 w-xl flex items-center justify-center max-w-[400px]'>OriginalUrl</th>
                    <th className='py-3 px-4 '>ShortUrl</th>
                    <th className='py-2 px-4 border-1 text-left '>Access Count</th>
                </tr>
            </thead>

            <tbody>
                    {
                    response.map((data)=>(
                        <div key={data.id}>
                                <tr>
                                    <td className='py-2 px-4 flex items-center border w-xl max-w-[400px] hover:underline cursor-pointer'>{data.originalUrl}</td>
                                    <td className='py-2 px-4 max-w-[400px] hover:underline cursor-pointer' ><a href=""></a>http://localhost:8081/api/s/{data.shortUrl}</td>
                                    <td className='py-2 px-4 max-w-[100px]'>{data.accessCount}</td>
                                </tr>
                        </div>
                    ))
                }
            </tbody>
           
        </table>
    </div>
  )
}
