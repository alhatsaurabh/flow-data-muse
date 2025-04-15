
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  
  return (
    <div
      key={location.pathname}
      className="animate-fade-in min-h-screen pt-16"
    >
      {children}
    </div>
  );
};

export default PageTransition;
