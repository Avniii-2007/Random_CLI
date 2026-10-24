import React, { useState } from 'react';
import { MessageSquare, Share2, Flame, Award, Dumbbell, Sparkles, Check, Heart } from 'lucide-react';
import { sounds } from '../utils/sound';

export function CommunityFeed({ onLoadRoutineToWorkout, unit = 'kg' }) {
  const [posts, setPosts] = useState([
    {
      id: 'post_1',
      author: 'Marcus Vance',
      avatar: '🦁',
      time: '18 minutes ago',
      level: 'Lvl 24 Elite',
      workoutTitle: 'Heavy Push Hypertrophy',
      volume: 16420,
      duration: '58 min',
      pr: 'Bench Press: 120 kg × 4 (+5kg PR)',
      fistBumps: 42,
      userFistBumped: false,
      comments: [
        { user: 'Sarah Jenkins', text: 'Insane bench progression man! What program are you running?' },
        { user: 'Marcus Vance', text: 'Thanks Sarah! Using the Liftly PPL hypertrophy split.' }
      ],
      exercises: ['Barbell Bench Press', 'Incline DB Press', 'Lateral Raises', 'Tricep Pushdown']
    },
    {
      id: 'post_2',
      author: 'Elena Rostova',
      avatar: '⚡',
      time: '1 hour ago',
      level: 'Lvl 19 Apex',
      workoutTitle: 'V-Taper Pull & Deadlifts',
      volume: 19850,
      duration: '64 min',
      pr: 'Deadlift: 155 kg × 3 (Smooth form)',
      fistBumps: 89,
      userFistBumped: true,
      comments: [
        { user: 'Alex Chen', text: 'Clean lockout on that pull! 🔥' }
      ],
      exercises: ['Conventional Deadlift', 'Barbell Bent Row', 'Lat Pulldown', 'Bicep Curls']
    },
    {
      id: 'post_3',
      author: 'Tyler Brooks',
      avatar: '🐺',
      time: '3 hours ago',
      level: 'Lvl 16 Strong',
      workoutTitle: 'Leg Day Annihilation',
      volume: 24100,
      duration: '72 min',
      pr: 'Squat: 175 kg × 2 (All-time best)',
      fistBumps: 115,
      userFistBumped: false,
      comments: [],
      exercises: ['Back Squat', 'Romanian Deadlift', 'Leg Press', 'Calf Raises']
    }
  ]);

  const [floatingFists, setFloatingFists] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  const handleFistBump = (postId, event) => {
    sounds.playClick();

    // Spawn floating emoji animation
    const rect = event.currentTarget.getBoundingClientRect();
    const newFist = {
      id: Date.now() + Math.random(),
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    };
    setFloatingFists(prev => [...prev, newFist]);
    setTimeout(() => {
      setFloatingFists(prev => prev.filter(f => f.id !== newFist.id));
    }, 1200);

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const nextBumped = !p.userFistBumped;
          return {
            ...p,
            userFistBumped: nextBumped,
            fistBumps: nextBumped ? p.fistBumps + 1 : p.fistBumps - 1
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    sounds.playClick();
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, { user: 'You (Apex Lifter)', text }]
          };
        }
        return p;
      })
    );

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="community-feed-container">
      {/* Floating Fist Bump particle effects */}
      {floatingFists.map(fist => (
        <div
          key={fist.id}
          className="floating-fist-particle"
          style={{ left: `${fist.x}px`, top: `${fist.y}px` }}
        >
          👊 +1
        </div>
      ))}

      {/* Community Feed Header Banner */}
      <div className="feed-header-banner">
        <div>
          <h3>Global Brotherhood of Iron</h3>
          <p>Real-time PRs and logged sessions from lifters across the world</p>
        </div>
        <div className="feed-live-stats">
          <span className="live-pulse"></span>
          <span>1,842 Lifters Active in the Gym Now</span>
        </div>
      </div>

      {/* Feed Posts */}
      <div className="feed-posts-list">
        {posts.map(post => (
          <div key={post.id} className="feed-post-card">
            {/* Author Header */}
            <div className="post-header">
              <div className="post-author-wrap">
                <span className="post-avatar">{post.avatar}</span>
                <div>
                  <div className="author-name-row">
                    <span className="author-name">{post.author}</span>
                    <span className="author-level">{post.level}</span>
                  </div>
                  <span className="post-timestamp">{post.time}</span>
                </div>
              </div>

              <div className="post-badge-tag">
                <Flame size={14} color="#FF6B00" />
                <span>COMPLETED SESSION</span>
              </div>
            </div>

            {/* Workout Details */}
            <div className="post-content-card">
              <h4 className="post-workout-title">{post.workoutTitle}</h4>

              {post.pr && (
                <div className="post-pr-pill">
                  <Award size={16} color="#00F0FF" />
                  <span>{post.pr}</span>
                </div>
              )}

              <div className="post-metrics-row">
                <div className="post-metric">
                  <span className="lbl">Volume</span>
                  <span className="val">{post.volume.toLocaleString()} {unit}</span>
                </div>
                <div className="post-metric">
                  <span className="lbl">Duration</span>
                  <span className="val">{post.duration}</span>
                </div>
                <div className="post-metric">
                  <span className="lbl">Exercises</span>
                  <span className="val">{post.exercises.length} Movements</span>
                </div>
              </div>

              {/* Exercises Tags */}
              <div className="post-exercise-chips">
                {post.exercises.map((ex, i) => (
                  <span key={i} className="ex-chip">{ex}</span>
                ))}
              </div>
            </div>

            {/* Social Actions */}
            <div className="post-actions-bar">
              <button
                type="button"
                className={`fist-bump-btn ${post.userFistBumped ? 'active' : ''}`}
                onClick={(e) => handleFistBump(post.id, e)}
              >
                <span className="fist-icon">👊</span>
                <span>{post.fistBumps} Fist Bumps</span>
              </button>

              <button
                type="button"
                className="comment-toggle-btn"
              >
                <MessageSquare size={16} />
                <span>{post.comments.length} Comments</span>
              </button>
            </div>

            {/* Comments List */}
            {post.comments.length > 0 && (
              <div className="post-comments-box">
                {post.comments.map((c, i) => (
                  <div key={i} className="comment-bubble">
                    <strong>{c.user}:</strong>
                    <span>{c.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Input */}
            <div className="comment-input-row">
              <input
                type="text"
                placeholder="Congratulate them or ask about their sets..."
                value={commentInputs[post.id] || ''}
                onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleAddComment(post.id)}
              />
              <button
                type="button"
                className="send-comment-btn"
                onClick={() => handleAddComment(post.id)}
              >
                Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
