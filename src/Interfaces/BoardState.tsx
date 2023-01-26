declare interface BoardState {
    gameState: CellState[][]
    won: boolean
}

declare interface CellState {
    id: string,
    isOn: boolean
}

declare interface Row {
    nRow: number,
    column: Column[]
}

declare interface Column {

    isOn: boolean,
    nCol: number
}



export type {BoardState, CellState, Row, Column};