
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Data Analytics in 2025',
      excerpt: 'Exploring emerging trends and technologies that will shape the data analytics landscape in the coming years.',
      date: 'April 10, 2025',
      readTime: '6 min read',
      categories: ['Trends', 'Technology'],
      slug: '/blog/future-of-data-analytics',
      featured: true,
    },
    {
      id: 2,
      title: 'How to Effectively Visualize Complex Datasets',
      excerpt: 'A comprehensive guide to selecting the right visualization methods for different types of data.',
      date: 'March 28, 2025',
      readTime: '8 min read',
      categories: ['Visualization', 'Best Practices'],
      slug: '/blog/visualize-complex-datasets',
      featured: false,
    },
    {
      id: 3,
      title: 'SQL vs NoSQL: Choosing the Right Database',
      excerpt: 'An in-depth comparison of relational and non-relational databases for different use cases.',
      date: 'March 15, 2025',
      readTime: '5 min read',
      categories: ['Databases', 'Technology'],
      slug: '/blog/sql-vs-nosql',
      featured: false,
    },
    {
      id: 4,
      title: 'Machine Learning for Business Intelligence',
      excerpt: 'How organizations are leveraging machine learning algorithms to gain competitive advantages.',
      date: 'February 22, 2025',
      readTime: '7 min read',
      categories: ['Machine Learning', 'Business'],
      slug: '/blog/machine-learning-business-intelligence',
      featured: false,
    },
    {
      id: 5,
      title: 'The Importance of Data Governance',
      excerpt: 'Why establishing clear data governance policies is crucial for organizations of all sizes.',
      date: 'February 10, 2025',
      readTime: '5 min read',
      categories: ['Governance', 'Best Practices'],
      slug: '/blog/importance-of-data-governance',
      featured: false,
    },
    {
      id: 6,
      title: 'Real-time Analytics: Benefits and Challenges',
      excerpt: 'Exploring the advantages and obstacles of implementing real-time analytics solutions.',
      date: 'January 28, 2025',
      readTime: '6 min read',
      categories: ['Analytics', 'Technology'],
      slug: '/blog/real-time-analytics',
      featured: false,
    },
    {
      id: 7,
      title: 'Data Ethics in the Age of AI',
      excerpt: 'Examining ethical considerations and responsibilities when working with data and AI.',
      date: 'January 15, 2025',
      readTime: '9 min read',
      categories: ['Ethics', 'AI'],
      slug: '/blog/data-ethics-ai',
      featured: true,
    },
    {
      id: 8,
      title: 'Predictive Analytics in Healthcare',
      excerpt: 'How predictive models are revolutionizing patient care and hospital operations.',
      date: 'January 5, 2025',
      readTime: '7 min read',
      categories: ['Healthcare', 'Predictive Analytics'],
      slug: '/blog/predictive-analytics-healthcare',
      featured: false,
    },
  ];

  // Filter blog posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Separate featured posts
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <PageTransition>
      <section className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Data Insights Blog</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thoughts, insights, and guides on data analytics, visualization techniques, and industry trends.
            </p>
            
            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="flex flex-col h-full border">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((category) => (
                          <Badge key={category} variant="secondary">{category}</Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold">
                        <Link to={post.slug} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="gap-2">
                        <Link to={post.slug}>
                          Read More <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-6">All Articles</h2>
            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="flex flex-col h-full border">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((category) => (
                          <Badge key={category} variant="secondary">{category}</Badge>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold">
                        <Link to={post.slug} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" size="sm" className="gap-2">
                        <Link to={post.slug}>
                          Read More <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Blog;
