import React from 'react'
import Mydata from "./assets/data";
import './App.css'
import Home from './home'
import Card from './card';
import JournalHome from './jounalsHome';
import MemeGenerator from './meme/memeGenerator';
import Thing from './thingEg/thing';

import AiDoc from './AIDoc/AiDoc';

function App() {
// const colors = ['red', 'blue', 'green', 'yellow'];
// const listColor = colors.map((color)=>{return <p className={`text-${color}-500`}> {color} </p>});
// const newData = Mydata.map((person)=>{
//   return <Card person={person} />
// })

  return (
    <>
      <AiDoc />
    </>
  )
}

export default App
