import Game from './components/Game.jsx'
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
      <main>
          <Game mode={"robot"} />
          <Analytics />
      </main>
  )
}