
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-8xl font-bold text-primary mb-6">404</h1>
        <p className="text-2xl font-medium mb-4">Page Not Found</p>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="gap-2">
          <Link to="/">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
