import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { newsData } from "@/data/newsData";
import { Navbar } from "@/components/nav";
import Footer from "@/components/footer";

export async function generateStaticParams() {
    return newsData.map((item) => ({
        slug: item.slug,
    }));
}

export default function SingleArticlePage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const article = newsData.find((item) => item.slug === slug);

    if (!article) {
        return notFound();
    }

    const otherArticles = newsData
        .filter((item) => item.slug !== slug)
        .slice(0, 2);

    return (
        <main className="w-full flex flex-col justify-start items-center">
            <Navbar invert={-20} />

            <div className="containerize w-full max-w-5xl py-16 px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">
                    {article.title}
                </h1>

                <p className="text-sm text-gray-600 mb-6">
                    Published on:{" "}
                    {new Date(article.publicationDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>

                <div className="w-full h-[250px] md:h-[400px] relative mb-8">
                    <Image
                        src={article.imageSrc}
                        alt={article.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                <div className="text-blue-950 text-base md:text-lg leading-relaxed space-y-4">
                    {article.fullContent}
                </div>
            </div>

            <section className="containerize w-full max-w-5xl px-4 pb-16">
                <h2 className="text-xl font-semibold text-blue-950 mb-4">
                    More Articles
                </h2>

                <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                    {otherArticles.map((item) => (
                        <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg p-4 flex-1"
                        >
                            <h3 className="text-blue-950 font-semibold text-lg mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                                {new Date(item.publicationDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                            <p className="text-sm text-blue-950 line-clamp-3">
                                {item.excerpt}
                            </p>
                            <Link
                                href={`/news/${item.slug}`}
                                className="text-blue-950 underline mt-2 inline-block text-sm"
                            >
                                Read Article
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <Link
                        href="/news"
                        className="border border-blue-950 text-blue-950 px-6 py-2 text-sm uppercase font-light hover:bg-blue-950 hover:text-white transition-colors duration-200"
                    >
                        View All
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}