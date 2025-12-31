import React, { useState } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, Trash2, Filter, Check, Settings, Mail, Smartphone } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsProps {
    notifications: NotificationItem[];
    onUpdateNotifications: (newNotifications: NotificationItem[]) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications, onUpdateNotifications }) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'alerts'>('all');
  
  // Settings State
  const [tradeAlerts, setTradeAlerts] = useState(true);
  const [dailyReport, setDailyReport] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  const getIcon = (type: string) => {
      switch(type) {
          case 'success': return <CheckCircle size={20} className="text-green-500" />;
          case 'warning': return <AlertTriangle size={20} className="text-orange-500" />;
          case 'error': return <AlertTriangle size={20} className="text-red-500" />;
          default: return <Info size={20} className="text-blue-500" />;
      }
  };

  const handleMarkAsRead = (id: number) => {
    onUpdateNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    onUpdateNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id: number) => {
    onUpdateNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'alerts') return n.source === 'TradingView';
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
            <p className="text-gray-500 text-sm mt-1">Stay updated with trade alerts and system messages</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={handleMarkAllRead}
                disabled={notifications.length === 0}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
                <Check size={16} />
                Mark all read
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                <Filter size={16} />
                Filter
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main List Column */}
          <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Tabs */}
                  <div className="flex border-b border-gray-200 overflow-x-auto">
                      <button 
                        onClick={() => setFilter('all')}
                        className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${filter === 'all' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                      >
                          All Notifications
                      </button>
                      <button 
                        onClick={() => setFilter('unread')}
                        className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${filter === 'unread' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                      >
                          Unread
                      </button>
                       <button 
                        onClick={() => setFilter('alerts')}
                        className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${filter === 'alerts' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                      >
                          TradingView Alerts
                      </button>
                  </div>

                  {/* List */}
                  <div className="divide-y divide-gray-100">
                      {filteredNotifications.length === 0 ? (
                          <div className="p-12 text-center text-gray-400">
                              <Bell size={48} className="mx-auto mb-4 opacity-20" />
                              <p>No notifications found in this category.</p>
                          </div>
                      ) : (
                          filteredNotifications.map((notification) => (
                              <div 
                                key={notification.id} 
                                className={`p-4 hover:bg-gray-50 transition-colors flex gap-4 group ${notification.read ? 'opacity-75' : 'bg-blue-50/30'}`}
                              >
                                  <div className={`mt-1 p-2 rounded-full h-fit shrink-0 ${
                                    notification.type === 'success' ? 'bg-green-100' : 
                                    notification.type === 'warning' ? 'bg-orange-100' : 
                                    notification.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                                  }`}>
                                      {getIcon(notification.type)}
                                  </div>
                                  
                                  <div className="flex-1">
                                      <div className="flex justify-between items-start">
                                          <h3 className={`text-sm font-bold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                                              {notification.title}
                                          </h3>
                                          <span className="text-xs text-gray-400 whitespace-nowrap">{notification.time}</span>
                                      </div>
                                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                      
                                      <div className="mt-2 flex items-center gap-4 text-xs">
                                          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-medium border border-gray-200">
                                              {notification.source}
                                          </span>
                                          {!notification.read && (
                                              <button 
                                                onClick={() => handleMarkAsRead(notification.id)}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                              >
                                                  Mark as read
                                              </button>
                                          )}
                                      </div>
                                  </div>

                                  <button 
                                    onClick={() => handleDelete(notification.id)}
                                    className="text-gray-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all"
                                    title="Delete"
                                  >
                                      <Trash2 size={16} />
                                  </button>
                              </div>
                          ))
                      )}
                  </div>
              </div>
          </div>
          
          {/* Settings Column */}
          <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <Settings size={20} className="text-gray-500" />
                      Alert Preferences
                  </h3>
                  
                  <div className="space-y-6">
                      {/* Setting 1 */}
                      <div className="flex items-start justify-between">
                          <div className="pr-4">
                              <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                  <Smartphone size={16} className="text-blue-500" />
                                  Trade Execution
                              </p>
                              <p className="text-xs text-gray-500 mt-1">Get immediate in-app alerts when a trade is placed.</p>
                          </div>
                          <div 
                              onClick={() => setTradeAlerts(!tradeAlerts)}
                              className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${tradeAlerts ? 'bg-green-500' : 'bg-gray-300'}`}
                          >
                                <span 
                                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200 ${tradeAlerts ? 'translate-x-5' : 'translate-x-0'}`} 
                                />
                          </div>
                      </div>

                       {/* Setting 2 */}
                      <div className="flex items-start justify-between">
                          <div className="pr-4">
                              <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                  <Mail size={16} className="text-purple-500" />
                                  Daily P&L Report
                              </p>
                              <p className="text-xs text-gray-500 mt-1">Receive a summary email of your daily profit/loss.</p>
                          </div>
                          <div 
                              onClick={() => setDailyReport(!dailyReport)}
                              className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${dailyReport ? 'bg-green-500' : 'bg-gray-300'}`}
                          >
                                <span 
                                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200 ${dailyReport ? 'translate-x-5' : 'translate-x-0'}`} 
                                />
                          </div>
                      </div>

                       {/* Setting 3 */}
                       <div className="flex items-start justify-between">
                          <div className="pr-4">
                              <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                  <Bell size={16} className="text-orange-500" />
                                  Push Notifications
                              </p>
                              <p className="text-xs text-gray-500 mt-1">Allow browser push notifications for signals.</p>
                          </div>
                          <div 
                              onClick={() => setPushNotifications(!pushNotifications)}
                              className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${pushNotifications ? 'bg-green-500' : 'bg-gray-300'}`}
                          >
                                <span 
                                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200 ${pushNotifications ? 'translate-x-5' : 'translate-x-0'}`} 
                                />
                          </div>
                      </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                      <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-bold rounded-lg transition-colors border border-gray-200">
                          Reset to Defaults
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};