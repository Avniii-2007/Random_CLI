import React from 'react';
import { Calculator, Check, Clock, Plus } from 'lucide-react';

export function WorkoutLogger({
  workout,
  unit,
  onUpdateWorkout,
  onToggleSet,
  onAdjustSet,
  onAddSet,
  onOpenPlateCalc,
  onFinishWorkout
}) {
  // Calculate completed stats
  let totalVolume = 0;
  let completedCount = 0;
  let totalSets = 0;

  workout.exercises.forEach(ex => {
    ex.sets.forEach(set => {
      totalSets++;
      if (set.completed) {
        completedCount++;
        totalVolume += (Number(set.weight) || 0) * (Number(set.reps) || 0);
      }
    });
  });

  return (
    <section id="workout-tracker" className="page-section">
      <div className="section-header">
        <span className="section-pill">LIVE INTERACTIVE SESSION</span>
        <h2>Active Workout Logger</h2>
        <p>Tap checkmarks to log sets, adjust weights, and trigger smart rest timers.</p>
      </div>

      <div className="tracker-card">
        {/* Header HUD */}
        <div className="tracker-header">
          <div className="tracker-title-row">
            <input
              type="text"
              className="tracker-title-input"
              value={workout.title}
              onChange={(e) => onUpdateWorkout({ ...workout, title: e.target.value })}
            />
            <div className="tracker-timer">
              <Clock size={13} color="#3B82F6" />
              <span>21:40</span>
            </div>
          </div>

          <div className="tracker-metrics">
            <div className="metric-chip">
              <span className="chip-label">ESTIMATED VOLUME</span>
              <span className="chip-value">{totalVolume.toLocaleString()} {unit}</span>
            </div>
            <div className="metric-chip">
              <span className="chip-label">SETS COMPLETED</span>
              <span className="chip-value">{completedCount} of {totalSets} Sets</span>
            </div>
            <button type="button" className="btn-finish" onClick={onFinishWorkout}>
              Finish Workout
            </button>
          </div>
        </div>

        {/* Exercises List */}
        <div className="exercise-list">
          {workout.exercises.map((exercise, exIdx) => (
            <div key={exercise.id} className="exercise-card">
              <div className="exercise-card-header">
                <div className="exercise-meta">
                  <h4>{exercise.name}</h4>
                  <span className="category-pill">{exercise.category}</span>
                </div>
                <button
                  type="button"
                  className="btn-quick-calc"
                  onClick={() => onOpenPlateCalc(exercise.sets[0]?.weight || 80)}
                >
                  <Calculator size={13} />
                  <span>Plates</span>
                </button>
              </div>

              {/* Sets Table */}
              <div className="sets-table">
                <div className="sets-header">
                  <span>SET</span>
                  <span>PREVIOUS</span>
                  <span>{unit.toUpperCase()}</span>
                  <span>REPS</span>
                  <span>LOG</span>
                </div>

                <div className="sets-rows">
                  {exercise.sets.map((set, setIdx) => (
                    <div key={set.id} className={`set-row ${set.completed ? 'completed' : ''}`}>
                      <span className="set-idx">{setIdx + 1}</span>
                      <span className="set-prev">{set.previous || '—'}</span>

                      <div className="stepper">
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => onAdjustSet(exIdx, setIdx, 'weight', -2.5)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={set.weight}
                          onChange={(e) => {
                            const updated = [...workout.exercises];
                            updated[exIdx].sets[setIdx].weight = Number(e.target.value);
                            onUpdateWorkout({ ...workout, exercises: updated });
                          }}
                        />
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => onAdjustSet(exIdx, setIdx, 'weight', 2.5)}
                        >
                          +
                        </button>
                      </div>

                      <div className="stepper">
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => onAdjustSet(exIdx, setIdx, 'reps', -1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={set.reps}
                          onChange={(e) => {
                            const updated = [...workout.exercises];
                            updated[exIdx].sets[setIdx].reps = Number(e.target.value);
                            onUpdateWorkout({ ...workout, exercises: updated });
                          }}
                        />
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => onAdjustSet(exIdx, setIdx, 'reps', 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className={`btn-check ${set.completed ? 'checked' : ''}`}
                        onClick={() => onToggleSet(exIdx, setIdx)}
                      >
                        <Check size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn-add-set"
                  onClick={() => onAddSet(exIdx)}
                >
                  <Plus size={14} />
                  <span>Add Set</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
