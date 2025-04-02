import Confetti from "react-confetti"

export default function Header(props) {
    return (
        <header>
                {
                    props.isGameWon && 
                        <Confetti
                            recycle={true}
                            numberOfPieces={600}
                        />
                }
                <h1>LLM Plays Hangman</h1>
                <p>Watch deepseek-chat plays Hangman</p>
        </header>
    )
}