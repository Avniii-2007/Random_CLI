import React, { useEffect, useState } from 'react';
import { Play, Pause, Plus, Minus, X, Minimize2, Maximize2, Bell } from 'lucide-react';
import { sounds } from '../utils/sound';

export function RestTimer({
  isOpen,
  duration = 90,
  onClose,
  onFinish
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [totalDuration, setTotalDuration] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    setTimeLeft(duration);
    setTotalDuration(duration);
    setIsRunning(true);
  }, [duration]);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 4 && prev > 1) {
            sounds.playBeep(false); // short countdown tick
          } else if (prev === 1) {
            sounds.playBeep(true); // final tone
          }

          if (prev <= 1) {
            clearInterval(interval);
            sounds.playTimerDone();
            if (onFinish) onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onFinish]);

  if (!isOpen && timeLeft === 0) return null;
  if (!isOpen) return null;

  const progress = totalDuration > 0 ? (timeLeft / totalDuration) : 0;
  const strokeDashoffset = 283 - 283 * progress;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const adjustTime = (delta) => {
    sounds.playClick();
    setTimeLeft(prev => Math.max(0, prev + delta));
    setTotalDuration(prev => Math.max(prev + delta, 1));
  };

  if (isMinimized) {
    return (
      <div className="floating-rest-pill" onClick={() => setIsMinimized(false)}>
        <div className="mini-ring">
          <svg width="32" height="32" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#222f46" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="8"
              strokeDasharray="264"
              strokeDashoffset={264 - 264 * progress}
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
        <div className="mini-text">
          <span className="mini-label">REST</span>
          <span className="mini-time">{formatTime(timeLeft)}</span>
        </div>
        <button
          type="button"
          className="mini-skip"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          Skip
        </button>
      </div>
    );
  }

  return (
    <div className="modal-backdrop rest-timer-backdrop">
      <div className="modal-container rest-timer-card">
        <div className="timer-top-actions">
          <button
            type="button"
            className="timer-action-btn"
            title="Minimize"
            onClick={() => setIsMinimized(true)}
          >
            <Minimize2 size={18} />
          </button>
          <button
            type="button"
            className="timer-action-btn"
            title="Close"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="rest-timer-content">
          <span className="timer-title-badge">SMART REST ENGINE</span>

          {/* Circular Countdown Ring */}
          <div className="circle-timer-wrap">
            <svg className="timer-svg" viewBox="0 0 100 100">
              <circle
                className="timer-bg-circle"
                cx="50"
                cy="50"
                r="45"
              />
              <circle
                className="timer-progress-circle"
                cx="50"
                cy="50"
                r="45"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="timer-digits-box">
              <span className="timer-digits">{formatTime(timeLeft)}</span>
              <span className="timer-status-text">
                {timeLeft === 0 ? 'READY TO LIFT!' : isRunning ? 'RECOVERING...' : 'PAUSED'}
              </span>
            </div>
          </div>

          {/* Quick Adjust Buttons */}
          <div className="timer-adjust-row">
            <button
              type="button"
              className="adjust-btn"
              onClick={() => adjustTime(-15)}
            >
              <Minus size={14} /> 15s
            </button>
            <button
              type="button"
              className="play-pause-btn"
              onClick={() => { sounds.playClick(); setIsRunning(r => !r); }}
            >
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              type="button"
              className="adjust-btn"
              onClick={() => adjustTime(30)}
            >
              <Plus size={14} /> 30s
            </button>
          </div>

          {/* Quick Presets */}
          <div className="preset-timer-row">
            {[30, 60, 90, 120, 180].map(s => (
              <button
                key={s}
                type="button"
                className={`preset-pill ${totalDuration === s ? 'active' : ''}`}
                onClick={() => {
                  sounds.playClick();
                  setTimeLeft(s);
                  setTotalDuration(s);
                  setIsRunning(true);
                }}
              >
                {s < 60 ? `${s}s` : `${s / 60}m`}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="skip-rest-btn"
            onClick={onClose}
          >
            Skip Rest & Next Set
          </button>
        </div>
      </div>
    </div>
  );
}
