import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  tags?: string[];
  featured?: boolean;
}

export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  slug: string;
  github?: string;
  liveDemo?: string;
  content: string;
}

// Use Vite's import.meta.glob to import all markdown files at build time
const blogPostModules = import.meta.glob('/src/posts/blog/*.md', { eager: true, as: 'raw' });
const caseStudyModules = import.meta.glob('/src/posts/case-studies/*.md', { eager: true, as: 'raw' });

const processMarkdownFiles = <T>(
  modules: Record<string, string>, 
  extractSlug: (path: string) => string,
  processData: (slug: string, data: any, content: string, index?: number) => T
): T[] => {
  return Object.entries(modules).map(([path, rawContent], index) => {
    const slug = extractSlug(path);
    const { data, content } = matter(rawContent, {});
    return processData(slug, data, content, index);
  });
};

const allBlogPosts: BlogPost[] = processMarkdownFiles<BlogPost>(
  blogPostModules,
  (path) => path.match(/\/src\/posts\/blog\/(.*)\.md$/)?.[1] ?? '',
  (slug, data, content) => ({
    slug,
    title: data.title,
    date: data.date,
    readTime: data.readTime,
    imageUrl: data.imageUrl,
    excerpt: data.excerpt,
    content,
    tags: data.tags,
    featured: data.featured
  })
).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const allCaseStudies: CaseStudy[] = processMarkdownFiles<CaseStudy>(
  caseStudyModules,
  (path) => path.match(/\/src\/posts\/case-studies\/(.*)\.md$/)?.[1] ?? '',
  (slug, data, content, index) => ({
    id: index !== undefined ? index + 1 : 0, // Assign id based on index
    title: data.title,
    description: data.description,
    image: data.image,
    tags: data.tags,
    category: data.category,
    slug,
    github: data.github,
    liveDemo: data.liveDemo,
    content
  })
);


// Functions now simply return/filter the pre-processed arrays
export const getBlogPosts = (): BlogPost[] => {
  return allBlogPosts;
};

export const getCaseStudies = (): CaseStudy[] => {
  return allCaseStudies;
};

export const getFeaturedBlogPosts = (): BlogPost[] => {
  return allBlogPosts.filter(post => post.featured);
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return allBlogPosts.find(post => post.slug === slug);
};

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return allCaseStudies.find(study => study.slug === slug);
}; 