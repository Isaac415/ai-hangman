import { getRandomWord } from "../utils"

export default function NewGameButton(props) {
    function startNewGame() {
        props.setCurrentWord(getRandomWord())
        props.setGuessedLetters([])
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