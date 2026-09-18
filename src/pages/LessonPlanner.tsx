import { useState } from 'react';
import { useNavigate } from 'react-router';

const GENERATED_LESSON = {
  title: 'Introduction to Photosynthesis',
  subject: 'Science', grade: 'Grade 7', duration: '45 minutes',
  objectives: [
    'Define photosynthesis and write the chemical equation',
    'Identify the inputs (CO₂, water, sunlight) and outputs (glucose, oxygen)',
    'Explain the role of chlorophyll in capturing light energy',
    'Connect photosynthesis to broader food chains and ecosystems',
  ],
  sections: [
    { label: 'Warm-Up', time: '5 min', icon: '🌅', color: 'amber', content: 'Display two plant images — one wilting, one thriving. Ask: "What do you think makes the difference?" Quick pair-share discussion.' },
    { label: 'Introduction', time: '8 min', icon: '📖', color: 'indigo', content: 'Introduce the concept of photosynthesis. Write the equation on the board: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Break down each component with visuals.' },
    { label: 'Explanation', time: '10 min', icon: '🔬', color: 'violet', content: 'Use an animated diagram of a leaf cross-section. Highlight chloroplasts, stomata, and vascular bundles. Explain how light energy is converted to chemical energy.' },
    { label: 'Activity', time: '12 min', icon: '✏️', color: 'emerald', content: 'Students work in pairs to label a blank leaf diagram. They identify: epidermis, palisade layer, spongy layer, chloroplasts, and stomata. Each label must include its function.' },
    { label: 'Discussion', time: '5 min', icon: '💬', color: 'cyan', content: 'Class discussion: "Where does the energy in your food come from?" Guide students to trace energy from their lunch back to photosynthesis and the sun.' },
    { label: 'Assessment', time: '5 min', icon: '📝', color: 'rose', content: 'Exit ticket: Students write 3 facts learned today and 1 question they still have. Collect before dismissal to inform next lesson.' },
  ],
  homework: 'Research how photosynthesis rates change in different light conditions. Write 3–5 sentences explaining your findings. Bring an example (photo or drawing) to next class.',
};

export default function LessonPlanner() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ subject: 'Science', grade: 'Grade 7', topic: 'Photosynthesis', duration: '45', objectives: '', level: 'Intermediate' });
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setGenerated(true);
  };

  const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
    amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-700' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', badge: 'bg-violet-100 text-violet-700' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', badge: 'bg-cyan-100 text-cyan-700' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-700' },
  };

  return (
    <div className="h-full flex flex-col lg:flex-row" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left: Form */}
      <div className="w-full lg:w-80 xl:w-96 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex-shrink-0 overflow-y-auto">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-5">
            <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div>
              <h2 className="font-bold text-slate-900 text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Lesson Planner</h2>
              <p className="text-xs text-slate-500">Configure your lesson details</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Subject', key: 'subject', type: 'select', options: ['Science', 'Mathematics', 'English', 'History', 'Geography', 'Art', 'Music', 'PE'] },
              { label: 'Grade Level', key: 'grade', type: 'select', options: ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'] },
              { label: 'Topic', key: 'topic', type: 'text', placeholder: 'e.g. Photosynthesis' },
              { label: 'Duration (minutes)', key: 'duration', type: 'number', placeholder: '45' },
              { label: 'Student Level', key: 'level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'Mixed'] },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
                {field.type === 'select' ? (
                  <select value={(form as any)[field.key]} onChange={e => setForm({...form, [field.key]: e.target.value})}
                    className="input-focus w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 appearance-none cursor-pointer">
                    {field.options?.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={field.type || 'text'} value={(form as any)[field.key]}
                    onChange={e => setForm({...form, [field.key]: e.target.value})}
                    placeholder={(field as any).placeholder}
                    className="input-focus w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400" />
                )}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Learning Objectives <span className="text-slate-400">(optional)</span></label>
              <textarea value={form.objectives} onChange={e => setForm({...form, objectives: e.target.value})}
                placeholder="What should students know by the end?"
                rows={3}
                className="input-focus w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 resize-none" />
            </div>
          </div>

          <button onClick={handleGenerate} disabled={loading}
            className="generate-btn w-full text-white font-bold py-3.5 rounded-2xl text-sm mt-5 flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                TeachAI is preparing your lesson ✨
              </>
            ) : (
              <><span>✨</span> Generate Lesson Plan</>
            )}
          </button>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {!generated && !loading ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-3xl flex items-center justify-center text-3xl mb-4">📚</div>
            <h3 className="text-lg font-bold text-slate-700 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Your lesson plan will appear here</h3>
            <p className="text-slate-400 text-sm max-w-xs">Fill in the lesson details on the left and click Generate to create a complete lesson plan.</p>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-3xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
              <span className="animate-spin">✨</span>
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>TeachAI is preparing your lesson...</h3>
            <p className="text-slate-400 text-sm">Creating a complete, curriculum-aligned lesson plan</p>
            <div className="flex gap-1.5 mt-4">
              {[0,1,2].map(i => (
                <span key={i} className="thinking-dot w-2 h-2 bg-indigo-400 rounded-full block" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-5 lg:p-8 max-w-3xl mx-auto">
            {/* Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  AI Generated
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: 'Edit', icon: '✏️' },
                  { label: 'Regenerate', icon: '🔄' },
                  { label: saved ? 'Saved ✓' : 'Save', icon: '💾', onClick: () => setSaved(true) },
                  { label: 'Export PDF', icon: '📥' },
                ].map(a => (
                  <button key={a.label} onClick={(a as any).onClick}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all">
                    <span>{a.icon}</span>{a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lesson document */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white">
                <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{GENERATED_LESSON.title}</h1>
                <div className="flex flex-wrap gap-3 mt-3">
                  {[GENERATED_LESSON.subject, GENERATED_LESSON.grade, `⏱ ${GENERATED_LESSON.duration}`].map(t => (
                    <span key={t} className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Objectives */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <span className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center text-xs">🎯</span>
                    Learning Objectives
                  </h3>
                  <ul className="space-y-2">
                    {GENERATED_LESSON.objectives.map((o, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-100" />

                {/* Sections */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Lesson Flow</h3>
                  <div className="space-y-3">
                    {GENERATED_LESSON.sections.map((s) => {
                      const c = colorMap[s.color] || colorMap.indigo;
                      return (
                        <div key={s.label} className={`${c.bg} border ${c.border} rounded-2xl p-4`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{s.icon}</span>
                              <span className={`text-sm font-bold ${c.text}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.label}</span>
                            </div>
                            <span className={`text-xs font-medium ${c.badge} px-2 py-0.5 rounded-full`}>{s.time}</span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{s.content}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* Homework */}
                <div className="bg-slate-50 rounded-2xl p-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <span>📚</span> Homework
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{GENERATED_LESSON.homework}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
