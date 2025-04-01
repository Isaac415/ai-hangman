import { languages } from "../languages"
import { getFarewellText } from "../utils"
import { clsx } from "clsx"

export default function GameStatus(props) {
    const gameStatusClass = clsx("game-status", {
        won: props.isGameWon,
        lost: props.isGameLost,
        farewell: !props.isGameOver && props.isLastGuessIncorrect
    })

    function renderGameStatus() {
        if (!props.isGameOver && props.isLastGuessIncorrect) {
            return (
                <p className="farewell-message">
                    {getFarewellText(languages[props.wrongGuessCount - 1].name)}
                </p>
            )
        }

        if (props.isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        }
        if (props.isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }

        return null
    }

    return (
        <section className={gameStatusClass}>
            {renderGameStatus()}
        </section>
    )
}