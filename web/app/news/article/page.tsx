"use client";

import {JSX, useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Navbar } from "@/components/nav";
import Footer from "@/components/footer";
import placeholder from "@/public/Images/About us/malta.png";

interface NewsArticle {
    id: number;
    title: string;
    createdAt: string;
    image?: {
        url?: string;
        alt?: string;
    };
    fullContent?: any;
    category?: {
        name: string;
    };
}

interface NewsResponse {
    docs: NewsArticle[];
}

// Функція для рендерингу RichText контенту
const renderLexicalContent = (content: any): JSX.Element | null => {
    if (!content || !content.root || !content.root.children) {
        return <p className="text-gray-500">No content available.</p>;
    }

    const renderNode = (node: any, index: number): JSX.Element | null => {
        if (!node) return null;

        switch (node.type) {
            case "heading":
                return <h1 key={index} className="text-3xl font-bold my-4">{node.children?.map(renderLeaf)}</h1>;
            case "paragraph":
                return <p key={index} className="mb-4">{node.children?.map(renderLeaf)}</p>;
            case "blockquote":
                return (
                    <blockquote key={index} className="border-l-4 border-gray-400 pl-4 italic my-4">
                        {node.children?.map(renderLeaf)}
                    </blockquote>
                );
            case "ul":
                return <ul key={index} className="list-disc ml-6">{node.children?.map(renderNode)}</ul>;
            case "ol":
                return <ol key={index} className="list-decimal ml-6">{node.children?.map(renderNode)}</ol>;
            case "li":
                return <li key={index}>{node.children?.map(renderLeaf)}</li>;
            case "link":
                return (
                    <a
                        key={index}
                        className="underline text-blue-600 hover:text-blue-800"
                        href={node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {node.children?.map(renderLeaf)}
                    </a>
                );
            case "upload":
                return (
                    <Image
                        key={index}
                        src={encodeURI(node.value.url)}
                        alt={node.value.alt || ""}
                        width={800}
                        height={400}
                        className="w-full object-cover my-4 rounded-lg"
                    />
                );
            default:
                return null;
        }
    };

    const renderLeaf = (leaf: any, index?: number) => {
        if (!leaf.text) return null;
        return (
            <span
                key={index}
                className={`${leaf.bold ? "font-bold" : ""} ${leaf.italic ? "italic" : ""} ${
                    leaf.underline ? "underline" : ""
                } ${leaf.strikethrough ? "line-through" : ""}`}
            >
                {leaf.text}
            </span>
        );
    };

    return <div>{content.root.children.map(renderNode)}</div>;
};

const SingleArticlePage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [otherArticles, setOtherArticles] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || "";

    useEffect(() => {
        if (!id) return;

        const fetchArticleData = async () => {
            try {
                setIsLoading(true);
                setErrorMsg("");

                const articleRes = await axios.get<NewsResponse>(`${baseUrl}/api/news`, {
                    params: {
                        "where[id][equals]": id,
                        depth: 1,
                        "select[title]": true,
                        "select[createdAt]": true,
                        "select[image]": true,
                        "select[fullContent]": true,
                        "select[category.name]": true,
                    },
                    headers: { "Content-Type": "application/json" },
                });

                if (articleRes.data.docs.length === 0) {
                    setErrorMsg("Article not found.");
                    return;
                }

                setArticle(articleRes.data.docs[0]);

                const otherRes = await axios.get<NewsResponse>(`${baseUrl}/api/news`, {
                    params: {
                        "where[id][not_equals]": id,
                        limit: 3,
                        depth: 1,
                        "select[id]": true,
                        "select[title]": true,
                        "select[createdAt]": true,
                        "select[image]": true,
                    },
                    headers: { "Content-Type": "application/json" },
                });

                setOtherArticles(otherRes.data.docs);
            } catch (error: any) {
                setErrorMsg(error.message || "Failed to load article.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticleData();
    }, [id, baseUrl]);

    if (isLoading) {
        return (
            <main className="w-full flex flex-col items-center">
                <Navbar invert={-20} />
                <p className="text-center mt-32">Loading article...</p>
                <Footer />
            </main>
        );
    }

    if (errorMsg) {
        return (
            <main className="w-full flex flex-col items-center">
                <Navbar invert={-20} />
                <p className="text-center mt-32 text-red-500">{errorMsg}</p>
                <Footer />
            </main>
        );
    }

    return (
        <main className="w-full flex flex-col items-center">
            <Navbar invert={-20} />

            <div className="w-full max-w-[1200px] py-36 px-4">
                {article?.category?.name && (
                    <div className="mb-2 text-xs tracking-wider text-blue-950 uppercase">
                        {article.category.name}
                    </div>
                )}

                <h1 className="text-3xl md:text-5xl font-bold text-blue-950 mb-6">
                    {article?.title}
                </h1>

                <div className="mb-4 text-sm text-gray-600 uppercase">
                    {article?.createdAt
                        ? new Date(article.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        }).toUpperCase()
                        : "DATE UNKNOWN"}
                </div>

                <div className="relative w-full h-[350px] md:h-[500px] mb-10">
                    <Image
                        src={article?.image?.url ? `${baseUrl}${article.image.url}` : placeholder}
                        alt={article?.image?.alt || "News Image"}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                <div className="max-w-3xl mx-auto text-blue-950 text-base md:text-lg leading-relaxed space-y-4">
                    {article?.fullContent && typeof article.fullContent === "object"
                        ? renderLexicalContent(article.fullContent)
                        : "No content available."}
                </div>
            </div>

            <section className="w-full max-w-[1200px] px-4 pb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-blue-950">More Articles</h2>
                    <Link
                        href="/news"
                        className="border border-blue-950 text-blue-950 px-6 py-2 text-sm uppercase font-light hover:bg-blue-950 hover:text-white transition-colors duration-200"
                    >
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {otherArticles.map((item) => {
                        const otherImageSrc =
                            item.image?.url && item.image.url.startsWith("http")
                                ? item.image.url
                                : item.image?.url
                                    ? `${baseUrl}${item.image.url}`
                                    : placeholder;

                        return (
                            <div key={item.id} className="flex flex-col">
                                <div className="relative w-full h-[200px] md:h-[250px]">
                                    <Image
                                        src={otherImageSrc}
                                        alt={item.image?.alt || "News Image"}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <h3 className="text-blue-950 font-semibold text-md md:text-lg mt-3">
                                    {item.title}
                                </h3>
                                <Link
                                    href={`/news/${item.id}`}
                                    className="text-blue-950 underline text-sm mt-2 hover:opacity-70 w-fit"
                                >
                                    Read Article
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default SingleArticlePage;