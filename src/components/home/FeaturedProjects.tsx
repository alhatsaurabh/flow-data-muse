import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCaseStudies, CaseStudy } from '@/lib/markdown';
import { useState, useEffect } from 'react';

const FeaturedProjects = () => {
  const [allCaseStudies, setAllCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projects = await getCaseStudies();
        setAllCaseStudies(projects);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const featuredCaseStudies = allCaseStudies
    .filter(project => project.featured === true)
    .slice(0, 3);

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

  if (loading) {
    return (
      <section id="featured-section" className="py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl">
                Loading featured projects...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredCaseStudies.length === 0) {
    return null;
  }

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

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {featuredCaseStudies.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
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
                    <Link to={`/projects/${project.slug}`}>
                      View Case Study <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
