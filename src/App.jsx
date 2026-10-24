import React, { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkoutLogger } from './components/WorkoutLogger';
import { Features } from './components/Features';
import { Calculators } from './components/Calculators';
import { ExerciseBrowser } from './components/ExerciseBrowser';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';

// Modals
import { PlateCalculator } from './components/PlateCalculator';
import { OneRepMaxModal } from './components/OneRepMaxModal';
import { RestTimer } from './components/RestTimer';
import { WorkoutSummaryModal } from './components/WorkoutSummaryModal';
import { TechniqueModal } from './components/TechniqueModal';
import { sounds } from './utils/sound';

export function App() {
  const [unit, setUnit] = useState('kg');
  const [isMuted, setIsMuted] = useState(false);

  // Active workout state
  const [workout, setWorkout] = useState({
    title: 'Push Day: Chest & Delts',
    elapsedSeconds: 1240,
    exercises: [
      {
        id: 'barbell_bench_press',
        name: 'Barbell Bench Press',
        category: 'Chest',
        equipment: 'Barbell',
        sets: [
          { id: 'set_1', weight: 80, reps: 8, completed: true, previous: '80 kg × 8' },
          { id: 'set_2', weight: 85, reps: 8, completed: true, previous: '80 kg × 8' },
          { id: 'set_3', weight: 90, reps: 6, completed: false, previous: '85 kg × 6' }
        ]
      },
      {
        id: 'incline_dumbbell_press',
        name: 'Incline Dumbbell Press',
        category: 'Chest',
        equipment: 'Dumbbell',
        sets: [
          { id: 'set_4', weight: 28, reps: 10, completed: false, previous: '26 kg × 10' },
          { id: 'set_5', weight: 30, reps: 8, completed: false, previous: '28 kg × 8' }
        ]
      }
    ]
  });

  // Modal triggers
  const [plateModal, setPlateModal] = useState({ isOpen: false, weight: 100 });
  const [oneRmModal, setOneRmModal] = useState({ isOpen: false, weight: 100, reps: 5 });
  const [restTimerModal, setRestTimerModal] = useState({ isOpen: false, duration: 90 });
  const [summaryModal, setSummaryModal] = useState({ isOpen: false, data: null });
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Unit and sound toggles
  const handleToggleUnit = () => {
    sounds.playClick();
    setUnit((prev) => (prev === 'kg' ? 'lbs' : 'kg'));
  };

  const handleToggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const scrollTo = (id) => {
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Workout row interactions
  const handleToggleSet = (exerciseIdx, setIdx) => {
    const updated = [...workout.exercises];
    const targetSet = updated[exerciseIdx].sets[setIdx];
    targetSet.completed = !targetSet.completed;

    if (targetSet.completed) {
      sounds.playSetComplete();
      setRestTimerModal({ isOpen: true, duration: 90 });
    } else {
      sounds.playClick();
    }

    setWorkout({ ...workout, exercises: updated });
  };

  const handleAdjustSet = (exerciseIdx, setIdx, field, delta) => {
    sounds.playClick();
    const updated = [...workout.exercises];
    const current = Number(updated[exerciseIdx].sets[setIdx][field]) || 0;
    updated[exerciseIdx].sets[setIdx][field] = Math.max(0, current + delta);
    setWorkout({ ...workout, exercises: updated });
  };

  const handleAddSet = (exerciseIdx) => {
    sounds.playClick();
    const updated = [...workout.exercises];
    const sets = updated[exerciseIdx].sets;
    const last = sets[sets.length - 1];

    sets.push({
      id: `set_${Date.now()}`,
      weight: last ? last.weight : 50,
      reps: last ? last.reps : 10,
      completed: false,
      previous: last ? `${last.weight} ${unit} × ${last.reps}` : '-'
    });

    setWorkout({ ...workout, exercises: updated });
  };

  const handleFinishWorkout = () => {
    let volume = 0;
    let completed = 0;

    workout.exercises.forEach((ex) => {
      ex.sets.forEach((set) => {
        if (set.completed) {
          completed++;
          volume += (Number(set.weight) || 0) * (Number(set.reps) || 0);
        }
      });
    });

    setSummaryModal({
      isOpen: true,
      data: {
        title: workout.title,
        duration: '32m 45s',
        totalVolume: volume,
        totalSets: completed,
        exercises: workout.exercises
      }
    });
  };

  return (
    <div className="app-root">
      <Navbar
        unit={unit}
        onToggleUnit={handleToggleUnit}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onStartWorkout={() => scrollTo('workout-tracker')}
      />

      <main>
        <Hero
          onStartWorkout={() => scrollTo('workout-tracker')}
          onExploreTools={() => scrollTo('calculators')}
        />

        <WorkoutLogger
          workout={workout}
          unit={unit}
          onUpdateWorkout={setWorkout}
          onToggleSet={handleToggleSet}
          onAdjustSet={handleAdjustSet}
          onAddSet={handleAddSet}
          onOpenPlateCalc={(w) => setPlateModal({ isOpen: true, weight: w })}
          onFinishWorkout={handleFinishWorkout}
        />

        <Features />

        <Calculators unit={unit} />

        <ExerciseBrowser
          onSelectExercise={(ex) => setSelectedExercise(ex)}
        />

        <Faq />
      </main>

      <Footer />

      {/* Modals */}
      <PlateCalculator
        isOpen={plateModal.isOpen}
        initialWeight={plateModal.weight}
        unit={unit}
        onClose={() => setPlateModal({ isOpen: false, weight: 100 })}
      />

      <OneRepMaxModal
        isOpen={oneRmModal.isOpen}
        defaultWeight={oneRmModal.weight}
        defaultReps={oneRmModal.reps}
        unit={unit}
        onClose={() => setOneRmModal({ isOpen: false, weight: 100, reps: 5 })}
      />

      <RestTimer
        isOpen={restTimerModal.isOpen}
        duration={restTimerModal.duration}
        onClose={() => setRestTimerModal({ isOpen: false, duration: 90 })}
        onFinish={() => {}}
      />

      <WorkoutSummaryModal
        isOpen={summaryModal.isOpen}
        workoutData={summaryModal.data}
        unit={unit}
        onClose={() => setSummaryModal({ isOpen: false, data: null })}
      />

      <TechniqueModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </div>
  );
}

export default App;
