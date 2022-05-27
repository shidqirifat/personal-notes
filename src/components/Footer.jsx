import React from "react";
import LinkExternal from "./LinkExternal";
import Text from "./Text";

export default function Footer() {
    return (
        <div className="footer-container">
            <Text type="paragraph" style={{ textAlign: "center" }}>
                &copy; Create by{" "}
                <LinkExternal link="https://shidqirifat-portofolio.vercel.app/">
                    Shidqi Rifat Pangestu
                </LinkExternal>
            </Text>
            <Text type="text-date" style={{ textAlign: "center" }}>
                Assets by{" "}
                <LinkExternal link="https://icons8.com/">
                    cons8.com
                </LinkExternal>
            </Text>
        </div>
    );
}
