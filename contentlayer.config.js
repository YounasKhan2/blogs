import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

/** @type {import('contentlayer2/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^posts\//, ''),
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  readingTime: {
    type: 'json',
    resolve: (doc) => readingTime(doc.body.raw),
  },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
  },
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.md',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    metaTitle: {
      type: 'string',
      description: 'SEO meta title (overrides title if provided)',
      required: false,
    },
    excerpt: {
      type: 'string',
      description: 'A brief description of the post',
      required: false, // Changed to false to handle missing excerpts
    },
    metaDescription: {
      type: 'string',
      description: 'SEO meta description',
      required: false,
    },
    description: {
      type: 'string',
      description: 'Post description (legacy field)',
      required: false,
    },
    slug: {
      type: 'string',
      description: 'Custom slug (legacy field - computed slug is preferred)',
      required: false,
    },
    imageAlt: {
      type: 'string',
      description: 'Alt text for the featured image',
      required: false,
    },
    keywords: {
      type: 'list',
      of: { type: 'string' },
      description: 'SEO keywords',
      required: false,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    author: {
      type: 'string',
      description: 'The author of the post',
      required: true,
    },
    category: {
      type: 'string',
      description: 'The category display name',
      required: true,
    },
    categorySlug: {
      type: 'string',
      description: 'The URL-friendly category slug',
      required: false, // Changed to false to handle missing categorySlug
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'Tags associated with the post',
      required: true,
    },
    image: {
      type: 'string',
      description: 'The featured image path',
      required: false,
    },
    featured: {
      type: 'boolean',
      description: 'Whether the post is featured',
      default: false,
    },
    published: {
      type: 'boolean',
      description: 'Whether the post is published',
      default: true,
    },
    difficulty: {
      type: 'enum',
      options: ['Beginner', 'Intermediate', 'Advanced'],
      description: 'Difficulty level for tutorials',
      required: false,
    },
    estimatedTime: {
      type: 'string',
      description: 'Estimated time to complete tutorial',
      required: false,
    },
    rating: {
      type: 'number',
      description: 'Product rating out of 5',
      required: false,
    },
    pros: {
      type: 'list',
      of: { type: 'string' },
      description: 'Pros for review posts',
      required: false,
    },
    cons: {
      type: 'list',
      of: { type: 'string' },
      description: 'Cons for review posts',
      required: false,
    },
    specifications: {
      type: 'json',
      description: 'Product specifications',
      required: false,
    },
  },
  computedFields: {
    ...computedFields,
    // Auto-generate categorySlug from category if not provided
    finalCategorySlug: {
      type: 'string',
      resolve: (doc) => doc.categorySlug || doc.category?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'uncategorized',
    },
    // Auto-generate excerpt if not provided
    finalExcerpt: {
      type: 'string',
      resolve: (doc) => {
        if (doc.excerpt) return doc.excerpt;
        if (doc.metaDescription) return doc.metaDescription;
        // Generate excerpt from first paragraph of content
        const firstParagraph = doc.body.raw.split('\n\n')[0];
        return firstParagraph.replace(/[#*`]/g, '').substring(0, 160) + (firstParagraph.length > 160 ? '...' : '');
      },
    },
    // Use metaTitle if available, otherwise title
    finalTitle: {
      type: 'string',
      resolve: (doc) => doc.metaTitle || doc.title,
    },
  },
}));

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: 'authors/**/*.md',
  contentType: 'mdx',
  fields: {
    name: {
      type: 'string',
      description: 'The name of the author',
      required: true,
    },
    bio: {
      type: 'string',
      description: 'Author biography',
      required: true,
    },
    avatar: {
      type: 'string',
      description: 'Author avatar image path',
      required: false,
    },
    twitter: {
      type: 'string',
      description: 'Twitter handle',
      required: false,
    },
    linkedin: {
      type: 'string',
      description: 'LinkedIn profile URL',
      required: false,
    },
    website: {
      type: 'string',
      description: 'Personal website URL',
      required: false,
    },
    expertise: {
      type: 'list',
      of: { type: 'string' },
      description: 'Areas of expertise',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^authors\//, ''),
    },
  },
}));

export const Category = defineDocumentType(() => ({
  name: 'Category',
  filePathPattern: 'categories/**/*.md',
  contentType: 'mdx',
  fields: {
    name: {
      type: 'string',
      description: 'Category display name',
      required: true,
    },
    description: {
      type: 'string',
      description: 'Category description',
      required: true,
    },
    icon: {
      type: 'string',
      description: 'Icon name from Lucide',
      required: false,
    },
    color: {
      type: 'string',
      description: 'Category color theme',
      required: false,
    },
    featured: {
      type: 'boolean',
      description: 'Whether to feature this category',
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^categories\//, ''),
    },
    postCount: {
      type: 'number',
      resolve: async (doc) => {
        // This would be calculated at build time
        return 0; // Placeholder - would count posts in this category
      },
    },
  },
}));

export default makeSource({
  contentDirPath: './content',
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
            dark: 'github-dark',
            light: 'github-light',
          },
          keepBackground: false,
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
