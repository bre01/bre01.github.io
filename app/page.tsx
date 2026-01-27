import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sortedPosts.map((post) => (
        <article key={post._id} className="group">
          <Link href={post.slug} className="block">
            {post.cover && (
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            {post.description && (
              <p className="text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                {post.description}
              </p>
            )}
            <div className="flex gap-2 text-sm text-slate-500 dark:text-slate-500">
              {post.date && (
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              )}
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span>{post.readingTime.text}</span>
                </>
              )}
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
