import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  Activity, 
  Zap, 
  Server, 
  ChevronDown,
  ChevronRight,
  X,
  Briefcase,
  Globe,
  LogOut,
  Code,
  User,
  Bell,
  Layers
} from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentView, onNavigate, onLogout }) => {
  const [isTradeDetailsOpen, setIsTradeDetailsOpen] = useState(true);

  useEffect(() => {
    if (currentView === 'signals' || currentView === 'trade_history') {
      setIsTradeDetailsOpen(true);
    }
  }, [currentView]);

  const handleNavigation = (viewId: string) => {
    onNavigate(viewId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const menuItems = [
    { 
      id: 'dashboard', 
      icon: <LayoutDashboard size={18} />, 
      label: 'Dashboard' 
    },
    { 
      id: 'trade_details',
      icon: <BarChart2 size={18} />, 
      label: 'Trade Details', 
      hasSubmenu: true,
      isOpen: isTradeDetailsOpen,
      toggle: () => setIsTradeDetailsOpen(!isTradeDetailsOpen),
      subItems: [
        { id: 'signals', label: 'Signals' },
        { id: 'trade_history', label: 'Trade History' }
      ]
    },
    { 
      id: 'my_strategies',
      icon: <Layers size={18} />, 
      label: 'My Strategies'
    },
    { id: 'tradingview_integration', icon: <Globe size={18} />, label: 'Signal Config' },
    { id: 'broker_configuration', icon: <Briefcase size={18} />, label: 'Broker Config' },
    { id: 'trading_status', icon: <Zap size={18} />, label: 'Trading Status' },
    { id: 'pine_script_logic', icon: <Code size={18} />, label: 'Pine Script Logic' },
    { id: 'broker_response', icon: <Server size={18} />, label: 'Broker Response' },
    { id: 'notifications', icon: <Bell size={18} />, label: 'Notifications' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <div className={`
        w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50 shadow-xl lg:shadow-sm 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 shrink-0 relative">
          <div className="flex items-center justify-center w-full lg:justify-start pt-1">
              <Logo variant="light" className="scale-90 origin-left" />
          </div>
          <button onClick={onClose} className="lg:hidden absolute right-4 text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <div key={item.id} className="group mb-1">
                <button
                  onClick={item.hasSubmenu ? item.toggle : () => handleNavigation(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    (currentView === item.id || (item.hasSubmenu && item.subItems?.some(s => s.id === currentView)))
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`mr-3 ${(currentView === item.id || (item.hasSubmenu && item.subItems?.some(s => s.id === currentView))) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`}>
                      {item.icon}
                    </span>
                    {item.label}
                  </div>
                  {item.hasSubmenu && (
                    <span className="text-gray-400">
                       {item.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                  )}
                </button>
                
                {item.hasSubmenu && item.isOpen && (
                  <div className="pl-11 space-y-1 mt-1 transition-all duration-200">
                    {item.subItems?.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavigation(subItem.id)}
                        className={`w-full text-left block px-3 py-2 text-sm rounded-md relative transition-colors ${
                          currentView === subItem.id
                            ? 'text-blue-600 bg-blue-50 font-medium'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                         {currentView === subItem.id && (
                            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-blue-600 rounded-r-full"></span>
                         )}
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        <div className="p-2 border-t border-gray-200 bg-gray-50 space-y-1">
           <button 
                onClick={() => handleNavigation('profile')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentView === 'profile' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
           >
                <User size={18} className="mr-3" />
                My Profile
           </button>
           <button 
                onClick={onLogout}
                className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
           >
                <LogOut size={18} className="mr-3" />
                Sign Out
           </button>
           <p className="text-[10px] text-gray-400 text-center pt-1 pb-1">Version 2.5.1</p>
        </div>
      </div>
    </>
  );
};