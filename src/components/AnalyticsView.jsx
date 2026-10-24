import React, { useState } from 'react';
import { Trophy, TrendingUp, Calendar, Zap, Award, Flame, Dumbbell, ShieldCheck, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/sound';

export function AnalyticsView({ unit = 'kg' }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const weeklyVolume = [
    { week: 'W1', volume: 18400, workouts: 4 },
    { week: 'W2', volume: 22100, workouts: 5 },
    { week: 'W3', volume: 19800, workouts: 4 },
    { week: 'W4', volume: 24650, workouts: 5 },
    { week: 'W5', volume: 26200, workouts: 5 },
    { week: 'W6', volume: 28900, workouts: 6 }
  ];

  const maxVol = Math.max(...weeklyVolume.map(w => w.volume));

  // Big 4 PRs
  const personalRecords = [
    { exercise: 'Barbell Bench Press', weight: 115, date: 'Yesterday', reps: '3 reps', badge: 'GOLD' },
    { exercise: 'Barbell Back Squat', weight: 150, date: '3 days ago', reps: '5 reps', badge: 'GOLD' },
    { exercise: 'Conventional Deadlift', weight: 185, date: '1 week ago', reps: '3 reps', badge: 'PLATINUM' },
    { exercise: 'Standing Overhead Press', weight: 72.5, date: '2 weeks ago', reps: '5 reps', badge: 'SILVER' },
    { exercise: 'Weighted Pull-Up', weight: 25, date: '3 weeks ago', reps: '6 reps', badge: 'SILVER' }
  ];

  // Strength standards radar points (0 to 100)
  // Squat: 82, Bench: 78, Deadlift: 88, OHP: 70, Pullup: 75
  const radarAxes = [
    { name: 'Squat', value: 82, label: 'Advanced' },
    { name: 'Bench', value: 78, label: 'Advanced' },
    { name: 'Deadlift', value: 88, label: 'Elite' },
    { name: 'OHP', value: 70, label: 'Interm.' },
    { name: 'Pull-Up', value: 75, label: 'Advanced' }
  ];

  return (
    <div className="analytics-view-container">
      {/* Hero Stats Ribbon */}
      <div className="analytics-metrics-ribbon">
        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-icon-wrap cyan">
              <Dumbbell size={18} />
            </span>
            <span className="metric-trend up">+14.2%</span>
          </div>
          <div className="metric-value">130,050 <span className="metric-unit">{unit}</span></div>
          <div className="metric-label">30-Day Total Volume</div>
        </div>

        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-icon-wrap emerald">
              <Flame size={18} />
            </span>
            <span className="metric-trend up">Streak</span>
          </div>
          <div className="metric-value">15 Days</div>
          <div className="metric-label">Consistent Training</div>
        </div>

        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-icon-wrap amber">
              <Trophy size={18} />
            </span>
            <span className="metric-trend up">+4 New</span>
          </div>
          <div className="metric-value">9 PRs</div>
          <div className="metric-label">All-Time Records</div>
        </div>

        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-icon-wrap indigo">
              <ShieldCheck size={18} />
            </span>
            <span className="metric-trend up">Top 5%</span>
          </div>
          <div className="metric-value">Apex Lifter</div>
          <div className="metric-label">Strength Tier</div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="charts-split-grid">
        {/* Weekly Volume Progression Bar Chart */}
        <div className="chart-panel-card">
          <div className="panel-header">
            <div>
              <h4>Volume Progression</h4>
              <p>Weekly tonnage workload over time</p>
            </div>
            <span className="chart-badge">HYPERTROPHY OVERLOAD</span>
          </div>

          <div className="volume-bars-stage">
            {weeklyVolume.map((item, idx) => {
              const heightPct = Math.round((item.volume / maxVol) * 100);
              return (
                <div key={idx} className="volume-bar-col">
                  <div className="bar-hover-tooltip">
                    <strong>{item.volume.toLocaleString()} {unit}</strong>
                    <span>{item.workouts} sessions</span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ height: `${heightPct}%` }}
                    ></div>
                  </div>
                  <span className="bar-label">{item.week}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strength Standard Radar */}
        <div className="chart-panel-card">
          <div className="panel-header">
            <div>
              <h4>Strength Benchmark Radar</h4>
              <p>Performance plotted against lifter weight class</p>
            </div>
            <span className="chart-badge cyan">TIER: ELITE</span>
          </div>

          <div className="radar-stage">
            <svg viewBox="0 0 240 220" className="radar-svg">
              {/* Concentric Polygons */}
              {[0.25, 0.5, 0.75, 1.0].map((scale, i) => (
                <polygon
                  key={i}
                  points="120,20 205,82 173,180 67,180 35,82"
                  transform={`scale(${scale}) translate(${120 * (1 - scale) / scale}, ${110 * (1 - scale) / scale})`}
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="1"
                />
              ))}

              {/* Data polygon */}
              <polygon
                points="120,40 188,90 162,168 76,170 52,95"
                fill="rgba(0, 240, 255, 0.2)"
                stroke="#00F0FF"
                strokeWidth="2.5"
                filter="drop-shadow(0 0 8px rgba(0, 240, 255, 0.4))"
              />

              {/* Vertex Dots */}
              <circle cx="120" cy="40" r="4" fill="#00F0FF" />
              <circle cx="188" cy="90" r="4" fill="#00F0FF" />
              <circle cx="162" cy="168" r="4" fill="#00F0FF" />
              <circle cx="76" cy="170" r="4" fill="#00F0FF" />
              <circle cx="52" cy="95" r="4" fill="#00F0FF" />

              {/* Labels */}
              <text x="120" y="14" textAnchor="middle" fill="#94A3B8" fontSize="10">Squat (82)</text>
              <text x="215" y="86" textAnchor="start" fill="#94A3B8" fontSize="10">Bench (78)</text>
              <text x="178" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">Deadlift (88)</text>
              <text x="62" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">OHP (70)</text>
              <text x="12" y="86" textAnchor="middle" fill="#94A3B8" fontSize="10">Pull-Up (75)</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Consistency Heatmap */}
      <div className="chart-panel-card">
        <div className="panel-header">
          <div>
            <h4>Consistency Heatmap (Last 12 Weeks)</h4>
            <p>Training frequency frequency index</p>
          </div>
          <div className="heatmap-legend">
            <span>Less</span>
            <span className="dot lvl-0"></span>
            <span className="dot lvl-1"></span>
            <span className="dot lvl-2"></span>
            <span className="dot lvl-3"></span>
            <span>More</span>
          </div>
        </div>

        <div className="heatmap-matrix">
          {Array.from({ length: 84 }).map((_, i) => {
            // deterministic realistic workout activity
            const intensity = [0, 1, 2, 3, 2, 1, 0, 3, 2, 0, 1, 2][i % 12];
            return (
              <div
                key={i}
                className={`heat-cell lvl-${intensity}`}
                title={`Day ${i + 1}: ${intensity > 0 ? `${intensity} workouts logged` : 'Rest day'}`}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Hall of Fame / Personal Records Shelf */}
      <div className="chart-panel-card">
        <div className="panel-header">
          <div>
            <h4>Personal Record Hall of Fame</h4>
            <p>All-time highest achieved weights and calculated maximums</p>
          </div>
          <span className="chart-badge amber">TROPHY ROOM</span>
        </div>

        <div className="pr-trophy-grid">
          {personalRecords.map((pr, idx) => (
            <div key={idx} className="pr-trophy-card">
              <div className="pr-badge-tag">{pr.badge}</div>
              <div className="pr-card-icon">
                <Trophy size={28} color="#FFD700" />
              </div>
              <h5 className="pr-exercise-name">{pr.exercise}</h5>
              <div className="pr-weight-number">
                {pr.weight} <span className="unit-text">{unit}</span>
              </div>
              <div className="pr-meta-row">
                <span>{pr.reps}</span>
                <span>•</span>
                <span>{pr.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
