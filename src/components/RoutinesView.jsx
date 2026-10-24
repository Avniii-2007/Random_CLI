import React, { useState } from 'react';
import { Sparkles, Play, Plus, Clock, Dumbbell, Flame, Check, ChevronRight } from 'lucide-react';
import { PRESET_ROUTINES } from '../data/routines';
import { EXERCISES } from '../data/exercises';
import { generateCustomRoutine } from '../utils/aiWorkoutGenerator';
import { sounds } from '../utils/sound';

export function RoutinesView({ onStartRoutine, unit = 'kg' }) {
  const [routines, setRoutines] = useState(PRESET_ROUTINES);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  // AI generator form state
  const [aiGoal, setAiGoal] = useState('hypertrophy');
  const [aiSplit, setAiSplit] = useState('push');
  const [aiDuration, setAiDuration] = useState(45);
  const [aiExperience, setAiExperience] = useState('intermediate');
  const [aiEquipment, setAiEquipment] = useState(['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight']);

  const toggleEquipment = (item) => {
    sounds.playClick();
    setAiEquipment(prev =>
      prev.includes(item) ? prev.filter(e => e !== item) : [...prev, item]
    );
  };

  const handleGenerateAI = () => {
    sounds.playClick();
    setIsGenerating(true);

    setTimeout(() => {
      const generated = generateCustomRoutine({
        goal: aiGoal,
        split: aiSplit,
        equipment: aiEquipment.length ? aiEquipment : ['Barbell', 'Dumbbell'],
        duration: aiDuration,
        experience: aiExperience
      });

      setRoutines(prev => [generated, ...prev]);
      setIsGenerating(false);
      setShowAiModal(false);
      sounds.playFanfare();
    }, 600);
  };

  const handleStartWorkoutWithRoutine = (routine) => {
    sounds.playClick();

    // Map routine exercises to full workout structure
    const workoutExercises = routine.exercises.map(item => {
      const fullEx = EXERCISES.find(e => e.id === item.exerciseId) || {
        name: 'Custom Lift',
        category: 'Strength',
        equipment: 'Barbell'
      };

      const sets = [];
      for (let i = 0; i < (item.sets || 3); i++) {
        sets.push({
          id: `set_${Date.now()}_${i}`,
          type: 'normal',
          weight: item.weight || 60,
          reps: item.reps || 10,
          completed: false,
          previous: `${item.weight || 60} ${unit} × ${item.reps || 10}`
        });
      }

      return {
        id: item.exerciseId,
        name: fullEx.name,
        category: fullEx.category,
        equipment: fullEx.equipment,
        icon: fullEx.icon,
        sets
      };
    });

    onStartRoutine({
      title: routine.name,
      exercises: workoutExercises,
      elapsedSeconds: 0
    });
  };

  return (
    <div className="routines-view-container">
      {/* AI Generator Hero Banner */}
      <div className="ai-routine-hero">
        <div className="ai-hero-content">
          <div className="ai-pill-tag">
            <Sparkles size={14} color="#00F0FF" />
            <span>AI HYPERTROPHY ENGINE</span>
          </div>
          <h2>Generate a Custom Workout in Seconds</h2>
          <p>
            Tell the neural fitness engine your available equipment, target split, and available time. It drafts an optimal exercise order with target loads.
          </p>
          <button
            type="button"
            className="launch-ai-btn"
            onClick={() => { sounds.playClick(); setShowAiModal(true); }}
          >
            <Sparkles size={18} />
            <span>Open AI Routine Generator</span>
          </button>
        </div>

        <div className="ai-hero-stats">
          <div className="mini-stat-badge">
            <span className="badge-val">5,000+</span>
            <span className="badge-lbl">Exercise Combinations</span>
          </div>
          <div className="mini-stat-badge">
            <span className="badge-val">Scientific</span>
            <span className="badge-lbl">Volume Periodization</span>
          </div>
        </div>
      </div>

      {/* Routine Cards Grid */}
      <div className="routines-section-header">
        <div>
          <h3>Featured Training Routines</h3>
          <p>Evidence-based programs for pure strength and muscle hypertrophy</p>
        </div>
        <button
          type="button"
          className="create-blank-routine-btn"
          onClick={() => {
            sounds.playClick();
            onStartRoutine({
              title: 'Empty Workout',
              exercises: [],
              elapsedSeconds: 0
            });
          }}
        >
          <Plus size={16} />
          <span>Start Empty Workout</span>
        </button>
      </div>

      <div className="routines-grid">
        {routines.map(routine => (
          <div key={routine.id} className="routine-card">
            <div className="routine-card-top">
              <div className="routine-badges-row">
                <span className="badge-pill highlight">{routine.badge}</span>
                <span className="badge-pill duration">
                  <Clock size={12} /> {routine.duration}
                </span>
                <span className="badge-pill level">{routine.level}</span>
              </div>
              <h4 className="routine-title">{routine.name}</h4>
              <p className="routine-desc">{routine.description}</p>
            </div>

            {/* Exercise preview */}
            <div className="routine-preview-list">
              <span className="preview-label">Planned Exercises ({routine.exercises.length}):</span>
              {routine.exercises.slice(0, 3).map((item, idx) => {
                const ex = EXERCISES.find(e => e.id === item.exerciseId);
                return (
                  <div key={idx} className="preview-item">
                    <span className="bullet">▸</span>
                    <span className="ex-title">{ex ? ex.name : item.exerciseId}</span>
                    <span className="ex-sets">{item.sets} sets × {item.reps} reps</span>
                  </div>
                );
              })}
              {routine.exercises.length > 3 && (
                <div className="more-count">+{routine.exercises.length - 3} more movements</div>
              )}
            </div>

            <div className="routine-card-footer">
              <button
                type="button"
                className="start-routine-btn"
                onClick={() => handleStartWorkoutWithRoutine(routine)}
              >
                <Play size={16} fill="#000" />
                <span>Start This Routine</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Generator Modal */}
      {showAiModal && (
        <div className="modal-backdrop" onClick={() => setShowAiModal(false)}>
          <div className="modal-container ai-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <span className="modal-icon">✨</span>
                <div>
                  <h3>AI Workout Generator</h3>
                  <p className="modal-subtitle">Generate a hyper-optimized workout in 1 click</p>
                </div>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowAiModal(false)}
              >
                ×
              </button>
            </div>

            <div className="ai-modal-body">
              {/* Primary Goal */}
              <div className="ai-field-group">
                <label>TRAINING GOAL</label>
                <div className="chips-selector">
                  {[
                    { id: 'hypertrophy', label: 'Muscle Hypertrophy' },
                    { id: 'strength', label: 'Max Strength (5x5)' },
                    { id: 'fat_loss', label: 'Metabolic Conditioning' }
                  ].map(g => (
                    <button
                      key={g.id}
                      type="button"
                      className={`select-chip ${aiGoal === g.id ? 'active' : ''}`}
                      onClick={() => { sounds.playClick(); setAiGoal(g.id); }}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Split */}
              <div className="ai-field-group">
                <label>TARGET SPLIT</label>
                <div className="chips-selector">
                  {[
                    { id: 'push', label: 'Push (Chest/Delts/Tri)' },
                    { id: 'pull', label: 'Pull (Back/Biceps)' },
                    { id: 'legs', label: 'Legs & Glutes' },
                    { id: 'upper', label: 'Upper Body Power' },
                    { id: 'full_body', label: 'Full Body' }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      className={`select-chip ${aiSplit === s.id ? 'active' : ''}`}
                      onClick={() => { sounds.playClick(); setAiSplit(s.id); }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="ai-field-group">
                <div className="slider-header">
                  <label>TIME AVAILABILITY</label>
                  <span className="slider-val">{aiDuration} minutes</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="90"
                  step="15"
                  value={aiDuration}
                  onChange={e => setAiDuration(Number(e.target.value))}
                  className="duration-range-slider"
                />
                <div className="slider-ticks">
                  <span>30m</span>
                  <span>45m</span>
                  <span>60m</span>
                  <span>75m</span>
                  <span>90m</span>
                </div>
              </div>

              {/* Available Equipment */}
              <div className="ai-field-group">
                <label>AVAILABLE EQUIPMENT</label>
                <div className="chips-selector">
                  {['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight'].map(eq => (
                    <button
                      key={eq}
                      type="button"
                      className={`select-chip ${aiEquipment.includes(eq) ? 'active' : ''}`}
                      onClick={() => toggleEquipment(eq)}
                    >
                      {aiEquipment.includes(eq) && <Check size={14} />}
                      {eq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="ai-modal-footer">
                <button
                  type="button"
                  className="generate-submit-btn"
                  disabled={isGenerating}
                  onClick={handleGenerateAI}
                >
                  <Sparkles size={18} />
                  <span>{isGenerating ? 'Synthesizing Optimal Volume...' : 'Generate Smart Routine'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
