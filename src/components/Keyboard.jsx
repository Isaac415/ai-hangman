import { clsx } from "clsx"

export default function Keyboard(props) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = props.guessedLetters.includes(letter)
        const isCorrect = isGuessed && props.currentWord.includes(letter)
        const isWrong = isGuessed && !props.currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        return (
            <button
                className={className}
                key={letter}
                disabled={props.isGameOver}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    function addGuessedLetter(letter) {
        props.setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }
    
    return (
        <section className="keyboard">
            {keyboardElements}
        </section>
    )
}