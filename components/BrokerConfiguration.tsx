import React, { useState } from 'react';
import { Briefcase, User, Shield, Key, RefreshCw, Clock, Save, Check, GraduationCap, Wallet } from 'lucide-react';
import { BrokerConfig } from '../types';

interface BrokerConfigurationProps {
  config: BrokerConfig;
  onChange: (field: keyof BrokerConfig, value: string) => void;
  onSave?: () => void;
}

export const BrokerConfiguration: React.FC<BrokerConfigurationProps> = ({ config, onChange, onSave }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const isDemoMode = config.broker === 'Demo';

  const handleRefreshToken = () => {
    if (isDemoMode) return;
    
    setIsRefreshing(true);
    // Simulate a token refresh process
    setTimeout(() => {
        setIsRefreshing(false);
        
        // Calculate a mock expiry time (24 hours from now)
        const nextDay = new Date();
        nextDay.setHours(nextDay.getHours() + 24);
        const formattedExpiry = nextDay.toLocaleString('en-GB', { hour12: false });
        
        onChange('tokenExpiry', formattedExpiry);
        
        // In a real app, this would likely open a login window or fetch a new token
        alert("Token refresh initiated. Please complete the broker login process if redirected.");
    }, 2000);
  };

  const handleUpdate = () => {
      setIsSaving(true);
      // Simulate API update call
      setTimeout(() => {
          setIsSaving(false);
          setSaveSuccess(true);
          if (onSave) onSave();
          setTimeout(() => setSaveSuccess(false), 2000);
      }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-2xl font-bold text-gray-800">Broker Configuration</h1>
        <p className="text-gray-500 text-sm mt-1">Select your execution environment or connect a real exchange account</p>
      </div>

      <div className="space-y-6">
          {/* Broker Settings Card */}
          <div className="bg-[#131722] text-white rounded-xl shadow-2xl overflow-hidden border border-gray-800">
              <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#1e222d]">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded text-white shadow-lg ${isDemoMode ? 'bg-blue-600 shadow-blue-900/50' : 'bg-purple-600 shadow-purple-900/50'}`}>
                        {isDemoMode ? <GraduationCap size={20} fill="currentColor" /> : <Briefcase size={20} fill="currentColor" />}
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-wide">
                        {isDemoMode ? 'Simulation Settings' : 'Broker Settings'}
                    </h2>
                  </div>
                  {!isDemoMode && (
                      <div className="flex items-center gap-2 text-xs text-green-400 font-bold bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                          System Ready
                      </div>
                  )}
              </div>
              
              <div className="p-6 md:p-8 space-y-6">
                  {/* Broker Selection */}
                  <div className="max-w-md">
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Trading Environment / Broker</label>
                      <div className="relative">
                          <select 
                              value={config.broker}
                              onChange={(e) => onChange('broker', e.target.value)}
                              className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-4 pr-10 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition-colors"
                          >
                              <option value="Demo">Demo Trading (Paper Trading)</option>
                              <option disabled>──────────</option>
                              <option value="Dhan">Dhan</option>
                              <option value="Angel One">Angel One</option>
                              <option value="Zerodha">Zerodha</option>
                              <option value="Upstox">Upstox</option>
                              <option value="Fyers">Fyers</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                      </div>
                  </div>

                  {isDemoMode ? (
                      /* Demo Mode Information Panel */
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-6">
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                              <h3 className="text-blue-400 font-bold text-sm mb-2 flex items-center gap-2">
                                  <GraduationCap size={16} /> Paper Trading Active
                              </h3>
                              <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                                  You are currently in <strong>Demo Mode</strong>. Trades will be simulated based on real-time market data ticks, but no real capital will be utilized. This is ideal for testing your Pine Script logic before going live.
                              </p>
                          </div>

                          <div className="bg-[#1e222d] border border-gray-700 rounded-lg p-6 flex items-center justify-between max-w-md">
                              <div>
                                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Virtual Portfolio Balance</label>
                                  <div className="text-2xl font-bold text-white flex items-center gap-3 mt-1">
                                      <Wallet size={24} className="text-green-500" />
                                      ₹ 10,00,000.00
                                  </div>
                              </div>
                              <div className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold rounded border border-green-500/30">
                                  ACTIVE
                              </div>
                          </div>
                      </div>
                  ) : (
                      /* Real Broker Credentials Fields - Grid for Desktop */
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                          {/* Client ID */}
                          <div>
                              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Client ID</label>
                              <div className="relative group">
                                  <User size={16} className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                  <input 
                                      type="text" 
                                      value={config.clientId || ''}
                                      onChange={(e) => onChange('clientId', e.target.value)}
                                      placeholder="e.g. AB1234"
                                      className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-10 pr-3 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                  />
                              </div>
                          </div>

                          {/* 2FA Code */}
                          <div>
                              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">2FA / PIN</label>
                              <div className="relative group">
                                  <Shield size={16} className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                  <input 
                                      type="password" 
                                      value={config.twoFA || ''}
                                      onChange={(e) => onChange('twoFA', e.target.value)}
                                      placeholder="••••••"
                                      className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-10 pr-3 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                  />
                              </div>
                          </div>

                          {/* Broker Token - Full Width in grid span */}
                          <div className="md:col-span-2">
                              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Broker Token / API Key</label>
                              <div className="relative group">
                                  <Key size={16} className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                  <input 
                                      type="password" 
                                      value={config.brokerToken || ''}
                                      onChange={(e) => onChange('brokerToken', e.target.value)}
                                      placeholder="Paste your broker access token here..."
                                      className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-10 pr-3 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                  />
                              </div>
                              <p className="text-[10px] text-gray-500 mt-2">
                                  Your token is encrypted locally. Never share your API token with anyone. This token expires daily for most brokers.
                              </p>
                          </div>
                          
                          {/* Token Expiry */}
                          <div className="md:col-span-1">
                              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Token Expiry Status</label>
                              <div className="relative group">
                                  <Clock size={16} className="absolute left-3 top-3.5 text-gray-500" />
                                  <input 
                                      type="text" 
                                      value={config.tokenExpiry || 'Not Generated'}
                                      readOnly
                                      className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-10 pr-3 py-3 text-sm text-yellow-500 font-mono font-bold focus:outline-none cursor-not-allowed opacity-80"
                                  />
                              </div>
                          </div>
                      </div>
                  )}

                  {/* Actions: Refresh & Update */}
                  <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row gap-4">
                      {!isDemoMode && (
                          <button 
                              onClick={handleRefreshToken}
                              disabled={isRefreshing || isSaving}
                              className="flex-1 bg-[#2a2e39] hover:bg-[#363a45] text-blue-400 border border-blue-900/30 font-bold py-3.5 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group"
                          >
                              <RefreshCw size={18} className={`group-hover:rotate-180 transition-transform duration-700 ${isRefreshing ? 'animate-spin' : ''}`} />
                              {isRefreshing ? 'Refreshing Token...' : 'Refresh API Token'}
                          </button>
                      )}
                      
                      <button 
                          onClick={handleUpdate}
                          disabled={isSaving || isRefreshing}
                          className={`flex-[1.5] font-bold py-3.5 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                              saveSuccess 
                                ? 'bg-green-600 hover:bg-green-700 shadow-green-900/30 text-white' 
                                : 'bg-purple-600 hover:bg-purple-700 shadow-purple-900/30 text-white'
                          }`}
                      >
                          {saveSuccess ? (
                              <>
                                <Check size={18} />
                                {isDemoMode ? 'Demo Activated' : 'Configuration Updated'}
                              </>
                          ) : (
                              <>
                                {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
                                {isSaving ? (isDemoMode ? 'Applying...' : 'Saving...') : (isDemoMode ? 'Activate Demo Environment' : 'Save Broker Credentials')}
                              </>
                          )}
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};