import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CircularNavigation.css';

const CircularNavigation = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const buttonsRef = useRef([]);  const navigationItems = [
    { name: 'Team', path: '/team', position: 'left-top' },
    { name: 'Resources', path: '/resources', position: 'left-bottom' },
    { name: 'About', path: '/about', position: 'center' },
    { name: 'Reach Us', path: '/contact', position: 'right-bottom' },
    { name: 'Publications', path: '/publications', position: 'right-top' }
  ];useEffect(() => {
    // Stagger animation for buttons
    const buttons = buttonsRef.current.filter(Boolean);
      // Function to get responsive values
    const getResponsiveValues = () => {
      const width = window.innerWidth;
      return {
        staggerDelay: width < 768 ? 0.15 : 0.2,
        animationDuration: width < 768 ? 0.6 : 0.8
      };
    };
    
    let { staggerDelay, animationDuration } = getResponsiveValues();    // Individual button animations with stagger - only opacity and scale, let CSS handle positioning
    buttons.forEach((button, index) => {
      gsap.fromTo(button,
        { 
          opacity: 0, 
          scale: 0.2  // Start much smaller to prevent initial overlap
        },
        { 
          opacity: 1, 
          scale: 0.85,  // End at smaller scale to prevent overlap on load
          duration: animationDuration,
          delay: index * staggerDelay,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });// Enhanced scroll-based scaling only - let CSS handle all positioning
    buttons.forEach((button, index) => {
      const position = navigationItems[index].position;      if (position.includes('left') || position.includes('right')) {
        // Side buttons scale on scroll - from smaller base to prevent overlap
        gsap.to(button, {
          scale: 1.0,  // Scale up to normal size on scroll
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      } else if (position === 'center') {
        // Center button scales slightly more
        gsap.to(button, {
          scale: 0.95,  // Slightly smaller than sides to prevent overlap
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      }
    });// Handle window resize for responsive animations
    const handleResize = () => {
      // Update scroll triggers for responsive changes
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  const handleNavigation = (path) => {
    // Scroll to top before navigation
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <div className="circular-navigation" ref={containerRef}>
      <div className="nav-container">
        {navigationItems.map((item, index) => (
          <button
            key={item.name}
            ref={el => buttonsRef.current[index] = el}
            className={`nav-button ${item.position}`}
            onClick={() => handleNavigation(item.path)}
          >
            <span className="button-text">{item.name}</span>
            <div className="button-glow"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CircularNavigation;
