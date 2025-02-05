"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import placeholder from "../../public/Images/About us/malta.png";

interface NewsListProps {
    selectedYear?: number | null;
    selectedMonth?: number | null;
}

interface NewsDoc {
    id: number;
    slug: string;
    title: string;
    excerpt?: string;
    image?: {
        url?: string;
        alt?: string;
        width?: number;
        height?: number;
    };
    category?: {
        id: number;
        name: string;
        slug: string;
    } | null;
}

interface PayloadResponse {
    docs: NewsDoc[];
    totalDocs: number;
}

export default function NewsList({ selectedYear, selectedMonth }: NewsListProps) {
    const [visibleCount, setVisibleCount] = useState(2);
    const [newsArticles, setNewsArticles] = useState<NewsDoc[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || "";

    const queryUrl = useMemo(() => {
        const params = new URLSearchParams();
        params.append("limit", String(visibleCount));
        params.append("sort", "-date");
        params.append("depth", "1");

        if (selectedYear != null && selectedMonth != null) {
            const startDate = new Date(selectedYear, selectedMonth, 1).toISOString();
            const endDate = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59, 999).toISOString();
            params.append("where[date][greater_than_or_equal]", startDate);
            params.append("where[date][less_than_or_equal]", endDate);
        }

        return `${baseUrl}/api/news?${params.toString()}`;
    }, [baseUrl, visibleCount, selectedYear, selectedMonth]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true);
                setErrorMsg("");

                const res = await axios.get<PayloadResponse>(queryUrl, {
                    headers: { "Content-Type": "application/json" },
                });

                setNewsArticles(res.data.docs);
            } catch (error: any) {
                setErrorMsg(error.message || "Failed to load news.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [queryUrl]);

    const loadMoreNews = () => {
        setVisibleCount((prev) => prev + 2);
    };

    if (isLoading) {
        return <p className="text-center">Loading news...</p>;
    }

    if (errorMsg) {
        return <p className="text-center text-red-500">{errorMsg}</p>;
    }

    return (
        <section className="w-full flex flex-col gap-8">
            {newsArticles.map((item) => {
                const imageSrc = item.image?.url
                    ? `${baseUrl}${item.image.url}`
                    : placeholder;

                return (
                    <NewsCard
                        key={item.id}
                        imageSrc={imageSrc}
                        category={item.category?.name || ""}
                        title={item.title}
                        description={item.excerpt || ""}
                        articleLink={`/news/${item.slug}`}
                    />
                );
            })}

            {newsArticles.length > 0 && (
                <div className="flex justify-center">
                    <button
                        onClick={loadMoreNews}
                        className="border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-colors duration-200 ease-in-out px-6 py-2 text-sm uppercase font-light"
                    >
                        View More
                    </button>
                </div>
            )}

            {newsArticles.length === 0 && (
                <p className="text-center text-gray-500">No news found for this month.</p>
            )}
        </section>
    );
}