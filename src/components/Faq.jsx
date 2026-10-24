import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/faq';
import { sounds } from '../utils/sound';

export function Faq() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    sounds.playClick();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="page-section">
      <div className="section-header">
        <span className="section-pill">COMMON QUESTIONS</span>
        <h2>Frequently Asked Questions</h2>
      </div>

      <div className="faq-list">
        {FAQS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className={`faq-card ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-trigger"
                onClick={() => toggle(item.id)}
              >
                <span>{item.question}</span>
                <ChevronDown size={17} className={`arrow ${isOpen ? 'rotated' : ''}`} />
              </button>
              {isOpen && (
                <div className="faq-content">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
