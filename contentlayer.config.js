import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeMermaid from "rehype-mermaid";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  readingTime: {
    type: "json",
    resolve: (doc) => {
      const wordsPerMinute = 200;
      const wordCount = doc.body.raw.trim().split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      return {
        words: wordCount,
        minutes: minutes,
        text: `${minutes} min read`,
      };
    },
  },
};

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.md`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.md`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    cate: {
      type: "string",
      required: false,
    },
    cover: {
      type: "string",
      required: false,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypeMermaid,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children.push({
                type: "text",
                value: " ",
              });
            }
          },
          onVisitHightlightedLine(node) {
            node.properties.className.push("line-highlighted");
          },
          onVisithightLightedWord(node) {
            node.properties.className = ["word-highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
