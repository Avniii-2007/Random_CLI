import React, { useState } from 'react';
import { X, Award, Flame, Dumbbell } from 'lucide-react';
import { sounds } from '../utils/sound';

export function OneRepMaxModal({ isOpen, onClose, defaultWeight = 100, defaultReps = 5, unit = 'kg' }) {
  const [weight, setWeight] = useState(defaultWeight || 100);
  const [reps, setReps] = useState(defaultReps || 5);

  if (!isOpen) return null;

  const validReps = Math.max(1, Math.min(30, reps));
  const validWeight = Math.max(1, weight);

  // Epley and Brzycki 1RM
  const epley = Math.round(validWeight * (1 + validReps / 30));
  const brzycki = Math.round(validWeight * (36 / (37 - validReps)));
  const estimated1RM = Math.round((epley + brzycki) / 2);

  const percentageTable = [
    { pct: 100, reps: '1 rep max', load: estimated1RM },
    { pct: 95, reps: '2 reps', load: Math.round(estimated1RM * 0.95) },
    { pct: 90, reps: '3 - 4 reps', load: Math.round(estimated1RM * 0.90) },
    { pct: 85, reps: '5 - 6 reps', load: Math.round(estimated1RM * 0.85) },
    { pct: 80, reps: '7 - 8 reps', load: Math.round(estimated1RM * 0.80) },
    { pct: 75, reps: '9 - 10 reps', load: Math.round(estimated1RM * 0.75) },
    { pct: 70, reps: '11 - 12 reps', load: Math.round(estimated1RM * 0.70) },
    { pct: 65, reps: '15+ reps', load: Math.round(estimated1RM * 0.65) }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container onerm-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">⚡</span>
            <div>
              <h3>1-Rep Max (1RM) Estimator</h3>
              <p className="modal-subtitle">Scientifically validated strength projection</p>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="onerm-body">
          <div className="onerm-inputs-row">
            <div className="onerm-input-card">
              <label>WEIGHT LIFTED ({unit})</label>
              <div className="stepper-input">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => { sounds.playClick(); setWeight(w => Math.max(1, w - 2.5)); }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={weight}
                  onChange={e => setWeight(Number(e.target.value))}
                />
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => { sounds.playClick(); setWeight(w => w + 2.5); }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="onerm-input-card">
              <label>REPS COMPLETED</label>
              <div className="stepper-input">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => { sounds.playClick(); setReps(r => Math.max(1, r - 1)); }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={reps}
                  onChange={e => setReps(Number(e.target.value))}
                />
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => { sounds.playClick(); setReps(r => r + 1); }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Hero 1RM Result Banner */}
          <div className="onerm-hero-banner">
            <div className="onerm-trophy-ring">
              <Award size={36} color="#00F0FF" />
            </div>
            <div className="onerm-hero-content">
              <span className="onerm-label">ESTIMATED 1-REP MAX</span>
              <div className="onerm-big-number">
                {estimated1RM} <span className="unit-badge">{unit}</span>
              </div>
              <p className="onerm-subtext">
                Combined Epley ({epley} {unit}) & Brzycki ({brzycki} {unit}) formula
              </p>
            </div>
          </div>

          {/* Training Percentage Breakdown Table */}
          <div className="onerm-table-container">
            <h4>Target Training Percentages</h4>
            <div className="onerm-grid">
              {percentageTable.map(row => (
                <div key={row.pct} className="onerm-grid-row">
                  <div className="row-left">
                    <span className="pct-badge">{row.pct}%</span>
                    <span className="reps-label">{row.reps}</span>
                  </div>
                  <div className="row-right">
                    <span className="load-val">{row.load} {unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
