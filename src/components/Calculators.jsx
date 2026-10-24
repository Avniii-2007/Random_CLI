import React, { useState } from 'react';
import { Calculator, Zap } from 'lucide-react';
import { calculatePlates, calculate1RM } from '../utils/calculator';
import { sounds } from '../utils/sound';

export function Calculators({ unit }) {
  const [targetWeight, setTargetWeight] = useState(100);
  const [repWeight, setRepWeight] = useState(100);
  const [repCount, setRepCount] = useState(5);

  const previewPlates = calculatePlates(targetWeight, 20, unit);
  const estimatedMax = calculate1RM(repWeight, repCount);

  return (
    <section id="calculators" className="page-section">
      <div className="section-header">
        <span className="section-pill">BUILT-IN TOOLS</span>
        <h2>Interactive Lifting Calculators</h2>
        <p>Test the Olympic plate visualizer and 1RM estimator directly right here.</p>
      </div>

      <div className="calculators-grid">
        {/* Plate Calculator Card */}
        <div className="calculator-card">
          <div className="calculator-header">
            <div className="calc-title">
              <Calculator size={18} color="#3B82F6" />
              <h3>Olympic Plate Calculator</h3>
            </div>
            <span className="calc-badge">Bar: 20 {unit}</span>
          </div>

          <div className="calc-body">
            <div className="calc-row">
              <span className="calc-label">Target Weight:</span>
              <span className="calc-hero-val">{targetWeight} {unit}</span>
            </div>

            <div className="stepper-chips">
              {[-10, -2.5, 2.5, 10].map((delta) => (
                <button
                  key={delta}
                  type="button"
                  className="chip-btn"
                  onClick={() => {
                    sounds.playClick();
                    setTargetWeight((w) => Math.max(20, w + delta));
                  }}
                >
                  {delta > 0 ? `+${delta}` : delta}
                </button>
              ))}
            </div>

            {/* Visual Barbell Sleeve */}
            <div className="barbell-sleeve-stage">
              <div className="sleeve-shaft" />
              <div className="sleeve-collar" />
              <div className="sleeve-rack">
                {previewPlates.length === 0 ? (
                  <span className="sleeve-empty">Empty Barbell (20 {unit})</span>
                ) : (
                  <div className="plates-stack">
                    {previewPlates.map((plate, i) => (
                      <div
                        key={i}
                        className="plate-disc"
                        style={{
                          backgroundColor: plate.color,
                          color: plate.darkText ? '#000' : '#fff'
                        }}
                      >
                        <span>{plate.weight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <span className="calc-summary-text">
              Plates per side: {previewPlates.map((p) => p.label).join(', ') || 'None'}
            </span>
          </div>
        </div>

        {/* 1RM Estimator Card */}
        <div className="calculator-card">
          <div className="calculator-header">
            <div className="calc-title">
              <Zap size={18} color="#3B82F6" />
              <h3>One-Rep Max (1RM) Estimator</h3>
            </div>
            <span className="calc-badge">Epley Formula</span>
          </div>

          <div className="calc-body">
            <div className="stepper-inputs-grid">
              <div className="input-field">
                <label>WEIGHT ({unit.toUpperCase()})</label>
                <div className="field-stepper">
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setRepWeight((w) => Math.max(10, w - 5));
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={repWeight}
                    onChange={(e) => setRepWeight(Number(e.target.value))}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setRepWeight((w) => w + 5);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="input-field">
                <label>REPS COMPLETED</label>
                <div className="field-stepper">
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setRepCount((r) => Math.max(1, r - 1));
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={repCount}
                    onChange={(e) => setRepCount(Number(e.target.value))}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setRepCount((r) => r + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="onerm-banner">
              <span className="banner-tag">PROJECTED MAX</span>
              <span className="banner-val">{estimatedMax} {unit}</span>
              <span className="banner-sub">Based on {repWeight} {unit} lifted for {repCount} reps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
