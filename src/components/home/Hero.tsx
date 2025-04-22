import { ChevronDown, Github, Mail, Linkedin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('featured-section');
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex flex-col justify-center py-16 md:py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient -z-10" />
      
      {/* Decorative element */}
      <div className="absolute -right-20 top-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Avatar className="w-48 h-48 border-4 border-primary/20">
            <AvatarImage alt="Saurabh Alhat" src="/lovable-uploads/3ab82acf-8799-4d78-a428-1a9e58625ab3.jpg" className="object-cover" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl mb-4"
        >
          Hi, I'm <span className="text-primary">Saurabh Alhat</span>
        </motion.h1>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <a href="https://github.com/alhatsaurabh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/alhatsaurabh/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="mailto:alhatsaurabh@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail size={24} />
          </a>
        </motion.div>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-muted-foreground text-lg md:text-xl max-w-3xl mb-10"
        >
          Data analyst specializing in <span className="text-primary font-medium">AI-driven insights</span>. 
          I create innovative data projects with cutting-edge AI tools and integrate artificial intelligence 
          into data analytics workflows to transform complex data into actionable intelligence.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Button asChild size="lg" className="gap-2">
            <a href="/resume.pdf" download>
              Download CV <Download className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </motion.div>
        
        {/* Key stats/numbers */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl mb-16"
        >
          <div className="space-y-2">
            <motion.p 
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-primary"
            >
              8+
            </motion.p>
            <p className="text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div className="space-y-2">
            <motion.p 
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-primary"
            >
              50+
            </motion.p>
            <p className="text-sm text-muted-foreground">Projects Completed</p>
          </div>
          <div className="space-y-2">
            <motion.p 
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-primary"
            >
              30+
            </motion.p>
            <p className="text-sm text-muted-foreground">Happy Clients</p>
          </div>
          <div className="space-y-2">
            <motion.p 
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-primary"
            >
              15+
            </motion.p>
            <p className="text-sm text-muted-foreground">AI Tools</p>
          </div>
        </motion.div>
        
        <motion.button 
          onClick={scrollToNextSection}
          className="animate-bounce p-2 rounded-full border mt-8"
          aria-label="Scroll down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.button>
      </div>
    </motion.section>
  );
};

export default Hero;
