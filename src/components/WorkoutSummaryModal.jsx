import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, Trophy, Flame, Share2, CheckCircle2, Clock, Dumbbell, Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound';

export function WorkoutSummaryModal({
  isOpen,
  onClose,
  workoutData,
  unit = 'kg'
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      sounds.playFanfare();

      // Launch multi-burst confetti
      const end = Date.now() + 1200;
      const colors = ['#00F0FF', '#6366F1', '#10B981', '#F59E0B', '#EC4899'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isOpen]);

  if (!isOpen || !workoutData) return null;

  const {
    title = 'Strength Workout',
    duration = '48m 20s',
    totalVolume = 8420,
    totalSets = 16,
    exercises = []
  } = workoutData;

  const handleShare = () => {
    sounds.playClick();
    const text = `🔥 Finished "${title}" on Liftly!\n🏋️ Volume: ${totalVolume.toLocaleString()} ${unit}\n⏱️ Time: ${duration}\n💪 Sets: ${totalSets}\nThink Less. Lift More. https://www.lyfta.app/`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop celebration-backdrop">
      <div className="modal-container celebration-modal">
        <div className="celebration-hero">
          <div className="trophy-glow-orb">
            <Trophy size={48} color="#FFD700" className="trophy-icon" />
          </div>
          <span className="celebration-tag">SESSION DOMINATED</span>
          <h2 className="celebration-title">Workout Completed!</h2>
          <p className="celebration-subtitle">
            Consistent reps build legends. You crushed it today!
          </p>
        </div>

        {/* PR Highlight Pill */}
        <div className="pr-achievement-pill">
          <Sparkles size={20} color="#00F0FF" />
          <div className="pr-achievement-text">
            <strong>NEW PERSONAL RECORD</strong>
            <span>Estimated 1RM Bench increased to 105 {unit}!</span>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="summary-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap cyan">
              <Dumbbell size={20} />
            </div>
            <div className="stat-number">{totalVolume.toLocaleString()} {unit}</div>
            <div className="stat-desc">Total Volume</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap indigo">
              <Clock size={20} />
            </div>
            <div className="stat-number">{duration}</div>
            <div className="stat-desc">Duration</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap emerald">
              <CheckCircle2 size={20} />
            </div>
            <div className="stat-number">{totalSets}</div>
            <div className="stat-desc">Sets Completed</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap amber">
              <Flame size={20} />
            </div>
            <div className="stat-number">+420 XP</div>
            <div className="stat-desc">Streak: 15 Days 🔥</div>
          </div>
        </div>

        {/* Exercise breakdown preview */}
        <div className="workout-summary-breakdown">
          <h4>Exercises Logged:</h4>
          <div className="summary-exercise-list">
            {exercises.map((item, idx) => (
              <div key={idx} className="summary-ex-item">
                <span className="summary-ex-name">{item.name}</span>
                <span className="summary-ex-detail">
                  {item.sets ? item.sets.length : 3} sets • {item.bestWeight || 80} {unit} max
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="celebration-actions">
          <button
            type="button"
            className="share-summary-btn"
            onClick={handleShare}
          >
            <Share2 size={18} />
            {copied ? 'Summary Copied to Clipboard!' : 'Share Workout Summary'}
          </button>
          <button
            type="button"
            className="finish-done-btn"
            onClick={onClose}
          >
            Done & Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
