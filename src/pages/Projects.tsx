import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, ExternalLink, Github, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const isMobile = useIsMobile();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Reset to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle horizontal scroll on mobile with touch
  useEffect(() => {
    if (!isMobile || !scrollAreaRef.current) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollLeft += e.deltaY;
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
        }
      }
    };

    const currentRef = scrollAreaRef.current;
    currentRef.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isMobile]);

  const projects = [
    {
      id: 1,
      title: 'E-commerce Sales Analysis',
      description: 'Analyzed 3 years of sales data to identify trends and optimize inventory management, resulting in a 15% increase in revenue.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
      tags: ['Python', 'Tableau', 'SQL'],
      category: 'business-intelligence',
      slug: '/projects/ecommerce-analysis',
      github: 'https://github.com/alhatsaurabh/ecommerce-analysis',
      liveDemo: 'https://example.com/ecommerce-demo',
    },
    {
      id: 2,
      title: 'Marketing Campaign Effectiveness',
      description: 'Evaluated performance metrics across digital marketing channels to optimize ad spend and increase ROI by 22%.',
      image: 'https://images.unsplash.com/photo-1460926653458-09294b3142bf?q=80&w=2015',
      tags: ['R', 'Google Analytics', 'Data Studio'],
      category: 'marketing',
      slug: '/projects/marketing-analysis',
      github: 'https://github.com/alhatsaurabh/marketing-analysis',
      liveDemo: 'https://example.com/marketing-demo',
    },
    {
      id: 3,
      title: 'Customer Segmentation',
      description: 'Developed customer segments based on purchasing behavior, enabling targeted marketing strategies.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
      tags: ['Python', 'Clustering', 'Tableau'],
      category: 'machine-learning',
      slug: '/projects/customer-segmentation',
      github: 'https://github.com/alhatsaurabh/customer-segmentation',
      liveDemo: 'https://example.com/segmentation-demo',
    },
    {
      id: 4,
      title: 'Financial Forecasting Model',
      description: 'Created a time series forecasting model to predict quarterly revenue with 92% accuracy.',
      image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070',
      tags: ['Python', 'Time Series', 'Forecasting'],
      category: 'financial',
      slug: '/projects/financial-forecasting',
      github: 'https://github.com/alhatsaurabh/financial-forecasting',
      liveDemo: 'https://example.com/forecasting-demo',
    },
    {
      id: 5,
      title: 'Supply Chain Optimization',
      description: 'Analyzed logistics data to identify bottlenecks and reduce delivery times by 24%.',
      image: 'https://images.unsplash.com/photo-1566666348582-1a1b98de2d3e?q=80&w=1974',
      tags: ['Power BI', 'SQL', 'Process Analysis'],
      category: 'business-intelligence',
      slug: '/projects/supply-chain-optimization',
      github: 'https://github.com/alhatsaurabh/supply-chain',
      liveDemo: 'https://example.com/supply-chain-demo',
    },
    {
      id: 6,
      title: 'Social Media Sentiment Analysis',
      description: 'Employed NLP techniques to analyze customer sentiment across social media platforms.',
      image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2070',
      tags: ['Python', 'NLP', 'Sentiment Analysis'],
      category: 'machine-learning',
      slug: '/projects/sentiment-analysis',
      github: 'https://github.com/alhatsaurabh/sentiment-analysis',
      liveDemo: 'https://example.com/sentiment-demo',
    },
    {
      id: 7,
      title: 'Healthcare Patient Flow Analysis',
      description: 'Analyzed hospital patient data to optimize staff scheduling and reduce wait times by 35%.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070',
      tags: ['R', 'Tableau', 'Healthcare Analytics'],
      category: 'healthcare',
      slug: '/projects/healthcare-patient-flow',
      github: 'https://github.com/alhatsaurabh/healthcare-flow',
      liveDemo: 'https://example.com/healthcare-demo',
    },
    {
      id: 8,
      title: 'Real Estate Market Trends',
      description: 'Geographic analysis of housing prices and market trends to identify investment opportunities.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073',
      tags: ['GIS', 'Tableau', 'Statistical Analysis'],
      category: 'financial',
      slug: '/projects/real-estate-trends',
      github: 'https://github.com/alhatsaurabh/real-estate-trends',
      liveDemo: 'https://example.com/real-estate-demo',
    },
  ];

  // Filter projects based on active tab and search query
  const filteredProjects = projects.filter(project => {
    const matchesTab = activeTab === 'all' || project.category === activeTab;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const renderProjectCard = (project) => (
    <motion.div key={project.id} variants={item} className="h-full">
      <Card className="overflow-hidden group border h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                aria-label="View GitHub Repository"
              >
                <Github className="h-5 w-5 text-white" />
              </a>
            )}
            {project.liveDemo && (
              <a 
                href={project.liveDemo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                aria-label="View Live Demo"
              >
                <ExternalLink className="h-5 w-5 text-white" />
              </a>
            )}
          </div>
        </div>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="transition-all hover:bg-primary hover:text-primary-foreground cursor-pointer"
                onClick={() => setSearchQuery(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="ghost" className="gap-2 w-full justify-center">
            <Link to={project.slug}>
              View Case Study <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );

  return (
    <PageTransition>
      <section className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Data Projects</h1>
            <p className="text-muted-foreground text-lg">
              Explore my portfolio of data analytics projects across various industries and domains.
              Each project showcases different analytical techniques and business solutions.
            </p>
            
            {/* Search bar */}
            <div className="relative max-w-md mx-auto mt-8">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isSearchFocused ? 'text-primary' : 'text-muted-foreground'} h-4 w-4 transition-colors`} />
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-10 transition-all border-muted-foreground/30 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          <div className="mb-8">
            {isMobile ? (
              <div className="overflow-x-auto pb-4 hide-scrollbar" ref={scrollAreaRef}>
                <div className="flex min-w-max px-1">
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="bg-muted/60 inline-flex w-max">
                      <TabsTrigger value="all">All Projects</TabsTrigger>
                      <TabsTrigger value="business-intelligence">Business Intelligence</TabsTrigger>
                      <TabsTrigger value="machine-learning">Machine Learning</TabsTrigger>
                      <TabsTrigger value="financial">Financial</TabsTrigger>
                      <TabsTrigger value="marketing">Marketing</TabsTrigger>
                      <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            ) : (
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <div className="flex justify-center">
                  <TabsList className="bg-muted/60">
                    <TabsTrigger value="all">All Projects</TabsTrigger>
                    <TabsTrigger value="business-intelligence">Business Intelligence</TabsTrigger>
                    <TabsTrigger value="machine-learning">Machine Learning</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                    <TabsTrigger value="marketing">Marketing</TabsTrigger>
                    <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            )}
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredProjects.map(renderProjectCard)}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No projects found matching your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Projects;
