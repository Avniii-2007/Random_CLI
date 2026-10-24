import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { EXERCISES } from '../data/exercises';
import { sounds } from '../utils/sound';

export function ExerciseBrowser({ onSelectExercise }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core'];

  const filtered = EXERCISES.filter((ex) => {
    const matchCategory = activeCategory === 'All' || ex.category === activeCategory;
    const matchQuery = ex.name.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <section id="exercises" className="page-section">
      <div className="section-header">
        <span className="section-pill">MOVEMENT DATABASE</span>
        <h2>Explore 5,000+ Exercises</h2>
        <p>Search any exercise to view step-by-step form cues and coaching tips.</p>
      </div>

      <div className="browser-card">
        {/* Search Input */}
        <div className="search-input-box">
          <Search size={17} className="search-icon" />
          <input
            type="text"
            placeholder="Search exercise (e.g. Bench, Squat, Deadlift, Lateral Raise)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button type="button" className="clear-btn" onClick={() => setQuery('')}>
              <X size={15} />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="category-chips-row">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => {
                sounds.playClick();
                setActiveCategory(cat);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Exercises Grid */}
        <div className="exercise-tiles-grid">
          {filtered.slice(0, 8).map((ex) => (
            <div
              key={ex.id}
              className="exercise-tile"
              onClick={() => {
                sounds.playClick();
                onSelectExercise(ex);
              }}
            >
              <div className="tile-header">
                <span className="badge category">{ex.category}</span>
                <span className="badge equipment">{ex.equipment}</span>
              </div>
              <h4 className="tile-title">{ex.name}</h4>
              <span className="tile-action">View Form Cues →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
