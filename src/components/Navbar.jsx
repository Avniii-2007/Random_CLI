import React from 'react';
import { Dumbbell, Play, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/sound';

export function Navbar({ unit, onToggleUnit, isMuted, onToggleMute, onStartWorkout }) {
  const scrollTo = (id) => {
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-brand" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="brand-icon">
            <Dumbbell size={18} color="#fff" />
          </div>
          <span className="brand-name">LIFTLY</span>
        </a>

        <nav className="nav-links">
          <button type="button" onClick={() => scrollTo('workout-tracker')}>Tracker</button>
          <button type="button" onClick={() => scrollTo('features')}>Features</button>
          <button type="button" onClick={() => scrollTo('calculators')}>Calculators</button>
          <button type="button" onClick={() => scrollTo('exercises')}>Exercises</button>
          <button type="button" onClick={() => scrollTo('faq')}>FAQ</button>
        </nav>

        <div className="nav-actions">
          <button type="button" className="unit-toggle" onClick={onToggleUnit} title="Toggle KG / LBS">
            {unit.toUpperCase()}
          </button>

          <button
            type="button"
            className={`sound-toggle ${isMuted ? 'muted' : ''}`}
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button type="button" className="cta-btn" onClick={onStartWorkout}>
            <Play size={12} fill="#fff" />
            <span>Start Workout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
