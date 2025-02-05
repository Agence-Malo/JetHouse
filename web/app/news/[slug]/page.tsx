"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Navbar } from "@/components/nav";
import Footer from "@/components/footer";

interface NewsArticle {
    id: number;
    slug: string;
    title: string;
    publicationDate: string;
    imageSrc: string;
    fullContent: string;
}

interface NewsResponse {
    docs: NewsArticle[];
}

const SingleArticlePage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [otherArticles, setOtherArticles] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || "";

    useEffect(() => {
        if (!slug) return;

        const fetchArticleData = async () => {
            try {
                const articleRes = await axios.get<NewsResponse>(`${baseUrl}/api/news`, {
                    params: {
                        "where[slug][equals]": slug,
                        depth: 1,
                        "select[id]": true,
                        "select[slug]": true,
                        "select[title]": true,
                        "select[publicationDate]": true,
                        "select[imageSrc]": true,
                        "select[fullContent]": true,
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
                        "where[slug][not_equals]": slug,
                        limit: 3,
                        depth: 1,
                        "select[id]": true,
                        "select[slug]": true,
                        "select[title]": true,
                        "select[publicationDate]": true,
                        "select[imageSrc]": true,
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
    }, [slug, baseUrl]);

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

    // Форматуємо дату публікації
    const dateObj = new Date(article!.publicationDate);
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    const formattedDate = dateObj.toLocaleString("en-US", options).toUpperCase();

    return (
        <main className="w-full flex flex-col items-center">
            <Navbar invert={-20} />

            <div className="w-full max-w-[1200px] py-32 px-4">
                <div className="mb-2 text-xs tracking-wider text-blue-950 uppercase">
                    {formattedDate}
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-blue-950 mb-6">
                    {article!.title}
                </h1>

                <div className="relative w-full h-[350px] md:h-[500px] mb-10">
                    <Image
                        src={article!.imageSrc}
                        alt={article!.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                <div className="max-w-3xl mx-auto text-blue-950 text-base md:text-lg leading-relaxed space-y-4">
                    {article!.fullContent}
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
                    {otherArticles.map((item) => (
                        <div key={item.id} className="flex flex-col">
                            <div className="relative w-full h-[200px] md:h-[250px]">
                                <Image
                                    src={item.imageSrc}
                                    alt={item.title}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <h3 className="text-blue-950 font-semibold text-md md:text-lg mt-3">
                                {item.title}
                            </h3>
                            <Link
                                href={`/news/${item.slug}`}
                                className="text-blue-950 underline text-sm mt-2 hover:opacity-70 w-fit"
                            >
                                Read Article
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default SingleArticlePage;