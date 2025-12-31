import React, { useState } from 'react';
import { Globe, Copy, Check, Info, Settings, HelpCircle } from 'lucide-react';
import { BrokerConfig } from '../types';

interface TradingViewIntegrationProps {
  brokerConfig: BrokerConfig;
}

export const TradingViewIntegration: React.FC<TradingViewIntegrationProps> = ({ brokerConfig }) => {
  const [copied, setCopied] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);
  
  const WEBHOOK_URL = "https://api.dkmalgomax.com/api/v1/webhook/signal/u/882371";

  const getJsonPayload = () => {
     return JSON.stringify({
        secret_key: "MY_SECRET_KEY",
        strategy_name: "EXAMPLE_STRATEGY",
        broker_config: {
            broker: brokerConfig.broker,
            client_id: brokerConfig.clientId || "YOUR_CLIENT_ID",
        },
        symbol: "NIFTY",
        exchange: "NSE",
        type: "OPTION",
        strike: "ATM",
        expiry: "Current Week",
        quantity: 50,
        action: "BUY",
        timestamp: "{{timenow}}"
     }, null, 4);
  };

  const copyToClipboard = (text: string, setFn: (v: boolean) => void) => {
     navigator.clipboard.writeText(text);
     setFn(true);
     setTimeout(() => setFn(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Signal Configuration</h1>
          <p className="text-gray-500 text-sm mt-1">Configure your external signal sources and webhooks</p>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
            <HelpCircle size={16} /> Setup Guide
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-[#131722] text-white rounded-xl shadow-2xl overflow-hidden border border-gray-800">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#1e222d]">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded text-white shadow-lg shadow-blue-900/50">
                    <Globe size={20} fill="currentColor" />
                </div>
                <h2 className="text-lg font-bold text-white tracking-wide">TradingView Webhook Integration</h2>
              </div>
              <div className="bg-green-500/10 text-green-400 text-[10px] font-bold px-2 py-1 rounded border border-green-500/20">
                  LISTENING
              </div>
          </div>
          
          <div className="p-6 md:p-8 space-y-8">
              {/* TRADINGVIEW CONTENT */}
              <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
                   
                   <div className="bg-[#1e222d] p-4 rounded-lg border border-gray-700/50 flex items-start gap-4">
                      <div className="bg-blue-600/20 p-2 rounded text-blue-400">
                        <Info size={18} />
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                          To automate your TradingView alerts, copy the Webhook URL below into your alert settings on TradingView. Use the JSON template provided to ensure our engine correctly parses your trade parameters.
                      </p>
                   </div>

                   {/* Webhook URL */}
                  <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Primary Webhook URL</label>
                      <div className="relative flex items-center group max-w-2xl">
                          <input 
                              type="text" 
                              readOnly
                              value={WEBHOOK_URL}
                              className="w-full bg-[#1e222d] border border-blue-900/30 text-blue-400 rounded-md pl-4 pr-12 py-3.5 text-xs font-mono focus:outline-none"
                          />
                          <button 
                              onClick={() => copyToClipboard(WEBHOOK_URL, setCopied)}
                              className="absolute right-2 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-all"
                              title="Copy URL"
                          >
                              {copied ? <Check size={18} className="text-green-500"/> : <Copy size={18} />}
                          </button>
                      </div>
                  </div>

                  {/* JSON Payload */}
                  <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Default JSON Payload Template</label>
                        <span className="text-[10px] text-blue-400 font-bold flex items-center gap-1 cursor-pointer hover:underline">
                            <Settings size={12} /> Customize Schema
                        </span>
                      </div>
                      <div className="relative group">
                          <textarea
                              value={getJsonPayload()}
                              readOnly
                              className="w-full h-48 bg-[#0c1017] border border-gray-700 rounded-md p-6 text-xs text-gray-300 font-mono focus:outline-none resize-none leading-relaxed"
                          ></textarea>
                          <div className="absolute top-4 right-4 flex gap-2">
                             <button 
                                onClick={() => copyToClipboard(getJsonPayload(), setJsonCopied)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/80 hover:bg-blue-600 text-gray-300 hover:text-white rounded text-[10px] font-bold transition-all backdrop-blur-sm border border-gray-700 shadow-xl"
                            >
                                {jsonCopied ? <Check size={14} className="text-green-400"/> : <Copy size={14} />}
                                {jsonCopied ? 'Copied to Clipboard' : 'Copy JSON Template'}
                            </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="p-4 bg-[#1e222d] border-t border-gray-800 text-center">
             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                 System Security Level: AES-256 Enabled
             </p>
          </div>
      </div>
    </div>
  );
};