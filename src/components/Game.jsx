import { useState, useEffect } from "react"
import { getRandomWord, getNextGuess } from "../utils"
import clsx from "clsx"

import Header from "./Header"
import LetterDisplay  from "./LetterDisplay"
import Keyboard from "./Keyboard"
import NewGameButton from "./NewGameButton"
import Hangman from "./Hangman"
import RobotThoughts from "./RobotThoughts"


export default function Game(props) {
    // State values
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])
    const [guessReason, setGuessReason] = useState("")

    // Derived values
    const numGuessesLeft = 7
    const wrongGuessCount =
        guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const isGameWon =
        currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= numGuessesLeft
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    useEffect(() => {
        if (props.mode !== "robot" || isGameOver) return;
        
        async function fetchNextGuess() {
            let llmResponse = await getNextGuess(currentWord, guessedLetters)
            let nextGuess = llmResponse.guess
            setGuessReason(llmResponse.reason)
            setGuessedLetters(prevLetters =>
                prevLetters.includes(nextGuess)?
                    prevLetters :
                    [...prevLetters, nextGuess]
            )
        }
        
        fetchNextGuess()
    }, [guessedLetters, props.mode, currentWord, isGameOver])

    return (
        <section>
            <section className={clsx({ 'disabled': props.mode === 'robot' }, 'game')}>
            <Header 
                isGameWon={isGameWon} 
                languageModel={"deepseek-chat"}
            />

            <Hangman 
                wrongGuessCount={wrongGuessCount} 
            />

            <LetterDisplay 
                currentWord={currentWord}
                isGameLost={isGameLost}
                guessedLetters={guessedLetters}
            />

            <Keyboard 
                guessedLetters={guessedLetters}
                currentWord={currentWord}
                isGameOver={isGameOver}
                setGuessedLetters={setGuessedLetters}
            />

            <RobotThoughts
                guessReason={guessReason}
            />
            </section>

            <NewGameButton
                isGameOver={isGameOver}
                setCurrentWord={setCurrentWord}
                setGuessedLetters={setGuessedLetters}
                setGuessReason={setGuessReason}
            />
        </section>
    )
  }