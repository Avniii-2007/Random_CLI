import React, { useState } from 'react';
import { Search, Filter, Dumbbell, Zap, Plus, X, Check, Award, BookOpen } from 'lucide-react';
import { EXERCISES, MUSCLE_GROUPS } from '../data/exercises';
import { sounds } from '../utils/sound';

export function ExerciseLibrary({ onAddToWorkout, onOpen1RM, unit = 'kg' }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');
  const [activeModalExercise, setActiveModalExercise] = useState(null);

  const categories = ['All', 'Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core'];
  const equipmentOptions = ['All', 'Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight'];

  const filtered = EXERCISES.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
    const matchesEquipment = selectedEquipment === 'All' || ex.equipment === selectedEquipment;
    return matchesSearch && matchesCategory && matchesEquipment;
  });

  return (
    <div className="exercise-library-container">
      {/* Search & Filter Header */}
      <div className="library-header-card">
        <div className="library-title-row">
          <div>
            <h3>Exercise Knowledge Vault</h3>
            <p>Biomechanically validated movements, form cues, and muscle recruitment data</p>
          </div>
          <span className="library-count-pill">{filtered.length} Exercises</span>
        </div>

        <div className="library-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search exercises by name, muscle, or equipment..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearch('')}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="categories-pill-row">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setSelectedCategory(cat); }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Equipment Filter Bar */}
        <div className="sub-filter-row">
          <span className="sub-filter-label">Equipment:</span>
          {equipmentOptions.map(eq => (
            <button
              key={eq}
              type="button"
              className={`eq-pill ${selectedEquipment === eq ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setSelectedEquipment(eq); }}
            >
              {eq}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Exercises */}
      <div className="exercises-card-grid">
        {filtered.map(ex => (
          <div
            key={ex.id}
            className="library-ex-card"
            onClick={() => {
              sounds.playClick();
              setActiveModalExercise(ex);
            }}
          >
            <div className="ex-card-badge-row">
              <span className="badge category-badge">{ex.category}</span>
              <span className="badge equipment-badge">{ex.equipment}</span>
              <span className="badge difficulty-badge">{ex.difficulty}</span>
            </div>

            <div className="ex-card-main">
              <span className="ex-card-emoji">{ex.icon}</span>
              <h4 className="ex-card-title">{ex.name}</h4>
              <p className="ex-card-muscle">
                Primary: <strong>{MUSCLE_GROUPS[ex.primaryMuscle]?.name || ex.primaryMuscle}</strong>
              </p>
            </div>

            <div className="ex-card-bottom-actions">
              <button
                type="button"
                className="view-form-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  setActiveModalExercise(ex);
                }}
              >
                <BookOpen size={14} />
                <span>Form Cues</span>
              </button>
              <button
                type="button"
                className="quick-add-btn"
                title="Add to Workout"
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  onAddToWorkout(ex);
                }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Exercise Detail Modal */}
      {activeModalExercise && (
        <div className="modal-backdrop" onClick={() => setActiveModalExercise(null)}>
          <div className="modal-container exercise-detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <span className="modal-icon">{activeModalExercise.icon}</span>
                <div>
                  <h3>{activeModalExercise.name}</h3>
                  <p className="modal-subtitle">
                    {activeModalExercise.category} • {activeModalExercise.equipment} • {activeModalExercise.difficulty}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={() => setActiveModalExercise(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="exercise-detail-body">
              {/* Muscle Targeting Chips */}
              <div className="muscle-targeting-section">
                <h4>Muscle Engagement Profile</h4>
                <div className="target-chips-wrap">
                  <div className="target-chip primary">
                    <span className="chip-tag">PRIMARY</span>
                    <span className="chip-name">
                      {MUSCLE_GROUPS[activeModalExercise.primaryMuscle]?.name || activeModalExercise.primaryMuscle}
                    </span>
                  </div>
                  {activeModalExercise.secondaryMuscles?.map(m => (
                    <div key={m} className="target-chip secondary">
                      <span className="chip-tag">SECONDARY</span>
                      <span className="chip-name">{MUSCLE_GROUPS[m]?.name || m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="form-steps-section">
                <h4>Step-by-Step Technique</h4>
                <ol className="technique-list">
                  {activeModalExercise.instructions.map((step, idx) => (
                    <li key={idx}>
                      <span className="step-num">{idx + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Pro Tips Callout */}
              <div className="pro-tip-callout">
                <div className="tip-header">
                  <Award size={16} color="#00F0FF" />
                  <span>MASTER COACH TIP</span>
                </div>
                <p>{activeModalExercise.tips}</p>
              </div>

              {/* Modal Actions */}
              <div className="exercise-detail-actions">
                <button
                  type="button"
                  className="open-1rm-shortcut-btn"
                  onClick={() => {
                    setActiveModalExercise(null);
                    onOpen1RM(activeModalExercise.defaultWeight, activeModalExercise.defaultReps);
                  }}
                >
                  <Zap size={16} />
                  <span>Estimate 1RM for this Lift</span>
                </button>

                <button
                  type="button"
                  className="add-to-session-btn"
                  onClick={() => {
                    sounds.playClick();
                    onAddToWorkout(activeModalExercise);
                    setActiveModalExercise(null);
                  }}
                >
                  <Plus size={18} />
                  <span>Add to Active Workout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
