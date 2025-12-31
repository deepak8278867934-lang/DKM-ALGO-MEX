
import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, User, Power, CheckCircle, AlertTriangle, Info, Trash2, GraduationCap, Zap, Smartphone, Tablet, Monitor, Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';

interface HeaderProps {
  onMenuClick: () => void;
  onProfileClick: () => void;
  onNavigate: (view: string) => void;
  user?: UserProfile;
  notifications: NotificationItem[];
  onClearNotifications: () => void;
  isPublished?: boolean;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
    onMenuClick, 
    onProfileClick, 
    onNavigate, 
    user,
    notifications,
    onClearNotifications,
    isPublished = true,
    isSyncing = false
}) => {
  const [tradingMode, setTradingMode] = useState<'DEMO' | 'LIVE'>('DEMO');
  const [isTradingActive, setIsTradingActive] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  const notificationRef = useRef<HTMLDivElement>(null);

  // Track window resize for device info
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDeviceDetails = () => {
    const { width } = windowSize;
    if (width < 640) return { label: 'Phone', icon: <Smartphone size={14} />, color: 'bg-orange-50 text-orange-600 border-orange-200' };
    if (width < 1024) return { label: 'Tablet', icon: <Tablet size={14} />, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' };
    return { label: 'Computer', icon: <Monitor size={14} />, color: 'bg-slate-50 text-slate-600 border-slate-200' };
  };

  const device = getDeviceDetails();

  const handleClearNotifications = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClearNotifications();
  };

  const handleViewAllNotifications = () => {
      setShowNotifications(false);
      onNavigate('notifications');
  };

  const getIcon = (type: string) => {
      switch(type) {
          case 'success': return <CheckCircle size={14} className="text-green-500" />;
          case 'warning': return <AlertTriangle size={14} className="text-orange-500" />;
          default: return <Info size={14} className="text-blue-500" />;
      }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-2 sm:px-4 lg:px-6 lg:ml-64 fixed top-0 right-0 left-0 z-40 shadow-sm overflow-hidden">
      {/* Navigation Controls */}
      <div className="flex lg:hidden items-center shrink-0">
        <button 
          className="text-gray-600 p-2 hover:bg-gray-100 rounded-md transition-colors"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Cloud Status Indicator */}
      <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 ml-2">
         {isSyncing ? (
             <RefreshCw size={14} className="text-blue-500 animate-spin" />
         ) : isPublished ? (
             <Cloud size={14} className="text-green-500" />
         ) : (
             <CloudOff size={14} className="text-orange-500" />
         )}
         <div className="flex flex-col">
             <span className={`text-[9px] font-black uppercase tracking-widest ${isSyncing ? 'text-blue-600' : isPublished ? 'text-green-600' : 'text-orange-600'}`}>
                 {isSyncing ? 'Syncing...' : isPublished ? 'Cloud Live' : 'Not Published'}
             </span>
             {isPublished && !isSyncing && (
                 <span className="text-[8px] text-gray-400 font-mono">ID: dk-882371-pub</span>
             )}
         </div>
         {isPublished && (
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping ml-1 opacity-75"></div>
         )}
      </div>

      <div className="flex items-center gap-1 sm:gap-4 md:gap-6 ml-auto lg:ml-0">
        
        {/* Master Trading Switch (On/Off) */}
        <button
            onClick={() => setIsTradingActive(!isTradingActive)}
            className={`flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-1.5 rounded-full border shadow-sm transition-all duration-300 ${
                isTradingActive 
                ? 'bg-green-100 border-green-200 text-green-700 hover:bg-green-200' 
                : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
            }`}
        >
            <Power size={12} className={`sm:w-4 sm:h-4 ${isTradingActive ? "fill-current" : ""}`} />
            <span className="text-[8px] sm:text-xs font-bold uppercase whitespace-nowrap">
                {isTradingActive ? 'ON' : 'OFF'}
            </span>
        </button>

        {/* Trading Mode Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg shrink-0 gap-0.5 sm:gap-1">
             <button
                onClick={() => setTradingMode('DEMO')}
                className={`flex items-center gap-1 px-1.5 sm:px-3 py-1 rounded-md text-[8px] sm:text-xs font-bold transition-all ${
                    tradingMode === 'DEMO'
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
             >
                <GraduationCap size={12} className="sm:w-3.5 sm:h-3.5" />
                <span>DEMO</span>
             </button>
             <button
                onClick={() => setTradingMode('LIVE')}
                className={`flex items-center gap-1 px-1.5 sm:px-3 py-1 rounded-md text-[8px] sm:text-xs font-bold transition-all ${
                    tradingMode === 'LIVE'
                    ? 'bg-green-600 text-white shadow-sm ring-1 ring-green-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
             >
                <Zap size={12} className="sm:w-3.5 sm:h-3.5" fill={tradingMode === 'LIVE' ? "currentColor" : "none"} />
                <span>LIVE</span>
             </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-3 relative" ref={notificationRef}>
            <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-1.5 sm:p-2 rounded-full transition-colors relative ${showNotifications ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
            >
              <Bell size={18} className="sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                 <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
              )}
            </button>
            
            {/* Notification Dropdown */}
            {showNotifications && (
                <div className="absolute top-12 right-0 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 origin-top-right">
                    <div className="p-3 sm:p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-gray-700 text-xs sm:text-sm">Notifications ({notifications.length})</h3>
                        {notifications.length > 0 && (
                            <button onClick={handleClearNotifications} className="text-[10px] text-red-500 hover:text-red-700 font-bold flex items-center gap-1">
                                <Trash2 size={12} /> CLEAR
                            </button>
                        )}
                    </div>
                    <div className="max-h-64 sm:max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center flex flex-col items-center text-gray-400">
                                <Bell size={24} className="mb-2 opacity-20" />
                                <span className="text-xs">No notifications</span>
                            </div>
                        ) : (
                            notifications.map(n => (
                                <div key={n.id} className="p-3 sm:p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-2 sm:gap-3">
                                    <div className={`mt-0.5 p-1 rounded-full h-fit shrink-0 ${
                                        n.type === 'success' ? 'bg-green-100' : 
                                        n.type === 'warning' ? 'bg-orange-100' : 'bg-blue-100'
                                    }`}>
                                        {getIcon(n.type)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex justify-between items-start mb-0.5">
                                            <h4 className="font-bold text-[10px] sm:text-xs text-gray-800 truncate pr-1">{n.title}</h4>
                                            <span className="text-[9px] text-gray-400 whitespace-nowrap shrink-0">{n.time}</span>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-gray-500 leading-snug line-clamp-2">{n.message}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="p-2 border-t border-gray-100 bg-gray-50 text-center">
                        <button 
                            onClick={handleViewAllNotifications}
                            className="text-[10px] font-bold text-blue-600 hover:text-blue-800"
                        >
                            VIEW ALL ACTIVITY
                        </button>
                    </div>
                </div>
            )}
            
            <div 
                onClick={onProfileClick}
                className="hidden sm:flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-full pl-3 sm:pl-4 pr-1 py-1 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors shrink-0"
            >
              <span className="text-[10px] sm:text-xs font-bold text-gray-700 uppercase truncate max-w-[80px]">{user?.name || 'USER'}</span>
              <div className="bg-white p-1 rounded-full shadow-sm">
                <User size={14} className="text-blue-500 sm:w-4 sm:h-4" />
              </div>
            </div>
             <div onClick={onProfileClick} className="sm:hidden bg-gray-50 p-1.5 rounded-full border border-gray-200 cursor-pointer shrink-0">
                <User size={14} className="text-blue-500" />
             </div>
        </div>
      </div>
    </header>
  );
};
