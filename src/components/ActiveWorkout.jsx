import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Plus,
  Trash2,
  Check,
  Clock,
  Dumbbell,
  Calculator,
  Zap,
  Award,
  ChevronDown
} from 'lucide-react';
import { sounds } from '../utils/sound';

export function ActiveWorkout({
  workout,
  unit = 'kg',
  onUpdateWorkout,
  onFinishWorkout,
  onOpenPlateCalc,
  onOpen1RM,
  onOpenRestTimer,
  onOpenAddExercise,
  onDiscardWorkout
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(workout.elapsedSeconds || 0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Elapsed workout timer
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatElapsed = (totalSecs) => {
    const minutes = Math.floor(totalSecs / 60);
    const seconds = totalSecs % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Live volume & sets
  let totalVolume = 0;
  let completedSetsCount = 0;
  let totalSetsCount = 0;

  workout.exercises.forEach(ex => {
    ex.sets.forEach(set => {
      totalSetsCount++;
      if (set.completed) {
        completedSetsCount++;
        totalVolume += (Number(set.weight) || 0) * (Number(set.reps) || 0);
      }
    });
  });

  const handleToggleSetComplete = (exerciseIdx, setIdx) => {
    const updatedExercises = [...workout.exercises];
    const currentSet = updatedExercises[exerciseIdx].sets[setIdx];
    const nextCompleted = !currentSet.completed;

    currentSet.completed = nextCompleted;

    if (nextCompleted) {
      sounds.playSetComplete();
      onOpenRestTimer(90);
    } else {
      sounds.playClick();
    }

    onUpdateWorkout({
      ...workout,
      exercises: updatedExercises,
      elapsedSeconds
    });
  };

  const handleUpdateSet = (exerciseIdx, setIdx, field, value) => {
    const updatedExercises = [...workout.exercises];
    updatedExercises[exerciseIdx].sets[setIdx][field] = value;
    onUpdateWorkout({
      ...workout,
      exercises: updatedExercises,
      elapsedSeconds
    });
  };

  const handleAdjustValue = (exerciseIdx, setIdx, field, delta) => {
    sounds.playClick();
    const updatedExercises = [...workout.exercises];
    const currentVal = Number(updatedExercises[exerciseIdx].sets[setIdx][field]) || 0;
    updatedExercises[exerciseIdx].sets[setIdx][field] = Math.max(0, currentVal + delta);
    onUpdateWorkout({
      ...workout,
      exercises: updatedExercises,
      elapsedSeconds
    });
  };

  const handleAddSet = (exerciseIdx) => {
    sounds.playClick();
    const updatedExercises = [...workout.exercises];
    const sets = updatedExercises[exerciseIdx].sets;
    const lastSet = sets[sets.length - 1];

    sets.push({
      id: `set_${Date.now()}`,
      type: 'normal',
      weight: lastSet ? lastSet.weight : 50,
      reps: lastSet ? lastSet.reps : 10,
      completed: false,
      previous: lastSet ? `${lastSet.weight} ${unit} × ${lastSet.reps}` : '-'
    });

    onUpdateWorkout({
      ...workout,
      exercises: updatedExercises,
      elapsedSeconds
    });
  };

  const handleDeleteSet = (exerciseIdx, setIdx) => {
    sounds.playClick();
    const updatedExercises = [...workout.exercises];
    updatedExercises[exerciseIdx].sets.splice(setIdx, 1);
    onUpdateWorkout({
      ...workout,
      exercises: updatedExercises,
      elapsedSeconds
    });
  };

  const handleDeleteExercise = (exerciseIdx) => {
    sounds.playClick();
    const updatedExercises = [...workout.exercises];
    updatedExercises.splice(exerciseIdx, 1);
    onUpdateWorkout({
      ...workout,
      exercises: updatedExercises,
      elapsedSeconds
    });
  };

  const handleFinish = () => {
    onFinishWorkout({
      title: workout.title,
      duration: formatElapsed(elapsedSeconds),
      totalVolume,
      totalSets: completedSetsCount,
      exercises: workout.exercises
    });
  };

  return (
    <div className="clean-workout-view">
      {/* Clean HUD Header */}
      <div className="clean-hud-card">
        <div className="hud-primary-row">
          <input
            type="text"
            className="clean-title-input"
            value={workout.title}
            onChange={e => onUpdateWorkout({ ...workout, title: e.target.value })}
            placeholder="Workout Title"
          />

          <div className="hud-timer-badge">
            <Clock size={14} color="#3B82F6" />
            <span className="timer-val">{formatElapsed(elapsedSeconds)}</span>
            <button
              type="button"
              className="timer-pause-btn"
              onClick={() => { sounds.playClick(); setIsTimerRunning(r => !r); }}
              title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
            >
              {isTimerRunning ? <Pause size={12} /> : <Play size={12} />}
            </button>
          </div>
        </div>

        {/* Clean Metrics Summary */}
        <div className="clean-metrics-row">
          <div className="metric-item">
            <span className="m-label">TOTAL VOLUME</span>
            <span className="m-val">{totalVolume.toLocaleString()} {unit}</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="m-label">SETS COMPLETED</span>
            <span className="m-val">{completedSetsCount} of {totalSetsCount}</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="m-label">REST TIMER</span>
            <button
              type="button"
              className="rest-link-btn"
              onClick={() => onOpenRestTimer(90)}
            >
              Set 90s
            </button>
          </div>
        </div>

        {/* Quick Tools & Finish Action */}
        <div className="hud-actions-row">
          <button
            type="button"
            className="hud-action-pill"
            onClick={() => onOpenPlateCalc(80)}
          >
            <Calculator size={14} />
            <span>Plate Calc</span>
          </button>
          <button
            type="button"
            className="hud-action-pill"
            onClick={() => onOpen1RM(80, 8)}
          >
            <Zap size={14} />
            <span>1RM Calc</span>
          </button>

          <button
            type="button"
            className="clean-finish-btn"
            onClick={handleFinish}
          >
            <Award size={15} />
            <span>Finish Workout</span>
          </button>
        </div>
      </div>

      {/* Exercises Container */}
      <div className="clean-exercises-list">
        {workout.exercises.length === 0 ? (
          <div className="clean-empty-state">
            <div className="empty-icon-circle">
              <Dumbbell size={28} color="#3B82F6" />
            </div>
            <h3>Your workout is empty</h3>
            <p>Add your first exercise to start logging your sets.</p>
            <button
              type="button"
              className="clean-add-exercise-btn"
              onClick={onOpenAddExercise}
            >
              <Plus size={16} />
              <span>Add Exercise</span>
            </button>
          </div>
        ) : (
          workout.exercises.map((exercise, exIdx) => (
            <div key={exercise.id || exIdx} className="clean-exercise-card">
              {/* Exercise Card Header */}
              <div className="clean-ex-header">
                <div className="clean-ex-title-wrap">
                  <h4>{exercise.name}</h4>
                  <span className="clean-category-badge">{exercise.category}</span>
                </div>

                <div className="clean-ex-actions">
                  <button
                    type="button"
                    className="icon-action-btn"
                    title="Calculate plates"
                    onClick={() => {
                      const firstSet = exercise.sets[0];
                      onOpenPlateCalc(firstSet ? Number(firstSet.weight) : 80);
                    }}
                  >
                    <Calculator size={14} />
                  </button>
                  <button
                    type="button"
                    className="icon-action-btn delete"
                    title="Remove exercise"
                    onClick={() => handleDeleteExercise(exIdx)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Clean Set Table */}
              <div className="clean-sets-table">
                <div className="clean-sets-header">
                  <span className="col-num">SET</span>
                  <span className="col-previous">PREVIOUS</span>
                  <span className="col-input-label">{unit.toUpperCase()}</span>
                  <span className="col-input-label">REPS</span>
                  <span className="col-action">DONE</span>
                </div>

                <div className="clean-sets-rows">
                  {exercise.sets.map((set, setIdx) => (
                    <div
                      key={set.id || setIdx}
                      className={`clean-set-row ${set.completed ? 'completed' : ''}`}
                    >
                      <span className="set-index">{setIdx + 1}</span>
                      <span className="set-prev-text">{set.previous || '—'}</span>

                      {/* Weight Stepper */}
                      <div className="clean-input-box">
                        <button
                          type="button"
                          className="mini-step-btn"
                          onClick={() => handleAdjustValue(exIdx, setIdx, 'weight', -2.5)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={set.weight}
                          onChange={e => handleUpdateSet(exIdx, setIdx, 'weight', e.target.value)}
                        />
                        <button
                          type="button"
                          className="mini-step-btn"
                          onClick={() => handleAdjustValue(exIdx, setIdx, 'weight', 2.5)}
                        >
                          +
                        </button>
                      </div>

                      {/* Reps Stepper */}
                      <div className="clean-input-box">
                        <button
                          type="button"
                          className="mini-step-btn"
                          onClick={() => handleAdjustValue(exIdx, setIdx, 'reps', -1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={set.reps}
                          onChange={e => handleUpdateSet(exIdx, setIdx, 'reps', e.target.value)}
                        />
                        <button
                          type="button"
                          className="mini-step-btn"
                          onClick={() => handleAdjustValue(exIdx, setIdx, 'reps', 1)}
                        >
                          +
                        </button>
                      </div>

                      {/* Done Checkbox */}
                      <div className="set-action-cell">
                        <button
                          type="button"
                          className={`clean-check-btn ${set.completed ? 'checked' : ''}`}
                          onClick={() => handleToggleSetComplete(exIdx, setIdx)}
                        >
                          <Check size={16} />
                        </button>
                        <button
                          type="button"
                          className="remove-set-icon"
                          onClick={() => handleDeleteSet(exIdx, setIdx)}
                          title="Delete set"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="clean-add-set-row-btn"
                  onClick={() => handleAddSet(exIdx)}
                >
                  <Plus size={14} />
                  <span>Add Set</span>
                </button>
              </div>
            </div>
          ))
        )}

        {/* Global Bottom Actions */}
        {workout.exercises.length > 0 && (
          <div className="clean-bottom-workout-row">
            <button
              type="button"
              className="clean-add-exercise-btn"
              onClick={onOpenAddExercise}
            >
              <Plus size={16} />
              <span>Add Exercise</span>
            </button>

            <button
              type="button"
              className="clean-discard-btn"
              onClick={onDiscardWorkout}
            >
              Discard Workout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
