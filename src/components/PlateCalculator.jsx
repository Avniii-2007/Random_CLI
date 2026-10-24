import React, { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/sound';

export function PlateCalculator({ isOpen, onClose, initialWeight = 100, unit = 'kg' }) {
  const [targetWeight, setTargetWeight] = useState(initialWeight || 100);
  const [barWeight, setBarWeight] = useState(unit === 'kg' ? 20 : 45);

  if (!isOpen) return null;

  const platesKg = [
    { weight: 25, color: '#EF4444', label: '25kg', width: 26, height: 110 },
    { weight: 20, color: '#3B82F6', label: '20kg', width: 24, height: 100 },
    { weight: 15, color: '#EAB308', label: '15kg', width: 20, height: 90 },
    { weight: 10, color: '#10B981', label: '10kg', width: 18, height: 80 },
    { weight: 5, color: '#F8FAFC', label: '5kg', width: 16, height: 65, textDark: true },
    { weight: 2.5, color: '#1E293B', label: '2.5kg', width: 14, height: 50 },
    { weight: 1.25, color: '#94A3B8', label: '1.25kg', width: 12, height: 40 }
  ];

  const platesLbs = [
    { weight: 45, color: '#3B82F6', label: '45lb', width: 26, height: 110 },
    { weight: 35, color: '#EAB308', label: '35lb', width: 22, height: 95 },
    { weight: 25, color: '#10B981', label: '25lb', width: 20, height: 85 },
    { weight: 10, color: '#1E293B', label: '10lb', width: 16, height: 65 },
    { weight: 5, color: '#F8FAFC', label: '5lb', width: 14, height: 50, textDark: true },
    { weight: 2.5, color: '#94A3B8', label: '2.5lb', width: 12, height: 40 }
  ];

  const availablePlates = unit === 'kg' ? platesKg : platesLbs;

  // Calculate plates per side
  const calculatePlates = () => {
    let remainder = (targetWeight - barWeight) / 2;
    if (remainder <= 0) return [];

    const result = [];
    for (const plate of availablePlates) {
      const count = Math.floor(remainder / plate.weight);
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          result.push(plate);
        }
        remainder = Math.round((remainder - count * plate.weight) * 100) / 100;
      }
    }
    return result;
  };

  const loadedPlates = calculatePlates();
  const actualWeight = barWeight + loadedPlates.reduce((acc, p) => acc + p.weight, 0) * 2;

  const handleAdjust = (delta) => {
    sounds.playClick();
    setTargetWeight(prev => Math.max(barWeight, Math.round((prev + delta) * 2) / 2));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container plate-calc-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">🎯</span>
            <div>
              <h3>Olympic Plate Calculator</h3>
              <p className="modal-subtitle">Visual barbell loader for exact weight distribution</p>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="plate-calc-body">
          {/* Target Weight Controller */}
          <div className="weight-display-card">
            <span className="weight-label">TARGET LOAD</span>
            <div className="weight-number-row">
              <span className="weight-number">{targetWeight}</span>
              <span className="weight-unit">{unit}</span>
            </div>
            {actualWeight !== targetWeight && (
              <span className="weight-warning">
                Closest fit: {actualWeight} {unit}
              </span>
            )}

            <div className="quick-adjust-bar">
              <button type="button" className="adjust-chip" onClick={() => handleAdjust(-10)}>-10</button>
              <button type="button" className="adjust-chip" onClick={() => handleAdjust(-2.5)}>-2.5</button>
              <button type="button" className="adjust-chip" onClick={() => handleAdjust(-1)}>-1</button>
              <button type="button" className="adjust-chip" onClick={() => handleAdjust(1)}>+1</button>
              <button type="button" className="adjust-chip" onClick={() => handleAdjust(2.5)}>+2.5</button>
              <button type="button" className="adjust-chip" onClick={() => handleAdjust(10)}>+10</button>
            </div>
          </div>

          {/* Barbell Options */}
          <div className="bar-selector">
            <span className="bar-selector-label">Barbell:</span>
            <button
              type="button"
              className={`bar-pill ${barWeight === (unit === 'kg' ? 20 : 45) ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setBarWeight(unit === 'kg' ? 20 : 45); }}
            >
              Olympic ({unit === 'kg' ? '20 kg' : '45 lb'})
            </button>
            <button
              type="button"
              className={`bar-pill ${barWeight === (unit === 'kg' ? 15 : 35) ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setBarWeight(unit === 'kg' ? 15 : 35); }}
            >
              Women's ({unit === 'kg' ? '15 kg' : '35 lb'})
            </button>
          </div>

          {/* Visual Barbell Graphic */}
          <div className="barbell-visualizer">
            <div className="visualizer-label">EACH SIDE OF BAR:</div>

            <div className="barbell-sleeve-stage">
              {/* Barbell Collar / Shaft */}
              <div className="bar-shaft"></div>
              <div className="bar-collar"></div>
              <div className="bar-sleeve">
                {loadedPlates.length === 0 ? (
                  <span className="empty-bar-text">Empty Bar ({barWeight} {unit})</span>
                ) : (
                  <div className="plates-stack">
                    {loadedPlates.map((plate, index) => (
                      <div
                        key={index}
                        className="visual-plate"
                        style={{
                          backgroundColor: plate.color,
                          width: `${plate.width}px`,
                          height: `${plate.height}px`,
                          color: plate.textDark ? '#000' : '#fff'
                        }}
                        title={`${plate.label}`}
                      >
                        <span className="plate-tag">{plate.weight}</span>
                      </div>
                    ))}
                    <div className="bar-clip"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Plate Inventory Summary */}
          <div className="plate-summary-card">
            <h4>Plates per side:</h4>
            {loadedPlates.length === 0 ? (
              <p className="no-plates">Just lift the empty bar!</p>
            ) : (
              <div className="plate-chips-list">
                {Object.entries(
                  loadedPlates.reduce((acc, p) => {
                    acc[p.label] = (acc[p.label] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([label, count]) => (
                  <div key={label} className="plate-summary-badge">
                    <span className="badge-count">{count}x</span>
                    <span className="badge-label">{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
