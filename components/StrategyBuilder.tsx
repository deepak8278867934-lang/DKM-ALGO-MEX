
import React, { useState, useEffect } from 'react';
import { Save, Check, Info, ArrowLeft, Layers, Hash, Zap, Target, ShieldCheck, Clock } from 'lucide-react';
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
    quantity: 50,
    productType: 'MIS',
    orderType: 'MARKET',
    signalSource: 'TradingView'
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
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
           <Info size={14} /> Broker: {brokerConfig.broker}
        </div>
      </div>

      <div className="bg-[#131722] text-white rounded-xl shadow-2xl overflow-hidden border border-gray-800">
         <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#1e222d]">
            <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded text-white shadow-lg shadow-blue-900/50">
                    <Zap size={20} fill="currentColor" />
                </div>
                <h2 className="text-lg font-bold text-white tracking-wide">Strategy Parameters</h2>
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Engine Ready
            </div>
         </div>

         <div className="p-6 md:p-8 space-y-8">
            {/* General Info Section */}
            <div>
                <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Layers size={14} /> General Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Strategy Name</label>
                        <div className="relative group">
                            <Layers size={16} className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="e.g. Nifty Scalping Pro"
                                className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors font-bold"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Signal Source</label>
                        <div className="relative group">
                            <Zap size={16} className="absolute left-3 top-3.5 text-gray-500" />
                            <select 
                                value={formData.signalSource}
                                onChange={(e) => handleChange('signalSource', e.target.value)}
                                className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-10 pr-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                            >
                                <option value="TradingView">TradingView Webhook</option>
                                <option value="Manual">Manual Terminal</option>
                                <option value="API">External API</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Instrument Settings Section */}
            <div>
                <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Target size={14} /> Instrument Settings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Symbol</label>
                        <select 
                            value={formData.symbol}
                            onChange={(e) => handleChange('symbol', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500"
                        >
                            <option value="NIFTY">NIFTY</option>
                            <option value="BANKNIFTY">BANKNIFTY</option>
                            <option value="FINNIFTY">FINNIFTY</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Exchange</label>
                        <select 
                            value={formData.exchange}
                            onChange={(e) => handleChange('exchange', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500"
                        >
                            <option value="NSE">NSE</option>
                            <option value="NFO">NFO</option>
                            <option value="MCX">MCX</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Type</label>
                        <select 
                            value={formData.type}
                            onChange={(e) => handleChange('type', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500"
                        >
                            <option value="OPTION">OPTION</option>
                            <option value="FUTURE">FUTURE</option>
                            <option value="EQUITY">EQUITY</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Strike Selection</label>
                        <select 
                            value={formData.strike}
                            onChange={(e) => handleChange('strike', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500"
                        >
                            <option value="ATM">ATM</option>
                            <option value="ITM 1">ITM 1</option>
                            <option value="ITM 2">ITM 2</option>
                            <option value="OTM 1">OTM 1</option>
                            <option value="OTM 2">OTM 2</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Execution Details Section */}
            <div>
                <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <ShieldCheck size={14} /> Execution Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Quantity / Lots</label>
                        <div className="relative group">
                            <Hash size={14} className="absolute left-3 top-3.5 text-gray-500" />
                            <input 
                                type="number" 
                                value={formData.quantity}
                                onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
                                className="w-full bg-[#1e222d] border border-gray-700 rounded-md pl-10 pr-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Product Type</label>
                        <select 
                            value={formData.productType}
                            onChange={(e) => handleChange('productType', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500"
                        >
                            <option value="MIS">MIS (Intraday)</option>
                            <option value="NRML">NRML (Carry Forward)</option>
                            <option value="CNC">CNC (Delivery)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Order Type</label>
                        <select 
                            value={formData.orderType}
                            onChange={(e) => handleChange('orderType', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500"
                        >
                            <option value="MARKET">MARKET</option>
                            <option value="LIMIT">LIMIT</option>
                            <option value="SL-LIMIT">SL-LIMIT</option>
                            <option value="SL-MARKET">SL-MARKET</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Expiry</label>
                        <select 
                            value={formData.expiry}
                            onChange={(e) => handleChange('expiry', e.target.value)}
                            className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-3 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500"
                        >
                            <option value="Current Week">Current Week</option>
                            <option value="Next Week">Next Week</option>
                            <option value="Current Month">Current Month</option>
                        </select>
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
                    <span className="text-lg font-bold uppercase tracking-tighter">
                        {saved ? 'Settings Saved' : (initialData ? 'Update Strategy' : 'Save Strategy')}
                    </span>
                </button>
                {onCancel && (
                    <button 
                        onClick={onCancel}
                        className="w-full md:w-auto px-8 py-4 border border-gray-700 text-gray-400 font-bold rounded-xl hover:bg-gray-800 transition-colors uppercase text-sm"
                    >
                        Cancel
                    </button>
                )}
            </div>
         </div>
      </div>

      <div className="mt-8 bg-blue-500/5 border border-blue-500/10 rounded-xl p-6 flex items-start gap-4">
          <div className="bg-blue-600 p-2 rounded text-white shadow-md">
              <Clock size={20} />
          </div>
          <div>
              <h4 className="text-blue-400 font-bold text-sm mb-1 uppercase tracking-wider">Market Safety Protocol Active</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                  All strategies created via the builder include automatic order validation and margin check protocols before being sent to {brokerConfig.broker}. Ensure your TradingView webhook signals are correctly formatted to match these parameters.
              </p>
          </div>
      </div>
    </div>
  );
};
