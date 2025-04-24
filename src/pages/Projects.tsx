import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import DropdownMenu components
import PageTransition from '@/components/PageTransition';
import { getCaseStudies, CaseStudy } from '@/lib/markdown';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, Github, Search, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const ProjectCard = ({ 
  project, 
  onTagClick
}: {
  project: CaseStudy;
  onTagClick: (tag: string) => void;
}) => (
  <motion.div
    key={project.id}
    className="h-full"
    whileHover={{ scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <Link to={`/projects/${project.slug}`} className="flex flex-col h-full">
      <Card className="flex flex-col h-full border overflow-hidden group">
        <div className="relative h-52 overflow-hidden">
          <img
            src={project.image.startsWith('http') ? project.image : `/images/${project.image}`}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                  aria-label="View GitHub Repository"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-5 w-5 text-white" />
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                  aria-label="View Live Demo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-5 w-5 text-white" />
                </a>
              )}
          </div>
        </div>
        <CardContent className="p-6 flex-grow">
          <h3 className="text-xl font-bold mb-2">
              {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground"
                onClick={(e) => { // Prevent tag click from propagating to the card link
                  e.stopPropagation();
                  onTagClick(tag);
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const fetchedProjects = await getCaseStudies();
        setProjects(fetchedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const categories = useMemo(() => 
    ['all', ...new Set(projects.map(p => p.category))]
  , [projects]);

  const filteredProjects = projects.filter(project => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery ||
                         project.title.toLowerCase().includes(query) ||
                         project.description.toLowerCase().includes(query) ||
                         project.tags.some(tag => tag.toLowerCase().includes(query));
    
    const matchesCategory = selectedCategory === 'all' || project.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const renderTabsList = () => {
   const displayedCategories = categories.slice(0, 7); // Show max 7 categories
   const moreCategories = categories.slice(7); // Remaining categories for dropdown

   return (
     <TabsList className={`inline-flex h-auto ${isMobile ? 'rounded-md w-max' : 'justify-center'}`}>
       {displayedCategories.map(category => (
         <TabsTrigger key={category} value={category.toLowerCase()} className="capitalize px-4 py-2">
             {category.replace(/-/g, ' ')}
         </TabsTrigger>
       ))}
       {moreCategories.length > 0 && (
         <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button variant="ghost" className="capitalize px-4 py-2">
               More...
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent>
             {moreCategories.map(category => (
               <DropdownMenuItem key={category} onSelect={() => setSelectedCategory(category.toLowerCase())}>
                 {category.replace(/-/g, ' ')}
               </DropdownMenuItem>
             ))}
           </DropdownMenuContent>
         </DropdownMenu>
       )}
     </TabsList>
   );
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
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Data Projects</h1>
          <p className="text-xl text-muted-foreground">
             Explore my portfolio of data analytics projects across various industries and domains. 
             Each project showcases different analytical techniques and business solutions.
          </p>
        </div>

        <div className="relative max-w-xl mx-auto mb-8">
           <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isSearchFocused ? 'text-primary' : 'text-muted-foreground'} h-4 w-4 transition-colors pointer-events-none`} />
           <Input
             type="text"
             placeholder="Search projects..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             onFocus={() => setIsSearchFocused(true)}
             onBlur={() => setIsSearchFocused(false)}
             className="w-full pl-10"
           />
        </div>

        <Tabs 
            defaultValue="all" 
            className="w-full mb-12" 
            onValueChange={setSelectedCategory} 
            value={selectedCategory}
        >
          {isMobile ? (
            <div 
              className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent"
            >
               {renderTabsList()} 
            </div>
          ) : (
            <div className="flex justify-center">
              {renderTabsList()}
            </div>
          )}
        </Tabs>

        {filteredProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onTagClick={handleTagClick}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
             <p className="text-muted-foreground">No projects found matching your criteria.</p>
             {(searchQuery || selectedCategory !== 'all') && (
                <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
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

export default Projects;
