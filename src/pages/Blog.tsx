import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageTransition from '@/components/PageTransition';
import { getBlogPosts, BlogPost } from '@/lib/markdown';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';

// Updated BlogPostCard with subtle animation
const BlogPostCard = ({ post }: { post: BlogPost }) => (
  <motion.div 
    className="h-full" 
    whileHover={{ scale: 1.02 }} // Subtle scale animation
    transition={{ type: 'spring', stiffness: 300 }} 
  >
    <Card key={post.slug} className="flex flex-col h-full border overflow-hidden group">
      <div className="relative h-48">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" // Added group-hover
        />
      </div>
      <CardHeader>
        <div className="flex flex-wrap gap-1 mb-2">
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <h3 className="text-xl font-bold">
          <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
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
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <Link to={`/blog/${post.slug}`}>
            Read More <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false); // State for search focus
  const allPosts = getBlogPosts();

  const featuredPosts = allPosts.filter(post => post.featured);
  const otherPosts = allPosts.filter(post => !post.featured);

  // Apply search filter to BOTH featured and other posts now that search is global
  const filterPosts = (posts: BlogPost[]) => {
      if (!searchQuery) return posts;
      const query = searchQuery.toLowerCase();
      return posts.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      );
  };

  const filteredFeaturedPosts = filterPosts(featuredPosts);
  const filteredOtherPosts = filterPosts(otherPosts);

  // Animation variants for staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <PageTransition>
      <div className="container px-4 md:px-6 py-24">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Data Insights Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, insights, and guides on data analytics, visualization techniques, and industry trends.
          </p>
        </div>

        <div className="relative max-w-xl mx-auto mb-16">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isSearchFocused ? 'text-primary' : 'text-muted-foreground'} h-4 w-4 transition-colors pointer-events-none`} />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10"
            />
        </div>

        {filteredFeaturedPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Articles</h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredFeaturedPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </motion.div>
          </section>
        )}

        {filteredFeaturedPosts.length > 0 && filteredOtherPosts.length > 0 && 
          <hr className="my-16 max-w-6xl mx-auto" />
        }

        {filteredOtherPosts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">
              All Articles
            </h2>
            <motion.div
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
               variants={containerVariants}
               initial="hidden"
               animate="show"
            >
                {filteredOtherPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
            </motion.div>
          </section>
        )}

        {filteredFeaturedPosts.length === 0 && filteredOtherPosts.length === 0 && searchQuery && (
             <p className="text-center text-muted-foreground"> 
                 No articles found matching your search.
              </p>
        )}
      </div>
    </PageTransition>
  );
};

export default Blog;
