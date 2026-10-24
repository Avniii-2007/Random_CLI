import React, { useState } from 'react';
import { Search, X, Plus, Filter, Info } from 'lucide-react';
import { EXERCISES } from '../data/exercises';
import { sounds } from '../utils/sound';

export function AddExerciseModal({
  isOpen,
  onClose,
  onSelectExercise,
  activeExerciseIds = []
}) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core'];
  const equipmentList = ['All', 'Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight'];

  const filteredExercises = EXERCISES.filter(ex => {
    const matchesQuery = ex.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
    const matchesEquipment = selectedEquipment === 'All' || ex.equipment === selectedEquipment;
    return matchesQuery && matchesCategory && matchesEquipment;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container add-exercise-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">➕</span>
            <div>
              <h3>Add Exercise</h3>
              <p className="modal-subtitle">Choose from 5,000+ movement database</p>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="add-exercise-body">
          {/* Search bar */}
          <div className="search-bar-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search exercise (e.g. Bench Press, Squat, Lat Pulldown)..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                type="button"
                className="clear-query-btn"
                onClick={() => setQuery('')}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="category-scroll-bar">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => { sounds.playClick(); setSelectedCategory(cat); }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Equipment sub-filter */}
          <div className="equipment-filter-bar">
            <span className="equipment-label">Equipment:</span>
            {equipmentList.map(eq => (
              <button
                key={eq}
                type="button"
                className={`equipment-chip ${selectedEquipment === eq ? 'active' : ''}`}
                onClick={() => { sounds.playClick(); setSelectedEquipment(eq); }}
              >
                {eq}
              </button>
            ))}
          </div>

          {/* Exercise list */}
          <div className="exercise-picker-list">
            {filteredExercises.length === 0 ? (
              <div className="empty-search-state">
                <p>No exercises found matching "{query}"</p>
              </div>
            ) : (
              filteredExercises.map(ex => {
                const isAlreadyInWorkout = activeExerciseIds.includes(ex.id);
                return (
                  <div
                    key={ex.id}
                    className={`exercise-picker-card ${isAlreadyInWorkout ? 'already-added' : ''}`}
                    onClick={() => {
                      sounds.playClick();
                      onSelectExercise(ex);
                      onClose();
                    }}
                  >
                    <div className="exercise-card-left">
                      <span className="exercise-emoji-icon">{ex.icon}</span>
                      <div className="exercise-card-info">
                        <div className="exercise-card-name">{ex.name}</div>
                        <div className="exercise-card-meta">
                          <span className="badge category-badge">{ex.category}</span>
                          <span className="badge equipment-badge">{ex.equipment}</span>
                          <span className="badge difficulty-badge">{ex.difficulty}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="add-to-workout-btn"
                      title={isAlreadyInWorkout ? 'Add another instance' : 'Add to workout'}
                    >
                      <Plus size={18} />
                      <span>Add</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
