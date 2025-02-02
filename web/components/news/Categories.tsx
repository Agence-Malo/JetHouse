"use client";

import Link from "next/link";

const mockCategories = ["Categorie 1", "Categorie 2", "Categorie 3", "Categorie 4"];

const Categories = () => {
    return (
        <section className="w-full flex justify-center items-center bg-white text-blue-950 border-b border-blue-950">
            <nav className="containerize flex justify-evenly items-center py-4 lg:gap-10 gap-4">
                {mockCategories.map((cat, idx) => (
                    <Link
                        href="#"
                        key={idx}
                        className="uppercase font-light hover:font-bold transition-[font-weight] duration-200 ease-in-out"
                    >
                        {cat}
                    </Link>
                ))}
            </nav>
        </section>
    );
};

export default Categories;