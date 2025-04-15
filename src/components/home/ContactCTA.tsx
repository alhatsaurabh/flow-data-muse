
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ContactCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="absolute -left-20 bottom-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute right-20 top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Have a data challenge that needs solving? I'm here to help transform your data into actionable insights.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/contact">
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
