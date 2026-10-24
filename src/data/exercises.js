// Exercise Database with anatomical muscle mappings & form instructions
export const EXERCISES = [
  // CHEST
  {
    id: 'barbell_bench_press',
    name: 'Barbell Bench Press',
    category: 'Chest',
    primaryMuscle: 'chest',
    secondaryMuscles: ['triceps', 'deltoids_front'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultWeight: 80,
    defaultReps: 8,
    icon: '🏋️‍♂️',
    instructions: [
      'Lie flat on the bench with eyes directly under the racked bar.',
      'Grip the bar slightly wider than shoulder-width with wrists straight.',
      'Unrack, retract your scapulae, and lower the bar in a controlled arc to mid-sternum.',
      'Press upward explosively through your palms while driving your feet into the floor.'
    ],
    tips: 'Maintain a natural lower back arch and keep elbows tucked at roughly 45-75 degrees.'
  },
  {
    id: 'incline_dumbbell_press',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    primaryMuscle: 'upper_chest',
    secondaryMuscles: ['deltoids_front', 'triceps'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    defaultWeight: 28,
    defaultReps: 10,
    icon: '💪',
    instructions: [
      'Set an adjustable bench to a 30-degree incline.',
      'Kick the dumbbells up with your knees to shoulder height.',
      'Press upward in a slight triangle path, contracting upper chest at the peak.',
      'Lower smoothly until a comfortable deep stretch is felt.'
    ],
    tips: 'Avoid angling above 30 degrees to prevent excessive anterior deltoid engagement.'
  },
  {
    id: 'cable_chest_fly',
    name: 'Cable Standing Fly',
    category: 'Chest',
    primaryMuscle: 'chest',
    secondaryMuscles: ['deltoids_front'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultWeight: 14,
    defaultReps: 12,
    icon: '🦅',
    instructions: [
      'Position pulleys at chest height, grab D-handles, and take a staggered step forward.',
      'With elbows slightly bent, hug your arms together in a broad sweeping arc.',
      'Squeeze chest hard for 1 second at full peak contraction.',
      'Return slowly under continuous cable tension.'
    ],
    tips: 'Do not let your shoulders roll forward; lead with your sternum.'
  },
  {
    id: 'dips_chest',
    name: 'Chest Dips',
    category: 'Chest',
    primaryMuscle: 'chest',
    secondaryMuscles: ['triceps', 'deltoids_front'],
    equipment: 'Bodyweight',
    difficulty: 'Advanced',
    defaultWeight: 0,
    defaultReps: 12,
    icon: '🤸‍♂️',
    instructions: [
      'Grip parallel bars and suspend your body with straight arms.',
      'Lean your torso forward 30 degrees and flare elbows out slightly.',
      'Lower yourself until upper arms are parallel with the floor.',
      'Drive upwards, engaging lower pectorals.'
    ],
    tips: 'Leaning forward emphasizes chest; keeping upright targets triceps.'
  },

  // BACK
  {
    id: 'deadlift_conventional',
    name: 'Conventional Barbell Deadlift',
    category: 'Back',
    primaryMuscle: 'lower_back',
    secondaryMuscles: ['glutes', 'hamstrings', 'traps', 'lats'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    defaultWeight: 120,
    defaultReps: 5,
    icon: '⚡',
    instructions: [
      'Stand with midfoot under barbell, hip-width stance.',
      'Hinge at hips, grab bar just outside shins, pull slack out of the bar.',
      'Brace core, engage lats (imagine squeezing oranges in armpits).',
      'Drive through mid-foot, extending hips and knees simultaneously.'
    ],
    tips: 'Do not hyperextend at lockout. Keep bar glued close to legs.'
  },
  {
    id: 'barbell_bent_row',
    name: 'Barbell Bent-Over Row',
    category: 'Back',
    primaryMuscle: 'lats',
    secondaryMuscles: ['traps', 'biceps', 'lower_back'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultWeight: 70,
    defaultReps: 8,
    icon: '🚣',
    instructions: [
      'Hinge hips back to 45 degrees with spine neutral and knees soft.',
      'Pull the barbell towards your lower ribs/belly button with elbows driving back.',
      'Squeeze shoulder blades together forcefully at top.',
      'Lower with control without rounding the spine.'
    ],
    tips: 'Initiate by driving elbows back rather than pulling with wrists.'
  },
  {
    id: 'lat_pulldown_wide',
    name: 'Wide-Grip Lat Pulldown',
    category: 'Back',
    primaryMuscle: 'lats',
    secondaryMuscles: ['biceps', 'traps'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultWeight: 60,
    defaultReps: 10,
    icon: '🧗',
    instructions: [
      'Sit securely under thigh pads with wide overhand grip.',
      'Lean back 10-15 degrees, pull bar down towards upper chest.',
      'Focus on depressing shoulder blades and driving elbows into pockets.',
      'Allow full stretch at top without releasing shoulder control.'
    ],
    tips: 'Avoid using momentum to swing backward.'
  },
  {
    id: 'pull_up',
    name: 'Pull-Up',
    category: 'Back',
    primaryMuscle: 'lats',
    secondaryMuscles: ['biceps', 'traps', 'abs'],
    equipment: 'Bodyweight',
    difficulty: 'Advanced',
    defaultWeight: 0,
    defaultReps: 8,
    icon: '🔥',
    instructions: [
      'Grasp bar slightly wider than shoulders with overhand grip.',
      'Hang with arms fully extended and engage scapulae.',
      'Pull chest up to touch the bar, leading with sternum.',
      'Descend under control to full dead hang.'
    ],
    tips: 'Engage glutes and core to avoid swinging.'
  },
  {
    id: 'seated_cable_row',
    name: 'Seated Cable Row',
    category: 'Back',
    primaryMuscle: 'traps',
    secondaryMuscles: ['lats', 'biceps'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultWeight: 55,
    defaultReps: 12,
    icon: '🚣‍♀️',
    instructions: [
      'Sit upright with knees slightly bent and feet on plates.',
      'Grip V-handle, sit tall with proud chest.',
      'Pull handle to abdomen, retracting scapulae fully.',
      'Resist weight back to full arm extension with slight forward stretch.'
    ],
    tips: 'Keep lower back stationary; row with upper back.'
  },

  // SHOULDERS
  {
    id: 'overhead_press',
    name: 'Standing Overhead Press',
    category: 'Shoulders',
    primaryMuscle: 'deltoids_front',
    secondaryMuscles: ['deltoids_side', 'triceps', 'traps', 'abs'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultWeight: 50,
    defaultReps: 6,
    icon: '🎯',
    instructions: [
      'Rest barbell across collarbone with full grip, elbows slightly forward.',
      'Squeeze glutes and brace core tightly.',
      'Press straight up, tucking chin briefly until bar clears forehead.',
      'Lock out overhead with biceps aligned with ears.'
    ],
    tips: 'Keep core tight like a tree trunk; no backward arching.'
  },
  {
    id: 'dumbbell_lateral_raise',
    name: 'Dumbbell Lateral Raise',
    category: 'Shoulders',
    primaryMuscle: 'deltoids_side',
    secondaryMuscles: ['traps'],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    defaultWeight: 12,
    defaultReps: 15,
    icon: '🦅',
    instructions: [
      'Stand tall holding dumbbells at your sides with soft elbows.',
      'Raise arms out to sides in scapular plane (slight 15-deg forward angle).',
      'Lift until hands reach shoulder height.',
      'Lower smoothly over 2 seconds.'
    ],
    tips: 'Think of pouring water out of a pitcher at the peak; lead with elbows.'
  },
  {
    id: 'face_pull_cable',
    name: 'Rope Face Pull',
    category: 'Shoulders',
    primaryMuscle: 'deltoids_rear',
    secondaryMuscles: ['traps'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultWeight: 25,
    defaultReps: 15,
    icon: '🎯',
    instructions: [
      'Set cable pulley to eye level with rope attachment.',
      'Grip rope with thumbs facing back towards you.',
      'Pull towards eye level while separating the rope ends apart.',
      'Externally rotate shoulders at the finish and hold 1 sec.'
    ],
    tips: 'Crucial for shoulder health and posture; focus on rear delts.'
  },

  // LEGS
  {
    id: 'barbell_back_squat',
    name: 'Barbell Back Squat',
    category: 'Legs',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes', 'hamstrings', 'lower_back', 'abs'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultWeight: 100,
    defaultReps: 6,
    icon: '👑',
    instructions: [
      'Barbell resting on traps, feet shoulder-width, toes slightly out.',
      'Take deep diaphragmatic breath and brace abdominal wall.',
      'Hinge hips and bend knees, sinking below parallel depth.',
      'Drive floor away aggressively through mid-foot to stand.'
    ],
    tips: 'Keep knees tracking in line with second toes throughout.'
  },
  {
    id: 'romanian_deadlift',
    name: 'Romanian Deadlift (RDL)',
    category: 'Legs',
    primaryMuscle: 'hamstrings',
    secondaryMuscles: ['glutes', 'lower_back'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultWeight: 85,
    defaultReps: 8,
    icon: '🦵',
    instructions: [
      'Hold barbell at hip height with soft knees.',
      'Push your hips backward towards the wall behind you.',
      'Lower barbell down shins until deep hamstring stretch is felt.',
      'Squeeze glutes to push hips back forward into lockout.'
    ],
    tips: 'Movement is a pure hip hinge, not a squat.'
  },
  {
    id: 'leg_press',
    name: '45° Incline Leg Press',
    category: 'Legs',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes'],
    equipment: 'Machine',
    difficulty: 'Beginner',
    defaultWeight: 160,
    defaultReps: 10,
    icon: '🚀',
    instructions: [
      'Sit comfortably with spine flush against backrest.',
      'Place feet shoulder-width on center platform.',
      'Unlock sled, lower slowly until knees are at 90 degrees.',
      'Press through heels and balls of feet without locking knees completely.'
    ],
    tips: 'Never let your pelvis curl off the pad at bottom.'
  },
  {
    id: 'standing_calf_raise',
    name: 'Standing Calf Raise',
    category: 'Legs',
    primaryMuscle: 'calves',
    secondaryMuscles: [],
    equipment: 'Machine',
    difficulty: 'Beginner',
    defaultWeight: 75,
    defaultReps: 15,
    icon: '🦿',
    instructions: [
      'Rest balls of feet on step edge, shoulders under pads.',
      'Drop heels down for a full deep 2-second calf stretch.',
      'Explode upward onto balls of big toes, squeezing calves.',
      'Hold top contraction for 1 full second.'
    ],
    tips: 'Calves respond best to slow negatives and full bottom stretches.'
  },
  {
    id: 'hip_thrust_barbell',
    name: 'Barbell Hip Thrust',
    category: 'Legs',
    primaryMuscle: 'glutes',
    secondaryMuscles: ['hamstrings', 'quads'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultWeight: 110,
    defaultReps: 10,
    icon: '🍑',
    instructions: [
      'Upper back against bench, padded barbell across hip crease.',
      'Feet flat on ground, knees at 90 degrees at top of lift.',
      'Drive through heels, extending hips fully toward ceiling.',
      'Lock out at top with ribs down and posterior pelvic tilt.'
    ],
    tips: 'Keep chin tucked and eyes looking forward, not up.'
  },

  // ARMS
  {
    id: 'barbell_bicep_curl',
    name: 'Barbell Bicep Curl',
    category: 'Arms',
    primaryMuscle: 'biceps',
    secondaryMuscles: [],
    equipment: 'Barbell',
    difficulty: 'Beginner',
    defaultWeight: 35,
    defaultReps: 10,
    icon: '💪',
    instructions: [
      'Stand upright holding bar with shoulder-width underhand grip.',
      'Pin elbows to ribcage, curl bar upward by flexing biceps.',
      'Squeeze biceps at the top of the range.',
      'Lower under steady 2-second eccentric control.'
    ],
    tips: 'Keep elbows locked in place; do not swing torso.'
  },
  {
    id: 'incline_dumbbell_curl',
    name: 'Incline Dumbbell Curl',
    category: 'Arms',
    primaryMuscle: 'biceps',
    secondaryMuscles: [],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    defaultWeight: 14,
    defaultReps: 10,
    icon: '⚡',
    instructions: [
      'Sit on bench inclined to 45 degrees, arms hanging naturally.',
      'Curl dumbbells upward while supinating wrists (palms up).',
      'Emphasize the deep stretch at bottom of each rep.'
    ],
    tips: 'Maximum stretch on the long head of the bicep.'
  },
  {
    id: 'tricep_rope_pushdown',
    name: 'Cable Tricep Pushdown',
    category: 'Arms',
    primaryMuscle: 'triceps',
    secondaryMuscles: [],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultWeight: 27,
    defaultReps: 12,
    icon: '🔥',
    instructions: [
      'Attach rope to high pulley, grasp with neutral palms.',
      'Pin elbows at your sides, push rope down towards thighs.',
      'Spread rope apart at bottom, fully locking out triceps.',
      'Return up to 90 degrees under strict control.'
    ],
    tips: 'Do not let shoulders roll forward or elbows drift away.'
  },
  {
    id: 'skull_crushers',
    name: 'EZ-Bar Skull Crushers',
    category: 'Arms',
    primaryMuscle: 'triceps',
    secondaryMuscles: [],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultWeight: 32,
    defaultReps: 10,
    icon: '💀',
    instructions: [
      'Lie flat holding EZ-bar with arms extended over chest.',
      'Keep upper arms perpendicular to floor or slightly angled back.',
      'Bend elbows to lower bar towards forehead/crown of head.',
      'Extend elbows to drive bar back up.'
    ],
    tips: 'Angling upper arms 10 degrees backward keeps continuous tension.'
  },

  // CORE
  {
    id: 'hanging_leg_raise',
    name: 'Hanging Leg Raise',
    category: 'Core',
    primaryMuscle: 'abs',
    secondaryMuscles: [],
    equipment: 'Bodyweight',
    difficulty: 'Advanced',
    defaultWeight: 0,
    defaultReps: 12,
    icon: '🛡️',
    instructions: [
      'Hang from pull-up bar with overhand grip and engaged shoulders.',
      'Without swinging, curl pelvis upward and raise legs to horizontal or higher.',
      'Pause for 1 count at peak compression.',
      'Lower slowly over 3 seconds.'
    ],
    tips: 'Focus on curling pelvis toward ribs rather than just swinging hip flexors.'
  },
  {
    id: 'cable_woodchopper',
    name: 'Cable Woodchopper',
    category: 'Core',
    primaryMuscle: 'abs',
    secondaryMuscles: ['deltoids_front'],
    equipment: 'Cable',
    difficulty: 'Intermediate',
    defaultWeight: 20,
    defaultReps: 12,
    icon: '🌪️',
    instructions: [
      'Stand sideways to high pulley, holding handle with both hands.',
      'Rotate torso downward and across body towards opposite knee.',
      'Pivot on rear foot and engage obliques.',
      'Return smoothly under cable resistance.'
    ],
    tips: 'Power comes from torso rotation, not pulling with arms.'
  },
  {
    id: 'plank_weighted',
    name: 'Hardstyle Plank',
    category: 'Core',
    primaryMuscle: 'abs',
    secondaryMuscles: ['glutes', 'deltoids_front'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    defaultWeight: 0,
    defaultReps: 60, // seconds
    icon: '🧱',
    instructions: [
      'Forearms on ground, elbows under shoulders, feet together.',
      'Pull elbows toward toes and toes toward elbows to create maximum tension.',
      'Squeeze glutes, quads, and abs as hard as possible.',
      'Breathe into the belly while holding rigid posture.'
    ],
    tips: 'Tension beats duration: 30s of extreme tension out-performs 2 mins of slouching.'
  }
];

// Muscle labels and group categories
export const MUSCLE_GROUPS = {
  chest: { name: 'Chest', category: 'Upper Body', view: 'front' },
  upper_chest: { name: 'Upper Chest', category: 'Upper Body', view: 'front' },
  lats: { name: 'Lats', category: 'Upper Body', view: 'back' },
  traps: { name: 'Traps & Upper Back', category: 'Upper Body', view: 'back' },
  lower_back: { name: 'Lower Back', category: 'Core/Spine', view: 'back' },
  deltoids_front: { name: 'Front Deltoids', category: 'Shoulders', view: 'front' },
  deltoids_side: { name: 'Lateral Deltoids', category: 'Shoulders', view: 'front' },
  deltoids_rear: { name: 'Rear Deltoids', category: 'Shoulders', view: 'back' },
  biceps: { name: 'Biceps', category: 'Arms', view: 'front' },
  triceps: { name: 'Triceps', category: 'Arms', view: 'back' },
  quads: { name: 'Quadriceps', category: 'Lower Body', view: 'front' },
  hamstrings: { name: 'Hamstrings', category: 'Lower Body', view: 'back' },
  glutes: { name: 'Glutes', category: 'Lower Body', view: 'back' },
  calves: { name: 'Calves', category: 'Lower Body', view: 'back' },
  abs: { name: 'Core & Abs', category: 'Core', view: 'front' }
};
