import { EXERCISES } from '../data/exercises';

export function generateCustomRoutine({
  goal = 'hypertrophy',
  split = 'push',
  equipment = ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight'],
  duration = 45,
  experience = 'intermediate'
}) {
  // Determine target exercise count based on duration
  let targetCount = 4;
  if (duration <= 30) targetCount = 3;
  else if (duration <= 45) targetCount = 4;
  else if (duration <= 60) targetCount = 5;
  else targetCount = 6;

  // Reps and sets based on goal
  let repScheme = { sets: 3, reps: 10 };
  if (goal === 'strength') {
    repScheme = { sets: 4, reps: 5 };
  } else if (goal === 'hypertrophy') {
    repScheme = { sets: 3, reps: 10 };
  } else if (goal === 'fat_loss') {
    repScheme = { sets: 3, reps: 14 };
  }

  // Filter exercises by equipment
  let eligible = EXERCISES.filter(ex => equipment.includes(ex.equipment));
  if (eligible.length === 0) eligible = EXERCISES;

  // Split-specific muscle filters
  const splitMuscleMap = {
    push: ['chest', 'upper_chest', 'deltoids_front', 'deltoids_side', 'triceps'],
    pull: ['lats', 'traps', 'lower_back', 'deltoids_rear', 'biceps'],
    legs: ['quads', 'hamstrings', 'glutes', 'calves'],
    upper: ['chest', 'lats', 'deltoids_front', 'deltoids_side', 'biceps', 'triceps'],
    lower: ['quads', 'hamstrings', 'glutes', 'calves', 'abs'],
    full_body: ['chest', 'lats', 'quads', 'deltoids_front', 'abs', 'biceps']
  };

  const targetMuscles = splitMuscleMap[split] || splitMuscleMap.push;

  // Prioritize primary muscle match
  let matched = eligible.filter(ex => targetMuscles.includes(ex.primaryMuscle));
  if (matched.length < targetCount) {
    matched = eligible;
  }

  // Shuffle and pick unique muscle targets
  const shuffled = [...matched].sort(() => 0.5 - Math.random());
  const selected = [];
  const coveredMuscles = new Set();

  for (const ex of shuffled) {
    if (selected.length >= targetCount) break;
    if (!coveredMuscles.has(ex.primaryMuscle)) {
      selected.push(ex);
      coveredMuscles.add(ex.primaryMuscle);
    }
  }

  // If still need more to hit targetCount
  for (const ex of shuffled) {
    if (selected.length >= targetCount) break;
    if (!selected.some(s => s.id === ex.id)) {
      selected.push(ex);
    }
  }

  const generatedExercises = selected.map(ex => {
    let weight = ex.defaultWeight;
    if (experience === 'beginner') weight = Math.round(weight * 0.7);
    if (experience === 'advanced') weight = Math.round(weight * 1.2);
    if (goal === 'strength') weight = Math.round(weight * 1.15);

    return {
      exerciseId: ex.id,
      sets: repScheme.sets,
      reps: repScheme.reps,
      weight: weight
    };
  });

  const splitLabels = {
    push: 'Smart Push Surge',
    pull: 'Smart Pull Matrix',
    legs: 'Smart Leg Dominance',
    upper: 'Smart Upper Dynamic',
    lower: 'Smart Lower Force',
    full_body: 'Smart Full Body Ignition'
  };

  return {
    id: `ai_routine_${Date.now()}`,
    name: `AI: ${splitLabels[split] || 'Custom Surge'} (${duration}m)`,
    badge: 'AI Tailored',
    level: experience.charAt(0).toUpperCase() + experience.slice(1),
    duration: `${duration} min`,
    targetMuscles,
    description: `Auto-engineered for ${goal.replace('_', ' ')} using ${equipment.slice(0, 3).join(', ')}. Target volume: ${selected.length * repScheme.sets} total sets.`,
    exercises: generatedExercises
  };
}
