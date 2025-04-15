
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const LatestBlog = () => {
  const posts = [
    {
      id: 1,
      title: 'The Future of Data Analytics in 2025',
      excerpt: 'Exploring emerging trends and technologies that will shape the data analytics landscape in the coming years.',
      date: 'April 10, 2025',
      readTime: '6 min read',
      slug: '/blog/future-of-data-analytics',
    },
    {
      id: 2,
      title: 'How to Effectively Visualize Complex Datasets',
      excerpt: 'A comprehensive guide to selecting the right visualization methods for different types of data.',
      date: 'March 28, 2025',
      readTime: '8 min read',
      slug: '/blog/visualize-complex-datasets',
    },
    {
      id: 3,
      title: 'SQL vs NoSQL: Choosing the Right Database',
      excerpt: 'An in-depth comparison of relational and non-relational databases for different use cases.',
      date: 'March 15, 2025',
      readTime: '5 min read',
      slug: '/blog/sql-vs-nosql',
    },
    {
      id: 4,
      title: 'Machine Learning for Business Intelligence',
      excerpt: 'How organizations are leveraging machine learning algorithms to gain competitive advantages.',
      date: 'February 22, 2025',
      readTime: '7 min read',
      slug: '/blog/machine-learning-business-intelligence',
    },
  ];

  return (
    <section className="bg-muted/50 py-24">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col h-full border">
              <CardHeader>
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
    </section>
  );
};

export default LatestBlog;
