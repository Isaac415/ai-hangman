import { generateGrid } from "../utils"

export default function Hangman(props) {
    const grid = generateGrid(props.wrongGuessCount)
    return (
        <div className="hangman-grid">
          {grid.map((row, y) =>
            row.map((cell, x) => (
              <div key={`${x}-${y}`} className="cell">
                {cell}
              </div>
            ))
          )}
        </div>
      )
}