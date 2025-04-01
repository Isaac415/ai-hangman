import Confetti from "react-confetti"

export default function Header(props) {
    return (
        <header>
                {
                    props.isGameWon && 
                        <Confetti
                            recycle={false}
                            numberOfPieces={1000}
                        />
                }
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
        </header>
    )
}