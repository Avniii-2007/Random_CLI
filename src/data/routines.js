export const PRESET_ROUTINES = [
  {
    id: 'push_hypertrophy',
    name: 'Push Day: Chest & Delts Hypertrophy',
    badge: 'Popular',
    level: 'Intermediate',
    duration: '60 min',
    targetMuscles: ['chest', 'upper_chest', 'deltoids_front', 'deltoids_side', 'triceps'],
    description: 'High-intensity chest expansion and capped 3D deltoids with tricep isolation finish.',
    exercises: [
      { exerciseId: 'barbell_bench_press', sets: 4, reps: 8, weight: 80 },
      { exerciseId: 'incline_dumbbell_press', sets: 3, reps: 10, weight: 28 },
      { exerciseId: 'dumbbell_lateral_raise', sets: 4, reps: 15, weight: 12 },
      { exerciseId: 'cable_chest_fly', sets: 3, reps: 12, weight: 14 },
      { exerciseId: 'tricep_rope_pushdown', sets: 4, reps: 12, weight: 27 }
    ]
  },
  {
    id: 'pull_lat_dominance',
    name: 'Pull Day: V-Taper Lats & Biceps',
    badge: 'High Volume',
    level: 'Intermediate',
    duration: '55 min',
    targetMuscles: ['lats', 'traps', 'biceps', 'deltoids_rear'],
    description: 'Designed for a wide V-taper frame, dense upper back thickness, and peaked biceps.',
    exercises: [
      { exerciseId: 'barbell_bent_row', sets: 4, reps: 8, weight: 70 },
      { exerciseId: 'pull_up', sets: 3, reps: 8, weight: 0 },
      { exerciseId: 'lat_pulldown_wide', sets: 3, reps: 10, weight: 60 },
      { exerciseId: 'face_pull_cable', sets: 4, reps: 15, weight: 25 },
      { exerciseId: 'barbell_bicep_curl', sets: 3, reps: 10, weight: 35 },
      { exerciseId: 'incline_dumbbell_curl', sets: 3, reps: 12, weight: 14 }
    ]
  },
  {
    id: 'leg_day_destroyer',
    name: 'Leg Day: Quads, Glutes & Chains',
    badge: 'Strength Focus',
    level: 'Advanced',
    duration: '65 min',
    targetMuscles: ['quads', 'hamstrings', 'glutes', 'calves'],
    description: 'Heavy squat mechanics followed by posterior chain development and explosive calves.',
    exercises: [
      { exerciseId: 'barbell_back_squat', sets: 4, reps: 6, weight: 100 },
      { exerciseId: 'romanian_deadlift', sets: 4, reps: 8, weight: 85 },
      { exerciseId: 'leg_press', sets: 3, reps: 10, weight: 160 },
      { exerciseId: 'hip_thrust_barbell', sets: 3, reps: 10, weight: 110 },
      { exerciseId: 'standing_calf_raise', sets: 4, reps: 15, weight: 75 }
    ]
  },
  {
    id: 'arnold_chest_back',
    name: 'Arnold Golden Era: Chest & Back',
    badge: 'Iconic',
    level: 'Advanced',
    duration: '70 min',
    targetMuscles: ['chest', 'lats', 'traps', 'upper_chest'],
    description: 'Agonist-antagonist supersets used by golden era legends for maximum upper body pump.',
    exercises: [
      { exerciseId: 'barbell_bench_press', sets: 4, reps: 8, weight: 85 },
      { exerciseId: 'barbell_bent_row', sets: 4, reps: 8, weight: 75 },
      { exerciseId: 'incline_dumbbell_press', sets: 3, reps: 10, weight: 30 },
      { exerciseId: 'lat_pulldown_wide', sets: 3, reps: 10, weight: 65 },
      { exerciseId: 'dips_chest', sets: 3, reps: 12, weight: 0 },
      { exerciseId: 'pull_up', sets: 3, reps: 8, weight: 0 }
    ]
  },
  {
    id: 'full_body_metabolic',
    name: 'Full Body Athletic Engine',
    badge: 'Time Efficient',
    level: 'Beginner',
    duration: '45 min',
    targetMuscles: ['quads', 'chest', 'lats', 'deltoids_front', 'abs'],
    description: 'Compound multi-joint movements hitting every major muscle group in 45 rapid minutes.',
    exercises: [
      { exerciseId: 'barbell_back_squat', sets: 3, reps: 8, weight: 80 },
      { exerciseId: 'overhead_press', sets: 3, reps: 8, weight: 45 },
      { exerciseId: 'lat_pulldown_wide', sets: 3, reps: 10, weight: 55 },
      { exerciseId: 'hanging_leg_raise', sets: 3, reps: 12, weight: 0 }
    ]
  }
];
