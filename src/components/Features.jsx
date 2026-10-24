import React from 'react';
import { Dumbbell, TrendingUp, Trophy } from 'lucide-react';

export function Features() {
  const items = [
    {
      icon: Dumbbell,
      color: 'blue',
      title: '1. Log Workouts',
      description: 'Log weights, reps, and sets in seconds. Previous numbers are remembered automatically so you never second-guess your working loads.'
    },
    {
      icon: TrendingUp,
      color: 'emerald',
      title: '2. Progressive Overload',
      description: 'Smart rest timers ensure recovery between heavy sets, while instant 1RM formulas help calculate ideal percentage loads safely.'
    },
    {
      icon: Trophy,
      color: 'amber',
      title: '3. See Real Gains',
      description: 'Watch your total volume and PR milestones grow week over week with clear visual charts and celebration fireworks.'
    }
  ];

  return (
    <section id="features" className="page-section">
      <div className="section-header">
        <span className="section-pill">BUILT FOR LIFTERS</span>
        <h2>Everything You Need to Get Stronger</h2>
        <p>No bloat, no ads, no confusing menus. Just pure progressive overload.</p>
      </div>

      <div className="features-grid">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="feature-card">
              <div className={`feature-icon ${item.color}`}>
                <Icon size={22} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
