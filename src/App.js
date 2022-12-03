import React from 'react';
import logo from './logo.svg';
import './App.css';
import Confetti from "react-confetti"
import Dice from "./components/Dice"
import {nanoid} from "nanoid"

function App() {
  
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    console.log("Dice state changed")
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  // returns an arrray of 10 random numbers between 1-6 inclusive
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    console.log(newDice)
    return newDice
  }

  function rollDice() {
    // setDice(allNewDice())
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
       return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice)
    }
  }

  const diceElements = dice.map(die => 
    <Dice key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
  )

  function holdDice(id) {
    // console.log(id)
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} : die
    }))
  }

  return (
   
    <main> 

      {tenzies && <Confetti />}

      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className='dice--container'>
        {diceElements}
        {/* <Dice value="1"/>
        <Dice value="2"/>
        <Dice value="3"/>
        <Dice value="4"/>
        <Dice value="5"/>
        <Dice value="6"/>
        <Dice value="7"/>
        <Dice value="8"/>
        <Dice value="9"/>
        <Dice value="10"/> */}
        
      </div>
      <button
        className='roll--dice'
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
   
  );
}

export default App;
