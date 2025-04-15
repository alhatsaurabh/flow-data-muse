
import PageTransition from '@/components/PageTransition';
import Hero from '@/components/home/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Skills from '@/components/home/Skills';
import LatestBlog from '@/components/home/LatestBlog';
import ContactCTA from '@/components/home/ContactCTA';

const Index = () => {
  return (
    <PageTransition>
      <Hero />
      <FeaturedProjects />
      <Skills />
      <LatestBlog />
      <ContactCTA />
    </PageTransition>
  );
};

export default Index;
