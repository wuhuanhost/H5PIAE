import React, { Component } from "react";

class DragGrid extends Component {
    render() {
        const itemStyle = {
            display: "block",
            width: "100%",
            height: "100%",
            border: "1px solid #eee"
        };

        return (
            <div style={itemStyle} className="gridItem">
                <span className="name">{this.props.item.name}</span>
            </div>
        );
    }
}

export default DragGrid;
