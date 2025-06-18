import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import NavigationBar from '../components/NavigationBar';

const Publications = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);
  return (
    <>
      <NavigationBar position="top" />      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 ref={titleRef} style={{
          fontSize: '4rem',
          fontWeight: '700',
          color: '#ffffff',
          marginBottom: '2rem'
        }}>
          Publications
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#cccccc',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          This page will showcase our research publications and academic contributions. 
          Content will be added later.
        </p>
      </div>
      <NavigationBar position="bottom" />
    </>
  );
};

export default Publications;
