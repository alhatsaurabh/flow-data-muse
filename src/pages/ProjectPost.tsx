import { useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { Badge } from '@/components/ui/badge';
import { getCaseStudyBySlug, CaseStudy } from '@/lib/markdown.tsx';
import { MDXProvider } from '@mdx-js/react';
// import { MDXRemote } from 'next-mdx-remote'; // Removed next-mdx-remote
import { useEffect, useState } from 'react';

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold mb-4">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold mb-3">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold mb-2">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc pl-6 mb-4">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal pl-6 mb-4">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="mb-2">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <img src={src} alt={alt} className="rounded-lg my-4" />
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-muted px-2 py-1 rounded">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">{children}</pre>
  ),
};

const ProjectPost = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        if (!slug) {
          setError('No slug provided');
          setLoading(false);
          return;
        }
        const fetchedProject = await getCaseStudyBySlug(slug);
        if (fetchedProject) {
          setProject(fetchedProject);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <PageTransition>
        <div className="container px-4 md:px-6 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Loading...</h1>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error || !project) {
    return (
      <PageTransition>
        <div className="container px-4 md:px-6 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Project Not Found</h1>
            <p className="text-muted-foreground mb-8">{error || "The project you're looking for doesn't exist."}</p>
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
            <MDXProvider components={components}>
              {/* Render the MDX component directly */}
              {project.content && <project.content />}
            </MDXProvider>
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