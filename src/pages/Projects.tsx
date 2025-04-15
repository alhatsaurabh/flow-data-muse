
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Sales Analysis',
      description: 'Analyzed 3 years of sales data to identify trends and optimize inventory management, resulting in a 15% increase in revenue.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
      tags: ['Python', 'Tableau', 'SQL'],
      category: 'business-intelligence',
      slug: '/projects/ecommerce-analysis',
    },
    {
      id: 2,
      title: 'Marketing Campaign Effectiveness',
      description: 'Evaluated performance metrics across digital marketing channels to optimize ad spend and increase ROI by 22%.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
      tags: ['R', 'Google Analytics', 'Data Studio'],
      category: 'marketing',
      slug: '/projects/marketing-analysis',
    },
    {
      id: 3,
      title: 'Customer Segmentation',
      description: 'Developed customer segments based on purchasing behavior, enabling targeted marketing strategies.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
      tags: ['Python', 'Clustering', 'Tableau'],
      category: 'machine-learning',
      slug: '/projects/customer-segmentation',
    },
    {
      id: 4,
      title: 'Financial Forecasting Model',
      description: 'Created a time series forecasting model to predict quarterly revenue with 92% accuracy.',
      image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070',
      tags: ['Python', 'Time Series', 'Forecasting'],
      category: 'financial',
      slug: '/projects/financial-forecasting',
    },
    {
      id: 5,
      title: 'Supply Chain Optimization',
      description: 'Analyzed logistics data to identify bottlenecks and reduce delivery times by 24%.',
      image: 'https://images.unsplash.com/photo-1566666348582-1a1b98de2d3e?q=80&w=1974',
      tags: ['Power BI', 'SQL', 'Process Analysis'],
      category: 'business-intelligence',
      slug: '/projects/supply-chain-optimization',
    },
    {
      id: 6,
      title: 'Social Media Sentiment Analysis',
      description: 'Employed NLP techniques to analyze customer sentiment across social media platforms.',
      image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2070',
      tags: ['Python', 'NLP', 'Sentiment Analysis'],
      category: 'machine-learning',
      slug: '/projects/sentiment-analysis',
    },
    {
      id: 7,
      title: 'Healthcare Patient Flow Analysis',
      description: 'Analyzed hospital patient data to optimize staff scheduling and reduce wait times by 35%.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070',
      tags: ['R', 'Tableau', 'Healthcare Analytics'],
      category: 'healthcare',
      slug: '/projects/healthcare-patient-flow',
    },
    {
      id: 8,
      title: 'Real Estate Market Trends',
      description: 'Geographic analysis of housing prices and market trends to identify investment opportunities.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073',
      tags: ['GIS', 'Tableau', 'Statistical Analysis'],
      category: 'financial',
      slug: '/projects/real-estate-trends',
    },
  ];

  // Filter projects based on active tab
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <PageTransition>
      <section className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Data Projects</h1>
            <p className="text-muted-foreground text-lg">
              Explore my portfolio of data analytics projects across various industries and domains.
              Each project showcases different analytical techniques and business solutions.
            </p>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="business-intelligence">Business Intelligence</TabsTrigger>
                <TabsTrigger value="machine-learning">Machine Learning</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
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
                    <Link to={project.slug}>
                      View Case Study <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Projects;
