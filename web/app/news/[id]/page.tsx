import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Navbar } from "@/components/nav";
import Footer from "@/components/footer";
import placeholder from "@/public/Images/About us/malta.png";
import dynamic from "next/dynamic";
import renderLexicalContent from "@/components/lexical";

const View = dynamic(() => import("@/components/view"));

interface NewsArticle {
  id: string;
  title: string;
  createdAt: string;
  image?: {
    url?: string;
    alt?: string;
  };
  fullContent?: any;
  category?: {
    name: string;
  };
}

export const generateStaticParams = async () =>
  await axios
    .get<{ docs: Pick<NewsArticle, "id">[] }>(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/news`,
      {
        params: {
          "select[id]": true,
        },
      },
    )
    .then((res) => res.data.docs.map((doc) => ({ id: doc.id })) || []);

const Article = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id,
    [article, otherArticles] = await Promise.all([
      axios.get<NewsArticle>(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/news/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        },
      ),
      axios.get<{ docs: NewsArticle[] }>(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/news`,
        {
          params: {
            "where[id][not_equals]": id,
          },
          headers: { "Content-Type": "application/json" },
        },
      ),
    ]).then((res) => [res[0].data, res[1].data.docs] as const);

  return (
    <main className="w-full flex flex-col items-center">
      <Navbar invert={-20} />
      <View />

      <div className="w-full max-w-[1200px] py-36 px-4">
        {article?.category?.name && (
          <div className="mb-2 text-xs tracking-wider text-blue-950 uppercase">
            {article.category.name}
          </div>
        )}

        <h1 className="text-3xl md:text-5xl font-bold text-blue-950 mb-6">
          {article?.title}
        </h1>

        <div className="mb-4 text-sm text-gray-600 uppercase">
          {article?.createdAt
            ? new Date(article.createdAt)
                .toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .toUpperCase()
            : "DATE UNKNOWN"}
        </div>

        <div className="relative w-full h-[350px] md:h-[500px] mb-10">
          <Image
            src={
              article?.image?.url
                ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${article.image.url}`
                : placeholder
            }
            alt={article?.image?.alt || "News Image"}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="max-w-3xl mx-auto text-blue-950 text-base md:text-lg leading-relaxed space-y-4">
          {article?.fullContent && typeof article.fullContent === "object"
            ? renderLexicalContent(article.fullContent)
            : "No content available."}
        </div>
      </div>

      <section className="w-full max-w-[1200px] px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-blue-950">
            More Articles
          </h2>
          <Link
            href="/news"
            className="border border-blue-950 text-blue-950 px-6 py-2 text-sm uppercase font-light hover:bg-blue-950 hover:text-white transition-colors duration-200"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherArticles.map((item) => {
            const otherImageSrc =
              item.image?.url && item.image.url.startsWith("http")
                ? item.image.url
                : item.image?.url
                  ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${item.image.url}`
                  : placeholder;

            return (
              <div key={item.id} className="flex flex-col">
                <div className="relative w-full h-[200px] md:h-[250px]">
                  <Image
                    src={otherImageSrc}
                    alt={item.image?.alt || "News Image"}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="text-blue-950 font-semibold text-md md:text-lg mt-3">
                  {item.title}
                </h3>
                <Link
                  href={`/news/${item.id}`}
                  className="text-blue-950 underline text-sm mt-2 hover:opacity-70 w-fit"
                >
                  Read Article
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Article;
