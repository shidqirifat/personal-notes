import React from "react";

export default function SearchBox({ keyword, onSearch }) {
    return (
        <input
            style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}
            type="text"
            placeholder="Cari catatan..."
            onChange={(event) => onSearch(event)}
            value={keyword}
        />
    );
}
