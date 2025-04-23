import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBlogPosts, BlogPost } from '@/lib/markdown';
import React from 'react';

const LatestBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestBlogPosts = async () => {
      try {
        setLoading(true);
        const blogPosts = await getBlogPosts();
        setPosts(blogPosts.slice(0, 3)); // Get only the latest 3 posts
      } catch (err) {
        console.error('Error fetching latest blog posts:', err);
        setError('Failed to load latest blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogPosts();
  }, []);

  return (
    <section id="latest-insights-section" className="bg-muted/50 py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Latest Insights</h2>
            <p className="text-muted-foreground max-w-2xl">
              Read my latest articles and thoughts on data analytics, visualization, and industry trends.
            </p>
          </div>
          <Button asChild variant="outline" className="md:self-end">
            <Link to="/blog" className="flex items-center gap-2">
              View All Articles <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div>Loading latest blog posts...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post.slug} className="flex flex-col h-full border">
                <CardHeader>
                  <h3 className="text-xl font-bold">
                    <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date.toDateString()}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="gap-2">
                    <Link to={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBlog;
