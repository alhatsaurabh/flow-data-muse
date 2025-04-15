import { ChevronDown, Github, Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('featured-section');
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="relative min-h-screen flex flex-col justify-center py-16 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient -z-10" />
      
      {/* Decorative element */}
      <div className="absolute -right-20 top-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container px-4 md:px-6 flex flex-col items-center text-center">
        <div className="mb-8">
          <Avatar className="w-40 h-40 border-4 border-primary/20">
            <AvatarImage alt="Saurabh Alhat" src="/lovable-uploads/0b624833-0ead-4563-aab3-1abd6bde938f.jpg" className="object-none" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
        </div>
        
        <h1 className="font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl mb-4">
          Hi, I'm <span className="text-primary">Saurabh Alhat</span>
        </h1>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <a href="https://github.com/alhatsaurabh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/alhatsaurabh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="mailto:alhatsaurabh@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail size={24} />
          </a>
        </div>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mb-10">
          Data analyst specializing in <span className="text-primary font-medium">AI-driven insights</span>. 
          I create innovative data projects with cutting-edge AI tools and integrate artificial intelligence 
          into data analytics workflows to transform complex data into actionable intelligence.
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
            <p className="text-sm text-muted-foreground">AI Tools</p>
          </div>
        </div>
        
        <button onClick={scrollToNextSection} className="animate-bounce p-2 rounded-full border mt-8" aria-label="Scroll down">
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </section>;
};
export default Hero;