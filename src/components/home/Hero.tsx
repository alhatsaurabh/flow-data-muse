
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('featured-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient -z-10" />
      
      {/* Decorative element */}
      <div className="absolute -right-20 top-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container px-4 md:px-6 flex flex-col items-center text-center">
        <h1 className="font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl mb-6">
          Turning Data into
          <span className="text-primary"> Actionable Insights</span>
        </h1>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mb-10">
          Data analyst specializing in transforming complex data into clear, actionable insights.
          Using advanced analytics to help businesses make data-driven decisions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button asChild size="lg" className="px-8">
            <Link to="/projects">View Projects</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
        
        {/* Key stats/numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl mb-16">
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-bold text-primary">8+</p>
            <p className="text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-bold text-primary">50+</p>
            <p className="text-sm text-muted-foreground">Projects Completed</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-bold text-primary">30+</p>
            <p className="text-sm text-muted-foreground">Happy Clients</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-bold text-primary">15+</p>
            <p className="text-sm text-muted-foreground">Data Tools</p>
          </div>
        </div>
        
        <button 
          onClick={scrollToNextSection}
          className="animate-bounce p-2 rounded-full border mt-8"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
