import { Link } from 'react-router';

const topicData = [
  { topic: 'Photosynthesis', score: 82, color: 'emerald' },
  { topic: 'Cell Structure', score: 75, color: 'indigo' },
  { topic: 'Fractions', score: 58, color: 'amber' },
  { topic: 'Quadratic Equations', score: 44, color: 'rose' },
  { topic: 'Reading Comprehension', score: 71, color: 'cyan' },
  { topic: 'Essay Writing', score: 67, color: 'violet' },
];

const students = [
  { name: 'Emma Johnson', score: 92, trend: '+5', status: 'excellent' },
  { name: 'Liam Chen', score: 78, trend: '+2', status: 'good' },
  { name: 'Sofia Martinez', score: 85, trend: '+8', status: 'good' },
  { name: 'Noah Williams', score: 62, trend: '-3', status: 'support' },
  { name: 'Aisha Patel', score: 55, trend: '-7', status: 'support' },
  { name: 'James Kim', score: 48, trend: '-12', status: 'urgent' },
  { name: 'Olivia Brown', score: 88, trend: '+4', status: 'good' },
  { name: 'Ethan Davis', score: 71, trend: '0', status: 'good' },
];

const weeklyData = [65, 68, 72, 70, 75, 73, 78];
const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const colorMap: Record<string, { bar: string; text: string; bg: string }> = {
  emerald: { bar: 'bg-emerald-400', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  indigo: { bar: 'bg-indigo-400', text: 'text-indigo-700', bg: 'bg-indigo-50' },
  amber: { bar: 'bg-amber-400', text: 'text-amber-700', bg: 'bg-amber-50' },
  rose: { bar: 'bg-rose-400', text: 'text-rose-700', bg: 'bg-rose-50' },
  cyan: { bar: 'bg-cyan-400', text: 'text-cyan-700', bg: 'bg-cyan-50' },
  violet: { bar: 'bg-violet-400', text: 'text-violet-700', bg: 'bg-violet-50' },
};

const statusConfig: Record<string, { label: string; cls: string }> = {
  excellent: { label: 'Excellent', cls: 'bg-emerald-100 text-emerald-700' },
  good: { label: 'On Track', cls: 'bg-blue-100 text-blue-700' },
  support: { label: 'Needs Support', cls: 'bg-amber-100 text-amber-700' },
  urgent: { label: 'Urgent', cls: 'bg-rose-100 text-rose-700' },
};

export default function StudentInsights() {
  const maxBar = Math.max(...weeklyData);

  return (
    <div className="p-4 lg:p-6 space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Class Average', value: '78%', icon: '📊', change: '+3% this week', color: 'indigo', subtext: 'of 86 students' },
          { label: 'Need Support', value: '8', icon: '⚠️', change: 'Immediate action needed', color: 'amber', subtext: 'students below 60%' },
          { label: 'Hardest Topic', value: 'Quadratic Eq.', icon: '📉', change: '44% avg score', color: 'rose', subtext: 'Most struggled area' },
          { label: 'Improvement', value: '+12%', icon: '📈', change: 'vs last month', color: 'emerald', subtext: 'Month over month' },
        ].map(s => {
          const c = { indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100', amber: 'bg-amber-50 text-amber-600 border-amber-100', rose: 'bg-rose-50 text-rose-600 border-rose-100', emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100' }[s.color];
          return (
            <div key={s.label} className={`rounded-2xl border p-5 ${c?.split(' ').slice(0,1).join(' ')} ${c?.split(' ').slice(2).join(' ')} bg-white border-slate-100`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-black text-slate-900 mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</div>
              <div className="text-xs font-medium text-slate-600">{s.label}</div>
              <div className="text-xs text-slate-400 mt-1">{s.subtext}</div>
              <div className={`text-xs font-medium mt-2 px-2 py-0.5 rounded-full inline-block ${{ indigo: 'bg-indigo-100 text-indigo-700', amber: 'bg-amber-100 text-amber-700', rose: 'bg-rose-100 text-rose-700', emerald: 'bg-emerald-100 text-emerald-700' }[s.color]}`}>{s.change}</div>
            </div>
          );
        })}
      </div>

      {/* AI Insight */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">✨</span>
            <span className="text-sm font-bold text-indigo-200">AI Teaching Insight</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            "32% of your students are struggling with quadratic equations."
          </h3>
          <p className="text-indigo-200 text-sm mb-4">
            <span className="font-semibold text-white">Suggested Action:</span> Consider reviewing the concept using visual examples and a short practice activity before moving to the next unit.
          </p>
          <Link to="/activities"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-50 transition-colors">
            Create Practice Activity →
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly performance chart */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 text-base mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Class Performance This Week</h3>
          <div className="flex items-end gap-3 h-32">
            {weeklyData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-600">{v}%</span>
                <div className="w-full bg-slate-100 rounded-t-lg overflow-hidden" style={{ height: '80px' }}>
                  <div
                    className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg transition-all"
                    style={{ height: `${(v / maxBar) * 100}%`, marginTop: `${100 - (v / maxBar) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400">{weekLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Topic performance */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 text-base mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Topic Performance</h3>
          <div className="space-y-3">
            {topicData.map(t => {
              const c = colorMap[t.color] || colorMap.indigo;
              return (
                <div key={t.topic}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-700">{t.topic}</span>
                    <span className={`text-xs font-bold ${c.text}`}>{t.score}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${c.bar} rounded-full transition-all duration-700`} style={{ width: `${t.score}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Student table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Student Performance</h3>
          <div className="flex items-center gap-2">
            <input placeholder="Search students..." className="text-xs px-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 w-36 outline-none focus:border-indigo-300" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Student</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Avg. Score</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Trend</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((s) => {
                const status = statusConfig[s.status];
                return (
                  <tr key={s.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-slate-800">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${s.score >= 80 ? 'bg-emerald-400' : s.score >= 65 ? 'bg-blue-400' : s.score >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`}
                            style={{ width: `${s.score}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{s.score}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-semibold ${s.trend.startsWith('+') ? 'text-emerald-600' : s.trend === '0' ? 'text-slate-400' : 'text-rose-600'}`}>
                        {s.trend.startsWith('+') ? '↑' : s.trend === '0' ? '→' : '↓'} {s.trend}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.cls}`}>{status.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
