import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Wouter (client-side routing) doesn't reset scroll position on navigation the way a
// full page load does, so without this, clicking a nav link while scrolled down on the
// current page lands you at that same scroll offset on the new page. Mounted once at
// the router root so it covers every route (public, investor, ops).
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
