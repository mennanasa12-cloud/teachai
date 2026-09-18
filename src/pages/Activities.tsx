import { useState } from 'react';
import { useNavigate } from 'react-router';

const ACTIVITY_TYPES = ['Group Activity', 'Discussion', 'Game', 'Problem Solving', 'Creative Activity'];

const GENERATED_ACTIVITY = {
  title: 'Photosynthesis Role Play',
  type: 'Group Activity',
  duration: '30 minutes',
  goal: 'Students will understand the role of each component in photosynthesis by acting out the process as living "molecules."',
  materials: ['Role cards (CO₂, H₂O, Sunlight, Chlorophyll, Glucose, O₂)', 'Large open space or classroom floor', 'Green and yellow construction paper', 'Timer'],
  instructions: [
    { step: 1, title: 'Setup (3 min)', desc: 'Assign each student a role: CO₂ molecule, water molecule, sunlight photon, chlorophyll, glucose, or oxygen. Give them role cards and a brief description.' },
    { step: 2, title: 'The Reaction (10 min)', desc: '"CO₂" and "H₂O" students gather in the "leaf zone." "Sunlight" students tag the CO₂ and H₂O to trigger the reaction. Students then transform into "Glucose" and "O₂" and move to their designated areas.' },
    { step: 3, title: 'Repeat & Discuss (10 min)', desc: 'Repeat the process 3 times with different students taking different roles. Ask: "What happens if there\'s no sunlight? What if water is removed?"' },
    { step: 4, title: 'Debrief (7 min)', desc: 'Class discussion. Each student explains their role. Teacher draws the equation on the board as students identify where they fit in.' },
  ],
  learningOutcome: 'Students can explain the photosynthesis process from memory, identify all inputs and outputs, and describe what each component does.',
};

export default function Activities() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ subject: 'Science', grade: 'Grade 7', topic: 'Photosynthesis', duration: '30', type: 'Group Activity' });
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

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
              <h2 className="font-bold text-slate-900 text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Activity Generator</h2>
              <p className="text-xs text-slate-500">Create engaging classroom activities</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Subject', key: 'subject', options: ['Science', 'Mathematics', 'English', 'History', 'Geography', 'Art'] },
              { label: 'Grade Level', key: 'grade', options: ['Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10'] },
              { label: 'Duration (minutes)', key: 'duration', options: ['15','20','30','45','60'] },
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Activity Type</label>
              <div className="grid grid-cols-1 gap-1.5">
                {ACTIVITY_TYPES.map(t => (
                  <button key={t} onClick={() => setForm({...form, type: t})}
                    className={`text-left text-sm px-3.5 py-2.5 rounded-xl border transition-all font-medium ${
                      form.type === t
                        ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={async () => { setLoading(true); await new Promise(r => setTimeout(r, 1800)); setLoading(false); setGenerated(true); }}
            disabled={loading}
            className="generate-btn w-full text-white font-bold py-3.5 rounded-2xl text-sm mt-5 flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating Activity...</>
            ) : (
              <><span>✨</span> Generate Activity</>
            )}
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {!generated && !loading ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-bold text-slate-700 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Your activity will appear here</h3>
            <p className="text-slate-400 text-sm max-w-xs">Choose an activity type and configure the settings to generate an engaging classroom activity.</p>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg animate-pulse">🎯</div>
            <h3 className="text-lg font-bold text-slate-700 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>TeachAI is designing your activity ✨</h3>
            <div className="flex gap-1.5 mt-4">
              {[0,1,2].map(i => (
                <span key={i} className="thinking-dot w-2 h-2 bg-emerald-400 rounded-full block" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-5 lg:p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2.5 py-1 rounded-full">✓ AI Generated</span>
              <div className="flex gap-2">
                {['✏️ Edit', '💾 Save', '📥 Export'].map(a => (
                  <button key={a} className="text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 bg-white px-3 py-1.5 rounded-lg transition-all">{a}</button>
                ))}
              </div>
            </div>

            {/* Activity card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-600 p-6 text-white">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">🎭</div>
                  <div>
                    <h1 className="text-xl font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{GENERATED_ACTIVITY.title}</h1>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{GENERATED_ACTIVITY.type}</span>
                      <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">⏱ {GENERATED_ACTIVITY.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Goal */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                  <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">🎯 Goal</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{GENERATED_ACTIVITY.goal}</p>
                </div>

                {/* Materials */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>📦 Materials Needed</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {GENERATED_ACTIVITY.materials.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-xl px-3 py-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>📋 Instructions</h3>
                  <div className="space-y-3">
                    {GENERATED_ACTIVITY.instructions.map((ins) => (
                      <div key={ins.step} className="flex gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center text-xs font-bold text-indigo-700 flex-shrink-0">
                          {ins.step}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{ins.title}</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{ins.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Outcome */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                  <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">🏆 Learning Outcome</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{GENERATED_ACTIVITY.learningOutcome}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
