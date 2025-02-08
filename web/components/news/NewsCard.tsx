"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface INewsCardProps {
    imageSrc: string | StaticImageData;
    category?: string;
    title: string;
    description: string;
    articleLink: string;
}

export default function NewsCard({
                                     imageSrc,
                                     category,
                                     title,
                                     description,
                                     articleLink,
                                 }: INewsCardProps) {
    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || "";
    const finalImageSrc =
        typeof imageSrc === "string"
            ? imageSrc.startsWith("http")
                ? imageSrc
                : `${baseUrl}${imageSrc}`
            : imageSrc;

    return (
        <article className="flex flex-row items-start gap-4">
            <div className="w-[120px] h-[120px] md:w-[230px] md:h-[230px] flex-shrink-0">
                <Image
                    src={finalImageSrc}
                    alt={title || "News Image"}
                    width={180}
                    height={180}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="flex flex-col justify-start gap-3">
                {category && (
                    <span className="uppercase text-xs text-blue-950 font-light tracking-wider">
                        {category}
                    </span>
                )}

                <h3 className="text-blue-950 text-lg 2xl:text-xl font-bold leading-tight max-w-[60ch]">
                    {title}
                </h3>
                <p className="text-blue-950 text-sm 2xl:text-md font-normal leading-relaxed max-w-[60ch]">
                    {description}
                </p>
                <Link
                    href={`/news/${articleLink}`}
                    className="text-gray-400 underline uppercase underline-offset-4 text-sm font-medium hover:opacity-70 transition-opacity duration-200 ease-in-out"
                >
                    Read Article
                </Link>
            </div>
        </article>
    );
}