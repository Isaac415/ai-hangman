import { clsx } from "clsx"

export default function LetterDisplay(props) {
    const letterElements = props.currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = props.isGameLost || props.guessedLetters.includes(letter)
        const letterClassName = clsx(
            props.isGameLost && !props.guessedLetters.includes(letter) && "missed-letter"
        )
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })

    return (
        <section className="word">
            {letterElements}  
        </section>
    )
}