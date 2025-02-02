import dynamic from "next/dynamic";
import { Metadata } from "next";
import { Navbar } from "@/components/nav";
import Categories from "@/components/news/Categories";
import NewsHero from "@/components/news/Hero";
import NewsList from "@/components/news/NewsList";
import NewsAccordion from "@/components/news/NewsAccordion";

const Footer = dynamic(() => import("@/components/footer"));
const View = dynamic(() => import("@/components/view"));

export const metadata: Metadata = {
    title: "Latest News",
};

export default function NewsPage() {
    return (
        <main className="w-full flex flex-col justify-start items-center">
            <Navbar invert={-20} />
            <View />

            <h1 className="text-center text-blue-950 font-medium text-2xl md:text-3xl mt-[18vh] mb-4">
                Latest News
            </h1>

            <Categories />

            <NewsHero />

            <section className="containerize flex flex-col-reverse lg:flex-row items-stretch justify-between gap-8 py-8">
                <div className="w-full lg:w-[55%] flex flex-col gap-8">
                    <NewsList />
                </div>
                <div className="w-full lg:w-[30%] border-l border-blue-950 pl-4">
                    <NewsAccordion />
                </div>
            </section>

            <Footer />
        </main>
    );
}