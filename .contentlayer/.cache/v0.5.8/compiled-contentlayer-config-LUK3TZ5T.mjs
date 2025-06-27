// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^posts\//, "")
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  },
  readingTime: {
    type: "json",
    resolve: (doc) => readingTime(doc.body.raw)
  },
  wordCount: {
    type: "number",
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length
  }
};
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.md",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    excerpt: {
      type: "string",
      description: "A brief description of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    },
    author: {
      type: "string",
      description: "The author of the post",
      required: true
    },
    category: {
      type: "string",
      description: "The category display name",
      required: true
    },
    categorySlug: {
      type: "string",
      description: "The URL-friendly category slug",
      required: true
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "Tags associated with the post",
      required: true
    },
    image: {
      type: "string",
      description: "The featured image path",
      required: false
    },
    featured: {
      type: "boolean",
      description: "Whether the post is featured",
      default: false
    },
    published: {
      type: "boolean",
      description: "Whether the post is published",
      default: true
    },
    difficulty: {
      type: "enum",
      options: ["Beginner", "Intermediate", "Advanced"],
      description: "Difficulty level for tutorials",
      required: false
    },
    estimatedTime: {
      type: "string",
      description: "Estimated time to complete tutorial",
      required: false
    },
    rating: {
      type: "number",
      description: "Product rating out of 5",
      required: false
    },
    pros: {
      type: "list",
      of: { type: "string" },
      description: "Pros for review posts",
      required: false
    },
    cons: {
      type: "list",
      of: { type: "string" },
      description: "Cons for review posts",
      required: false
    },
    specifications: {
      type: "json",
      description: "Product specifications",
      required: false
    }
  },
  computedFields
}));
var Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: "authors/**/*.md",
  contentType: "mdx",
  fields: {
    name: {
      type: "string",
      description: "The name of the author",
      required: true
    },
    bio: {
      type: "string",
      description: "Author biography",
      required: true
    },
    avatar: {
      type: "string",
      description: "Author avatar image path",
      required: false
    },
    twitter: {
      type: "string",
      description: "Twitter handle",
      required: false
    },
    linkedin: {
      type: "string",
      description: "LinkedIn profile URL",
      required: false
    },
    website: {
      type: "string",
      description: "Personal website URL",
      required: false
    },
    expertise: {
      type: "list",
      of: { type: "string" },
      description: "Areas of expertise",
      required: false
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^authors\//, "")
    }
  }
}));
var Category = defineDocumentType(() => ({
  name: "Category",
  filePathPattern: "categories/**/*.md",
  contentType: "mdx",
  fields: {
    name: {
      type: "string",
      description: "Category display name",
      required: true
    },
    description: {
      type: "string",
      description: "Category description",
      required: true
    },
    icon: {
      type: "string",
      description: "Icon name from Lucide",
      required: false
    },
    color: {
      type: "string",
      description: "Category color theme",
      required: false
    },
    featured: {
      type: "boolean",
      description: "Whether to feature this category",
      default: false
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^categories\//, "")
    },
    postCount: {
      type: "number",
      resolve: async (doc) => {
        return 0;
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Author, Category],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light"
          },
          keepBackground: false,
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"]
          }
        }
      ]
    ]
  }
});
export {
  Author,
  Category,
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-LUK3TZ5T.mjs.map
