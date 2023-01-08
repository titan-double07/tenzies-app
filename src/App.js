import React from "react";
import Dice from "./Dice";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
    // STATE
    const [dieNum, setDieNum] = React.useState(() => allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    //Side Effects
    React.useEffect(() => {
        const allIsHeld = dieNum.every(die =>die.isHeld);
        const allSameValue = dieNum.every(die =>die.value===dieNum[0].value);
        if(allIsHeld&&allSameValue){
            setTenzies(true)
        }
    }, [dieNum])
    function generateNewDie() {
        return {
            id: nanoid(),
            value: Math.floor(Math.random() * 6) + 1,
            isHeld: false
        }
    }
    //   create array of number objects
    function allNewDice() {
        const numArr = []
        for (let i = 0; i < 10; i++) {
            numArr.push(generateNewDie())
        }
        return numArr

    }

    // rolls all new set of dice when clicked
    function roll() {
        return setDieNum((oldDie) => {
            return oldDie.map((die) => {
                if (!die.isHeld) {
                    return generateNewDie()
                } else {
                    return die
                }
            })
        })

    }

    //holds the die in place when clicked
    function hold(id) {
        setDieNum((prevDie) => {
            return prevDie.map((numObj) => {
                return id === numObj.id ? {
                    ...numObj,
                    isHeld: !numObj.isHeld
                } : numObj
            })

        })
    }
    // starts a new game
    function newGame() {
        setTenzies(false);
        setDieNum(allNewDice())
    }

    const dice = dieNum.map((numObj) => {
        return <Dice key={numObj.id} {...numObj} hold={hold} />
    });


    return (
        <div >
            {tenzies && <Confetti />} 
            <main className="container">
                <h2>Tenzies</h2>
                <br />

                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <br />
                <div className="dice-container">
                    {dice}
                </div>
                <button className="btn" onClick={!tenzies?roll:newGame}>{tenzies?'New Game': 'Roll'}</button>
            </main>

        </div>
    )
}