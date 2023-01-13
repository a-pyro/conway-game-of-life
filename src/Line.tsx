import Cell from './Cell'

interface LineProps {
  row: boolean[]
  gridSize: number
}

export default function Line({ row, gridSize }: LineProps) {
  const cells: ReturnType<typeof Cell>[] = []

  for (let index = 0; index < gridSize; index++) {
    const state = row?.[index]
    cells.push(<Cell key={`cell${index}`} state={state} />)
  }

  return <div>{cells}</div>
}
