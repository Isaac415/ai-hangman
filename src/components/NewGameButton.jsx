import { getRandomWord } from "../utils"

export default function NewGameButton(props) {
    function startNewGame() {
        props.setCurrentWord(getRandomWord())
        props.setGuessedLetters([])
        props.setGuessReason("")
    }
    return (
        <>
            {props.isGameOver && 
                <button
                    className="new-game"
                    onClick={startNewGame}
                >
                    New Game
                </button>
            }
        </>
    )
}