import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/app/_components/hero";
import { Tertiary } from "@/app/_components/tertiary";
import { IMAGES } from "@/lib/constants";
import { getAllPosts } from "@/lib/api";
import DateFormatter from "@/app/_components/date-formatter";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides, lessons and updates from FrancoBridge.",
};

export default function Blog() {
  const posts = getAllPosts();
  return (
    <main>
      <Hero title="Guides, lessons and updates" text="Notes from the classroom, for people learning French with a destination in mind." image={IMAGES.heroBlog} />
      <section className="section">
        <div className="container-fb grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="group flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-black pb-3">
                <span className="regular-m">Blog</span>
                <span className="regular-s text-grey-80">
                  <DateFormatter dateString={post.date} />
                </span>
              </div>
              <img src={post.coverImage} alt="" className="aspect-[4/3] w-full object-cover" />
              <h4 className="h4">{post.title}</h4>
              <p className="regular-m">{post.excerpt}</p>
              <Tertiary as="span">Read</Tertiary>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
