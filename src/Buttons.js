import React,{useState,useContext} from 'react'
import StateContext from './context/StateContext'


function Buttons({index,id,sendMessage}) {


  const {setButtons,button,player1,setPlayer1,player2,setPlayer2} = useContext(StateContext)
 
  const setSign=()=>{

    const allButtons = [...button]
    const selectedBtn= allButtons.find((btn)=>{return btn.id === id})

    if(player1.turn === true){

   
    selectedBtn.sign = "X";
    setPlayer1({...player1,turn:false})
    setPlayer2({...player2,turn:true})
    } 

    if(player2.turn === true){

    
      selectedBtn.sign = "O";
      setPlayer2({...player2,turn:false})
      setPlayer1({...player1,turn:true})
      } 
    setButtons(allButtons)

    console.log(allButtons)
  }
  return (
    <div className='w-full h-full border-solid border-4 border-sky-500' onClick={()=>{
      setSign()
      sendMessage()
      }}>
        {index}
        
    </div>
  )
}

export default Buttons