import React, { useState } from "react";
import './App.css';
import './styles/root.scss'
import Board from './components/Board';
import { calculateWinner } from "./helpers";
import History from "./components/History";
import StatusMessage from "./components/StatusMessage";
function App() {
  const new_game=[
    {board:Array(9).fill(null),isNext:true}
  ];
  const [history,setHistory]=useState(new_game);
  const [currentMove,setCurrentMove]=useState(0);
  const current =history[currentMove];
  const [isNext,setIsNext]=useState(false)
  const {winner,winningSquares}=calculateWinner(current.board);
  
  const handleSquareClick=(position)=>{
    if(current.board[position]){
      return;
    }
    if(winner){
      return;
    }
      setHistory((prev)=>{
        const last=prev[prev.length-1]
        const newBoard= last.board.map((square,pos)=>{
          if(pos===position){
            return last.isNext?'X':'O';
          }
          return square;
        })
        return prev.concat({board:newBoard,isNext:!last.isNext})
      })
      setCurrentMove(prev=>prev+1)
  }
  const moveTo=(move)=>{
    setCurrentMove(move);
  }
  const onNewGame=()=>{
    setHistory(new_game);
    setCurrentMove(0)
  }
  return (
    <div className='app'>
      <h1>TIC <span className='text-green'>TAC</span> TOE</h1>
      <StatusMessage winner={winner} current={current}></StatusMessage>
      <Board 
        board={current.board} 
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      ></Board>
      <button 
      onClick={()=>{onNewGame()}}
      className={`btn-reset ${winner ?'active':''}`}
      >New Game</button>
      <History history={history} moveTo={moveTo} currentMove={currentMove}></History>
      <div className='bg-balls'/>
    </div>
  );
}

export default App;
