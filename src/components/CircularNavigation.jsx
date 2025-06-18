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
    const buttons = buttonsRef.current.filter(Boolean);    // Function to get responsive values and layout type
    const getResponsiveValues = () => {
      const width = window.innerWidth;
      const isMobile = width <= 768;
      return {
        staggerDelay: isMobile ? 0.12 : 0.2,
        animationDuration: isMobile ? 0.5 : 0.8,
        isMobile: isMobile
      };
    };
    
    let { staggerDelay, animationDuration, isMobile } = getResponsiveValues();

    // Different animation order for mobile zigzag vs desktop circular
    const getAnimationOrder = () => {
      if (isMobile) {
        // Mobile: Animate in zigzag order (top to bottom)
        return ['left-top', 'left-bottom', 'center', 'right-bottom', 'right-top'];
      } else {
        // Desktop: Animate in circular order
        return ['left-top', 'right-top', 'center', 'left-bottom', 'right-bottom'];
      }
    };

    const animationOrder = getAnimationOrder();
    
    // Reorder buttons based on animation sequence
    const orderedButtons = animationOrder.map(position => 
      buttons.find((_, index) => navigationItems[index].position === position)
    ).filter(Boolean);    // Individual button animations with stagger - start smaller, end at normal size
    orderedButtons.forEach((button, index) => {
      if (!button) return;
      
      gsap.fromTo(button,
        { 
          opacity: 0, 
          scale: 0.1  // Start much smaller
        },
        { 
          opacity: 1, 
          scale: 1.0,  // End at normal CSS size
          duration: animationDuration,
          delay: index * staggerDelay,
          ease: isMobile ? "back.out(1.2)" : "back.out(1.7)", // Gentler bounce on mobile
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });// Enhanced scroll-based scaling - responsive to layout type
    buttons.forEach((button, index) => {
      const position = navigationItems[index].position;

      if (isMobile) {
        // Mobile: Gentle pulsing effect for zigzag layout
        gsap.to(button, {
          scale: 1.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
          }
        });
      } else {
        // Desktop: Different scaling based on position for circular layout
        if (position.includes('left') || position.includes('right')) {
          const scaleMultiplier = window.innerWidth > 1200 ? 1.15 : window.innerWidth > 768 ? 1.1 : 1.05;
          gsap.to(button, {
            scale: scaleMultiplier,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5
            }
          });
        } else if (position === 'center') {
          const scaleMultiplier = window.innerWidth > 1200 ? 1.1 : 1.05;
          gsap.to(button, {
            scale: scaleMultiplier,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5
            }
          });
        }
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
