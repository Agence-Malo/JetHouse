"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/nav";
import NewsHero from "@/components/news/Hero";
import NewsList from "@/components/news/NewsList";
import NewsAccordion from "@/components/news/NewsAccordion";

const Footer = dynamic(() => import("@/components/footer"));
const View = dynamic(() => import("@/components/view"));

export default function NewsPageClient() {
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

    const handleMonthSelect = (year: number, monthIndex: number) => {
        setSelectedYear(year);
        setSelectedMonth(monthIndex);
    };

    return (
        <main className="w-full flex flex-col justify-start items-center">
            <Navbar invert={-20} />
            <View />

            <h1 className="text-center text-blue-950 font-medium text-2xl md:text-3xl mt-[18vh] mb-4">
                Latest News
            </h1>

            <NewsHero />

            <section className="containerize flex flex-col-reverse lg:flex-row items-stretch justify-between gap-8 py-8">
                <div className="w-full lg:w-[60%] flex flex-col gap-8">
                    <NewsList selectedYear={selectedYear} selectedMonth={selectedMonth} />
                </div>

                <div className="w-full lg:w-[30%] border-l border-blue-950 pl-4">
                    <NewsAccordion onMonthSelect={handleMonthSelect} />
                </div>
            </section>

            <Footer />
        </main>
    );
}