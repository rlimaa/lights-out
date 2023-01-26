import React, { Component } from "react"
import CellProps from "../Interfaces/CellProps";
import "./Cell.css"

class Cell extends Component<CellProps, {}>
{
    static defaultProps = {
        isOn: false
    };

    handleCellClick = () => {
        this.props.onCellClick(this.props.id);
    };

    render() {
        const cellStyle = {
            width: "70px",
            height: "70px",

        };
        return (<div style={cellStyle} onClick={this.handleCellClick} className={"Cell " + (this.props.isOn ? "Cell-on" : "Cell-off")}></div>);
    }
}

export default Cell;