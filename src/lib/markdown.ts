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

// Sample blog post for testing and fallback
const sampleBlogPost: BlogPost = {
  slug: 'sample-blog-post',
  title: 'Sample Blog Post',
  date: 'April 22, 2025',
  readTime: '5 min read',
  imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
  excerpt: 'This is a sample blog post to test the markdown processing functionality.',
  content: {},
  tags: ['sample', 'test'],
  featured: true
};

// Sample case study for testing and fallback
const sampleCaseStudy: CaseStudy = {
  id: 1,
  slug: 'sample-case-study',
  title: 'Sample Data Analysis Project',
  description: 'A demonstration of data visualization and analysis techniques.',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
  tags: ['Data Visualization', 'Analytics', 'Sample'],
  category: 'Data Analytics',
  github: 'https://github.com/example/sample-project',
  liveDemo: 'https://example.com/demo',
  content: {},
  featured: true
};

// State variables
let allBlogPosts: BlogPost[] = [sampleBlogPost];
let allCaseStudies: CaseStudy[] = [sampleCaseStudy];
let initialized = false;

// Try to import markdown files with multiple possible paths
let blogPostModules: Record<string, MarkdownModule> = {};
let caseStudyModules: Record<string, MarkdownModule> = {};

function initializeModules() {
  try {
    // Make path patterns more flexible to find markdown files in the build
    blogPostModules = import.meta.glob<MarkdownModule>(['/../posts/blog/*.md', '/src/posts/blog/*.md', './posts/blog/*.md', 'src/posts/blog/*.md'], { eager: true });
    caseStudyModules = import.meta.glob<MarkdownModule>(['/../posts/case-studies/*.md', '/src/posts/case-studies/*.md', './posts/case-studies/*.md', 'src/posts/case-studies/*.md'], { eager: true });
    
    // Add debug logging
    console.log('Blog post modules available:', Object.keys(blogPostModules).length);
    console.log('Case study modules available:', Object.keys(caseStudyModules).length);
    console.log('Blog post modules paths:', Object.keys(blogPostModules));
    console.log('Case study modules paths:', Object.keys(caseStudyModules));
  } catch (error) {
    console.error('Error initializing modules:', error);
    // Leave the modules as empty objects
  }
}

// Call this function immediately
initializeModules();

async function processMarkdownFiles<T>(
  modules: Record<string, MarkdownModule>,
  extractSlug: (path: string) => string,
  processData: (slug: string, module: MarkdownModule, index?: number) => Promise<T>
): Promise<T[]> {
  if (Object.keys(modules).length === 0) {
    console.warn('No modules found for processing');
    return [];
  }
  
  const results = await Promise.all(
    Object.entries(modules).map(async ([path, module], index) => {
      const slug = extractSlug(path);
      return processData(slug, module, index);
    })
  );
  return results;
}

// Initialize function to process all markdown files
async function initialize() {
  if (initialized) return;
  
  try {
    console.log('Initializing markdown processing...');
    
    // Process blog posts
    let blogPosts: BlogPost[] = [];
    if (Object.keys(blogPostModules).length > 0) {
      blogPosts = await processMarkdownFiles<BlogPost>(
        blogPostModules,
        (path) => path.match(/\/([^\/]+)\.md$/)?.[1] ?? '',
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
              title: module.attributes.title || 'Untitled',
              date: module.attributes.date || new Date().toDateString(),
              readTime: module.attributes.readTime || '5 min read',
              imageUrl: module.attributes.imageUrl || 'https://via.placeholder.com/800x400',
              excerpt: module.attributes.excerpt || 'No excerpt available',
              content: "Error processing content",
              tags: module.attributes.tags || [],
              featured: module.attributes.featured || false
            };
          }
        }
      );
    }
    
    // If no blog posts found, use sample
    if (blogPosts.length === 0) {
      console.log('No blog posts found, using sample');
      blogPosts = [sampleBlogPost];
    }
    
    allBlogPosts = blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Process case studies
    let caseStudies: CaseStudy[] = [];
    if (Object.keys(caseStudyModules).length > 0) {
      caseStudies = await processMarkdownFiles<CaseStudy>(
        caseStudyModules,
        (path) => path.match(/\/([^\/]+)\.md$/)?.[1] ?? '',
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
              title: module.attributes.title || 'Untitled Project',
              description: module.attributes.description || 'No description available',
              image: module.attributes.image || 'https://via.placeholder.com/800x400',
              tags: module.attributes.tags || ['Sample'],
              category: module.attributes.category || 'General',
              slug,
              github: module.attributes.github,
              liveDemo: module.attributes.liveDemo,
              content: "Error processing content",
              featured: module.attributes.featured || false
            };
          }
        }
      );
    }
    
    // If no case studies found, use sample
    if (caseStudies.length === 0) {
      console.log('No case studies found, using sample');
      caseStudies = [sampleCaseStudy];
    }
    
    allCaseStudies = caseStudies;
    initialized = true;
    console.log('Markdown initialization complete. Blog posts:', allBlogPosts.length, 'Case studies:', allCaseStudies.length);
  } catch (error) {
    console.error('Error during markdown initialization:', error);
    // Return sample data instead of failing completely
    allBlogPosts = [sampleBlogPost];
    allCaseStudies = [sampleCaseStudy];
    initialized = true;
  }
}

// Initialize the data immediately
initialize();

// Export functions that always return at least the sample data
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!initialized) await initialize();
  return allBlogPosts.length > 0 ? allBlogPosts : [sampleBlogPost];
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!initialized) await initialize();
  return allCaseStudies.length > 0 ? allCaseStudies : [sampleCaseStudy];
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  if (!initialized) await initialize();
  const featured = allBlogPosts.filter(post => post.featured);
  return featured.length > 0 ? featured : [sampleBlogPost];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!initialized) await initialize();
  const post = allBlogPosts.find(post => post.slug === slug);
  return post || (slug === 'sample-blog-post' ? sampleBlogPost : undefined);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  if (!initialized) await initialize();
  const study = allCaseStudies.find(study => study.slug === slug);
  return study || (slug === 'sample-case-study' ? sampleCaseStudy : undefined);
} 