import Board from "./Board";
import { useEffect, useState,useContext } from "react";
import io from 'socket.io-client';
import RoomEntry from "./RoomEntry";
import StateContext from "./context/StateContext";


const socket = io.connect("http://localhost:3001")



function App() {

  const sendMessage = ()=>{
    socket.emit("send_message",{button,roomNo})
  }

  const [createRoomVisible,setCreateRoomVisible] = useState({visible:false})
  const [createRoomNo,setCreateRoomNo] = useState("")
  const [showBoard,setShowBoard] = useState({visible:false})
  const [showRoomEntry,setShowRoomEntry] = useState({visible:true})
  const[player1,setPlayer1] = useState({
    id:"",
    sign:"X",
    turn:true
  })
  const[player2,setPlayer2] = useState({
    id:"",
    sign:"O",
    turn:false
  })
  const [roomNo,setRoomNo] = useState()
  const [button,setButtons] = useState([
      {
        id:1,
        sign:""
      },
      {
        id:2,
        sign:""
      },
      {
        id:3,
        sign:""
      },
      {
        id:4,
        sign:""
      },
      {
        id:5,
        sign:""
      },
      {
        id:6,
        sign:""
      },
      {
        id:7,
        sign:""
      },
      {
        id:8,
        sign:""
      },
      {
        id:9,
        sign:""
      }
    ]);

    
  const [combo,setCombos] = useState([
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [3,5,7],
    [2,5,6],
    [3,6,9],
    [1,5,9]
  ])

 const setPlayRoom = ()=>{
  if(roomNo !== ""){
    socket.emit("join_room",roomNo)
  }


  
 }


 


 useEffect(()=>{
  socket.on("receive_input",(data)=>{
    console.log(data)
    setButtons(data.button)
    
  })
 },[socket])
  return (
    <StateContext.Provider value={{setPlayRoom,combo,setCombos,roomNo,setRoomNo,button,setButtons,createRoomVisible,setCreateRoomVisible,createRoomNo,setCreateRoomNo,showBoard,setShowBoard,showRoomEntry,setShowRoomEntry,player1,setPlayer1,player2,setPlayer2}}>
    <div>

    
          <RoomEntry/>
          <div className={ showBoard.visible ?
          
          "h-screen bg-slate-500 flex items-center justify-center "
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
