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
  displayOnHomepage?: boolean; // Add field to control homepage display
}

// Define interface for searchable content - Updated to include 'about'
export interface SearchableContent {
  slug: string;
  title: string;
  excerpt?: string;
  description?: string; // For case studies
  content: string; // Include raw markdown content for searching
  tags?: string[];
  category?: string; // For case studies
  type: 'blog' | 'case-study' | 'about'; // Added 'about' type, removed 'cv'
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
const sampleBlogPostRawContent = "Sample Blog Post Content"; // Raw content for sample

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
const sampleCaseStudyRawContent = "Sample Case Study Content"; // Raw content for sample

// Use a promise to manage initialization state
const initializationPromise = (async () => {
  let blogPostModules: Record<string, string> = {};
  let caseStudyModules: Record<string, string> = {};
  let aboutPageContent = '';
  // Removed cvContent variable

  try {
    blogPostModules = import.meta.glob([
      '/src/posts/blog/*.md',
      '/src/posts/blog/*.mdx',
    ], { eager: true, as: 'raw' });

    caseStudyModules = import.meta.glob([
      '/src/posts/case-studies/*.md',
      '/src/posts/case-studies/*.mdx',
    ], { eager: true, as: 'raw' });

    console.log('Blog post modules available:', Object.keys(blogPostModules).length);
    console.log('Case study modules available:', Object.keys(caseStudyModules).length);
    console.log('Blog post modules paths:', Object.keys(blogPostModules));
    console.log('Case study modules paths:', Object.keys(caseStudyModules));

  } catch (error) {
    console.error('Error initializing modules:', error);
  }

  // Fetch About page content
  try {
    const aboutPageModule = await import(/* @vite-ignore */ '/src/pages/About.tsx?raw');
    // Extract relevant text content from the About page component's JSX structure
    // This is a simplified approach; a more robust method might involve parsing the JSX or rendering it server-side
    const aboutText = aboutPageModule.default; // Get the raw content string
    // Simple regex to extract text content (adjust as needed based on About.tsx structure)
    const extractedAboutText = aboutText.match(/<p[^>]*>([\s\S]*?)<\/p>/g)?.map(p => p.replace(/<[^>]*>/g, '').trim()).join(' ') || '';
    const skillsText = aboutText.match(/name: '(.*?)',.*?level: (\d+)/g)?.map(m => m.replace(/name: '(.*?)',.*?level: (\d+)/, '$1 ($2%)')).join(', ') || '';
    const experienceText = aboutText.match(/role: '(.*?)',.*?company: '(.*?)',.*?period: '(.*?)',.*?description: '(.*?)'/g)?.map(m => m.replace(/role: '(.*?)',.*?company: '(.*?)',.*?period: '(.*?)',.*?description: '(.*?)'/, '$1 at $2 ($3): $4')).join('; ') || '';
    const educationText = aboutText.match(/degree: '(.*?)',.*?institution: '(.*?)',.*?year: '(.*?)'/g)?.map(m => m.replace(/degree: '(.*?)',.*?institution: '(.*?)',.*?year: '(.*?)'/, '$1 from $2 ($3)')).join('; ') || '';
    const certificationsText = aboutText.match(/certifications = \[(.*?)\];/s)?.[1].replace(/['"\s]/g, '').split(',').filter(Boolean).join(', ') || '';

    aboutPageContent = `${extractedAboutText} Skills: ${skillsText} Experience: ${experienceText} Education: ${educationText} Certifications: ${certificationsText}`;

    console.log('About page content extracted from About.tsx'); // Log successful extraction
  } catch (error) {
    console.error('Error fetching About page content:', error);
  }

  // Removed Fetch CV PDF content block


  // Updated processMarkdownFiles function
  async function processMarkdownFiles<T>(
    modules: Record<string, string>,
    processData: (slug: string, rawContent: string, index?: number) => Promise<{ data: T; rawContent: string } | null>
  ): Promise<{ data: T; rawContent: string }[]> {
    if (Object.keys(modules).length === 0) {
      console.warn('No modules found for processing');
      return [];
    }

    console.log('Processing markdown files, paths:', Object.keys(modules));

    const results = await Promise.all(
      Object.entries(modules).map(async ([filePath, rawContent], index) => {
        const slug = filePath.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
        console.log('Processing file:', filePath, 'with slug:', slug);
        return processData(slug, rawContent, index); // Pass rawContent directly
      })
    );

    const validResults: { data: T; rawContent: string }[] = [];
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
    let processedBlogPosts: { data: BlogPost; rawContent: string }[] = [];
    if (Object.keys(blogPostModules).length > 0) {
      processedBlogPosts = await processMarkdownFiles<BlogPost>(
        blogPostModules,
        async (slug, rawContent) => {
          try {
            const parsedMarkdown = matter(rawContent);
            const frontmatter = parsedMarkdown.data;
            const contentBody = parsedMarkdown.content; // Store the body

            let ContentComponent: React.ComponentType<any> | undefined;

            // Handle MDX vs MD for component creation
            if (slug.endsWith('.mdx')) {
               // Dynamically import the MDX file to get the component
               // Ensure the path is correct relative to the project root for dynamic import
              const mdxModule = await import(/* @vite-ignore */ `/src/posts/blog/${slug}.mdx`);
              ContentComponent = mdxModule.default;
            } else {
              // For plain markdown, use ReactMarkdown
              ContentComponent = () => React.createElement(ReactMarkdown, {
                children: contentBody,
                components: markdownComponents,
                remarkPlugins: [remarkGfm],
              });
            }

            if (!frontmatter.title || !ContentComponent) {
              console.warn(`Skipping blog post ${slug} due to missing title or content component.`);
              return null;
            }

            const wordCount = contentBody.split(/\s+/).length;
            const readTimeMinutes = Math.ceil(wordCount / 200);
            const readTime = `${readTimeMinutes} min read`;

            const { date, ...otherFrontmatter } = frontmatter;
            const blogPostData: BlogPost = {
              slug,
              title: otherFrontmatter.title,
              date: date ? new Date(date) : new Date(),
              readTime: readTime,
              imageUrl: otherFrontmatter.imageUrl || 'https://via.placeholder.com/800x400',
              excerpt: otherFrontmatter.excerpt || contentBody.substring(0, 150) + '...', // Generate excerpt if missing
              content: ContentComponent,
              tags: otherFrontmatter.tags || [],
              featured: otherFrontmatter.featured || false,
              draft: otherFrontmatter.draft || false,
              displayOnHomepage: otherFrontmatter.displayOnHomepage === undefined ? true : otherFrontmatter.displayOnHomepage
            };
            // Return object with data and the raw markdown body content
            return { data: blogPostData, rawContent: contentBody };
          } catch (error) {
            console.error(`Error processing blog post ${slug}:`, error);
            return null;
          }
        }
      );
    }

    let blogPosts: BlogPost[] = processedBlogPosts.map(p => p.data);
    if (blogPosts.length === 0 && Object.keys(blogPostModules).length === 0) { // Check if modules were empty too
      console.log('No valid blog posts found, using sample');
      blogPosts = [sampleBlogPost];
      processedBlogPosts = [{ data: sampleBlogPost, rawContent: sampleBlogPostRawContent }];
    }
    const sortedProcessedBlogPosts = processedBlogPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
    const sortedBlogPosts = sortedProcessedBlogPosts.map(p => p.data); // Get sorted BlogPost data

    // Process case studies
    let processedCaseStudies: { data: CaseStudy; rawContent: string }[] = [];
    if (Object.keys(caseStudyModules).length > 0) {
      processedCaseStudies = await processMarkdownFiles<CaseStudy>(
        caseStudyModules,
        async (slug, rawContent, index) => {
          try {
            const parsedMarkdown = matter(rawContent); // Parse frontmatter and content
            const frontmatter = parsedMarkdown.data;
            const contentBody = parsedMarkdown.content; // Store the body

            let ContentComponent: React.ComponentType<any> | undefined;
            let searchableRawContent = contentBody; // Default searchable content is the body

            if (slug.endsWith('.mdx')) {
              // Dynamically import the MDX file to get the component
              const mdxModule = await import(/* @vite-ignore */ `/src/posts/case-studies/${slug}.mdx`);
              ContentComponent = mdxModule.default;
              // If MDX body is empty, use description for search
              if (!searchableRawContent.trim() && frontmatter.description) {
                searchableRawContent = frontmatter.description;
              }
            } else {
              // For plain markdown, use ReactMarkdown
              ContentComponent = () => React.createElement(ReactMarkdown, {
                children: contentBody,
                components: markdownComponents,
                remarkPlugins: [remarkGfm],
              });
            }

            if (!frontmatter.title || !ContentComponent) {
              console.warn(`Skipping case study ${slug} due to missing title or content component.`);
              return null;
            }

            const { date, ...otherFrontmatter } = frontmatter; // Destructure date (if present)
            const caseStudyData: CaseStudy = {
              id: index !== undefined ? index + 1 : 0,
              title: otherFrontmatter.title,
              description: otherFrontmatter.description || contentBody.substring(0, 150) + '...', // Generate description if missing
              image: otherFrontmatter.image || 'https://via.placeholder.com/800x400',
              tags: otherFrontmatter.tags || ['Sample'],
              category: otherFrontmatter.category || 'General',
              slug,
              github: otherFrontmatter.github,
              liveDemo: otherFrontmatter.liveDemo,
              content: ContentComponent,
              featured: otherFrontmatter.featured === true || otherFrontmatter.featured === 'true',
              draft: otherFrontmatter.draft || false
            };
            // Return object with data and the raw content for searching
            return { data: caseStudyData, rawContent: searchableRawContent };
          } catch (error) {
            console.error(`Error processing case study ${slug}:`, error);
            return null;
          }
        }
      );
    }

    let caseStudies: CaseStudy[] = processedCaseStudies.map(p => p.data);
    if (caseStudies.length === 0 && Object.keys(caseStudyModules).length === 0) { // Check if modules were empty too
      console.log('No valid case studies found, using sample');
      caseStudies = [sampleCaseStudy];
      processedCaseStudies = [{ data: sampleCaseStudy, rawContent: sampleCaseStudyRawContent }];
    }

    console.log('Markdown initialization complete. Blog posts:', sortedBlogPosts.length, 'Case studies:', caseStudies.length);

    // Create searchable index including About page content
    const searchableContent: SearchableContent[] = [
      ...sortedProcessedBlogPosts.map(item => ({
        slug: item.data.slug,
        title: item.data.title,
        excerpt: item.data.excerpt,
        content: item.rawContent, // Use stored rawContent (markdown body)
        tags: item.data.tags,
        type: 'blog' as const,
      })),
      ...processedCaseStudies.map(item => ({
        slug: item.data.slug,
        title: item.data.title,
        description: item.data.description,
        content: item.rawContent, // Use stored rawContent (body or description)
        tags: item.data.tags,
        category: item.data.category,
        type: 'case-study' as const,
      })),
      // Add About page content to the index
      {
        slug: 'about', // Unique slug for the about page
        title: 'About Saurabh',
        content: aboutPageContent,
        type: 'about' as const,
      },
      // Removed CV content from the index
    ];

    console.log('Searchable content index created. Items:', searchableContent.length);
    console.log('Searchable content index sample:', searchableContent.slice(0, 5)); // Log a sample including new types

    return {
      blogPosts: sortedBlogPosts,
      caseStudies: caseStudies,
      searchableContent: searchableContent,
    };

  } catch (error) {
    console.error('Error during markdown initialization:', error);
    // Return minimal structure on error
    return {
      blogPosts: [sampleBlogPost],
      caseStudies: [sampleCaseStudy],
      searchableContent: [], // Return empty array on error
    };
  }
})();

// Export functions that await the initialization promise
export async function getSearchableContent(): Promise<SearchableContent[]> {
 const result = await initializationPromise;
 // Add fallback for case where initialization failed
 const searchableContent = result?.searchableContent || [];
 console.log("getSearchableContent called. Index size:", searchableContent.length);
 return searchableContent;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const result = await initializationPromise;
  const blogPosts = result?.blogPosts || [sampleBlogPost];
  // Filter out draft posts and those not marked for homepage display
  const publishedAndHomepagePosts = blogPosts.filter(post => !post.draft && post.displayOnHomepage !== false && post.slug !== 'sample-blog-post');
  // Return published or sample if none are published
  return publishedAndHomepagePosts.length > 0 ? publishedAndHomepagePosts : (blogPosts.some(p => p.slug === 'sample-blog-post') ? [sampleBlogPost] : []);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const result = await initializationPromise;
  const caseStudies = result?.caseStudies || [sampleCaseStudy];
  // Filter out draft case studies
  const publishedCaseStudies = caseStudies.filter(study => !study.draft && study.slug !== 'sample-case-study');
   // Return published or sample if none are published
  return publishedCaseStudies.length > 0 ? publishedCaseStudies : (caseStudies.some(p => p.slug === 'sample-case-study') ? [sampleCaseStudy] : []);
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const result = await initializationPromise;
  const blogPosts = result?.blogPosts || [sampleBlogPost];
  // Filter out drafts, sample post, and those not marked for homepage display
  const featured = blogPosts.filter(post => post.featured && post.slug !== 'sample-blog-post' && !post.draft && post.displayOnHomepage !== false);
  return featured; // Return empty array if none featured
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const result = await initializationPromise;
  const blogPosts = result?.blogPosts || [sampleBlogPost];
  // Find the post by slug, regardless of draft or homepage display status
  const post = blogPosts.find(post => post.slug === slug);
  return post; // Return post or undefined
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const result = await initializationPromise;
  const caseStudies = result?.caseStudies || [sampleCaseStudy];
  const study = caseStudies.find(study => study.slug === slug && !study.draft); // Find only published study
  return study; // Return study or undefined
}