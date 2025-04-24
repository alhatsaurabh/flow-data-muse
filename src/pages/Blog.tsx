import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Import Tabs components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import DropdownMenu components
import PageTransition from '@/components/PageTransition';
import { getBlogPosts, BlogPost } from '@/lib/markdown';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile'; // Import useIsMobile

// Updated BlogPostCard with subtle animation
const BlogPostCard = ({
  post,
  onTagClick
}: {
  post: BlogPost;
  onTagClick: (tag: string) => void; // Add onTagClick to props
}) => (
  <motion.div
    className="h-full"
    whileHover={{ scale: 1.02 }} // Subtle scale animation
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <Link to={`/blog/${post.slug}`} key={post.slug} className="flex flex-col h-full">
      <Card className="flex flex-col h-full border overflow-hidden group">
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
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground" // Make badge clickable
                onClick={(e) => { // Prevent tag click from propagating to the card link
                  e.stopPropagation();
                  onTagClick(tag);
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-bold">
            {post.title}
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
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('all'); // New state for selected tag
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile(); // Call the hook

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const posts = await getBlogPosts();
        setAllPosts(posts);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const hasRealPosts = allPosts.length > 1 || (allPosts.length === 1 && allPosts[0].slug !== 'sample-blog-post');
  const featuredPosts = hasRealPosts ? allPosts.filter(post => post.featured) : [];
  const otherPosts = hasRealPosts ? allPosts.filter(post => !post.featured) : [];

  // Get unique tags for filtering
  const tags = ['all', ...new Set(allPosts.flatMap(post => post.tags || []))];
  const displayedTags = tags.slice(0, 7); // Show max 7 tags
  const moreTags = tags.slice(7); // Remaining tags for dropdown


  // Apply search and tag filters
  const filterPosts = (posts: BlogPost[]) => {
      const query = searchQuery.toLowerCase();
      return posts.filter(post => {
          const matchesSearch = !searchQuery ||
                               post.title.toLowerCase().includes(query) ||
                               post.excerpt.toLowerCase().includes(query) ||
                               (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)));

          const matchesTag = selectedTag === 'all' || (post.tags && post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()));

          return matchesSearch && matchesTag;
      });
  };

  const filteredFeaturedPosts = filterPosts(featuredPosts);
  const filteredOtherPosts = filterPosts(otherPosts);

  // Handler for tag clicks
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag.toLowerCase());
    setSearchQuery(''); // Clear search when a tag is selected
  };


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

  if (error) {
    return (
      <PageTransition>
        <div className="container px-4 md:px-6 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Error</h1>
            <p className="text-muted-foreground mb-8">{error}</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container px-4 md:px-6 py-24">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Data Insights Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, insights, and guides on data analytics, visualization techniques, and industry trends.
          </p>
        </div>

        <div className="relative max-w-xl mx-auto mb-8"> {/* Adjusted margin-bottom */}
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

        {/* Tags/Category Filter */}
        <div className="flex justify-center mb-12"> {/* Added margin-bottom */}
          <Tabs
            defaultValue="all"
            className="w-full max-w-4xl" // Adjusted max-width
            onValueChange={setSelectedTag}
            value={selectedTag}
          >
            {isMobile ? (
              <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
                <TabsList className="inline-flex h-auto justify-center"> {/* Removed flex-wrap */}
                  {displayedTags.map(tag => (
                    <TabsTrigger key={tag} value={tag.toLowerCase()} className="capitalize px-4 py-2">
                      {tag.replace(/-/g, ' ')}
                    </TabsTrigger>
                  ))}
                   {moreTags.length > 0 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="capitalize px-4 py-2">
                          More...
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {moreTags.map(tag => (
                          <DropdownMenuItem key={tag} onSelect={() => handleTagClick(tag)}>
                            {tag.replace(/-/g, ' ')}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TabsList>
              </div>
            ) : (
              <div className="flex justify-center">
                <TabsList className="inline-flex h-auto justify-center"> {/* Removed flex-wrap */}
                   {displayedTags.map(tag => (
                    <TabsTrigger key={tag} value={tag.toLowerCase()} className="capitalize px-4 py-2">
                      {tag.replace(/-/g, ' ')}
                    </TabsTrigger>
                  ))}
                   {moreTags.length > 0 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="capitalize px-4 py-2">
                          More...
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {moreTags.map(tag => (
                          <DropdownMenuItem key={tag} onSelect={() => handleTagClick(tag)}>
                            {tag.replace(/-/g, ' ')}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TabsList>
              </div>
            )}
          </Tabs>
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
                <BlogPostCard key={post.slug} post={post} onTagClick={handleTagClick} />
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
                   <BlogPostCard key={post.slug} post={post} onTagClick={handleTagClick} />
                 ))}
            </motion.div>
          </section>
        )}

        {filteredFeaturedPosts.length === 0 && filteredOtherPosts.length === 0 && (searchQuery || selectedTag !== 'all') && (
             <div className="text-center py-12"> {/* Added padding */}
               <p className="text-muted-foreground mb-4"> {/* Added margin-bottom */}
                   No articles found matching your criteria.
                </p>
                {(searchQuery || selectedTag !== 'all') && (
                   <Button
                       variant="outline"
                       className="mt-4"
                       onClick={() => {
                           setSearchQuery('');
                           setSelectedTag('all');
                       }}
                   >
                       Clear filters
                   </Button>
                )}
             </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Blog;
