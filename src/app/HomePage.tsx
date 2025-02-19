import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import KanbanBoard from './components/KanbanBoard'
export default function HomePage() {
  return (
    <div className='flex flex-row items-center justify-center min-h-screen text-white'>
        <Sidebar/>
        <div className='flex ml-20 min-h-screen bg-black flex-col w-full'> 
            <Navbar />
            {/* <div className='h-80%'> Main Content</div> */}
            <KanbanBoard/>
        </div>
        
    </div>
  )
}
