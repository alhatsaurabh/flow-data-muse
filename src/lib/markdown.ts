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

interface MarkdownModule {
  default: string;
  metadata: {
    title: string;
    date: string;
    readTime: string;
    imageUrl: string;
    excerpt: string;
    tags?: string[];
    featured?: boolean;
    description?: string;
    image?: string;
    category?: string;
    github?: string;
    liveDemo?: string;
  };
}

// Use Vite's import.meta.glob to import all markdown files
const blogPostModules = import.meta.glob<MarkdownModule>('/src/posts/blog/*.md', { eager: true });
const caseStudyModules = import.meta.glob<MarkdownModule>('/src/posts/case-studies/*.md', { eager: true });

const processMarkdownFiles = <T>(
  modules: Record<string, MarkdownModule>,
  extractSlug: (path: string) => string,
  processData: (slug: string, module: MarkdownModule, index?: number) => T
): T[] => {
  return Object.entries(modules).map(([path, module], index) => {
    const slug = extractSlug(path);
    return processData(slug, module, index);
  });
};

const allBlogPosts: BlogPost[] = processMarkdownFiles<BlogPost>(
  blogPostModules,
  (path) => path.match(/\/src\/posts\/blog\/(.*)\.md$/)?.[1] ?? '',
  (slug, module) => ({
    slug,
    title: module.metadata.title,
    date: module.metadata.date,
    readTime: module.metadata.readTime,
    imageUrl: module.metadata.imageUrl,
    excerpt: module.metadata.excerpt,
    content: module.default,
    tags: module.metadata.tags,
    featured: module.metadata.featured
  })
).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const allCaseStudies: CaseStudy[] = processMarkdownFiles<CaseStudy>(
  caseStudyModules,
  (path) => path.match(/\/src\/posts\/case-studies\/(.*)\.md$/)?.[1] ?? '',
  (slug, module, index) => ({
    id: index !== undefined ? index + 1 : 0,
    title: module.metadata.title,
    description: module.metadata.description || '',
    image: module.metadata.image || '',
    tags: module.metadata.tags || [],
    category: module.metadata.category || '',
    slug,
    github: module.metadata.github,
    liveDemo: module.metadata.liveDemo,
    content: module.default
  })
);

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