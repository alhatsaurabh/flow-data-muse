
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Sales Analysis',
      description: 'Analyzed 3 years of sales data to identify trends and optimize inventory management, resulting in a 15% increase in revenue.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
      tags: ['Python', 'Tableau', 'SQL'],
      link: '/projects/ecommerce-analysis',
    },
    {
      id: 2,
      title: 'Marketing Campaign Effectiveness',
      description: 'Evaluated performance metrics across digital marketing channels to optimize ad spend and increase ROI by 22%.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
      tags: ['R', 'Google Analytics', 'Data Studio'],
      link: '/projects/marketing-analysis',
    },
    {
      id: 3,
      title: 'Customer Segmentation',
      description: 'Developed customer segments based on purchasing behavior, enabling targeted marketing strategies.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
      tags: ['Python', 'Clustering', 'Tableau'],
      link: '/projects/customer-segmentation',
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
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden group border">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="gap-2">
                  <Link to={project.link}>
                    View Case Study <ArrowRight className="h-4 w-4" />
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

export default FeaturedProjects;
