"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
// @ts-ignore
import placeholder from "../../public/Images/About us/malta.png";

interface NewsDoc {
  id: string;
  title: string;
  createdAt: string;
  category?: {
    id: string;
    name: string;
  } | null;
  image?: {
    url?: string;
    alt?: string;
  };
}

const NewsHero = () => {
  const [latestNews, setLatestNews] = useState<NewsDoc | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || "";
  const queryUrl = `${baseUrl}/api/news?limit=1&sort=-createdAt&depth=2`;

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");

        const res = await axios.get<{ docs: NewsDoc[] }>(queryUrl, {
          headers: { "Content-Type": "application/json" },
        });

        if (res.data.docs.length > 0) {
          setLatestNews(res.data.docs[0]);
        } else {
          setLatestNews(null);
        }
      } catch (error: any) {
        setErrorMsg(error.message || "Failed to load the latest news.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestNews();
  }, [queryUrl]);

  if (isLoading) {
    return (
      <section className="relative w-full h-[60vh] flex items-center justify-center bg-black/10">
        <p className="text-white">Loading latest news...</p>
      </section>
    );
  }

  if (errorMsg || !latestNews) {
    return (
      <section className="relative w-full h-[60vh] flex items-center justify-center bg-black/10">
        <p className="text-white text-center">No news available.</p>
      </section>
    );
  }

  const imageSrc = latestNews.image?.url
    ? `${baseUrl}${latestNews.image.url}`
    : placeholder;
  const newsLink = `/news/article?id=${latestNews.id}`;
  const categoryName = latestNews.category?.name || "Uncategorized";

  return (
    <section
      className="relative w-full h-[60vh] flex items-end justify-start bg-black/10 overflow-hidden cursor-pointer"
      onClick={() => {
        if (!latestNews?.id) return;
        router.push(newsLink);
      }}
    >
      <Image
        src={imageSrc}
        alt={latestNews.image?.alt || latestNews.title}
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black/70 to-transparent" />

      <div className="absolute bottom-1 left-12 text-white p-6 md:p-10 max-w-[60ch]">
        <label className="block uppercase text-xs mb-2 opacity-80">
          {categoryName}
        </label>
        <h2 className="text-xl md:text-3xl font-semibold leading-tight">
          {latestNews.title}
        </h2>
      </div>
    </section>
  );
};

export default NewsHero;
