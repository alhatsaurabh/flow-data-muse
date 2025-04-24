/** @jsxImportSource react */
import matter from 'gray-matter';
import React from 'react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import { ComponentType } from 'react';
import path from 'path';
import remarkGfm from 'remark-gfm'; // Import the remark-gfm plugin

// Custom component to render images with responsive styling
const MarkdownImage = ({ alt, src }: { alt?: string; src?: string }) => {
  return <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto' }} />;
};

// Define components to be used by ReactMarkdown for plain .md files
const markdownComponents = {
  img: MarkdownImage, // Use the custom image component
  table: ({ children }: { children: React.ReactNode }) => ( // Add table component
    <div className="my-4 overflow-x-auto"> {/* Add overflow for responsiveness */}
      <table>
        {children}
      </table>
    </div>
  ),
};

export interface BlogPost {
  slug: string;
  title: string;
  date: Date; // Change date to Date object
  readTime: string;
  imageUrl: string;
  excerpt: string;
  content: React.ComponentType<any>; // Content is now the MDX component
  tags?: string[];
  featured?: boolean;
  draft?: boolean; // Add draft property
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
  content: React.ComponentType<any>; // Content is now the MDX component
  featured?: boolean;
  draft?: boolean; // Add draft property
}

// Sample blog post for testing and fallback
const sampleBlogPost: BlogPost = {
  slug: 'sample-blog-post',
  title: 'Sample Blog Post',
  date: new Date('2025-04-22'), // Use a Date object
  readTime: '5 min read',
  imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
  excerpt: 'This is a sample blog post to test the markdown processing functionality.',
  content: () => React.createElement('div', null, 'Sample Blog Post Content'), // Provide a dummy component
  tags: ['sample', 'test'],
  featured: true,
  draft: false // Default sample to not be a draft
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
  content: () => React.createElement('div', null, 'Sample Case Study Content'), // Provide a dummy component
  featured: true,
  draft: false // Default sample to not be a draft
};

// Use a promise to manage initialization state
const initializationPromise = (async () => {
  let blogPostModules: Record<string, string> = {};
  let caseStudyModules: Record<string, string> = {};

  try {
    // Make path patterns more flexible to find markdown files in the build
    // Assuming the MDX plugin exposes default (component) and attributes (frontmatter)
    blogPostModules = import.meta.glob([
      '/src/posts/blog/*.md',
      '/src/posts/blog/*.mdx',
    ], { eager: true, as: 'raw' });

    caseStudyModules = import.meta.glob([
      '/src/posts/case-studies/*.md',
      '/src/posts/case-studies/*.mdx',
    ], { eager: true, as: 'raw' });

    // Add debug logging
    console.log('Blog post modules available:', Object.keys(blogPostModules).length);
    console.log('Case study modules available:', Object.keys(caseStudyModules).length);
    console.log('Blog post modules paths:', Object.keys(blogPostModules));
    console.log('Case study modules paths:', Object.keys(caseStudyModules));

  } catch (error) {
    console.error('Error initializing modules:', error);
    // Leave the modules as empty objects
  }

  async function processMarkdownFiles<T>(
    modules: Record<string, string>,
    processData: (slug: string, module: string, index?: number) => Promise<T | null> // Return T or null
  ): Promise<T[]> {
    if (Object.keys(modules).length === 0) {
      console.warn('No modules found for processing');
      return [];
    }

    console.log('Processing markdown files, paths:', Object.keys(modules));

    const results = await Promise.all(
      Object.entries(modules).map(async ([path, module], index) => {
        // Extract slug from any path pattern
        const slug = path.split('/').pop()?.replace(/\.(md|mdx)$/, '') || ''; // Handle both .md and .mdx
        console.log('Processing file:', path, 'with slug:', slug);
        return processData(slug, module, index);
      })
    );
    // Filter out any null results from failed processing
    const validResults: T[] = [];
    for (const result of results) {
      if (result !== null) {
        validResults.push(result);
      }
    }
    return validResults;
  }

  try {
    console.log('Initializing markdown processing...');

    // Process blog posts
    let blogPosts: BlogPost[] = [];
    if (Object.keys(blogPostModules).length > 0) {
      blogPosts = await processMarkdownFiles<BlogPost>(
        blogPostModules,
        async (slug, rawContent) => {
          try {
            const parsedMarkdown = matter(rawContent);
            const frontmatter = parsedMarkdown.data;
            const content = parsedMarkdown.content;

            let ContentComponent: React.ComponentType<any> | undefined;

            if (slug.endsWith('.mdx')) {
               // Dynamically import the MDX file to get the component
              const mdxModule = await import(/* @vite-ignore */ new URL(path.join('/src/posts/blog', `${slug}.mdx`), import.meta.url).toString());
              ContentComponent = mdxModule.default;
            } else {
              // For plain markdown, use ReactMarkdown with custom image component and table support
              ContentComponent = () => React.createElement(ReactMarkdown, {
                children: content,
                components: markdownComponents, // Use the defined markdown components
                remarkPlugins: [remarkGfm], // Add remark-gfm plugin
              });
            }


            // Basic validation: check for a title and content component
            if (!frontmatter.title || !ContentComponent) {
              console.warn(`Skipping blog post ${slug} due to missing title or content component.`);
              return null; // Return null if essential data is missing
            }

            // Calculate read time based on word count (assuming 200 words per minute)
            const wordCount = content.split(/\s+/).length;
            const readTimeMinutes = Math.ceil(wordCount / 200);
            const readTime = `${readTimeMinutes} min read`;


            const { date, ...otherFrontmatter } = frontmatter; // Destructure date
            return {
              slug,
              title: otherFrontmatter.title,
              date: date ? new Date(date) : new Date(), // Store as Date object
              readTime: readTime, // Use calculated read time
              imageUrl: otherFrontmatter.imageUrl || 'https://via.placeholder.com/800x400',
              excerpt: otherFrontmatter.excerpt || 'No excerpt available',
              content: ContentComponent,
              tags: otherFrontmatter.tags || [],
              featured: otherFrontmatter.featured || false,
              draft: otherFrontmatter.draft || false // Include draft property
            };
          } catch (error) {
            console.error(`Error processing blog post ${slug}:`, error);
            return null; // Return null on error
          }
        }
      );
    }

    // If no blog posts found after processing and filtering, use sample
    if (blogPosts.length === 0) {
      console.log('No valid blog posts found, using sample');
      blogPosts = [sampleBlogPost];
    }

    const sortedBlogPosts = blogPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Process case studies using the same robust approach as blog posts
    let caseStudies: CaseStudy[] = [];
    if (Object.keys(caseStudyModules).length > 0) {
      caseStudies = await processMarkdownFiles<CaseStudy>(
        caseStudyModules,
        async (slug, module, index) => {
          try {
            let frontmatter: any = {};
            let ContentComponent: React.ComponentType<any> | undefined;
            let content = '';

            if (slug.endsWith('.mdx')) {
              const mdxModule = await import(/* @vite-ignore */ new URL(module, import.meta.url).toString());
              ContentComponent = mdxModule.default;
              frontmatter = mdxModule.attributes;
            } else {
              // It's a plain .md file, process with gray-matter and react-markdown
              const parsedMarkdown = matter(module);
              frontmatter = parsedMarkdown.data;
              content = parsedMarkdown.content;

              ContentComponent = () => React.createElement(ReactMarkdown, {
                children: content,
                components: markdownComponents, // Use the defined markdown components
                remarkPlugins: [remarkGfm], // Add remark-gfm plugin
              });
            }

            // Basic validation: check for a title and content component
            if (!frontmatter.title || !ContentComponent) {
              console.warn(`Skipping case study ${slug} due to missing title or content component.`);
              return null; // Return null on error
            }

            const { date, ...otherFrontmatter } = frontmatter; // Destructure date

            return {
              id: index !== undefined ? index + 1 : 0,
              title: otherFrontmatter.title,
              description: otherFrontmatter.description || 'No description available',
              image: otherFrontmatter.image || 'https://via.placeholder.com/800x400',
              tags: otherFrontmatter.tags || ['Sample'],
              category: otherFrontmatter.category || 'General',
              slug,
              github: otherFrontmatter.github,
              liveDemo: otherFrontmatter.liveDemo,
              content: ContentComponent,
              featured: otherFrontmatter.featured === true || otherFrontmatter.featured === 'true',
              draft: otherFrontmatter.draft || false // Include draft property
            };
          } catch (error) {
            console.error(`Error processing case study ${slug}:`, error);
            return null; // Return null on error
          }
        }
      );
    }

    // If no case studies found after processing and filtering, use sample
    if (caseStudies.length === 0) {
      console.log('No valid case studies found, using sample');
      caseStudies = [sampleCaseStudy];
    }

    console.log('Markdown initialization complete. Blog posts:', sortedBlogPosts.length, 'Case studies:', caseStudies.length);

    return {
      blogPosts: sortedBlogPosts,
      caseStudies: caseStudies,
    };

  } catch (error) {
    console.error('Error during markdown initialization:', error);
    // Return sample data instead of failing completely
    return {
      blogPosts: [sampleBlogPost],
      caseStudies: [sampleCaseStudy],
    };
  }
})();

// Export functions that await the initialization promise
export async function getBlogPosts(): Promise<BlogPost[]> {
  const { blogPosts } = await initializationPromise;
  // Filter out draft posts
  const publishedBlogPosts = blogPosts.filter(post => !post.draft);
  // Ensure we don't return just the sample if there are other posts
  return publishedBlogPosts.length > 0 ? publishedBlogPosts : [sampleBlogPost];
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const { caseStudies } = await initializationPromise;
  // Filter out draft case studies
  const publishedCaseStudies = caseStudies.filter(study => !study.draft);
   // Ensure we don't return just the sample if there are other posts
  return publishedCaseStudies.length > 0 ? publishedCaseStudies : [sampleCaseStudy];
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const { blogPosts } = await initializationPromise;
  const featured = blogPosts.filter(post => post.featured && post.slug !== 'sample-blog-post' && !post.draft); // Filter out drafts
  return featured.length > 0 ? featured : [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { blogPosts } = await initializationPromise;
  const post = blogPosts.find(post => post.slug === slug && !post.draft); // Find only published post
  return post || (slug === 'sample-blog-post' ? sampleBlogPost : undefined);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const { caseStudies } = await initializationPromise;
  const study = caseStudies.find(study => study.slug === slug && !study.draft); // Find only published study
  return study || (slug === 'sample-case-study' ? sampleCaseStudy : undefined);
}