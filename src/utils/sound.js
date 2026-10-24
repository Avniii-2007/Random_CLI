// Lightweight audio feedback utility using Web Audio API
const isBrowser = typeof window !== 'undefined';
let audioCtx = null;
let isMuted = false;

function getContext() {
  if (!audioCtx && isBrowser) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx?.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, duration = 0.06, type = 'sine', volume = 0.08) {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Gracefully handle browser autoplay policies
  }
}

export const sounds = {
  toggleMute() {
    isMuted = !isMuted;
    return isMuted;
  },

  playClick() {
    playTone(650, 0.04, 'sine', 0.06);
  },

  playSetComplete() {
    playTone(520, 0.09, 'triangle', 0.1);
    setTimeout(() => playTone(820, 0.14, 'sine', 0.09), 70);
  },

  playTick(isFinal = false) {
    playTone(isFinal ? 900 : 600, isFinal ? 0.2 : 0.05, 'sine', 0.08);
  },

  playBeep(isFinal = false) {
    this.playTick(isFinal);
  },

  playTimerDone() {
    [523, 659, 784].forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 0.35, 'sine', 0.07), idx * 90);
    });
  },

  playFanfare() {
    [523, 659, 784, 1046].forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 0.4, 'triangle', 0.09), idx * 110);
    });
  }
};
