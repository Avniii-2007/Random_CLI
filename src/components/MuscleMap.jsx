import React, { useState } from 'react';
import { MUSCLE_GROUPS } from '../data/exercises';

export function MuscleMap({ activeMuscles = [], onSelectMuscle, selectedMuscle = null }) {
  const [view, setView] = useState('front'); // 'front' | 'back'

  const isHighlighted = (muscleKey) => {
    return activeMuscles.includes(muscleKey) || selectedMuscle === muscleKey;
  };

  const getMuscleColor = (muscleKey) => {
    if (selectedMuscle === muscleKey) return '#00F0FF'; // Focused cyan
    if (activeMuscles.includes(muscleKey)) return '#10B981'; // Active in workout green
    return '#1E293B'; // Inactive slate
  };

  const getGlowFilter = (muscleKey) => {
    if (selectedMuscle === muscleKey) return 'drop-shadow(0 0 8px #00F0FF)';
    if (activeMuscles.includes(muscleKey)) return 'drop-shadow(0 0 6px #10B981)';
    return 'none';
  };

  return (
    <div className="muscle-map-card">
      <div className="muscle-map-header">
        <div className="muscle-map-title">
          <span className="live-indicator"></span>
          <span>ANATOMICAL TARGET MATRIX</span>
        </div>
        <div className="view-toggle">
          <button
            type="button"
            className={`view-btn ${view === 'front' ? 'active' : ''}`}
            onClick={() => setView('front')}
          >
            Anterior (Front)
          </button>
          <button
            type="button"
            className={`view-btn ${view === 'back' ? 'active' : ''}`}
            onClick={() => setView('back')}
          >
            Posterior (Back)
          </button>
        </div>
      </div>

      <div className="muscle-map-stage">
        {view === 'front' ? (
          <svg
            viewBox="0 0 300 440"
            className="anatomy-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="bodyBaseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#101522" />
                <stop offset="100%" stopColor="#0B0E17" />
              </linearGradient>
            </defs>

            {/* Subtle background anatomy frame */}
            <circle cx="150" cy="45" r="24" fill="#141B2D" stroke="#25324E" strokeWidth="1.5" />
            <path
              d="M 130 68 Q 150 78 170 68 L 175 90 L 125 90 Z"
              fill="#141B2D"
              stroke="#25324E"
            />

            {/* Front Deltoids (Left & Right) */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('deltoids_front')}
              style={{ filter: getGlowFilter('deltoids_front'), cursor: 'pointer' }}
            >
              <path
                d="M 105 88 Q 80 98 85 130 Q 102 125 110 108 Z"
                fill={getMuscleColor('deltoids_front')}
                stroke={isHighlighted('deltoids_front') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <path
                d="M 195 88 Q 220 98 215 130 Q 198 125 190 108 Z"
                fill={getMuscleColor('deltoids_front')}
                stroke={isHighlighted('deltoids_front') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Front Deltoids</title>
            </g>

            {/* Lateral Deltoids */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('deltoids_side')}
              style={{ filter: getGlowFilter('deltoids_side'), cursor: 'pointer' }}
            >
              <path
                d="M 82 98 Q 68 115 76 138 Q 84 135 85 125 Z"
                fill={getMuscleColor('deltoids_side')}
                stroke={isHighlighted('deltoids_side') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <path
                d="M 218 98 Q 232 115 224 138 Q 216 135 215 125 Z"
                fill={getMuscleColor('deltoids_side')}
                stroke={isHighlighted('deltoids_side') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Side / Lateral Deltoids</title>
            </g>

            {/* Pectorals / Chest */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('chest')}
              style={{ filter: getGlowFilter('chest'), cursor: 'pointer' }}
            >
              <path
                d="M 112 100 Q 148 100 148 138 Q 115 142 108 126 Z"
                fill={getMuscleColor('chest')}
                stroke={isHighlighted('chest') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <path
                d="M 188 100 Q 152 100 152 138 Q 185 142 192 126 Z"
                fill={getMuscleColor('chest')}
                stroke={isHighlighted('chest') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Pectorals / Chest</title>
            </g>

            {/* Biceps */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('biceps')}
              style={{ filter: getGlowFilter('biceps'), cursor: 'pointer' }}
            >
              <path
                d="M 84 134 Q 72 150 78 180 Q 94 175 92 145 Z"
                fill={getMuscleColor('biceps')}
                stroke={isHighlighted('biceps') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <path
                d="M 216 134 Q 228 150 222 180 Q 206 175 208 145 Z"
                fill={getMuscleColor('biceps')}
                stroke={isHighlighted('biceps') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Biceps</title>
            </g>

            {/* Forearms Front */}
            <path
              d="M 76 186 Q 66 215 72 245 L 84 245 Q 86 215 88 186 Z"
              fill="#141B2D"
              stroke="#25324E"
              strokeWidth="1.2"
            />
            <path
              d="M 224 186 Q 234 215 228 245 L 216 245 Q 214 215 212 186 Z"
              fill="#141B2D"
              stroke="#25324E"
              strokeWidth="1.2"
            />

            {/* Abdominals / Core */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('abs')}
              style={{ filter: getGlowFilter('abs'), cursor: 'pointer' }}
            >
              {/* Upper, Mid, Lower Abs blocks */}
              <rect
                x="132"
                y="144"
                width="16"
                height="15"
                rx="3"
                fill={getMuscleColor('abs')}
                stroke={isHighlighted('abs') ? '#fff' : '#334155'}
              />
              <rect
                x="152"
                y="144"
                width="16"
                height="15"
                rx="3"
                fill={getMuscleColor('abs')}
                stroke={isHighlighted('abs') ? '#fff' : '#334155'}
              />
              <rect
                x="132"
                y="164"
                width="16"
                height="16"
                rx="3"
                fill={getMuscleColor('abs')}
                stroke={isHighlighted('abs') ? '#fff' : '#334155'}
              />
              <rect
                x="152"
                y="164"
                width="16"
                height="16"
                rx="3"
                fill={getMuscleColor('abs')}
                stroke={isHighlighted('abs') ? '#fff' : '#334155'}
              />
              <rect
                x="134"
                y="185"
                width="14"
                height="18"
                rx="3"
                fill={getMuscleColor('abs')}
                stroke={isHighlighted('abs') ? '#fff' : '#334155'}
              />
              <rect
                x="152"
                y="185"
                width="14"
                height="18"
                rx="3"
                fill={getMuscleColor('abs')}
                stroke={isHighlighted('abs') ? '#fff' : '#334155'}
              />
              <title>Abdominals / Core</title>
            </g>

            {/* Quadriceps (Left & Right) */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('quads')}
              style={{ filter: getGlowFilter('quads'), cursor: 'pointer' }}
            >
              <path
                d="M 112 215 Q 100 250 108 310 Q 132 320 144 310 Q 148 250 142 215 Z"
                fill={getMuscleColor('quads')}
                stroke={isHighlighted('quads') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <path
                d="M 188 215 Q 200 250 192 310 Q 168 320 156 310 Q 152 250 158 215 Z"
                fill={getMuscleColor('quads')}
                stroke={isHighlighted('quads') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Quadriceps</title>
            </g>

            {/* Shins & Calves Front */}
            <path
              d="M 112 330 Q 108 375 116 415 L 134 415 Q 136 375 136 330 Z"
              fill="#141B2D"
              stroke="#25324E"
              strokeWidth="1.2"
            />
            <path
              d="M 188 330 Q 192 375 184 415 L 166 415 Q 164 375 164 330 Z"
              fill="#141B2D"
              stroke="#25324E"
              strokeWidth="1.2"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 300 440"
            className="anatomy-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Back Head & Neck */}
            <circle cx="150" cy="45" r="24" fill="#141B2D" stroke="#25324E" strokeWidth="1.5" />

            {/* Traps (Upper Back) */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('traps')}
              style={{ filter: getGlowFilter('traps'), cursor: 'pointer' }}
            >
              <path
                d="M 130 68 L 170 68 L 195 90 L 150 135 L 105 90 Z"
                fill={getMuscleColor('traps')}
                stroke={isHighlighted('traps') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Trapezius & Upper Back</title>
            </g>

            {/* Rear Deltoids */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('deltoids_rear')}
              style={{ filter: getGlowFilter('deltoids_rear'), cursor: 'pointer' }}
            >
              <path
                d="M 102 90 Q 78 100 84 125 Q 102 122 108 108 Z"
                fill={getMuscleColor('deltoids_rear')}
                stroke={isHighlighted('deltoids_rear') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <path
                d="M 198 90 Q 222 100 216 125 Q 198 122 192 108 Z"
                fill={getMuscleColor('deltoids_rear')}
                stroke={isHighlighted('deltoids_rear') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Rear Deltoids</title>
            </g>

            {/* Triceps (Back of arms) */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('triceps')}
              style={{ filter: getGlowFilter('triceps'), cursor: 'pointer' }}
            >
              <path
                d="M 82 128 Q 70 150 76 182 Q 92 176 90 142 Z"
                fill={getMuscleColor('triceps')}
                stroke={isHighlighted('triceps') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <path
                d="M 218 128 Q 230 150 224 182 Q 208 176 210 142 Z"
                fill={getMuscleColor('triceps')}
                stroke={isHighlighted('triceps') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Triceps</title>
            </g>

            {/* Latissimus Dorsi (Lats) */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('lats')}
              style={{ filter: getGlowFilter('lats'), cursor: 'pointer' }}
            >
              <path
                d="M 104 116 Q 146 138 146 185 Q 118 185 106 148 Z"
                fill={getMuscleColor('lats')}
                stroke={isHighlighted('lats') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <path
                d="M 196 116 Q 154 138 154 185 Q 182 185 194 148 Z"
                fill={getMuscleColor('lats')}
                stroke={isHighlighted('lats') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Lats (Latissimus Dorsi)</title>
            </g>

            {/* Lower Back / Erectors */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('lower_back')}
              style={{ filter: getGlowFilter('lower_back'), cursor: 'pointer' }}
            >
              <path
                d="M 136 178 L 164 178 L 160 215 L 140 215 Z"
                fill={getMuscleColor('lower_back')}
                stroke={isHighlighted('lower_back') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Lower Back (Spinal Erectors)</title>
            </g>

            {/* Glutes */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('glutes')}
              style={{ filter: getGlowFilter('glutes'), cursor: 'pointer' }}
            >
              <path
                d="M 112 215 Q 146 215 148 255 Q 115 255 108 235 Z"
                fill={getMuscleColor('glutes')}
                stroke={isHighlighted('glutes') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <path
                d="M 188 215 Q 154 215 152 255 Q 185 255 192 235 Z"
                fill={getMuscleColor('glutes')}
                stroke={isHighlighted('glutes') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Glutes</title>
            </g>

            {/* Hamstrings */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('hamstrings')}
              style={{ filter: getGlowFilter('hamstrings'), cursor: 'pointer' }}
            >
              <path
                d="M 110 258 Q 104 290 114 316 Q 134 316 142 290 Q 144 260 144 258 Z"
                fill={getMuscleColor('hamstrings')}
                stroke={isHighlighted('hamstrings') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <path
                d="M 190 258 Q 196 290 186 316 Q 166 316 158 290 Q 156 260 156 258 Z"
                fill={getMuscleColor('hamstrings')}
                stroke={isHighlighted('hamstrings') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Hamstrings</title>
            </g>

            {/* Calves (Gastrocnemius & Soleus) */}
            <g
              className="muscle-path-group"
              onClick={() => onSelectMuscle && onSelectMuscle('calves')}
              style={{ filter: getGlowFilter('calves'), cursor: 'pointer' }}
            >
              <path
                d="M 112 330 Q 102 360 112 405 Q 128 405 134 370 Q 136 340 134 330 Z"
                fill={getMuscleColor('calves')}
                stroke={isHighlighted('calves') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <path
                d="M 188 330 Q 198 360 188 405 Q 172 405 166 370 Q 164 340 166 330 Z"
                fill={getMuscleColor('calves')}
                stroke={isHighlighted('calves') ? '#fff' : '#334155'}
                strokeWidth="1.5"
              />
              <title>Calves (Gastrocnemius)</title>
            </g>
          </svg>
        )}

        <div className="muscle-legend">
          <div className="legend-item">
            <span className="dot active"></span>
            <span>Active in Session</span>
          </div>
          <div className="legend-item">
            <span className="dot focus"></span>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <span className="dot idle"></span>
            <span>Rested</span>
          </div>
        </div>
      </div>

      {selectedMuscle && MUSCLE_GROUPS[selectedMuscle] && (
        <div className="selected-muscle-banner">
          <div>
            <div className="banner-label">TARGET MUSCLE</div>
            <div className="banner-name">{MUSCLE_GROUPS[selectedMuscle].name}</div>
          </div>
          <button
            type="button"
            className="filter-by-muscle-btn"
            onClick={() => onSelectMuscle && onSelectMuscle(selectedMuscle)}
          >
            Explore Exercises →
          </button>
        </div>
      )}
    </div>
  );
}
