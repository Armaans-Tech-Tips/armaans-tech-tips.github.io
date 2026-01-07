import { useEffect } from 'react';

export const ThanksgivingTheme = () => {
  useEffect(() => {
    // Add a class to the body for theme styling
    document.body.classList.add('thanksgiving-theme');
    
    return () => {
      // Cleanup on unmount
      document.body.classList.remove('thanksgiving-theme');
    };
  }, []);

  return null;
};

export default ThanksgivingTheme;
