import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  imageUrl: string;
  excerpt: string;
  content: any;
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
  content: any;
  featured?: boolean;
}

interface MarkdownModule {
  attributes: {
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
  body: string;
}

// Use Vite's import.meta.glob to import all markdown files
const blogPostModules = import.meta.glob<MarkdownModule>('/src/posts/blog/*.md', { eager: true });
const caseStudyModules = import.meta.glob<MarkdownModule>('/src/posts/case-studies/*.md', { eager: true });

let allBlogPosts: BlogPost[] = [];
let allCaseStudies: CaseStudy[] = [];
let initialized = false;

const processMarkdownFiles = async <T>(
  modules: Record<string, MarkdownModule>,
  extractSlug: (path: string) => string,
  processData: (slug: string, module: MarkdownModule, index?: number) => Promise<T>
): Promise<T[]> => {
  const results = await Promise.all(
    Object.entries(modules).map(async ([path, module], index) => {
      const slug = extractSlug(path);
      return processData(slug, module, index);
    })
  );
  return results;
};

// Initialize function to process all markdown files
const initialize = async () => {
  if (initialized) return;
  
  // Process blog posts
  const blogPosts = await processMarkdownFiles<BlogPost>(
    blogPostModules,
    (path) => path.match(/\/src\/posts\/blog\/(.*)\.md$/)?.[1] ?? '',
    async (slug, module) => {
      try {
        const { content, data } = matter(module.body);
        const mdxSource = await serialize(content);
        return {
          slug,
          title: module.attributes.title,
          date: module.attributes.date,
          readTime: module.attributes.readTime,
          imageUrl: module.attributes.imageUrl,
          excerpt: module.attributes.excerpt,
          content: mdxSource,
          tags: module.attributes.tags,
          featured: module.attributes.featured
        };
      } catch (error) {
        console.error(`Error processing blog post ${slug}:`, error);
        return {
          slug,
          title: module.attributes.title,
          date: module.attributes.date,
          readTime: module.attributes.readTime,
          imageUrl: module.attributes.imageUrl,
          excerpt: module.attributes.excerpt,
          content: "Error processing content",
          tags: module.attributes.tags,
          featured: module.attributes.featured
        };
      }
    }
  );
  
  allBlogPosts = blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Process case studies
  const caseStudies = await processMarkdownFiles<CaseStudy>(
    caseStudyModules,
    (path) => path.match(/\/src\/posts\/case-studies\/(.*)\.md$/)?.[1] ?? '',
    async (slug, module, index) => {
      try {
        const { content, data } = matter(module.body);
        const mdxSource = await serialize(content);
        return {
          id: index !== undefined ? index + 1 : 0,
          title: module.attributes.title,
          description: module.attributes.description || '',
          image: module.attributes.image || '',
          tags: module.attributes.tags || [],
          category: module.attributes.category || '',
          slug,
          github: module.attributes.github,
          liveDemo: module.attributes.liveDemo,
          content: mdxSource,
          featured: module.attributes.featured
        };
      } catch (error) {
        console.error(`Error processing case study ${slug}:`, error);
        return {
          id: index !== undefined ? index + 1 : 0,
          title: module.attributes.title,
          description: module.attributes.description || '',
          image: module.attributes.image || '',
          tags: module.attributes.tags || [],
          category: module.attributes.category || '',
          slug,
          github: module.attributes.github,
          liveDemo: module.attributes.liveDemo,
          content: "Error processing content",
          featured: module.attributes.featured
        };
      }
    }
  );
  
  allCaseStudies = caseStudies;
  initialized = true;
};

// Initialize the data immediately
initialize();

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  if (!initialized) await initialize();
  return allBlogPosts;
};

export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  if (!initialized) await initialize();
  return allCaseStudies;
};

export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  if (!initialized) await initialize();
  return allBlogPosts.filter(post => post.featured);
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  if (!initialized) await initialize();
  return allBlogPosts.find(post => post.slug === slug);
};

export const getCaseStudyBySlug = async (slug: string): Promise<CaseStudy | undefined> => {
  if (!initialized) await initialize();
  return allCaseStudies.find(study => study.slug === slug);
}; 