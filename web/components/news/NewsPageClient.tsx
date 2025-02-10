"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { Navbar } from "@/components/nav";
import NewsHero from "@/components/news/Hero";
import NewsList from "@/components/news/NewsList";
import NewsAccordion from "@/components/news/NewsAccordion";
import Categories from "@/components/news/Categories";

const Footer = dynamic(() => import("@/components/footer"));
const View = dynamic(() => import("@/components/view"));

export default function NewsPageClient() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [availableMonths, setAvailableMonths] = useState<{
    [year: number]: number[];
  }>({});

  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || "";

  const fetchAvailableMonths = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/news`, {
        params: {
          "select[createdAt]": true,
          depth: 0,
          limit: 1000,
        },
        headers: { "Content-Type": "application/json" },
      });

      const articles = res.data.docs;
      const monthsMap: { [year: number]: number[] } = {};

      articles.forEach((article: { createdAt: string }) => {
        const date = new Date(article.createdAt);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();

        if (!monthsMap[year]) {
          monthsMap[year] = [];
        }
        if (!monthsMap[year].includes(month)) {
          monthsMap[year].push(month);
        }
      });

      // Встановлюємо доступні місяці у стан
      setAvailableMonths(monthsMap);
    } catch (error) {
      console.error("Failed to fetch available months:", error);
    }
  };

  useEffect(() => {
    fetchAvailableMonths();
  }, []);

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

      <Categories
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <NewsHero />

      <section className="containerize flex flex-col-reverse lg:flex-row items-stretch justify-between gap-8 py-8">
        <div className="w-full lg:w-[60%] flex flex-col gap-8">
          <NewsList
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedCategory={selectedCategory}
          />
        </div>

        <div className="w-full lg:w-[30%] border-l border-blue-950 pl-4">
          <NewsAccordion
            availableMonths={availableMonths}
            onMonthSelect={handleMonthSelect}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
