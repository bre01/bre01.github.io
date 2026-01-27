import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import Link from "next/link";
import Image from "next/image";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    return null;
  }

  return post;
}

function getAdjacentPosts(currentPost: any) {
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const currentIndex = sortedPosts.findIndex(
    (post) => post._id === currentPost._id,
  );

  return {
    prev: currentIndex > 0 ? sortedPosts[currentIndex - 1] : null,
    next:
      currentIndex < sortedPosts.length - 1
        ? sortedPosts[currentIndex + 1]
        : null,
  };
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(post);

  return (
    <>
      <article className="py-6">
        {post.cover && (
          <div className="relative w-full h-96 -mx-4 mb-8 overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-3 drop-shadow-lg">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-xl text-white/90 drop-shadow-md">
                  {post.description}
                </p>
              )}
            </div>
          </div>
        )}

        {!post.cover && (
          <>
            <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-slate-100">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
                {post.description}
              </p>
            )}
          </>
        )}

        <div className="flex gap-2 text-sm text-slate-600 dark:text-slate-400 mt-4 mb-6">
          {post.cate && (
            <>
              <span className="px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded">
                {post.cate}
              </span>
              <span>•</span>
            </>
          )}
          {post.date && (
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{post.readingTime.text}</span>
              <span>•</span>
              <span>{post.readingTime.words} words</span>
            </>
          )}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <Mdx code={post.body.code} />
        </div>
      </article>

      <nav className="py-8 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prev && (
            <Link
              href={prev.slug}
              className="group p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                ← Previous Article
              </div>
              <div className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {prev.title}
              </div>
            </Link>
          )}
          {next && (
            <Link
              href={next.slug}
              className="group p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors md:text-right"
            >
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                Next Article →
              </div>
              <div className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {next.title}
              </div>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
