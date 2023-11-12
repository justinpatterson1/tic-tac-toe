import React,{useContext,useState} from 'react'
import CreateRoomModal from './CreateRoomModal'
import StateContext from './context/StateContext'

function RoomEntry() {
    const {setPlayRoom,setRoomNo,roomNo,setCreateRoomVisible,showBoard,setShowBoard,showRoomEntry,setShowRoomEntry} = useContext(StateContext)

  return (
    <>
        <div className={showRoomEntry.visible ? 'w-full h-screen relative ' :'hidden'}>
            <CreateRoomModal/>
            <div className= 'w-full h-full grid grid-cols-1 items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500'>
                <form action="" className=' grid grid-col-1 justify-center'>
                <div className=' flex space-x-3'>
                        <input type="text" placeholder='Room ID...' value={roomNo} className='w-full px-5 py-2' onChange={(e)=>{setRoomNo(e.target.value)}}/>

                        <button type="button" className='px-10 py-2 bg-white hover:text-green-400'
                        onClick={()=>{
                            setPlayRoom()
                            setShowBoard({visible:true})
                            setShowRoomEntry({visible:false})
                            //alert(roomNo)
                        }} >Go!</button>
                </div>  
                <button type="button"  className='px-10 py-2 mt-5 bg-white hover:text-green-400'
                    onClick={()=>{
                        setCreateRoomVisible({visibility:true})
                        
                    }
                }>
                    Create Room
                </button>
                
                </form>
            </div>
        </div>
        
    </>
  )
}

export default RoomEntry