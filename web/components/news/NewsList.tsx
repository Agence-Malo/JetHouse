"use client";

import { useState } from "react";
import NewsCard from "./NewsCard";
import { newsData } from "@/data/newsData";

const NewsList = () => {
    const [visibleCount, setVisibleCount] = useState(2);

    const loadMoreNews = () => {
        setVisibleCount((prev) => prev + 2);
    };

    const displayedNews = newsData.slice(0, visibleCount);

    return (
        <section className="w-full flex flex-col gap-8">
            {displayedNews.map((item, index) => (
                <NewsCard
                    key={item.id}
                    imageSrc={item.imageSrc}
                    category=""
                    title={item.title}
                    description={item.excerpt}
                    articleLink={`/news/${item.slug}`}
                />
            ))}

            {visibleCount < newsData.length && (
                <div className="flex justify-center">
                    <button
                        onClick={loadMoreNews}
                        className="border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-colors duration-200 ease-in-out px-6 py-2 text-sm uppercase font-light"
                    >
                        View More
                    </button>
                </div>
            )}
        </section>
    );
};

export default NewsList;