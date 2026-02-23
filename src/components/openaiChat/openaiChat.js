import React, { useState, useRef, useEffect } from 'react';
import { getOpenAIResponse } from '../openaiService/openaiService';

const OpenAIChat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    try {
      const openAIResponse = await getOpenAIResponse(prompt);
      setResponse(openAIResponse);
    } catch (err) {
      setError('Unable to reach ZeeCart AI. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
          <i className="fa-solid fa-robot text-white text-xl"></i>
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tighter">ZeeCart Assistant</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Powered by OpenAI</p>
        </div>
      </div>

      {/* Response Area */}
      <div className="min-h-[100px] mb-6">
        {loading ? (
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-3xl animate-pulse">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
            <span className="text-sm font-bold text-slate-400">Thinking...</span>
          </div>
        ) : response ? (
          <div className="group relative p-6 bg-slate-900 rounded-[2rem] text-slate-100 shadow-xl transition-all">
            <div className="absolute -top-3 left-6 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
              AI Response
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
            <button 
              onClick={() => navigator.clipboard.writeText(response)}
              className="mt-4 text-[10px] font-bold text-slate-400 hover:text-white transition-colors"
            >
              <i className="fa-regular fa-copy mr-1"></i> Copy Response
            </button>
          </div>
        ) : (
          <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-[2rem]">
            <p className="text-slate-400 text-sm italic">Ask me about products, sizes, or shipping!</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
            <i className="fa-solid fa-triangle-exclamation mr-2"></i> {error}
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="relative group">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything..."
          className="w-full pl-6 pr-16 py-4 bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-3xl outline-none transition-all resize-none text-slate-700 min-h-[60px] max-h-[200px]"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button 
          type="submit"
          disabled={loading || !prompt.trim()}
          className={`absolute right-3 bottom-3 w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
            loading || !prompt.trim() 
            ? 'bg-slate-200 text-slate-400' 
            : 'bg-slate-900 text-white hover:bg-orange-500 shadow-lg active:scale-90'
          }`}
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            <i className="fa-solid fa-paper-plane text-xs"></i>
          )}
        </button>
      </form>
    </div>
  );
};

export default OpenAIChat;