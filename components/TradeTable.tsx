
import React, { useState, useEffect, useRef } from 'react';
import { Eye, Bell, MoreVertical, Copy } from 'lucide-react';
import { Trade } from '../types';

interface TradeTableProps {
  data: Trade[];
  onAddAlert: (trade: Trade) => void;
}

export const TradeTable: React.FC<TradeTableProps> = ({ data, onAddAlert }) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleAction = (action: () => void) => {
    action();
    setOpenMenuId(null);
  };

  return (
    <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      {/* Table Section - Now the primary content without extra headers or footers */}
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap min-w-max">
          <thead>
            {/* Header Style: Blue background, White text */}
            <tr className="bg-[#4285F4] text-white text-left">
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-r border-blue-400/30">S.No.</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-r border-blue-400/30">Entry Time</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-r border-blue-400/30">Exit Time</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-r border-blue-400/30">Symbol</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-r border-blue-400/30">Strategy</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-r border-blue-400/30">Type</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-r border-blue-400/30 text-right">Qty</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-r border-blue-400/30 text-right">Entry</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-r border-blue-400/30 text-right">Exit</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-r border-blue-400/30 text-right">Total</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
                <tr>
                    <td colSpan={11} className="px-4 py-12 text-center text-gray-400 italic text-sm">No trade history for today</td>
                </tr>
            ) : (
                data.map((row, index) => (
                    <tr key={row.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-900 border-r border-gray-100">{index + 1}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-900 border-r border-gray-100 font-medium">{row.entryTime}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-900 border-r border-gray-100 font-medium">{row.exitTime}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-bold text-gray-800 border-r border-gray-100">{row.symbol}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs border-r border-gray-100">
                          <span className="font-semibold text-gray-700">{row.strategy}</span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs border-r border-gray-100">
                          <span className={`font-bold px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] ${
                              row.entryType === 'BUY ENTRY' 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : 'bg-red-100 text-red-700'
                          }`}>
                              {row.entryType === 'BUY ENTRY' ? 'BUY' : 'SELL'}
                          </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-900 text-right border-r border-gray-100 font-mono">{row.entryQty}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-900 text-right border-r border-gray-100 font-mono">{row.entryPrice.toFixed(2)}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-900 text-right border-r border-gray-100 font-mono">{row.exitPrice.toFixed(2)}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-bold text-green-600 text-right border-r border-gray-100 font-mono">{row.total.toFixed(2)}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-center relative">
                        <button 
                          onClick={(e) => toggleMenu(row.id, e)}
                          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical size={14} />
                        </button>
      
                        {/* Three-dot Dropdown Menu */}
                        {openMenuId === row.id && (
                          <div 
                              ref={menuRef}
                              className="absolute right-0 top-8 mt-1 w-44 bg-white rounded-md shadow-lg border border-gray-200 z-50 text-left overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right"
                          >
                            <div className="py-1">
                              <button 
                                  onClick={() => handleAction(() => {})}
                                  className="flex items-center w-full px-3 py-2 text-[10px] sm:text-xs text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                              >
                                  <Eye size={12} className="mr-2" />
                                  View Details
                              </button>
                              <button 
                                  onClick={() => handleAction(() => onAddAlert(row))}
                                  className="flex items-center w-full px-3 py-2 text-[10px] sm:text-xs text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                              >
                                  <Bell size={12} className="mr-2" />
                                  TradingView Alert
                              </button>
                               <button 
                                  onClick={() => handleAction(() => {})}
                                  className="flex items-center w-full px-3 py-2 text-[10px] sm:text-xs text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                              >
                                  <Copy size={12} className="mr-2" />
                                  Copy ID
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
