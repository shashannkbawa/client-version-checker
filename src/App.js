import { React, useState, useEffect, useRef } from 'react'

function App() {

  const [result, setResult] = useState([])
  const [update, setUpdate] = useState('')

  useEffect(() => {

    window.electronAPI.confirmationData((event, data) => {

      setResult(data)

    })
    window.electronAPI.updateConfirmData((event, dataU) => {

      setUpdate(dataU)

    })


  }, [update])

  return (
    <div className='h-screen pt-5  bg-gradient-to-br from-cyan to-light-cyan'>
      <div className='h-full bg-white mt-20 bg-gradient-to-br from-cyan to-light-cyan'>
        <div className='flex justify-center'>
          <button className='h-12 w-28 bg-light-green rounded text-white font-semibold ' onClick={() => {

            const data = 'test'
            window.electronAPI.sendGetFileHostID(data);

          }}>Get Report</button>
        </div>
        <div className='flex justify-around m-10 '>
          <div id='directoryName' className=' bg-off-green list-none rounded h-full w-full p-5 mr-2' ><p className='bg-light-green rounded h-10 flex justify-center items-center text-white font-semibold '>Directory Name</p>
            {
              result.map((pathData) => {
                return <li className='mt-5 py-2 flex justify-center'>{pathData.path}</li>
              })
            }
          </div>
          <div id='calculatedChecksum' className=' bg-off-green list-none rounded h-full w-full p-5 ml-1'> <p className='bg-light-green rounded h-10 flex justify-center items-center text-white font-semibold '>Checksum </p>
            {
              result.map((pathData) => {
                return <li id="resultList" className='mt-5 py-2 flex justify-center'>{pathData.result}</li>
              })
            }
          </div>
        </div>
        <div className='flex  place-content-center'>
          <button className='h-12 w-28 bg-light-green rounded text-white font-semibold  ' onClick={() => {

            window.electronAPI.updateData();
          }} >update database</button>
        </div>
        <div className="mt-10 pt-10 flex justify-center">
          <p>{update.result}</p>
        </div>
      </div>
    </div>
  )
}

export default App