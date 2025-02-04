"use client";

import { useEffect, useState, useMemo } from "react";
import NewsCard from "./NewsCard";
import axios from "axios";

interface NewsListProps {
    selectedYear?: number | null;
    selectedMonth?: number | null;
}

interface NewsArticle {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    publicationDate: string;
    imageSrc: string;
}

const NewsList: React.FC<NewsListProps> = ({ selectedYear, selectedMonth }) => {
    const [visibleCount, setVisibleCount] = useState<number>(2);
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || "";

    const queryUrl = useMemo(() => {
        const params = new URLSearchParams();
        params.append("limit", visibleCount.toString());
        params.append("sort", "-publicationDate");

        if (selectedYear != null && selectedMonth != null) {
            const startDate = new Date(selectedYear, selectedMonth, 1).toISOString();
            const endDate = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59, 999).toISOString();
            params.append("where[publicationDate][greater_than_or_equal]", startDate);
            params.append("where[publicationDate][less_than_or_equal]", endDate);
        }

        return `${baseUrl}/api/news?${params.toString()}`;
    }, [baseUrl, visibleCount, selectedYear, selectedMonth]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(queryUrl, {
                    headers: { "Content-Type": "application/json" },
                });
                setNewsArticles(res.data.docs);
                setIsLoading(false);
            } catch (error: any) {
                setErrorMsg(error.message || "Failed to load news.");
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
            {newsArticles.map((item) => (
                <NewsCard
                    key={item.id}
                    imageSrc={item.imageSrc || "/placeholder.jpg"}
                    title={item.title}
                    description={item.excerpt}
                    publicationDate={item.publicationDate}
                    articleLink={`/news/${item.slug}`}
                />
            ))}

            {newsArticles.length > 0 && visibleCount < newsArticles.length && (
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
};

export default NewsList;