import { useState } from 'react';
import { useNavigate } from 'react-router';

const GENERATED_QUIZ = [
  {
    id: 1, difficulty: 'Easy', type: 'Multiple Choice',
    question: 'What is the primary source of energy for photosynthesis?',
    options: ['Water', 'Carbon dioxide', 'Sunlight', 'Oxygen'],
    correct: 2,
    explanation: 'Sunlight provides the energy needed to drive the chemical reactions in photosynthesis.'
  },
  {
    id: 2, difficulty: 'Medium', type: 'Multiple Choice',
    question: 'Which organelle is responsible for carrying out photosynthesis in plant cells?',
    options: ['Mitochondria', 'Chloroplast', 'Nucleus', 'Ribosome'],
    correct: 1,
    explanation: 'Chloroplasts contain chlorophyll, the pigment that absorbs light energy for photosynthesis.'
  },
  {
    id: 3, difficulty: 'Medium', type: 'True/False',
    question: 'Photosynthesis produces carbon dioxide as a byproduct.',
    options: ['True', 'False'],
    correct: 1,
    explanation: 'False. Photosynthesis produces oxygen as a byproduct, and consumes carbon dioxide as a reactant.'
  },
  {
    id: 4, difficulty: 'Hard', type: 'Multiple Choice',
    question: 'Which of the following is the correct chemical equation for photosynthesis?',
    options: [
      '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
      'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O',
      '6O₂ + 6H₂O → C₆H₁₂O₆ + 6CO₂',
      '6CO₂ + 6O₂ → C₆H₁₂O₆ + 6H₂O'
    ],
    correct: 0,
    explanation: 'The balanced equation shows CO₂ and water being converted to glucose and oxygen using light energy.'
  },
  {
    id: 5, difficulty: 'Easy', type: 'Multiple Choice',
    question: 'What green pigment in plants absorbs sunlight for photosynthesis?',
    options: ['Carotene', 'Anthocyanin', 'Chlorophyll', 'Melanin'],
    correct: 2,
    explanation: 'Chlorophyll is the primary photosynthetic pigment, absorbing red and blue light wavelengths.'
  },
];

export default function QuizGenerator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ subject: 'Science', grade: 'Grade 7', topic: 'Photosynthesis', difficulty: 'Mixed', count: '5', type: 'Multiple Choice' });
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const diffBadge: Record<string, string> = {
    'Easy': 'bg-emerald-100 text-emerald-700',
    'Medium': 'bg-amber-100 text-amber-700',
    'Hard': 'bg-rose-100 text-rose-700',
  };

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
              <h2 className="font-bold text-slate-900 text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Quiz Generator</h2>
              <p className="text-xs text-slate-500">Configure your quiz</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Subject', key: 'subject', type: 'select', options: ['Science', 'Mathematics', 'English', 'History', 'Geography'] },
              { label: 'Grade Level', key: 'grade', type: 'select', options: ['Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10'] },
              { label: 'Topic', key: 'topic', type: 'text', placeholder: 'e.g. Photosynthesis' },
              { label: 'Difficulty', key: 'difficulty', type: 'select', options: ['Easy', 'Medium', 'Hard', 'Mixed'] },
              { label: 'Number of Questions', key: 'count', type: 'select', options: ['5','10','15','20'] },
              { label: 'Question Type', key: 'type', type: 'select', options: ['Multiple Choice', 'True/False', 'Short Answer', 'Mixed'] },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                {f.type === 'select' ? (
                  <select value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                    className="input-focus w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 appearance-none cursor-pointer">
                    {f.options?.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                    placeholder={(f as any).placeholder}
                    className="input-focus w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400" />
                )}
              </div>
            ))}
          </div>

          <button onClick={async () => { setLoading(true); await new Promise(r => setTimeout(r, 1800)); setLoading(false); setGenerated(true); }}
            disabled={loading}
            className="generate-btn w-full text-white font-bold py-3.5 rounded-2xl text-sm mt-5 flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating Quiz...</>
            ) : (
              <><span>✨</span> Generate Quiz</>
            )}
          </button>
        </div>
      </div>

      {/* Right: Questions */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {!generated && !loading ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-violet-100 rounded-3xl flex items-center justify-center text-3xl mb-4">❓</div>
            <h3 className="text-lg font-bold text-slate-700 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Your quiz will appear here</h3>
            <p className="text-slate-400 text-sm max-w-xs">Configure the quiz settings and click Generate to create questions with answer keys.</p>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-3xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg animate-pulse">❓</div>
            <h3 className="text-lg font-bold text-slate-700 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>TeachAI is preparing your quiz ✨</h3>
            <p className="text-slate-400 text-sm">Creating questions with answer keys and explanations</p>
            <div className="flex gap-1.5 mt-4">
              {[0,1,2].map(i => (
                <span key={i} className="thinking-dot w-2 h-2 bg-violet-400 rounded-full block" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-5 lg:p-8 max-w-3xl mx-auto">
            {/* Top actions */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2.5 py-1 rounded-full">✓ AI Generated</span>
                <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-full">{GENERATED_QUIZ.length} Questions</span>
              </div>
              <div className="flex gap-2">
                {[
                  { l: saved ? 'Saved ✓' : 'Save', onClick: () => setSaved(true) },
                  { l: 'Export PDF' },
                ].map(a => (
                  <button key={a.l} onClick={(a as any).onClick}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all">
                    {a.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz header */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-slate-900 text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Photosynthesis Quiz</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Grade 7 · Science · {GENERATED_QUIZ.length} Questions</p>
                </div>
                <div className="text-sm font-medium text-slate-600 bg-slate-50 rounded-xl px-3 py-1.5">⏱ 20 min</div>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {GENERATED_QUIZ.map((q, qi) => (
                <div key={q.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden card-hover">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-7 h-7 bg-indigo-100 rounded-xl flex items-center justify-center text-xs font-bold text-indigo-700 flex-shrink-0">
                          {qi + 1}
                        </div>
                        <p className="text-sm font-semibold text-slate-800 leading-relaxed">{q.question}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${diffBadge[q.difficulty]}`}>{q.difficulty}</span>
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{q.type}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, oi) => (
                        <div key={oi}
                          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-sm transition-all ${
                            oi === q.correct
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-slate-50 border-slate-100 text-slate-600'
                          }`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            oi === q.correct ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
                          }`}>
                            {oi === q.correct && (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span>{String.fromCharCode(65 + oi)}. {opt}</span>
                          {oi === q.correct && <span className="ml-auto text-xs font-semibold text-emerald-600">Correct</span>}
                        </div>
                      ))}
                    </div>

                    <button onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                      className="mt-3 text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors">
                      {expanded === q.id ? '▲ Hide' : '▼ Show'} Explanation
                    </button>

                    {expanded === q.id && (
                      <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-xl p-3 slide-in">
                        <p className="text-xs text-indigo-800 leading-relaxed"><span className="font-bold">Explanation: </span>{q.explanation}</p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-100 px-5 py-2.5 flex justify-end gap-2">
                    {['✏️ Edit', '🔄 Regenerate', '🗑️ Delete'].map(a => (
                      <button key={a} className="text-xs text-slate-400 hover:text-slate-700 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-all">{a}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
