import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Vary heights for masonry effect
  const heights = ["h-64", "h-72", "h-80", "h-64", "h-72", "h-80"];

  return (
    <div className="relative">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/70" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* About Me Section */}
        <div className="mb-12 p-6 border border-slate-200 dark:border-slate-800 rounded-lg bg-white/80 dark:bg-slate-900/80  shadow-lg">
          <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100">
            About Me
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Welcome to my blog! I write about technology, programming, and
            various technical topics. Feel free to explore my articles and reach
            out if you have any questions.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column with offset */}
          <div className="space-y-8 md:mt-16">
            {sortedPosts
              .filter((_, index) => index % 2 === 0)
              .map((post, index) => (
                <article
                  key={post._id}
                  className="group border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow bg-white/80 dark:bg-slate-900/80 "
                >
                  <Link href={post.slug} className="block">
                    {post.cover && (
                      <div
                        className={`relative w-full ${heights[(index * 2) % heights.length]} overflow-hidden bg-slate-100 dark:bg-slate-800`}
                      >
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-5">
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
                    </div>
                  </Link>
                </article>
              ))}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {sortedPosts
              .filter((_, index) => index % 2 === 1)
              .map((post, index) => (
                <article
                  key={post._id}
                  className="group border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow bg-white/80 dark:bg-slate-900/80 "
                >
                  <Link href={post.slug} className="block">
                    {post.cover && (
                      <div
                        className={`relative w-full ${heights[(index * 2 + 1) % heights.length]} overflow-hidden bg-slate-100 dark:bg-slate-800`}
                      >
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-5">
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
                    </div>
                  </Link>
                </article>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
