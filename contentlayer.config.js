import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"


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
}

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
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
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
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
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
  mdx:{
    rehypePlugins:[
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme:'one-dark-pro',
          onVisitLine(node){
            if(node.children.length===0){
              node.children.push({
                type:'text',
                value:' '
              })
            }
          },
          onVisitHightlightedLine(node){
            node.properties.className.push('line-highlighted')
          },
          onVisithightLightedWord(node){
            node.properties.className=['word-highlighted']
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties:{
            className:['subheading-anchor'],
            ariaLabel:'Link to section',
          }
        }
      ]
    ]
  }
})
