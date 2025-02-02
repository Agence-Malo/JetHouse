"use client";

import Image from "next/image";
import Link from "next/link";

interface INewsCardProps {
    imageSrc: string;
    category: string;
    title: string;
    description: string;
    articleLink: string;
}

const NewsCard = ({
                      imageSrc,
                      category,
                      title,
                      description,
                      articleLink,
                  }: INewsCardProps) => {
    return (
        <article className="flex flex-row items-start gap-4">
            <div className="w-[120px] h-[120px] md:w-[230px] md:h-[230px] flex-shrink-0">
                <Image
                    src={imageSrc}
                    alt={title}
                    width={180}
                    height={180}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <div className="flex flex-col justify-start gap-3">
                <label className="uppercase text-xs 2xl:text-sm text-blue-950 font-light tracking-wider">
                    {category}
                </label>
                <h3 className="text-blue-950 text-lg 2xl:text-xl font-bold leading-tight max-w-[60ch]">
                    {title}
                </h3>
                <p className="text-blue-950 text-sm 2xl:text-md font-normal leading-relaxed max-w-[60ch]">
                    {description}
                </p>
                <Link
                    href={articleLink}
                    className="text-gray-400 underline uppercase underline-offset-4 text-sm font-medium hover:opacity-70 transition-opacity duration-200 ease-in-out"
                >
                    Read Article
                </Link>
            </div>
        </article>
    );
};

export default NewsCard;