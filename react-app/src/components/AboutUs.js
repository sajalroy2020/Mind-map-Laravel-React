import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-header">
        <h1>About Us</h1>
        <p className="tagline">Building Better Minds Through Connected Thinking</p>
      </div>
      
      <div className="about-content">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            We are dedicated to revolutionizing the way people organize and connect their thoughts.
            Our mind mapping tool helps individuals and teams visualize ideas, make connections,
            and unlock their creative potential.
          </p>
        </section>

        <section className="features-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Intuitive Design</h3>
              <p>Simple and easy-to-use interface that makes mind mapping accessible to everyone.</p>
            </div>
            <div className="feature-card">
              <h3>Real-time Collaboration</h3>
              <p>Work together with your team in real-time to build and expand your mind maps.</p>
            </div>
            <div className="feature-card">
              <h3>Smart Organization</h3>
              <p>Efficiently organize your thoughts with our intelligent node management system.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Our Team</h2>
          <p>
            We are a passionate team of developers, designers, and thought leaders
            committed to creating the best mind mapping experience for our users.
          </p>
        </section>

        <section className="contact-section">
          <h2>Get in Touch</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you!<br />
            Email us at: <a href="mailto:contact@mindmap.com">contact@mindmap.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs; 