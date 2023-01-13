interface CellProps {
  state: boolean
}

export default function Cell({ state }: CellProps) {
  // const stateClass = state === undefined ? "empty" : state ? "alive" : "dead";
  const stateClass = state ? 'alive' : 'dead'
  return <div className={`cell ${stateClass}`}></div>
}
