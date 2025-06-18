import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircularNavigation from '../components/CircularNavigation';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const navigationRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial animations
    tl.fromTo(heroRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    )
    .fromTo(imageRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      "-=0.8"
    );

    // Navigation scroll trigger
    ScrollTrigger.create({
      trigger: navigationRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(navigationRef.current,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-background-image"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Biology Research
              <span className="yellow-accent"> Laboratory</span>
            </h1>
            <p className="hero-subtitle">
              Advancing scientific discovery through innovative research and collaboration
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="navigation-section" ref={navigationRef}>
        <CircularNavigation />
      </section>
    </div>
  );
};

export default Home;
