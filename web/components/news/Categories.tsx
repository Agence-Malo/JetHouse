"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Category {
    id: number;
    slug: string;
    name: string;
}

interface CategoriesProps {
    selectedCategory: string | null;
    onCategorySelect: (category: string | null) => void;
}

const Categories = ({ selectedCategory, onCategorySelect }: CategoriesProps) => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || "";

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/categories`, {
                    params: { sort: "name" },
                    headers: { "Content-Type": "application/json" },
                });
                setCategories(res.data.docs);
                setIsLoading(false);
            } catch (error: any) {
                setErrorMsg(error.message || "Failed to load categories.");
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, [baseUrl]);

    if (isLoading) {
        return <p className="text-center">Loading categories...</p>;
    }

    if (errorMsg) {
        return <p className="text-center text-red-500">{errorMsg}</p>;
    }

    return (
        <section className="w-full flex justify-center items-center bg-white text-blue-950 border-b border-blue-950">
            <nav className="containerize flex justify-evenly items-center py-4 lg:gap-10 gap-4">
                {categories?.map((cat) => {
                    const isActive = selectedCategory === cat.slug;

                    return (
                        <button
                            key={cat.id}
                            onClick={() => {
                                const newCategory = isActive ? null : cat.slug;
                                onCategorySelect(newCategory);

                                const newUrl = newCategory ? `/news?category=${newCategory}` : "/news";
                                window.history.pushState(null, "", newUrl);
                            }}
                            className={`uppercase font-light hover:font-bold transition-[font-weight] duration-200 ease-in-out ${isActive ? "font-bold" : ""}`}
                        >
                            {cat.name}
                        </button>
                    );
                })}
            </nav>
        </section>
    );
};

export default Categories;