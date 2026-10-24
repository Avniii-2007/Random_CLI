import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Trophy,
  Dumbbell,
  Star,
  ChevronDown,
  Flame,
  Clock,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/sound';

export function LandingHero({ onLaunchApp, onOpenExercises }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [demoLogged, setDemoLogged] = useState(false);

  const faqs = [
    {
      q: 'Is Liftly free to use?',
      a: 'Yes! Liftly is 100% free for logging unlimited workouts, tracking your sets, using the exercise library, and viewing your strength progress.'
    },
    {
      q: 'How does the Rest Timer work?',
      a: 'Whenever you check off a completed set, the smart rest timer automatically counts down so you stay focused and hit your next set fully recovered.'
    },
    {
      q: 'What is the Plate Calculator?',
      a: 'Our built-in plate calculator shows you the exact Olympic plates (e.g. 20kg, 10kg, 5kg) to put on each side of the barbell, eliminating any mid-workout math.'
    },
    {
      q: 'Can I track both KG and LBS?',
      a: 'Yes, easily toggle between KG and LBS anytime with one tap in the top navigation bar.'
    }
  ];

  return (
    <div className="landing-clean-container">
      {/* Hero Section */}
      <section className="clean-hero-section">
        <div className="clean-hero-badge">
          <span>SMART WORKOUT TRACKER</span>
        </div>

        <h1 className="clean-hero-title">
          Think Less.<br />
          <span className="accent-blue-text">Lift More.</span>
        </h1>

        <p className="clean-hero-subtitle">
          The clean, distraction-free strength tracker. Log sets in seconds, calculate barbell plates effortlessly, and watch your numbers go up.
        </p>

        <div className="clean-hero-cta-row">
          <button
            type="button"
            className="clean-primary-cta"
            onClick={() => { sounds.playClick(); onLaunchApp(); }}
          >
            <span>Start Tracking Free</span>
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            className="clean-secondary-cta"
            onClick={() => { sounds.playClick(); onOpenExercises(); }}
          >
            Browse 5,000+ Exercises
          </button>
        </div>

        {/* Minimal Stats Row */}
        <div className="clean-stats-row">
          <div className="clean-stat-box">
            <span className="stat-big">7M+</span>
            <span className="stat-sub">Lifters</span>
          </div>
          <div className="clean-stat-separator"></div>
          <div className="clean-stat-box">
            <span className="stat-big">600M+</span>
            <span className="stat-sub">Lifts Logged</span>
          </div>
          <div className="clean-stat-separator"></div>
          <div className="clean-stat-box">
            <span className="stat-big">4.9 ★</span>
            <span className="stat-sub">App Rating</span>
          </div>
        </div>

        {/* Interactive Clean Workout Card Preview */}
        <div className="clean-preview-card">
          <div className="preview-card-header">
            <div className="preview-header-left">
              <span className="live-dot"></span>
              <strong>Today's Push Session</strong>
            </div>
            <span className="preview-timer"><Clock size={13} /> 28:40</span>
          </div>

          <div className="preview-exercise-item">
            <div className="preview-ex-title-row">
              <span className="preview-ex-name">Barbell Bench Press</span>
              <span className="preview-ex-tag">Chest</span>
            </div>

            <div className="preview-set-row done">
              <span className="set-num">Set 1</span>
              <span className="set-data">80 kg × 8 reps</span>
              <span className="set-badge-done">Completed ✓</span>
            </div>

            <div className={`preview-set-row ${demoLogged ? 'done' : 'active'}`}>
              <span className="set-num">Set 2</span>
              <span className="set-data">85 kg × 6 reps</span>
              {demoLogged ? (
                <span className="set-badge-done">Completed ✓</span>
              ) : (
                <button
                  type="button"
                  className="preview-tap-btn"
                  onClick={() => {
                    sounds.playSetComplete();
                    setDemoLogged(true);
                  }}
                >
                  Tap to Log Set
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            className="preview-open-full-btn"
            onClick={() => { sounds.playClick(); onLaunchApp(); }}
          >
            Open Active Workout →
          </button>
        </div>
      </section>

      {/* 3 Core Pillars (Clean, elegant, non-cluttered) */}
      <section className="clean-features-section">
        <div className="clean-features-grid">
          <div className="clean-feature-card">
            <div className="feature-icon-box">
              <Dumbbell size={22} color="#3B82F6" />
            </div>
            <h3>Log Workouts</h3>
            <p>
              Log your sets, reps, and weights effortlessly. Previous performance is remembered automatically so you always know what to beat.
            </p>
          </div>

          <div className="clean-feature-card">
            <div className="feature-icon-box">
              <TrendingUp size={22} color="#10B981" />
            </div>
            <h3>Progressive Overload</h3>
            <p>
              Built-in Olympic plate calculator and scientific 1RM projections eliminate guesswork and help you safely push for new records.
            </p>
          </div>

          <div className="clean-feature-card">
            <div className="feature-icon-box">
              <Trophy size={22} color="#F59E0B" />
            </div>
            <h3>See Real Gains</h3>
            <p>
              Visual volume charts, streak counters, and milestone celebration badges keep your motivation high every single week.
            </p>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="clean-faq-section">
        <div className="clean-section-title">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="clean-faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className={`clean-faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="clean-faq-q"
                  onClick={() => {
                    sounds.playClick();
                    setActiveFaq(isOpen ? null : idx);
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className={`faq-arrow ${isOpen ? 'rotated' : ''}`} />
                </button>
                {isOpen && (
                  <div className="clean-faq-a">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Clean Bottom Banner */}
      <section className="clean-bottom-banner">
        <h2>Ready to make serious gains?</h2>
        <p>Start tracking your workouts today with zero friction.</p>
        <button
          type="button"
          className="clean-primary-cta"
          onClick={() => { sounds.playClick(); onLaunchApp(); }}
        >
          <span>Get Started Free</span>
          <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
}
