"use client";

import NewsCard from "./NewsCard";
import plane from "../../public/Images/About us/Hangar.png"

const mockNews = [
    {
        imageSrc: plane.src,
        category: "CATÉGORIE",
        title: "JetHouse will be expanding its fleet with the addition of a Challenger 605",
        description:
            "A year ago, JetHouse was just an idea. But behind the idea, there was already a team of passionate aviation experts, united by a clear vision: to offer a unique and personalized approach to private aircraft management.",
        articleLink: "/article/challenger-605",
    },
    {
        imageSrc: plane.src,
        category: "CATÉGORIE",
        title: "JetHouse was officially awarded its Air Operator Certificate (AOC)",
        description:
            "On Tuesday, February 27th, JetHouse was officially awarded its Air Operator Certificate by Transport Malta...",
        articleLink: "/article/aoc",
    },
];

const NewsList = () => {
    return (
        <section className="w-full flex flex-col gap-8">
            {mockNews.map((item, index) => (
                <NewsCard
                    key={index}
                    imageSrc={item.imageSrc}
                    category={item.category}
                    title={item.title}
                    description={item.description}
                    articleLink={item.articleLink}
                />
            ))}
            <div className="flex justify-center">
                <button className="border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-colors duration-200 ease-in-out px-6 py-2 text-sm uppercase font-light">
                    View More
                </button>
            </div>
        </section>
    );
};

export default NewsList;