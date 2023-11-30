import React,{useState,useContext,useReducer} from 'react'
import StateContext from './context/StateContext'


function Buttons({index,id,sendMessage,disabled}) {

 
  const {setButtons,button,player,setPlayer,playerTurn,setPlayerTurn,socket,roomNo,dispatch,combo} = useContext(StateContext)
 
  const countReducer = (state,action) => {

    switch(action.type){
      case 'update':
        return {num:state.num + 1};
        case 'clicked':
          return {clicked:state.clicked + 1};
       default:
        return state;
    }

  }



  const[count, setCount] = useReducer(countReducer, {num:0,clicked:0})
 

  const setSign=()=>{

    const allButtons = [...button]
    const selectedBtn= allButtons.find((btn)=>{return btn.id === id})

    selectedBtn.sign = player.sign;
    selectedBtn.disabled = true
      
    setButtons(allButtons)

 

   //setPlayer(newPlayer)
   dispatch({type:"myTurn", payload:false})

   gameCheck()

   console.log(player)
  }


  const gameCheck = ()=> 
  {

    dispatch({type:'clicked'})
   
    for(let i=0; i<combo.length; i++){
      let num =0;
      let unUsedButtons;
     for(let x = 0 ; x < combo[i].length; x++){
      
       let mybtn =  button.find((btn) => {
         return btn.id === combo[i][x]
        
        })

         unUsedButtons = button.filter(btn => btn.sign === "")

        if (mybtn.sign === player.sign ){
            num += 1;
        } 


       console.log(mybtn)
     }

     console.log("num: "+ num)
     if(num === 3){
      socket.emit("Game-Status",{GameResult:true,player:player.sign,room:roomNo})
      const allButtons = [...button];
      let Btns= allButtons.filter((btn)=>{return btn.disabled === false});
        Btns = Btns.map(b =>b.disabled = false)
        console.log(Btns)
      

      break;
     }  

     if(unUsedButtons.length === 0) socket.emit("Game-Status",{GameResult:false,player:player.sign,room:roomNo})

     


    }
    console.log(count)
    
  }
  return (
    
    <div className='w-full h-full border-solid border-4 border-sky-500 text-center text-5xl flex items-center justify-center'  onClick={()=>{
      if(player.toPlay){
     
        if(disabled!== true){
          setSign()
          sendMessage()
          socket.emit("playerTurn",{player,roomNo,toPlay:true})
        }
        

      }

     
      }}>
        {index}
        
       
    </div>
  )
}

export default Buttons