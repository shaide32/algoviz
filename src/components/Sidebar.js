import React, { Component } from "react";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: true
        }
    }
    render() {
        return(
            <div className="sidebar">
                <span>Company Logo</span>
                <h2>BubbleSort</h2>
            </div>
        );
    }
}

export default Sidebar;