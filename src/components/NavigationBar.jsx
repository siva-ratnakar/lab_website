import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './NavigationBar.css';

const NavigationBar = ({ position = 'top', sticky = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const [isVisible, setIsVisible] = useState(position === 'top');
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Resources', path: '/resources' },
    { name: 'Publications', path: '/publications' },
    { name: 'Reach Us', path: '/contact' }
  ];  // Function to hide the opposite navigation bar
  const hideOppositeNav = () => {
    const oppositeEvent = new CustomEvent(`hide-nav-${position === 'top' ? 'bottom' : 'top'}`);
    window.dispatchEvent(oppositeEvent);
  };

  // Function to show this navigation bar
  const showThisNav = () => {
    if (!isVisible) {
      hideOppositeNav(); // Hide the opposite nav first
      setIsVisible(true);
      if (navRef.current) {
        gsap.fromTo(navRef.current,
          { y: position === 'top' ? -80 : 80, opacity: position === 'bottom' ? 0 : 1 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.inOut" }
        );
      }
    }
  };

  // Function to hide this navigation bar
  const hideThisNav = () => {
    if (isVisible && navRef.current) {
      gsap.to(navRef.current, {
        y: position === 'top' ? -80 : 80,
        opacity: position === 'bottom' ? 0 : 1,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => setIsVisible(false)
      });
    }
  };

  // Listen for hide events from opposite navigation
  useEffect(() => {
    const handleHideEvent = () => {
      hideThisNav();
    };

    window.addEventListener(`hide-nav-${position}`, handleHideEvent);
    return () => window.removeEventListener(`hide-nav-${position}`, handleHideEvent);
  }, [position, isVisible]);

  useEffect(() => {
    if (position === 'top' && !sticky) {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScrollable = documentHeight - windowHeight;
        const isVeryShortPage = maxScrollable < 50;
        
        if (isVeryShortPage) {
          if (currentScrollY <= 5) {
            showThisNav();
          } else if (currentScrollY < lastScrollY) {
            showThisNav();
          } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
            hideThisNav();
          }
        } else {
          if (currentScrollY <= 10) {
            showThisNav();
          } else if (currentScrollY < lastScrollY) {
            showThisNav();
          } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
            hideThisNav();
          }
        }
        
        setLastScrollY(currentScrollY);
      };

      const handleKeyDown = (event) => {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScrollable = documentHeight - windowHeight;
        const isVeryShortPage = maxScrollable < 50;
        
        const navKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
        
        if (navKeys.includes(event.key)) {
          if (isVeryShortPage && !isVisible) {
            showThisNav();
          } else if (event.key === 'ArrowUp' || event.key === 'PageUp' || event.key === 'Home') {
            showThisNav();
          }
        }
      };

      const handleWheel = (event) => {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScrollable = documentHeight - windowHeight;
        const isVeryShortPage = maxScrollable < 50;
        
        if (isVeryShortPage) {
          if (event.deltaY < 0) {
            showThisNav();
          } else if (event.deltaY > 0) {
            setTimeout(() => {
              hideThisNav();
            }, 500);
          }
        } else {
          if (event.deltaY < 0 && !isVisible) {
            showThisNav();
          }
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('wheel', handleWheel, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('wheel', handleWheel);
      };
    }    if (position === 'bottom') {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScrollable = documentHeight - windowHeight;
        const isVeryShortPage = maxScrollable < 100; // Less than 100px of scrollable content
        
        // Add debouncing to prevent flickering
        const scrollPercentage = window.scrollY / Math.max(1, maxScrollable);
        
        // Adjust threshold based on page height with more stable zones
        let showThreshold, hideThreshold;        if (isVeryShortPage) {
          // For very short pages, use percentage-based thresholds with wider gaps
          showThreshold = 0.2; // Show when 20% scrolled (reduced from 40%)
          hideThreshold = 0.05; // Hide when back to 5% (reduced from 15%)
          
          // Additional check: show if user scrolled down at all on very short pages
          if ((scrollPercentage >= showThreshold || window.scrollY > 5) && !isVisible) {
            showThisNav();
          } else if (scrollPercentage < hideThreshold && isVisible) {
            hideThisNav();
          }
        } else {
          // For normal pages, use pixel-based thresholds with larger gaps
          const showPixelThreshold = documentHeight - 150; // Show when 150px from bottom
          const hidePixelThreshold = documentHeight - 300; // Hide when 300px from bottom - much larger gap
          
          if (scrollPosition >= showPixelThreshold && !isVisible) {
            showThisNav();
          } else if (scrollPosition < hidePixelThreshold && isVisible) {
            hideThisNav();
          }
        }
      };

      // Add keyboard and mouse wheel support for bottom nav on short pages
      const handleKeyDown = (event) => {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScrollable = documentHeight - windowHeight;
        const isVeryShortPage = maxScrollable < 100;
        
        if (isVeryShortPage) {
          const navKeys = ['ArrowDown', 'PageDown', 'End'];
            if (navKeys.includes(event.key) && !isVisible) {
            // Show bottom nav when navigating down on short pages
            showThisNav(); // Use the centralized function
          }
        }
      };      const handleWheel = (event) => {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScrollable = documentHeight - windowHeight;
        const isVeryShortPage = maxScrollable < 100;
        
        // Add small delay to prevent flickering from multiple wheel events
        clearTimeout(handleWheel.timeout);        handleWheel.timeout = setTimeout(() => {
          if (isVeryShortPage && event.deltaY > 0) {
            // Show bottom nav when scrolling down on short pages
            const currentScrollY = window.scrollY;
            const scrollPercentage = currentScrollY / Math.max(1, maxScrollable);
            
            if (scrollPercentage > 0.1 && !isVisible) { // Reduced threshold for easier triggering
              showThisNav();
            }
          } else if (!isVeryShortPage && event.deltaY > 0) {
            // For normal pages, show when scrolling down near bottom
            const currentScrollY = window.scrollY;
            const scrollPosition = currentScrollY + windowHeight;
            
            if (scrollPosition > documentHeight - 200 && !isVisible) { // Increased threshold
              showThisNav();
            }
          }
        }, 50); // 50ms debounce
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('wheel', handleWheel, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('keydown', handleKeyDown);        window.removeEventListener('wheel', handleWheel);
      };
    }
  }, [position, isVisible, sticky, lastScrollY]);
  useEffect(() => {
    if (position === 'top' && navRef.current && isVisible) {
      gsap.fromTo(navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [position, isVisible]);

  const handleNavigation = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  if ((position === 'bottom' && !isVisible) || (position === 'top' && !isVisible && !sticky)) {
    return null;
  }

  return (
    <div ref={navRef} className={`nav-wrapper ${position} ${sticky ? 'sticky' : ''}`}>
      <nav className="nav-bar">
        <div className="nav-content">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`nav-btn ${isCurrentPage(item.path) ? 'active' : ''}`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
