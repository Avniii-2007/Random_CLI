import React from 'react';
import { X } from 'lucide-react';

export function TechniqueModal({ exercise, onClose }) {
  if (!exercise) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{exercise.name}</h3>
            <p className="modal-subtitle">
              {exercise.category} • {exercise.equipment}
            </p>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-content">
          <div className="technique-section">
            <h4>Step-by-Step Instructions</h4>
            <ol className="step-list">
              {exercise.instructions.map((step, idx) => (
                <li key={idx}>
                  <span className="step-badge">{idx + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {exercise.tips && (
            <div className="coach-tip-box">
              <strong>Form Tip:</strong>
              <p>{exercise.tips}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
