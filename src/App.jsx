import { useState } from "react"
import { languages } from "./languages"
import { getRandomWord } from "./utils"
import Header from "./components/Header"
import GameStatus from "./components/GameStatus"
import LanguageChips from "./components/LanguageChips"
import LetterDisplay  from "./components/LetterDisplay"
import Keyboard from "./components/Keyboard"
import NewGameButton from "./components/NewGameButton"


export default function AssemblyEndgame() {
    // State values
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])

    // Derived values
    const numGuessesLeft = languages.length - 1
    const wrongGuessCount =
        guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const isGameWon =
        currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= numGuessesLeft
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    return (
        <main>
            <Header 
                isGameWon={isGameWon} 
            />

            <GameStatus 
                isGameOver={isGameOver}
                isLastGuessIncorrect={isLastGuessIncorrect}
                wrongGuessCount={wrongGuessCount}
                isGameWon={isGameWon}
                isGameLost={isGameLost}
            />

            <LanguageChips 
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

            <NewGameButton
                isGameOver={isGameOver}
                setCurrentWord={setCurrentWord}
                setGuessedLetters={setGuessedLetters}
            />
        </main>
    )
  }