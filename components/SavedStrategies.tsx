
import React from 'react';
import { Play, Pause, Trash2, Calendar, Activity, Layers, Plus, Edit2, Cloud, RefreshCw, Check } from 'lucide-react';
import { StrategyConfig } from '../types';

interface SavedStrategiesProps {
  strategies: StrategyConfig[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (strategy: StrategyConfig) => void;
  onNavigateToBuilder: () => void;
  isPublished?: boolean;
  isSyncing?: boolean;
  onPublish?: () => void;
}

export const SavedStrategies: React.FC<SavedStrategiesProps> = ({ 
    strategies, 
    onToggleStatus, 
    onDelete,
    onEdit,
    onNavigateToBuilder,
    isPublished = true,
    isSyncing = false,
    onPublish
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">My Strategies</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your active and paused algorithmic strategies</p>
        </div>
        
        <div className="flex gap-2">
            {!isPublished && strategies.length > 0 && (
                <button 
                  onClick={onPublish}
                  disabled={isSyncing}
                  className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-orange-500/20 group animate-pulse hover:animate-none"
                >
                  {isSyncing ? <RefreshCw size={18} className="animate-spin" /> : <Cloud size={18} />}
                  {isSyncing ? 'Publishing...' : 'Sync to Cloud'}
                </button>
            )}
            <button 
              onClick={onNavigateToBuilder}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-500/20 group"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" />
              Create New Strategy
            </button>
        </div>
      </div>

      {strategies.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Layers size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No Strategies Found</h3>
            <p className="text-gray-500 max-w-md mb-6">
                You haven't added any strategies yet. Create your first automated trading strategy to get started.
            </p>
            <button 
              onClick={onNavigateToBuilder}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md"
            >
              <Plus size={18} />
              Build First Strategy
            </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategies.map((strategy) => (
                <div key={strategy.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative">
                    <div className="absolute top-0 right-0 p-2 flex gap-1">
                        {isPublished ? (
                            <div className="bg-green-500 text-white p-1 rounded-full shadow-sm" title="Synced with Cloud">
                                <Check size={10} strokeWidth={4} />
                            </div>
                        ) : (
                            <div className="bg-orange-500 text-white p-1 rounded-full shadow-sm animate-bounce" title="Changes pending sync">
                                <Cloud size={10} />
                            </div>
                        )}
                    </div>

                    <div className="p-5 border-b border-gray-100 flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{strategy.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="bg-gray-100 px-2 py-0.5 rounded font-mono font-medium">{strategy.symbol}</span>
                                <span>•</span>
                                <span className="uppercase">{strategy.productType}</span>
                            </div>
                        </div>
                        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                            strategy.status === 'Active' 
                            ? 'bg-green-50 text-green-600 border-green-200' 
                            : 'bg-yellow-50 text-yellow-600 border-yellow-200'
                        }`}>
                            {strategy.status}
                        </div>
                    </div>

                    <div className="p-5 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Quantity</p>
                                <p className="text-sm font-bold text-gray-700">{strategy.quantity} <span className="text-xs font-normal text-gray-400">Lots/Qty</span></p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Order</p>
                                <p className="text-sm font-bold text-gray-700">{strategy.orderType}</p>
                            </div>
                             <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Strike</p>
                                <p className="text-sm font-bold text-gray-700">{strategy.strike}</p>
                            </div>
                             <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Expiry</p>
                                <p className="text-sm font-bold text-gray-700 truncate">{strategy.expiry}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center gap-2 mb-1">
                                <Activity size={12} className="text-blue-500" />
                                <span className="text-xs font-bold text-gray-700">Automation Settings</span>
                            </div>
                            <p className="text-[11px] text-gray-500 leading-snug line-clamp-2">
                                Signals via {strategy.signalSource}. Order will execute as {strategy.orderType} on {strategy.exchange}.
                            </p>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-[10px] text-gray-400 flex items-center gap-1">
                            <Calendar size={12} />
                            {strategy.createdAt}
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => onEdit(strategy)}
                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                                title="Edit Strategy"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button 
                                onClick={() => onDelete(strategy.id!)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                title="Delete Strategy"
                            >
                                <Trash2 size={16} />
                            </button>
                            
                            <button 
                                onClick={() => onToggleStatus(strategy.id!)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                    strategy.status === 'Active'
                                    ? 'bg-white text-orange-600 border-orange-200 hover:bg-orange-50'
                                    : 'bg-green-600 text-white border-green-600 hover:bg-green-700 shadow-sm'
                                }`}
                            >
                                {strategy.status === 'Active' ? (
                                    <>
                                        <Pause size={12} /> Pause
                                    </>
                                ) : (
                                    <>
                                        <Play size={12} /> Activate
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};
