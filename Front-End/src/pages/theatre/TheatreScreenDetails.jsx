import React from 'react'
import { TheatreNavBar } from '../../components/theater/TheatreNavBar'
import { TheatreSideBar } from '../../components/theater/TheatreSideBar'
import { TheatreScreenList } from '../../components/theater/TheatreScreenList'

function TheatreScreenDetails() {
  return (
    <>
    <TheatreNavBar/>
    <TheatreSideBar/>
    <div className='ms-[18.1rem] w-[calc(100vw-18.1rem)] h-[calc(98.9vh-56px)]'>
   <TheatreScreenList/>
    </div>
    </>
  )
}

export default TheatreScreenDetails