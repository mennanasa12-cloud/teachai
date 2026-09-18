import { useState, useRef, useEffect } from 'react';
import { askAssistant } from '../lib/api';

interface Message {
  id: number;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  { icon: '📚', title: 'Create a lesson plan', desc: 'For any topic or grade level' },
  { icon: '🔍', title: 'Explain this topic simply', desc: 'Make complex ideas accessible' },
  { icon: '🎯', title: 'Create a classroom activity', desc: 'Engaging and curriculum-aligned' },
  { icon: '❓', title: 'Generate quiz questions', desc: 'Multiple formats and difficulties' },
  { icon: '📊', title: 'Analyze student performance', desc: 'Get actionable insights' },
  { icon: '📝', title: 'Write learning objectives for Grade 7 Mathematics about fractions', desc: 'Clear, measurable goals' },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [conversations] = useState([
    { id: 1, title: 'Photosynthesis Lesson', date: 'Today', active: true },
    { id: 2, title: 'Fractions Quiz', date: 'Yesterday', active: false },
    { id: 3, title: 'Climate Change Activity', date: '2 days ago', active: false },
    { id: 4, title: 'Reading Comprehension WS', date: '3 days ago', active: false },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || thinking) return;
    const userMsg: Message = { id: Date.now(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);
    try {
      const response = await askAssistant({ message: text });
      const content = response.response ?? (response.result
        ? JSON.stringify(response.result, null, 2)
        : 'I could not generate a response.');
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', content, timestamp: new Date() }]);
    } catch (error) {
      const content = error instanceof Error ? error.message : 'Something went wrong.';
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', content, timestamp: new Date() }]);
    } finally {
      setThinking(false);
    }
  };

  const formatContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
        return <p key={i} className="font-bold text-slate-900 mt-3 first:mt-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{line.slice(2, -2)}</p>;
      }
      if (line.startsWith('---')) {
        return <hr key={i} className="border-slate-200 my-3" />;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={i} className="ml-4 text-slate-700">{line.slice(2)}</li>;
      }
      if (line.match(/^\*\*[^*]+\*\*/)) {
        const formatted = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        return <p key={i} className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />;
      }
      if (!line.trim()) return <div key={i} className="h-1" />;
      return <p key={i} className="text-slate-700 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="flex h-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar: Conversation History */}
      <aside className="hidden xl:flex w-64 flex-col bg-white border-r border-slate-200 flex-shrink-0">
        <div className="p-4 border-b border-slate-100">
          <button className="w-full btn-primary text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2 mb-2">Recent</p>
          {conversations.map(c => (
            <button key={c.id}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${c.active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
              <p className={`text-sm font-medium truncate ${c.active ? 'text-indigo-700' : 'text-slate-700'}`}>{c.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{c.date}</p>
            </button>
          ))}
        </div>
      </aside>

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {messages.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-3xl flex items-center justify-center mb-4 shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" /><path d="M19 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Your AI Teaching Copilot ✨
            </h2>
            <p className="text-slate-500 text-sm mb-8 text-center max-w-md">
              Ask anything about teaching. I can create lessons, quizzes, activities, and provide expert strategies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-2xl mb-8">
              {SUGGESTED_PROMPTS.map(p => (
                <button key={p.title} onClick={() => sendMessage(p.title)}
                  className="card-hover bg-white border border-slate-200 rounded-2xl p-4 text-left hover:border-indigo-200 hover:bg-indigo-50/50 transition-all">
                  <span className="text-2xl mb-2 block">{p.icon}</span>
                  <p className="text-sm font-semibold text-slate-800 mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.title}</p>
                  <p className="text-xs text-slate-500">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-5">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} slide-in`}>
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                    ✨
                  </div>
                )}
                <div className={`max-w-2xl rounded-2xl px-5 py-4 ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-sm'
                    : 'bg-white border border-slate-200 rounded-tl-sm shadow-sm'
                }`}>
                  {msg.role === 'ai' ? (
                    <div className="prose prose-sm text-sm space-y-1">{formatContent(msg.content)}</div>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                  {msg.role === 'ai' && (
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                      {[
                        { icon: '📋', label: 'Copy' },
                        { icon: '🔄', label: 'Regenerate' },
                        { icon: '💾', label: 'Save' },
                      ].map(a => (
                        <button key={a.label} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-all">
                          <span>{a.icon}</span>{a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="flex gap-3 slide-in">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">✨</div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">TeachAI is preparing your response</span>
                    <div className="flex gap-1">
                      {[0,1,2].map(i => (
                        <span key={i} className="thinking-dot w-1.5 h-1.5 bg-indigo-400 rounded-full block" style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input */}
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="max-w-3xl mx-auto flex items-end gap-3">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl flex items-end gap-2 px-4 py-3 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <button className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0 pb-0.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                placeholder="Ask anything about teaching..."
                rows={1}
                className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none resize-none max-h-32 py-0.5"
              />
              <button className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0 pb-0.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </button>
            </div>
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || thinking}
              className="w-11 h-11 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:cursor-not-allowed rounded-2xl flex items-center justify-center transition-all flex-shrink-0 shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">TeachAI assists teachers — always verify AI-generated content before classroom use.</p>
        </div>
      </div>
    </div>
  );
}
