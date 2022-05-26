import React from "react";

export default function ButtonAction({
    type,
    title,
    description,
    onClick,
    style,
    children,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            style={style}
            disabled={type === "submit" && (title === "" || description === "")}
            className="button-submit"
        >
            {children}
        </button>
    );
}
