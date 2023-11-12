import React,{useContext} from 'react'
import StateContext from './context/StateContext'

function CreateRoomModal() {
    const {setPlayRoom,createRoomVisible,setCreateRoomVisible,roomNo,setRoomNo,createRoomNo,setCreateRoomNo,setShowBoard,setShowRoomEntry} = useContext(StateContext)
  return (
    <div className={createRoomVisible.visibility ? 'h-screen w-full absolute ' : 'hidden' } /*onClick={()=>setCreateRoomVisible({visibility:false})}*/>
        <div className='flex items-center justify-center h-full'>
            <form action="" className='bg-gray-200 h-48 w-96 flex items-center justify-center rounded'>
        
                    <div className=' grid grid-col-1 h-full items-center '>
                 
                        <div className='w-full '>
                       <div>
                       <h1 className='text-center mb-4 '>Create Room</h1>
                       </div>
                        <div className='flex justify-center space-x-2'>
                                <input type="text" value={createRoomNo} onChange={(e)=>{setCreateRoomNo(e.target.value)}} />
                            <button type='button' className=' px-10 py-2 bg-white  hover:text-green-400'onClick={()=>{
                                setPlayRoom()
                                setShowBoard({visible:true})
                                setShowRoomEntry({visible:false})
                            }}> Create </button>
                        </div>
                            
                        </div>
                    </div>
              
                
                
            </form>
        </div>
    </div>
  )
}

export default CreateRoomModal