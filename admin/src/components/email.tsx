import {Body, Button, Font, Head, Html, Img, Link,} from "@react-email/components";
import * as React from "react";

const Email = (data: { name: string, email: string, tel: string, message: string }) => (
    <Html>
        <Head>
            <Font
                fontFamily={"Inter"}
                fallbackFontFamily={"sans-serif"}
                webFont={{
                    url: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
                    format: "woff2",
                }}
                fontStyle={"normal"}
            />
        </Head>
        <Body>
            <table
                style={{
                    width: "100%",
                    height: "90vh",
                    textAlign: "center",
                }}
            >
                <tbody>
                <tr>
                    <td>
                        <table
                            style={{
                                width: "512px",
                                backgroundColor: "white",
                                border: "1px solid #d4d4d4",
                                borderRadius: "10px",
                                padding: "20px",
                                textAlign: "left",
                                margin: "0 auto",
                            }}
                        >
                            <tbody>
                            <tr>
                                <td
                                    style={{
                                        width: "100%",
                                        paddingBottom: "20px",
                                    }}
                                >
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td
                                                style={{
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                <Img
                                                    src="https://www.g-yachts.com/images/user.png"
                                                    alt="User Icon"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        fill: "grey",
                                                        marginLeft: "20px",
                                                        marginRight: "20px",
                                                    }}
                                                />
                                            </td>
                                            <td
                                                style={{
                                                    width: "100%",
                                                }}
                                            >
                                                <div>
                                                    <h1
                                                        style={{
                                                            fontWeight: "600",
                                                            fontSize: "18px",
                                                            lineHeight: "28px",
                                                            margin: "0",
                                                        }}
                                                    >
                                                        New Message from {data.name}
                                                    </h1>
                                                    <Link
                                                        href={`mailto:${data.email}`}
                                                        style={{
                                                            fontWeight: "400",
                                                            fontSize: "14px",
                                                            lineHeight: "20px",
                                                            margin: "0",
                                                        }}
                                                    >
                                                        {data.email}
                                                    </Link>
                                                    {data.tel && (
                                                        <span style={{
                                                            fontWeight: "400",
                                                            color: "grey",
                                                            fontSize: "14px",
                                                            lineHeight: "20px",
                                                            margin: "0",
                                                        }}> – <Link href={`tel:${data.tel}`} style={{
                                                            fontWeight: "400",
                                                            fontSize: "14px",
                                                            lineHeight: "20px",
                                                            margin: "0",
                                                        }}>{data.tel}</Link></span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        width: "100%",
                                        paddingTop: "20px",
                                        paddingBottom: "20px",
                                    }}
                                >
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <p
                                                    style={{
                                                        fontWeight: "400",
                                                        fontSize: "14px",
                                                        lineHeight: "20px",
                                                        margin: "0",
                                                    }}
                                                >
                                                    {data.message}
                                                </p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        width: "100%",
                                        paddingTop: "20px",
                                    }}
                                >
                                    <table
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        <tbody>
                                        <tr>
                                            <td>
                                                <Button
                                                    href={`mailto:${data.email}`}
                                                    style={{
                                                        width: "100%",
                                                        backgroundColor: "#0a0a0a",
                                                        color: "white",
                                                        fontWeight: "600",
                                                        borderRadius: "8px",
                                                        textAlign: "center",
                                                        border: "none",
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            fontWeight: "500",
                                                            fontSize: "16px",
                                                            lineHeight: "16px",
                                                        }}
                                                    >
                                                        Message {data.name}
                                                    </p>
                                                </Button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </Body>
    </Html>
);

export default Email;