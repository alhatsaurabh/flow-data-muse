import { useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { Badge } from '@/components/ui/badge';
import { getCaseStudyBySlug } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProjectPost = () => {
  const { slug } = useParams();
  const project = getCaseStudyBySlug(slug || '');

  if (!project) {
    return (
      <PageTransition>
        <div className="container px-4 md:px-6 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Project Not Found</h1>
            <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article className="container px-4 md:px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </header>

          <div className="aspect-video relative mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
          </div>

          <div className="flex gap-4">
            {project.github && (
              <Button asChild variant="outline">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            )}
            {project.liveDemo && (
              <Button asChild>
                <a 
                  href={project.liveDemo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </article>
    </PageTransition>
  );
};

export default ProjectPost; 