import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavigationBar from '../components/NavigationBar';
import './Team.css';

const Team = () => {
  const titleRef = useRef(null);
  const underlineRef = useRef(null);
  const teamMembersRef = useRef([]);
  // Sample team data - you can replace with actual data later
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Principal Investigator",
      description: "Dr. Johnson leads our research in molecular biology with over 15 years of experience in cellular mechanisms and genetic expression.",
      imageUrl: null // Set to null for placeholder, or add path like: "/src/assets/images/team/sarah-johnson.jpg"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Senior Research Scientist",
      description: "Specializing in biochemistry and protein analysis, Dr. Chen brings expertise in advanced laboratory techniques and methodology.",
      imageUrl: null // Set to null for placeholder, or add path like: "/src/assets/images/team/michael-chen.jpg"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Postdoctoral Researcher",
      description: "Our newest team member focuses on environmental biology and the impact of climate change on cellular processes.",
      imageUrl: null // Set to null for placeholder, or add path like: "/src/assets/images/team/emily-rodriguez.jpg"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "PhD Candidate",
      description: "James is pursuing research in computational biology, developing models for understanding complex biological systems.",
      imageUrl: null // Set to null for placeholder, or add path like: "/src/assets/images/team/james-wilson.jpg"
    }
  ];useEffect(() => {
    // Title animation
    const tl = gsap.timeline();    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(underlineRef.current,
      { width: 0 },
      { width: '200px', duration: 0.4, ease: "power2.out" },
      "-=0.3"
    );    // Team member animations - scroll dependent
    teamMembersRef.current.forEach((member, index) => {
      if (member) {
        const isEven = index % 2 === 0;
        const isLastItem = index === teamMembersRef.current.length - 1;
        
        // Set initial state
        gsap.set(member, { 
          opacity: 0, 
          x: isEven ? -150 : 150,
          scale: 0.8
        });

        // Create scroll-triggered animation
        ScrollTrigger.create({
          trigger: member,
          start: "top 85%",
          end: isLastItem ? "bottom 80%" : "top 20%", // Extend end point for last item
          scrub: 0.3,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(member, {
              opacity: progress,
              x: isEven ? -150 * (1 - progress) : 150 * (1 - progress),
              scale: 0.8 + (0.2 * progress),
              duration: 0.05,
              ease: "power2.out"
            });
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  return (
    <>
      <NavigationBar position="top" />
      <div className="team-page">
        <div className="team-header">
          <h1 ref={titleRef} className="team-title">Team</h1>
          <div ref={underlineRef} className="title-underline"></div>
        </div>

        <div className="team-content">
          <div className="container">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                ref={el => teamMembersRef.current[index] = el}
                className={`team-member ${index % 2 === 0 ? 'left' : 'right'}`}
              >              <div className="member-image">
                  {member.imageUrl ? (
                    <img 
                      src={member.imageUrl} 
                      alt={member.name}
                      className="member-photo"
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span>Photo</span>
                    </div>
                  )}
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <h4 className="member-role">{member.role}</h4>
                  <p className="member-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NavigationBar position="bottom" />
    </>
  );
};

export default Team;
