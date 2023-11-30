import Board from "./Board";
import { useEffect, useState,useReducer } from "react";
import io from 'socket.io-client';
import RoomEntry from "./RoomEntry";
import StateContext from "./context/StateContext";


const socket = io.connect("http://localhost:3001")



function App() {

  

  const reducer =(state,action)=>{
    switch(action.type){
      case "GetID":{
        return {...state,id:action.payload};
      }
      case "GetSign":
        return {...state,sign:action.payload}
      case "myTurn":
        return {...state,toPlay:action.payload}
      default:
          return state
    }

  }
  
 
   const [player,dispatch]= useReducer(reducer,{id:"",sign:"",toPlay:""})
 // const [state,dispatch] = useReducer(reducer,{count:0,name:'Jane'})
  

//   const update = ()=>{
//       dispatch({type:"add"})
//   }

//   const subtract = ()=>{
//     dispatch({type:"subtract"})
// }

// const nameChange = (e) =>{
//   dispatch({type:"new_name",
//   field:e.target.name,
//   payload:e.target.value})
// }
//const [count,setCount] = useState(0)
  const [createRoomVisible,setCreateRoomVisible] = useState({visible:false})
  const [createRoomNo,setCreateRoomNo] = useState("")
  const [showBoard,setShowBoard] = useState({visible:false})
  const [showRoomEntry,setShowRoomEntry] = useState({visible:true})
  const [playerAlert,setPlayerAlert] = useState("")
  const [playerTurn,setPlayerTurn] = useState({
    
  })
  const[gameResultMessage,setGameResultMessage] = useState("")
  // const[player,setPlayer] = useState({
  //   id:"",
  //   sign:"",
  //   toPlay:""
  // })
  const[player2,setPlayer2] = useState({
    id:"",
    sign:"O",
    turn:false
  })
  const [roomNo,setRoomNo] = useState()
  const [button,setButtons] = useState([
      {
        id:1,
        sign:"",
        disabled:false
      },
      {
        id:2,
        sign:"",
        disabled:false
      },
      {
        id:3,
        sign:"",
        disabled:false
      },
      {
        id:4,
        sign:"",
        disabled:false
      },
      {
        id:5,
        sign:"",
        disabled:false
      },
      {
        id:6,
        sign:"",
        disabled:false
      },
      {
        id:7,
        sign:"",
        disabled:false
      },
      {
        id:8,
        sign:"",
        disabled:false
      },
      {
        id:9,
        sign:"",
        disabled:false
      }
    ]);

    
  const [combo,setCombos] = useState([
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [3,5,7],
    [2,5,8],
    [3,6,9],
    [1,5,9]
  ])

 const setPlayRoom = ()=>{
  if(roomNo !== ""){
    socket.emit("join_room",roomNo)
    console.log(roomNo)
  }


  
 }

 const sendMessage = ()=>{
  socket.emit("send_message",{button,roomNo})
}

 
const updateState = (data) =>{
  dispatch({type:"GetID", payload:data.socket})
  dispatch({type:"GetSign", payload:data.sign})
  dispatch({type:"myTurn", payload:data.toPlay});
  console.log(data)
}

 useEffect(()=>{
  socket.on("receive_input",(data)=>{
    console.log("Data:" + JSON.stringify(data))
   setButtons(data.button)
    
  })
 },[socket])

 useEffect(()=>{
  socket.on("PlayerSign",(sign)=>{

    updateState(sign)
 
  // console.log(player)
  },[socket]) 
 })

 useEffect(()=>{
  socket.on("PlayerTurnReturned",data=>{
    console.log(data)
   // console.log(player)
  
    dispatch({type:"myTurn", payload:data.toPlay})
    //console.log(newPlayer)

   // setPlayer(newPlayer)
  })
 },[socket])


 useEffect(()=>{
  socket.on("result",data=>{
      setGameResultMessage(data)
      console.log(data)
  })
 },[socket])


  return (
    <StateContext.Provider value={{gameResultMessage,setGameResultMessage,player,dispatch,setPlayRoom,combo,setCombos,roomNo,setRoomNo,button,setButtons,createRoomVisible,setCreateRoomVisible,createRoomNo,setCreateRoomNo,showBoard,setShowBoard,showRoomEntry,setShowRoomEntry,setPlayerTurn,socket,playerAlert}}>
    <div className="h-screen">

      {/* <h1>
        {state.count} {state.name}
      </h1>
      <form action="">
        <input type="text" value={state.name} name='name' onChange={(e)=>{nameChange(e)}} />
      </form>
      <button className="p-4 bg-green-600" onClick={update}>add</button>
      <button className="p-4 bg-red-600" onClick={subtract}>subtract</button>
      <button className="p-4 bg-orange-600" onClick={nameChange}>Change name</button> */}

    
          <RoomEntry/>
          <div className={ showBoard.visible ?
          
          "h-full bg-slate-500 flex items-center justify-center "
          :
          "hidden"
          }>
              <Board  sendMessage={sendMessage}/>
          </div>
    </div>
    </StateContext.Provider>
  );
}

export default App;
