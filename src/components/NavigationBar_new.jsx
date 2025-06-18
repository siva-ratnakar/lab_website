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
  ];

  // Function to hide the opposite navigation bar
  const hideOppositeNav = () => {
    const oppositeEvent = new CustomEvent(`hide-nav-${position === 'top' ? 'bottom' : 'top'}`);
    window.dispatchEvent(oppositeEvent);
  };

  // Function to show this navigation bar
  const showThisNav = () => {
    if (!isVisible) {
      hideOppositeNav(); // Hide the opposite nav first
      setIsVisible(true);
      gsap.fromTo(navRef.current,
        { y: position === 'top' ? -80 : 80, opacity: position === 'bottom' ? 0 : 1 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.inOut" }
      );
    }
  };

  // Function to hide this navigation bar
  const hideThisNav = () => {
    if (isVisible) {
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
    }

    if (position === 'bottom') {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const threshold = documentHeight - 80;

        if (scrollPosition >= threshold && !isVisible) {
          hideOppositeNav(); // Hide top nav when showing bottom nav
          setIsVisible(true);
          gsap.fromTo(navRef.current, 
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        } else if (scrollPosition < threshold && isVisible) {
          gsap.to(navRef.current, {
            y: 80, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power2.in",
            onComplete: () => setIsVisible(false)
          });
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
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
