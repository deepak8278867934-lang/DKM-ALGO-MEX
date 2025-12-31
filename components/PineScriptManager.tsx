import React, { useState } from 'react';
import { Code, Globe, Save, Check, Play, Monitor, Info } from 'lucide-react';

export const PineScriptManager: React.FC = () => {
  const [signalSource, setSignalSource] = useState('TradingView');
  const [scriptContent, setScriptContent] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">Algorithm Logic Manager</h1>
            <p className="text-gray-500 text-sm mt-1">Manage and sync your custom strategy scripts</p>
        </div>
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">
                <Info size={14} /> Documentation
            </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-[#131722] text-white rounded-xl shadow-2xl overflow-hidden border border-gray-800">
         
         {/* Card Header */}
         <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#1e222d]">
            <div className="flex items-center gap-3">
                <div className="bg-green-600 p-2 rounded text-white shadow-lg shadow-green-900/50">
                    <Code size={20} fill="currentColor" />
                </div>
                <h2 className="text-lg font-bold text-white tracking-wide">Script & Logic Editor</h2>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Connected
            </div>
         </div>

         {/* Content */}
         <div className="p-6 md:p-8 space-y-6">
            
            {/* Signal Source Selection */}
            <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Active Signal Source</label>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setSignalSource('TradingView')}
                        className={`flex items-center justify-center gap-2 py-3 px-6 rounded-md border text-xs font-bold transition-all min-w-[140px] ${
                            signalSource === 'TradingView' 
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                            : 'bg-[#1e222d] border-gray-700 text-gray-400 hover:border-gray-500'
                        }`}
                    >
                        <Globe size={14} />
                        Pine Script
                    </button>
                    
                    <button
                        onClick={() => setSignalSource('MT4')}
                        className={`flex items-center justify-center gap-2 py-3 px-6 rounded-md border text-xs font-bold transition-all min-w-[140px] ${
                            signalSource === 'MT4' 
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                            : 'bg-[#1e222d] border-gray-700 text-gray-400 hover:border-gray-500'
                        }`}
                    >
                        <Monitor size={14} />
                        MetaTrader 4
                    </button>

                    <button
                        onClick={() => setSignalSource('MT5')}
                        className={`flex items-center justify-center gap-2 py-3 px-6 rounded-md border text-xs font-bold transition-all min-w-[140px] ${
                            signalSource === 'MT5' 
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                            : 'bg-[#1e222d] border-gray-700 text-gray-400 hover:border-gray-500'
                        }`}
                    >
                        <Monitor size={14} />
                        MetaTrader 5
                    </button>
                </div>
            </div>

            {/* Pine Script Editor - Expanded for Desktop */}
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex justify-between items-center mb-3">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        {signalSource === 'TradingView' ? 'Pine Script (v5) Logic Buffer' : `${signalSource} Integration Script`}
                    </label>
                    <div className="flex gap-4">
                        <span className="text-[10px] text-blue-400 flex items-center gap-1 cursor-pointer hover:text-blue-300 font-bold uppercase transition-colors">
                            <Play size={10} fill="currentColor" /> Syntax Check
                        </span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1 font-bold uppercase">
                            Auto-sync: ON
                        </span>
                    </div>
                </div>
                <div className="relative group">
                    <textarea 
                        value={scriptContent}
                        onChange={(e) => setScriptContent(e.target.value)}
                        placeholder={signalSource === 'TradingView' ? "// Paste your TradingView Pine Script here for version tracking and server-side execution..." : `// Paste your ${signalSource} EA logic or bridge configuration snippets here...`}
                        className="w-full h-80 bg-[#0c1017] border border-gray-700 rounded-md p-6 text-sm text-green-400 font-mono focus:outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed shadow-inner"
                    />
                    <div className="absolute bottom-4 right-4 text-[10px] text-gray-600 font-mono">
                        UTF-8 | LF | Pine v5
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col md:flex-row items-center gap-4">
                <button 
                    onClick={handleSave}
                    className={`w-full md:w-64 flex items-center justify-center p-4 rounded-xl transition-all shadow-lg group ${
                        saved 
                        ? 'bg-green-600 hover:bg-green-700 shadow-green-600/30' 
                        : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
                    }`}
                >
                    <div className="bg-white/20 p-2 rounded-full mr-3 group-hover:scale-110 transition-transform">
                        {saved ? <Check size={20} /> : <Save size={20} />}
                    </div>
                    <span className="text-lg font-bold">
                        {saved ? 'Logic Saved' : 'Save Algorithm'}
                    </span>
                </button>
                <p className="text-[11px] text-gray-500 max-w-sm">
                    Saving the script here acts as a backup and allows our engine to validate signals against your expected logic.
                </p>
            </div>
         </div>
      </div>
    </div>
  );
};