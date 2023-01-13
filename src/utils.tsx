import { Population } from './Grid'

function isInsideGrid(x: number, y: number, grid: Population): boolean {
  // this function check if the x, y coordinates are inside the grid
  // x is the row of the cell
  // y is the column of the cell
  // grid is the current state of the cells
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length
}

function isAliveNeighbor(x: number, y: number, grid: Population): boolean {
  // this function check if the cell represented by x, y coordinates is inside the grid and is alive
  // x is the row of the cell
  // y is the column of the cell
  // grid is the current state of the cells
  return isInsideGrid(x, y, grid) && grid[x][y]
}

export function prossimaGenerazione(
  popolazioneCorrent: Population
): Population {
  // Creiamo una nuova griglia con le stesse dimensioni della griglia corrente e inizializziamo tutte le celle come morte
  const nuovaGriglia: Population = new Array(popolazioneCorrent.length)
    .fill(0)
    .map(() => new Array(popolazioneCorrent[0].length).fill(false))

  // Iteriamo attraverso ogni cella della griglia corrente
  for (let riga = 0; riga < popolazioneCorrent.length; riga++) {
    for (
      let colonna = 0;
      colonna < popolazioneCorrent[riga].length;
      colonna++
    ) {
      // Contiamo il numero di celle vicine vive
      let celleVicineVive = 0
      // Controlliamo le 8 celle intorno alla cella corrente
      for (let rigaVicina = -1; rigaVicina <= 1; rigaVicina++) {
        for (let colonnaVicina = -1; colonnaVicina <= 1; colonnaVicina++) {
          // Saltiamo la cella corrente
          if (rigaVicina === 0 && colonnaVicina === 0) continue
          // Verifichiamo se la cella vicina è all'interno dei confini della griglia e se è viva
          if (
            isAliveNeighbor(
              riga + rigaVicina,
              colonna + colonnaVicina,
              popolazioneCorrent
            )
          ) {
            celleVicineVive++
          }
        }
      }

      // Appliciamo le regole del gioco della vita per determinare lo stato della cella nella nuova generazione
      if (popolazioneCorrent[riga][colonna]) {
        // Se la cella corrente è viva
        nuovaGriglia[riga][colonna] =
          celleVicineVive === 2 || celleVicineVive === 3 // deve sopravvivere se ha 2 o 3 celle vicine vive
      } else {
        // Se la cella corrente è morta
        nuovaGriglia[riga][colonna] = celleVicineVive === 3 // deve rivivere se ha esattamente 3 celle vicine vive
      }
    }
  }
  // Restituiamo la nuova griglia
  return nuovaGriglia
}

export function popolazioneDiPartenza(gridSize: number): Population {
  const pop: Population = []
  for (let index = 0; index < gridSize; index++) {
    const line = new Array(gridSize).fill(Math.random() < 0.5)
    pop.push(line)
  }
  return pop
}
