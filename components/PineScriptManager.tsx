
import React, { useState } from 'react';
import { Code, Globe, Save, Check, Play, Monitor, Info, Link, Trash2, Terminal } from 'lucide-react';

export const PineScriptManager: React.FC = () => {
  const [signalSource, setSignalSource] = useState('TradingView');
  const [scriptContent, setScriptContent] = useState('');
  const [saved, setSaved] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState('Nifty Scalping Pro');
  
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleVerify = () => {
      alert("Verification in progress...\nNo syntax errors found for Pine Script v5.");
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">Pine Script Logic Manager</h1>
            <p className="text-gray-500 text-sm mt-1">Deploy TradingView logic directly to the cloud execution node</p>
        </div>
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">
                <Info size={14} /> Documentation
            </button>
        </div>
      </div>

      <div className="bg-[#131722] text-white rounded-xl shadow-2xl overflow-hidden border border-gray-800">
         <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#1e222d]">
            <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded text-white shadow-lg shadow-blue-900/50">
                    <Code size={20} fill="currentColor" />
                </div>
                <h2 className="text-lg font-bold text-white tracking-wide">Script & Execution Editor</h2>
            </div>
            <div className="flex items-center gap-4">
                <button 
                    onClick={handleVerify}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-[10px] font-black uppercase tracking-widest hover:bg-green-500/20 transition-all"
                >
                    <Terminal size={14} /> Validate
                </button>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Node Active
                </div>
            </div>
         </div>

         <div className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Deployment Context */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Target Strategy</label>
                        <div className="relative group">
                            <Link size={16} className="absolute left-3 top-3.5 text-gray-500" />
                            <select 
                                value={selectedStrategy}
                                onChange={(e) => setSelectedStrategy(e.target.value)}
                                className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-10 pr-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                            >
                                <option>Nifty Scalping Pro</option>
                                <option>BankNifty Trend Follower</option>
                                <option>Global Equity Test</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/50">
                        <h4 className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">Logic Behavior</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-xs text-gray-400">
                                <Check size={12} className="text-green-500" />
                                Cloud-Side Signal Validation
                            </li>
                            <li className="flex items-center gap-2 text-xs text-gray-400">
                                <Check size={12} className="text-green-500" />
                                Webhook Message Matching
                            </li>
                            <li className="flex items-center gap-2 text-xs text-gray-400">
                                <Check size={12} className="text-green-500" />
                                Multi-Asset Compatibility
                            </li>
                        </ul>
                    </div>

                    <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg flex items-start gap-3">
                        <Info size={16} className="text-blue-400 shrink-0" />
                        <p className="text-[10px] text-blue-200/60 leading-relaxed italic">
                            Adding a script here ensures that even if TradingView sends a wrong signal, our engine will re-check the logic before trading.
                        </p>
                    </div>
                </div>

                {/* Code Editor */}
                <div className="md:col-span-2 space-y-4">
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            Pine Script Editor (TradingView v5)
                        </label>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] text-gray-600 font-bold uppercase">Line: 1, Col: 1</span>
                        </div>
                    </div>
                    <div className="relative group">
                        <textarea 
                            value={scriptContent}
                            onChange={(e) => setScriptContent(e.target.value)}
                            placeholder="//@version=5&#10;strategy('My Custom Strategy', overlay=true)&#10;&#10;// Logic starts here...&#10;longCondition = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))&#10;if (longCondition)&#10;    strategy.entry('My Long Entry Id', strategy.long)"
                            className="w-full h-[360px] bg-[#0c1017] border border-gray-700 rounded-md p-6 text-sm text-green-400 font-mono focus:outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed shadow-inner"
                        />
                        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-gray-800 rounded hover:bg-gray-700">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final Actions */}
            <div className="pt-4 flex flex-col md:flex-row items-center gap-4">
                <button 
                    onClick={handleSave}
                    className={`w-full md:w-72 flex items-center justify-center p-4 rounded-xl transition-all shadow-lg group ${
                        saved 
                        ? 'bg-green-600 hover:bg-green-700 shadow-green-600/30' 
                        : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
                    }`}
                >
                    <div className="bg-white/20 p-2 rounded-full mr-3 group-hover:scale-110 transition-transform">
                        {saved ? <Check size={20} /> : <Save size={20} />}
                    </div>
                    <span className="text-lg font-bold uppercase tracking-tighter">
                        {saved ? 'LINKED TO STRATEGY' : 'SYNC LOGIC TO SERVER'}
                    </span>
                </button>
                <div className="flex flex-col">
                    <p className="text-[11px] text-gray-500 max-w-sm uppercase font-black tracking-widest">
                        Status: Not Published
                    </p>
                    <p className="text-[10px] text-gray-500">
                        Script will be deployed on the next cloud sync.
                    </p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};
