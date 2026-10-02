import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import DateFormatter from "@/app/_components/date-formatter";
import { PostBody } from "@/app/_components/post-body";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();
  const content = await markdownToHtml(post.content || "");

  return (
    <main className="pt-[88px] md:pt-[100px]">
      <article>
        <div className="container-fb grid gap-12 py-20 md:grid-cols-[4.1fr_7fr] md:gap-[120px]">
          <div className="flex flex-col gap-4">
            <p className="regular-m text-grey-80">
              <DateFormatter dateString={post.date} /> · {post.author.name}
            </p>
            <h1 className="h1">{post.title}</h1>
          </div>
          <div className="flex flex-col gap-10">
            <img src={post.coverImage} alt="" className="aspect-[16/9] w-full object-cover" />
            <PostBody content={content} />
          </div>
        </div>
      </article>
    </main>
  );
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();
  const title = `${post.title} | ${SITE_NAME}`;
  return { title, openGraph: { title, images: [post.ogImage.url] } };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}
