import React, { Component } from "react"
import BoardProps from "../Interfaces/BoardProps";
import { BoardState, CellState, Column, Row } from "../Interfaces/BoardState";
import Cell from "./Cell";
import "./Board.css"

class Board extends Component<BoardProps, BoardState>
{
    static defaultProps: BoardProps = {
        nColumns: 9,
        nRows: 9
    }

    constructor(props: BoardProps) {
        super(props);
        const startState: CellState[][] = Array(props.nRows).fill(Array(props.nColumns).fill(undefined));
        this.state = {
            gameState: startState.map((row, rowNumber) => {
                return row.map((col, colNumber): CellState => {
                    return {
                        isOn: Math.random() > 0.5,
                        id: `${rowNumber}_${colNumber}`
                    };
                });
            }),
            won: false
        }
    }

    onCellClick = (id: string) => {
        const data: string[] = id.split("_"),
            nRow: number = parseInt(data[0]),
            nCol: number = parseInt(data[1]);

        const newState = this.state.gameState.slice();
        
        newState[nRow][nCol].isOn = !newState[nRow][nCol].isOn;
        if(nRow - 1 >= 0) newState[nRow-1][nCol].isOn = !newState[nRow-1][nCol].isOn;
        if(nCol - 1 >= 0) newState[nRow][nCol-1].isOn = !newState[nRow][nCol-1].isOn;
        if(nRow + 1 < this.props.nRows) newState[nRow+1][nCol].isOn = !newState[nRow+1][nCol].isOn;
        if(nCol + 1 < this.props.nColumns) newState[nRow][nCol+1].isOn = !newState[nRow][nCol+1].isOn;

        this.setState({
            gameState: newState,
            won: newState.every(x => x.every(y => !y.isOn))
        })
    }

    render() {
        const { nRows, nColumns } = this.props;
        let board: Row[] = [];
        for(let i = 0; i < nRows; i++)
        {
            const row = {
                nRow: i,
                column: Array<Column>(nColumns)
            }

            for(let j = 0; j < nColumns; j++)
            {
                row.column[j] = {
                    isOn: this.state.gameState[i][j].isOn,
                    nCol: j
                }
            }

            board.push(row);
        }

        return (
            <div className="Board">
                <div className="Board-title">
                    <div className="neon-orange">LIGHTS</div>
                    <div className="neon-blue">OUT</div>
                </div>
                {
                    this.state.won 
                        ? <div className="Board-neonText-container">
                            <h1 className="Board-neonText">You Won!</h1>
                         </div>
                        : <div className="Board-game">
                            { 
                                board.map(row => {
                                    return (
                                        <div className="row" key={row.nRow}>
                                            {row.column.map(col => {
                                                const id = `${row.nRow}_${col.nCol}`;
                                                return (
                                                    <Cell onCellClick={this.onCellClick} isOn={col.isOn} id={id} key={id}/>
                                                );
                                            })}
                                        </div>
                                    )
                                })
                            }  
                                
                        </div>                
                }
                
            </div>
        );
    }
}

export default Board;