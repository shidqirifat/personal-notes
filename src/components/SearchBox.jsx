import React, { Component } from "react";

export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
        };
    }

    onSearchHandleEvent(event) {
        this.setState({
            keyword: event.target.value,
        });
        this.props.onSearch(event.target.value);
    }

    render() {
        return (
            <input
                style={{ width: "600px", margin: "0 auto" }}
                type="text"
                placeholder="Cari catatan..."
                onChange={(event) => this.onSearchHandleEvent(event)}
                value={this.state.keyword}
            />
        );
    }
}
