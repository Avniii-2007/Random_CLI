import React from 'react';
import { Dumbbell } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand-wrap">
          <div className="brand-icon mini">
            <Dumbbell size={14} color="#fff" />
          </div>
          <span className="brand-name">LIFTLY</span>
          <span className="brand-tagline">— Think Less. Lift More.</span>
        </div>

        <div className="footer-links">
          <span>Free Strength & Workout Tracker</span>
          <span>Inspired by Lyfta</span>
        </div>
      </div>
    </footer>
  );
}
