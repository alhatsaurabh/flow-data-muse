
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Sales Analysis',
      description: 'Analyzed 3 years of sales data to identify trends and optimize inventory management, resulting in a 15% increase in revenue.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
      tags: ['Python', 'Tableau', 'SQL'],
      link: '/projects/ecommerce-analysis',
      github: 'https://github.com/alhatsaurabh/ecommerce-analysis',
      liveDemo: 'https://example.com/ecommerce-demo',
    },
    {
      id: 2,
      title: 'Marketing Campaign Effectiveness',
      description: 'Evaluated performance metrics across digital marketing channels to optimize ad spend and increase ROI by 22%.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
      tags: ['R', 'Google Analytics', 'Data Studio'],
      link: '/projects/marketing-analysis',
      github: 'https://github.com/alhatsaurabh/marketing-analysis',
      liveDemo: 'https://example.com/marketing-demo',
    },
    {
      id: 3,
      title: 'Customer Segmentation',
      description: 'Developed customer segments based on purchasing behavior, enabling targeted marketing strategies.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
      tags: ['Python', 'Clustering', 'Tableau'],
      link: '/projects/customer-segmentation',
      github: 'https://github.com/alhatsaurabh/customer-segmentation',
      liveDemo: 'https://example.com/segmentation-demo',
    },
  ];

  return (
    <section id="featured-section" className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore a selection of my most impactful data analysis projects and solutions.
            </p>
          </div>
          <Button asChild variant="outline" className="md:self-end">
            <Link to="/projects" className="flex items-center gap-2">
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
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
                      <Badge key={tag} variant="secondary" className="transition-all hover:bg-primary hover:text-primary-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="gap-2 w-full justify-center">
                    <Link to={project.link}>
                      View Case Study <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
