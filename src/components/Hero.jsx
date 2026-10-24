import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { sounds } from '../utils/sound';

export function Hero({ onStartWorkout, onExploreTools }) {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-badge">
          <Flame size={13} color="#3B82F6" />
          <span>SMART WORKOUT TRACKER</span>
        </div>

        <h1 className="hero-title">
          Think Less.<br />
          <span className="text-highlight">Lift More.</span>
        </h1>

        <p className="hero-description">
          The clean, distraction-free strength app. Log sets in seconds, calculate barbell plates effortlessly, and watch your numbers go up.
        </p>

        <div className="hero-actions">
          <button type="button" className="btn-primary" onClick={onStartWorkout}>
            <span>Log Your Workout</span>
            <ArrowRight size={16} />
          </button>
          <button type="button" className="btn-secondary" onClick={onExploreTools}>
            Plate & 1RM Calculators
          </button>
        </div>

        <div className="stats-strip">
          <div className="stat-card">
            <span className="stat-value">7M+</span>
            <span className="stat-label">Lifters</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-card">
            <span className="stat-value">600M+</span>
            <span className="stat-label">Lifts Logged</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-card">
            <span className="stat-value">4.9 ★</span>
            <span className="stat-label">App Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
