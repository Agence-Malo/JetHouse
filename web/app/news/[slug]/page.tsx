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

export const dynamicParams = false;

export default async function SingleArticlePage({
                                                    params,
                                                }: {
    params: any;
}): Promise<any> {
    const { slug } = await Promise.resolve(params);

    const article = newsData.find((item) => item.slug === slug);
    if (!article) {
        notFound();
    }

    const otherArticles = newsData.filter((item) => item.slug !== slug).slice(0, 3);

    const dateObj = new Date(article.publicationDate);
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    const rawDate = dateObj.toLocaleString("en-US", options);
    const formattedDate = rawDate.toUpperCase();

    return (
        <main className="w-full flex flex-col items-center">
            <Navbar invert={-20} />

            <div className="w-full max-w-[1200px] py-32 px-4">
                <div className="mb-2 text-xs tracking-wider text-blue-950 uppercase">
                    {formattedDate}
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-blue-950 mb-6">
                    {article.title}
                </h1>

                <div className="relative w-full h-[350px] md:h-[500px] mb-10">
                    <Image
                        src={article.imageSrc}
                        alt={article.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                <div className="max-w-3xl mx-auto text-blue-950 text-base md:text-lg leading-relaxed space-y-4">
                    {article.fullContent}
                </div>
            </div>

            <section className="w-full max-w-[1200px] px-4 pb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-blue-950">More Articles</h2>
                    <Link
                        href="/news"
                        className="border border-blue-950 text-blue-950 px-6 py-2 text-sm uppercase font-light hover:bg-blue-950 hover:text-white transition-colors duration-200"
                    >
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {otherArticles.map((item) => (
                        <div key={item.id} className="flex flex-col">
                            <div className="relative w-full h-[200px] md:h-[250px]">
                                <Image
                                    src={item.imageSrc}
                                    alt={item.title}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <h3 className="text-blue-950 font-semibold text-md md:text-lg mt-3">
                                {item.title}
                            </h3>
                            <Link
                                href={`/news/${item.slug}`}
                                className="text-blue-950 underline text-sm mt-2 hover:opacity-70 w-fit"
                            >
                                Read Article
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}