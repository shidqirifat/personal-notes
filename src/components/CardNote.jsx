import React from "react";
import { showFormattedDate } from "../utils";
import Box from "./Box";
import MenuCardNote from "./MenuCardNote";
import Text from "./Text";

export default function CardNote({
    title,
    body,
    createdAt,
    archived,
    id,
    idMenuActive,
    onOpenDetail,
    onOpenMenu,
    onDelete,
    onArchive,
}) {
    return (
        <Box
            onClick={() => onOpenDetail(id)}
            style={{
                padding: "12px",
                gap: "8px",
                position: "relative",
                cursor: "pointer",
            }}
        >
            {idMenuActive === id && (
                <MenuCardNote
                    onDelete={onDelete}
                    onArchive={onArchive}
                    id={id}
                />
            )}
            <div className="wrap-note">
                <Text style={{ marginBottom: 0 }} type="title-note">
                    {title}
                </Text>
                <img
                    onClick={(e) => onOpenMenu(e, id)}
                    src="assets/menu-three-dot.png"
                    alt="Menu"
                />
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
        </Box>
    );
}
