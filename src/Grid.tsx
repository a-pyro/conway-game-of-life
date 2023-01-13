import { useEffect, useState } from 'react'
import Line from './Line'
import { popolazioneDiPartenza, prossimaGenerazione } from './utils'

export type Population = boolean[][]
interface GridProps {
  gridSize: number
}

export default function Grid({ gridSize }: GridProps) {
  const [population, setPopulation] = useState<Population>(() =>
    popolazioneDiPartenza(gridSize)
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPopulation((p) => prossimaGenerazione(p))
    }, 500)
    return () => clearInterval(intervalId)
  }, [])

  const lines: ReturnType<typeof Line>[] = []

  for (let index = 0; index < gridSize; index++) {
    const row = population[index]
    lines.push(<Line key={`line${index}`} gridSize={gridSize} row={row} />)
  }

  return <div className='flex'>{lines}</div>
}
