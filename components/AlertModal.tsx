import React, { useState, useEffect } from 'react';
import { X, BellRing, Copy, Check, Info, ArrowRight, ExternalLink, Code, FileJson } from 'lucide-react';
import { Trade, AlertConfig, AlertCondition } from '../types';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  trade: Trade | null;
  initialConfig?: AlertConfig | null;
  onSave: (alert: AlertConfig) => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, trade, initialConfig, onSave }) => {
  const [activeTab, setActiveTab] = useState<'webhook' | 'script'>('webhook');
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  
  // Fixed Webhook URL for the user's account (Mocked for demo)
  const SYSTEM_WEBHOOK_URL = "https://api.dkmalgomax.com/api/v1/webhook/signal/u/882371";

  const [config, setConfig] = useState<AlertConfig>({
    symbol: '',
    price: 0,
    condition: AlertCondition.CROSSING_UP,
    message: ''
  });

  useEffect(() => {
    if (initialConfig) {
      setConfig(initialConfig);
    } else if (trade) {
      setConfig({
        symbol: trade.symbol,
        price: trade.entryPrice,
        condition: AlertCondition.CROSSING_UP,
        message: JSON.stringify({
            symbol: trade.symbol,
            price: trade.entryPrice,
            action: trade.entryType === 'BUY ENTRY' ? 'sell' : 'buy', 
            quantity: trade.entryQty
        }, null, 4)
      });
    } else {
      setConfig({
        symbol: 'NIFTY',
        price: 0,
        condition: AlertCondition.CROSSING_UP,
        message: JSON.stringify({
            symbol: "NIFTY",
            action: "buy",
            quantity: 50
        }, null, 4)
      });
    }
  }, [trade, isOpen, initialConfig]);

  const getDisplayPayload = () => {
    try {
        const parsed = JSON.parse(config.message);
        return JSON.stringify({
            secret_key: "MY_SECRET_KEY",
            timestamp: "{{timenow}}",
            ...parsed
        }, null, 4);
    } catch (e) {
        return JSON.stringify({
            secret_key: "MY_SECRET_KEY",
            symbol: config.symbol,
            alert_message: config.message,
            timestamp: "{{timenow}}"
        }, null, 4);
    }
  };

  const getPineScriptSnippet = () => {
     return `//@version=5
indicator("DKM Alert: ${config.symbol}", overlay=true)

// Alert Logic
alert_msg = '${getDisplayPayload().replace(/\n/g, "").replace(/\s+/g, " ")}'

// Example Trigger (Modify as needed)
trigger = ta.crossover(ta.ema(close, 9), ta.ema(close, 21))

if trigger
    alert(alert_msg, alert.freq_once_per_bar_close)
    
plotshape(trigger, style=shape.triangleup, color=color.green, size=size.small)`;
  };

  const copyToClipboard = (text: string, setCopiedState: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-[#131722] text-white shrink-0">
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-lg">
                <BellRing size={20} className="text-white" />
             </div>
             <div>
                <h3 className="text-lg font-bold leading-tight">Create Alert</h3>
                <p className="text-xs text-gray-400">Setup alerts for {config.symbol}</p>
             </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
             <button 
                onClick={() => setActiveTab('webhook')}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'webhook' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
             >
                 <FileJson size={16} />
                 Webhook & JSON
             </button>
             <button 
                onClick={() => setActiveTab('script')}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'script' ? 'text-green-600 border-b-2 border-green-600 bg-green-50' : 'text-gray-500 hover:bg-gray-50'}`}
             >
                 <Code size={16} />
                 Pine Script
             </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {activeTab === 'webhook' ? (
                <>
                {/* Step 1: Webhook Configuration */}
                <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                        <span className="bg-gray-100 text-gray-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                        Webhook URL
                    </h4>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-2">
                        <code className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm text-blue-600 font-mono break-all">
                            {SYSTEM_WEBHOOK_URL}
                        </code>
                        <button 
                            onClick={() => copyToClipboard(SYSTEM_WEBHOOK_URL, setCopiedUrl)}
                            className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        >
                            {copiedUrl ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>

                {/* Step 2: Message Configuration */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                            <span className="bg-gray-100 text-gray-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                            Alert Message (JSON)
                        </h4>
                    </div>

                    <div className="bg-[#1e222d] rounded-lg p-4 relative group">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => copyToClipboard(getDisplayPayload(), setCopiedJson)}
                                className="text-gray-400 hover:text-white bg-white/10 p-1.5 rounded-md backdrop-blur-sm"
                            >
                                {copiedJson ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                            </button>
                        </div>
                        <textarea 
                            rows={8}
                            value={getDisplayPayload()}
                            readOnly
                            className="w-full bg-transparent text-gray-300 text-xs font-mono focus:outline-none resize-none"
                        />
                    </div>
                </div>
                </>
            ) : (
                /* Pine Script Tab */
                 <div className="space-y-4 animate-in fade-in slide-in-from-right-2">
                     <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                        <h4 className="text-sm font-bold text-green-800 mb-1">Generated Pine Script</h4>
                        <p className="text-xs text-green-700">
                           Copy this script to TradingView Pine Editor. It is pre-configured with the correct JSON payload for this alert.
                        </p>
                     </div>
                     
                     <div className="bg-[#1e222d] rounded-lg p-4 relative group border border-gray-800">
                        <div className="absolute top-2 right-2">
                            <button 
                                onClick={() => copyToClipboard(getPineScriptSnippet(), setCopiedScript)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-bold transition-colors"
                            >
                                {copiedScript ? <Check size={14} /> : <Copy size={14} />}
                                {copiedScript ? 'Copied' : 'Copy Code'}
                            </button>
                        </div>
                        <label className="block text-[10px] text-gray-500 uppercase font-bold mb-2">Pine Editor Code</label>
                        <textarea 
                            rows={12}
                            value={getPineScriptSnippet()}
                            readOnly
                            className="w-full bg-transparent text-green-400 text-xs font-mono focus:outline-none resize-none leading-relaxed"
                        />
                    </div>
                 </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
             Installation Guide <ExternalLink size={12} />
          </a>
          <div className="flex gap-3">
             <button 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
                Close
            </button>
            <button 
                onClick={handleSave}
                className="px-6 py-2 text-sm font-bold text-white bg-[#2962FF] rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
                Done
                <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};