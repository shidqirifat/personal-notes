import React from "react";
import SearchBox from "./SearchBox";
import Text from "./Text";

export default function Header({ onSearchHandleEvent }) {
    return (
        <div className="header-wrapper">
            <Text type="title-page">Personal Notes</Text>
            <SearchBox onSearch={onSearchHandleEvent} />
        </div>
    );
}
