import type { Metadata } from "next";
import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { PageHero } from "@/app/_components/page-hero";
import { getAllPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides, lessons and updates from FrancoBridge.",
};

export default function Blog() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <PageHero eyebrow="Blog" title="Guides, lessons and updates." fr={"« Guides, leçons et nouvelles. »"} />
      <Container>
        <div className="py-16">
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </div>
      </Container>
    </main>
  );
}
