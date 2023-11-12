import React,{useState,useContext} from 'react'
import Buttons from './Buttons'
import StateContext from './context/StateContext'

function Board({sendMessage}) {

  const {button,setButtons,showBoard} = useContext(StateContext)
    
    
  return (
    <div className='h-2/3 w-1/3 bg-gray-300 flex items-center justify-center'>
         <div className='h-full w-full grid grid-cols-3 bg-white'>
        {button.map((row)=>(
                <Buttons key={row.id} id={row.id} index={row.sign} sendMessage={sendMessage}/>
        ))}
                
    </div>
   </div>
  )
}

export default Board