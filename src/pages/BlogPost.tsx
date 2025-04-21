import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { Badge } from '@/components/ui/badge';
import { getBlogPostBySlug } from '@/lib/markdown';
import { MDXProvider } from '@mdx-js/react';
import { MDXRemote } from 'next-mdx-remote';
import { useEffect, useState } from 'react';
import { BlogPost as BlogPostType } from '@/lib/markdown';

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold mb-4">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold mb-3">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold mb-2">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc pl-6 mb-4">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal pl-6 mb-4">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="mb-2">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <img src={src} alt={alt} className="rounded-lg my-4" />
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-muted px-2 py-1 rounded">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">{children}</pre>
  ),
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        if (!slug) {
          setError('No slug provided');
          setLoading(false);
          return;
        }
        const fetchedPost = await getBlogPostBySlug(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);
  
  if (loading) {
    return (
      <PageTransition>
        <div className="container px-4 md:px-6 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Loading...</h1>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error || !post) {
    return (
      <PageTransition>
        <div className="container px-4 md:px-6 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Post Not Found</h1>
            <p className="text-muted-foreground mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article className="container px-4 md:px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <div className="text-muted-foreground">
              {post.date} · {post.readTime}
            </div>
          </header>

          <div className="aspect-video relative mb-8">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXProvider components={components}>
              <MDXRemote {...post.content} />
            </MDXProvider>
          </div>
        </div>
      </article>
    </PageTransition>
  );
};

export default BlogPost; 