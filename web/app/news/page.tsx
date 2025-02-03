import { Metadata } from "next";
import NewsPageClient from "@/components/news/NewsPageClient";

export const metadata: Metadata = {
    title: "Latest News",
};

export default function NewsPage() {
    return <NewsPageClient />;
}