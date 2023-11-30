import React,{useState,useContext} from 'react'
import Buttons from './Buttons'
import StateContext from './context/StateContext'

function Board({sendMessage}) {

  const {button,setButtons,showBoard,player,gameResultMessage} = useContext(StateContext)
    
    
  return (
    <div className='h-full w-screen flex flex-col bg-fuchsia-900 items-center justify-center'>
    <h1>{gameResultMessage}</h1>
      <div className='w-1/3 flex flex-col-reverse items-center justify-center mb-10 mt-10 h-4/6'>
      <h1 className='text-center  text-2xl pt-10 font-bold '>{player.toPlay ? "You Are Free To Play!!!" : "Next Player's Turn"}</h1>
         <div className='h-full w-full grid grid-cols-3  bg-yellow-200'>
        {button.map((row)=>(
                <Buttons key={row.id} id={row.id} index={row.sign} disabled={row.disabled} sendMessage={sendMessage}/>
        ))}
                
    </div>
   </div>
   </div>

  )
}

export default Board