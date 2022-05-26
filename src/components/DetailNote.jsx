import React from "react";
import { showFormattedDate } from "../utils";
import ButtonAction from "./ButtonAction";
import Text from "./Text";

export default function DetailNote({
    handleOpenDetailNote,
    title,
    createdAt,
    body,
    archived,
}) {
    return (
        <>
            <div
                className="shadow-overlay"
                onClick={() => handleOpenDetailNote(null)}
            />
            <div className="new-note-wrapper detail-note-wrapper">
                <div className="detail-note">
                    <div className="wrap-note">
                        <Text style={{ marginBottom: 0 }} type="title-note">
                            {title}
                        </Text>
                    </div>

                    <div className="wrap-note label-archived">
                        <Text
                            style={{ marginBottom: 0, fontWeight: 400 }}
                            type="text-date"
                        >
                            {showFormattedDate(createdAt)}
                        </Text>
                        {archived && (
                            <Text
                                style={{
                                    marginBottom: 0,
                                    color: "#fff",
                                    background: "green",
                                    padding: "4px 6px",
                                    borderRadius: "2px",
                                    fontWeight: 700,
                                }}
                                type="text-date"
                            >
                                Archived
                            </Text>
                        )}
                    </div>
                    <Text type="paragraph">{body}</Text>
                </div>
                <ButtonAction
                    style={{ width: "max-content" }}
                    onClick={() => handleOpenDetailNote(null)}
                >
                    Close
                </ButtonAction>
            </div>
        </>
    );
}
