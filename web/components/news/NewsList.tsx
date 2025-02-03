"use client";

import { useState, useMemo } from "react";
import NewsCard from "./NewsCard";
import { newsData } from "@/data/newsData";

interface NewsListProps {
    selectedYear?: number | null;
    selectedMonth?: number | null;
}

const NewsList: React.FC<NewsListProps> = ({ selectedYear, selectedMonth }) => {
    const [visibleCount, setVisibleCount] = useState(2);

    const filteredNews = useMemo(() => {
        let result = [...newsData];

        if (
            selectedYear !== null &&
            selectedMonth !== null &&
            selectedYear !== undefined &&
            selectedMonth !== undefined
        ) {
            result = result.filter((item) => {
                const dateObj = new Date(item.publicationDate);
                const year = dateObj.getFullYear();
                const month = dateObj.getMonth(); // 0-based
                return year === selectedYear && month === selectedMonth;
            });
        }

        return result;
    }, [selectedYear, selectedMonth]);

    const displayedNews = filteredNews.slice(0, visibleCount);

    const loadMoreNews = () => {
        setVisibleCount((prev) => prev + 2);
    };

    return (
        <section className="w-full flex flex-col gap-8">
            {displayedNews.map((item) => (
                <NewsCard
                    key={item.id}
                    imageSrc={item.imageSrc}
                    title={item.title}
                    description={item.excerpt}
                    publicationDate={item.publicationDate}
                    articleLink={`/news/${item.slug}`}
                />
            ))}

            {visibleCount < filteredNews.length && (
                <div className="flex justify-center">
                    <button
                        onClick={loadMoreNews}
                        className="border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-colors duration-200 ease-in-out px-6 py-2 text-sm uppercase font-light"
                    >
                        View More
                    </button>
                </div>
            )}

            {filteredNews.length === 0 && (
                <p className="text-center text-gray-500">No news found for this month.</p>
            )}
        </section>
    );
};

export default NewsList;