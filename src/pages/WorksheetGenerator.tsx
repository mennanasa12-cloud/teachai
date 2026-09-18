import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function WorksheetGenerator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ subject: 'Science', grade: 'Grade 7', topic: 'Photosynthesis', difficulty: 'Medium', count: '8' });
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const questions = [
    { num: 1, type: 'fill', text: 'Photosynthesis takes place mainly in the _____________ of a plant.' },
    { num: 2, type: 'fill', text: 'The green pigment responsible for absorbing sunlight is called _____________.' },
    { num: 3, type: 'short', text: 'List the three main ingredients needed for photosynthesis.', lines: 3 },
    { num: 4, type: 'short', text: 'What two products are made during photosynthesis?', lines: 2 },
    { num: 5, type: 'equation', text: 'Complete the photosynthesis equation:', eq: '___CO₂ + ___H₂O + light energy → ___C₆H₁₂O₆ + ___O₂' },
    { num: 6, type: 'short', text: 'Why do plants appear green? Explain in 1–2 sentences.', lines: 3 },
    { num: 7, type: 'short', text: 'How does photosynthesis benefit animals and humans?', lines: 4 },
    { num: 8, type: 'essay', text: 'Describe what would happen to life on Earth if plants could no longer perform photosynthesis.', lines: 6 },
  ];

  return (
    <div className="h-full flex flex-col lg:flex-row" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left */}
      <div className="w-full lg:w-80 xl:w-96 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex-shrink-0 overflow-y-auto">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-5">
            <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div>
              <h2 className="font-bold text-slate-900 text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Worksheet Generator</h2>
              <p className="text-xs text-slate-500">Configure your worksheet</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Subject', key: 'subject', options: ['Science', 'Mathematics', 'English', 'History', 'Geography'] },
              { label: 'Grade Level', key: 'grade', options: ['Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10'] },
              { label: 'Difficulty', key: 'difficulty', options: ['Easy', 'Medium', 'Hard'] },
              { label: 'Number of Questions', key: 'count', options: ['5','8','10','15'] },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                <select value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                  className="input-focus w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 appearance-none">
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Topic</label>
              <input value={form.topic} onChange={e => setForm({...form, topic: e.target.value})}
                className="input-focus w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900" />
            </div>
          </div>

          <button onClick={async () => { setLoading(true); await new Promise(r => setTimeout(r, 1800)); setLoading(false); setGenerated(true); }}
            disabled={loading}
            className="generate-btn w-full text-white font-bold py-3.5 rounded-2xl text-sm mt-5 flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating...</>
            ) : (
              <><span>✨</span> Generate Worksheet</>
            )}
          </button>
        </div>
      </div>

      {/* Right: Worksheet preview */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {!generated && !loading ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-cyan-100 rounded-3xl flex items-center justify-center text-3xl mb-4">📄</div>
            <h3 className="text-lg font-bold text-slate-700 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Your worksheet will appear here</h3>
            <p className="text-slate-400 text-sm max-w-xs">Configure the settings and click Generate to create a print-ready worksheet.</p>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg animate-pulse">📄</div>
            <h3 className="text-lg font-bold text-slate-700 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>TeachAI is preparing your worksheet ✨</h3>
            <p className="text-slate-400 text-sm">Building print-ready questions</p>
            <div className="flex gap-1.5 mt-4">
              {[0,1,2].map(i => (
                <span key={i} className="thinking-dot w-2 h-2 bg-cyan-400 rounded-full block" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-5 lg:p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2.5 py-1 rounded-full">✓ AI Generated</span>
              <div className="flex gap-2">
                {['✏️ Edit', '💾 Save', '📥 Export PDF'].map(a => (
                  <button key={a} className="text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 bg-white px-3 py-1.5 rounded-lg transition-all">{a}</button>
                ))}
              </div>
            </div>

            {/* Worksheet document */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="border-b-4 border-cyan-500 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Photosynthesis Worksheet</h1>
                    <p className="text-sm text-slate-500">Grade 7 · Science · {form.difficulty} Level</p>
                  </div>
                  <div className="text-right text-xs text-slate-400 space-y-1">
                    <p>Name: _______________________</p>
                    <p>Date: ________________________</p>
                    <p>Class: _______________________</p>
                  </div>
                </div>
                <div className="mt-3 bg-cyan-50 border border-cyan-100 rounded-xl p-3 text-xs text-slate-600">
                  <span className="font-semibold text-cyan-700">Instructions: </span>Answer all questions carefully. Use complete sentences where required. Show all working where applicable.
                </div>
              </div>

              <div className="p-6 space-y-6">
                {questions.map((q) => (
                  <div key={q.num} className="space-y-2">
                    <p className="text-sm font-semibold text-slate-800">
                      <span className="text-cyan-600 font-bold mr-1.5">{q.num}.</span>
                      {q.text}
                    </p>
                    {q.type === 'equation' && (
                      <div className="bg-slate-50 rounded-xl p-3 font-mono text-sm text-slate-700 border border-slate-200">{q.eq}</div>
                    )}
                    {(q.lines || 0) > 0 && (
                      <div className="space-y-1.5 mt-2">
                        {Array.from({ length: (q as any).lines }).map((_, i) => (
                          <div key={i} className="border-b border-slate-200 h-6" />
                        ))}
                      </div>
                    )}
                    {q.type === 'fill' && (
                      <div className="border-b-2 border-slate-300 h-7 w-2/3" />
                    )}
                  </div>
                ))}

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>TeachAI · Generated Worksheet</span>
                    <span>Score: _____ / {questions.length * 2}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
