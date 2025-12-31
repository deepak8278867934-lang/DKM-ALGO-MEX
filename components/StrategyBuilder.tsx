import React, { useState, useEffect } from 'react';
import { Zap, Calendar, Activity, Layers, Hash, Save, Check, Info, ArrowLeft } from 'lucide-react';
import { StrategyConfig, BrokerConfig } from '../types';

interface StrategyBuilderProps {
  initialData?: StrategyConfig | null;
  onSave: (config: StrategyConfig) => void;
  brokerConfig: BrokerConfig;
  onCancel?: () => void;
}

export const StrategyBuilder: React.FC<StrategyBuilderProps> = ({ initialData, onSave, brokerConfig, onCancel }) => {
  const [formData, setFormData] = useState<StrategyConfig>({
    name: '',
    symbol: 'NIFTY',
    exchange: 'NSE',
    type: 'OPTION',
    optionType: 'CE',
    strike: 'ATM',
    expiry: 'Current Week',
    gapRange: 0,
    quantity: 15,
    signalSource: 'TradingView',
    scriptContent: '',
    productType: 'MIS',
    orderType: 'MARKET'
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: keyof StrategyConfig, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // Enrich with metadata if new, or preserve if editing
    const updatedStrategy: StrategyConfig = {
        ...formData,
        id: formData.id || Date.now().toString(),
        status: formData.status || 'Active',
        createdAt: formData.createdAt || new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    
    onSave(updatedStrategy);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
             {onCancel && (
                <button onClick={onCancel} className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500 mr-1">
                    <ArrowLeft size={20} />
                </button>
             )}
             <h1 className="text-2xl font-bold text-gray-800">{initialData ? 'Edit Strategy' : 'Strategy Builder'}</h1>
          </div>
          <p className="text-gray-500 text-sm">Configure automated strategies with real-time execution parameters</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
           <Info size={14} /> Active Broker: {brokerConfig.broker}
        </div>
      </div>

      {/* Main Strategy Card */}
      <div className="bg-[#131722] text-white rounded-xl shadow-2xl overflow-hidden border border-gray-800">
         
         {/* Card Header */}
         <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#1e222d]">
            <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded text-white shadow-lg shadow-blue-900/50">
                    <Zap size={20} fill="currentColor" />
                </div>
                <h2 className="text-lg font-bold text-white tracking-wide">{initialData ? 'Update Configuration' : 'Strategy Configuration'}</h2>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">v2.5 Terminal</span>
         </div>

         {/* Form Content - Grid Layout for Desktop */}
         <div className="p-6 md:p-8 space-y-8">
            
            {/* Strategy Name - Full Width */}
            <div className="max-w-2xl">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Strategy Name</label>
                <div className="relative group">
                    <Layers size={16} className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="e.g. Nifty Intraday breakout"
                        className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-10 pr-3 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-bold"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                {/* Symbol */}
                <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Symbol</label>
                    <div className="relative group">
                        <Activity size={16} className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                        <select 
                            value={formData.symbol}
                            onChange={(e) => handleChange('symbol', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-10 pr-8 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                            <option value="NIFTY">NIFTY</option>
                            <option value="BANKNIFTY">BANKNIFTY</option>
                            <option value="FINNIFTY">FINNIFTY</option>
                            <option value="MIDCPNIFTY">MIDCPNIFTY</option>
                            <option value="SENSEX">SENSEX</option>
                            <option value="CRUDEOIL">CRUDEOIL</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                    </div>
                </div>

                {/* Exchange */}
                <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Exchange</label>
                    <div className="relative">
                         <select 
                            value={formData.exchange}
                            onChange={(e) => handleChange('exchange', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-3 pr-8 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                            <option>NSE</option>
                            <option>FNO</option>
                            <option>BSE</option>
                            <option>MCX</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                    </div>
                </div>

                {/* Instrument Type */}
                <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Type</label>
                    <div className="relative">
                        <select 
                            value={formData.type}
                            onChange={(e) => handleChange('type', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                            <option value="OPTION">OPTION</option>
                            <option value="FUTURE">FUTURE</option>
                            <option value="EQUITY">EQUITY</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                {/* Option Type */}
                {formData.type === 'OPTION' && (
                     <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Option Type</label>
                         <div className="relative">
                            <select 
                                value={formData.optionType}
                                onChange={(e) => handleChange('optionType', e.target.value)}
                                className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                            >
                                <option value="CE">CALL (CE)</option>
                                <option value="PE">PUT (PE)</option>
                                <option value="BOTH">BOTH</option>
                            </select>
                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                             </div>
                        </div>
                    </div>
                )}

                {/* Strike Selection */}
                 <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Strike</label>
                    <div className="relative">
                         <select 
                            value={formData.strike}
                            onChange={(e) => handleChange('strike', e.target.value)}
                            disabled={formData.type !== 'OPTION'}
                            className={`w-full bg-[#1e222d] border border-gray-700 rounded-md px-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer ${formData.type !== 'OPTION' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                             <option>ATM</option>
                             <option>OTM 1</option>
                             <option>OTM 2</option>
                             <option>OTM 3</option>
                             <option>ITM 1</option>
                             <option>ITM 2</option>
                             <option>ITM 3</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                {/* Expiry */}
                 <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Expiry</label>
                    <div className="relative group">
                         <Calendar size={16} className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                         <select 
                            value={formData.expiry}
                            onChange={(e) => handleChange('expiry', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-10 pr-8 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                            <option>Current Week</option>
                            <option>Next Week</option>
                            <option>Current Month</option>
                            <option>Next Month</option>
                        </select>
                    </div>
                </div>

                {/* Quantity */}
                <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Lot Size / Qty</label>
                    <div className="relative group">
                         <Hash size={16} className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                            type="number" 
                            value={formData.quantity}
                            onChange={(e) => handleChange('quantity', parseFloat(e.target.value))}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-10 pr-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500"
                            placeholder="Qty"
                        />
                    </div>
                </div>

                {/* Product Type */}
                <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Product Type</label>
                    <div className="relative">
                         <select 
                            value={formData.productType}
                            onChange={(e) => handleChange('productType', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                            <option value="MIS">MIS (Intraday)</option>
                            <option value="NRML">NRML (Carry Forward)</option>
                            <option value="CNC">CNC (Delivery)</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                    </div>
                </div>

                {/* Order Type */}
                <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Order Type</label>
                    <div className="relative">
                         <select 
                            value={formData.orderType}
                            onChange={(e) => handleChange('orderType', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                            <option value="MARKET">MARKET</option>
                            <option value="LIMIT">LIMIT</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center gap-4">
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
                        {saved ? (initialData ? 'Update Saved' : 'Strategy Saved') : (initialData ? 'Update Strategy' : 'Save Strategy')}
                    </span>
                </button>
                {onCancel && (
                    <button 
                        onClick={onCancel}
                        className="w-full md:w-auto px-8 py-4 border border-gray-700 text-gray-400 font-bold rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <p className="text-xs text-gray-500 max-w-sm text-center md:text-left ml-auto">
                    * Make sure to refresh your broker token daily before market open to ensure the strategy executes correctly.
                </p>
            </div>
         </div>
      </div>
    </div>
  );
};