
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TradeTable } from './components/TradeTable';
import { AlertModal } from './components/AlertModal';
import { StrategyBuilder } from './components/StrategyBuilder';
import { SavedStrategies } from './components/SavedStrategies';
import { BrokerConfiguration } from './components/BrokerConfiguration';
import { TradingViewIntegration } from './components/TradingViewIntegration';
import { PineScriptManager } from './components/PineScriptManager';
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import { Notifications } from './components/Notifications';
import { ServerLogs } from './components/ServerLogs';
import { Dashboard } from './components/Dashboard';
import { Trade, AlertConfig, SavedAlert, AlertCondition, BrokerConfig, UserProfile, NotificationItem, StrategyConfig } from './types';
import { Activity, Zap, Server, BarChart2, Bell, Clock, Layers } from 'lucide-react';

// Helper to generate dynamic mock data
const generateMockData = (): Trade[] => {
  const now = new Date();
  const tradeTime = new Date(now);
  tradeTime.setHours(9, 15, 55, 0);

  if (now < tradeTime) return [];
  
  const d = String(now.getDate()).padStart(2, '0');
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const y = now.getFullYear();
  const dateStr = `${d}/${m}/${y}`;
  
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const symbolDate = `${d}${monthNames[now.getMonth()]}${String(y).slice(-2)}`;

  return [
    {
      id: 1,
      entryTime: `${dateStr} 09:15:55`,
      exitTime: `${dateStr} 09:22:58`,
      symbol: `NIFTY${symbolDate}25900PE[0]`,
      strategy: 'MR100',
      entryType: 'BUY ENTRY',
      entryQty: 450,
      entryPrice: 38.25,
      exitPrice: 44.00,
      total: 2587.50
    }
  ];
};

const generateInitialNotifications = (initialTrades: Trade[]): NotificationItem[] => {
    const now = new Date();
    const tradeTime = new Date(now);
    tradeTime.setHours(9, 15, 55, 0);
    if (now < tradeTime) return [];

    if (initialTrades.length > 0) {
        return [{ 
             id: 1, 
             title: 'Order Executed', 
             message: `${initialTrades[0].symbol} Buy Order Complete`, 
             time: 'Today 09:16 AM', 
             type: 'success', 
             read: false, 
             source: 'Broker' 
        }];
    }
    return [];
};

const DEFAULT_USER: UserProfile = {
    name: 'DKM Trader',
    email: 'dkm@algomax.com',
    userId: '882371',
    plan: 'Pro',
    expiryDate: '2025-12-31',
    phone: '+91 82788 67934'
};

const PlaceholderPage: React.FC<{ title: string; icon: React.ReactNode; description: string }> = ({ title, icon, description }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
    <div className="bg-blue-50 p-4 rounded-full mb-4">
      <div className="text-blue-500">
        {icon}
      </div>
    </div>
    <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
    <p className="max-w-md">{description}</p>
    <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
      Refresh Data
    </button>
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [initialAlertConfig, setInitialAlertConfig] = useState<AlertConfig | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Publishing / Cloud State
  const [isPublished, setIsPublished] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [trades, setTrades] = useState<Trade[]>(generateMockData());
  const [notifications, setNotifications] = useState<NotificationItem[]>(generateInitialNotifications(trades));
  const [strategies, setStrategies] = useState<StrategyConfig[]>([
    {
        id: '1',
        name: 'Nifty Scalping Pro',
        symbol: 'NIFTY',
        exchange: 'NSE',
        type: 'OPTION',
        optionType: 'CE',
        strike: 'ATM',
        expiry: 'Current Week',
        gapRange: 0,
        quantity: 50,
        status: 'Active',
        createdAt: '25 May 2024',
        productType: 'MIS',
        orderType: 'MARKET',
        signalSource: 'TradingView'
    }
  ]);
  const [editingStrategy, setEditingStrategy] = useState<StrategyConfig | null>(null);

  useEffect(() => {
    const checkTimeAndDate = () => {
        const now = new Date();
        const currentDateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
        const tradeTime = new Date(now);
        tradeTime.setHours(9, 15, 55, 0);

        if (now < tradeTime) {
            if (trades.length > 0) setTrades([]);
            if (notifications.length > 0) setNotifications([]);
            return;
        }

        if (trades.length > 0) {
            const tradeDate = trades[0].entryTime.split(' ')[0];
            if (tradeDate !== currentDateStr) {
                setTrades([]); 
                setNotifications([]);
            }
        }

        if (trades.length === 0 && now >= tradeTime) {
             const newData = generateMockData();
             if (newData.length > 0) {
                 setTrades(newData);
                 setNotifications([{ 
                     id: Date.now(), 
                     title: 'Order Executed', 
                     message: `${newData[0].symbol} Buy Order Complete`, 
                     time: 'Just now', 
                     type: 'success', 
                     read: false, 
                     source: 'Broker' 
                 }]);
             }
        }
    };

    const interval = setInterval(checkTimeAndDate, 5000);
    checkTimeAndDate();
    return () => clearInterval(interval);
  }, [trades, notifications]);

  const [alerts, setAlerts] = useState<SavedAlert[]>([]);
  const [brokerConfig, setBrokerConfig] = useState<BrokerConfig>({
      broker: 'Dhan',
      clientId: '',
      twoFA: '',
      brokerToken: '',
      tokenExpiry: '31/12/2025 08:30:00'
  });
  
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = (userData?: Partial<UserProfile>) => {
      if (userData) setUser(prev => ({ ...prev, ...userData }));
      setIsAuthenticated(true);
      setCurrentView('dashboard'); 
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      setCurrentView('dashboard');
  };

  const handleAddAlert = (trade: Trade) => {
    setSelectedTrade(trade);
    setInitialAlertConfig(null);
    setIsAlertModalOpen(true);
  };

  const handleSaveAlert = (config: AlertConfig) => {
    const newAlert: SavedAlert = {
        ...config,
        id: Date.now().toString(),
        createdAt: new Date().toLocaleString(),
        status: 'Active'
    };
    setAlerts([newAlert, ...alerts]);
  };

  const handleStrategySave = (config: StrategyConfig) => {
    if (config.id && strategies.find(s => s.id === config.id)) {
      setStrategies(prev => prev.map(s => s.id === config.id ? config : s));
    } else {
      const newStrategy = { 
        ...config, 
        id: Date.now().toString(), 
        status: 'Active' as const, 
        createdAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) 
      };
      setStrategies(prev => [newStrategy, ...prev]);
    }
    setEditingStrategy(null);
    setIsPublished(false); // Mark as out of sync when local changes are made
    setCurrentView('my_strategies');
  };

  const handlePublishAll = () => {
    setIsSyncing(true);
    // Simulate cloud deployment
    setTimeout(() => {
        setIsSyncing(false);
        setIsPublished(true);
        setNotifications([{
            id: Date.now(),
            title: 'Published Successfully',
            message: 'All strategies have been deployed to the live execution server.',
            time: 'Just now',
            type: 'success',
            read: false,
            source: 'System'
        }, ...notifications]);
    }, 2500);
  };

  const handleEditStrategy = (strategy: StrategyConfig) => {
    setEditingStrategy(strategy);
    setCurrentView('strategy_builder');
  };

  const handleToggleStrategy = (id: string) => {
    setStrategies(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' } : s));
    setIsPublished(false);
  };

  const handleDeleteStrategy = (id: string) => {
    setStrategies(prev => prev.filter(s => s.id !== id));
    setIsPublished(false);
  };

  const handleBrokerChange = (field: keyof BrokerConfig, value: string) => {
      setBrokerConfig(prev => ({ ...prev, [field]: value }));
      setIsPublished(false);
  };
  
  const handleUpdateNotifications = (newNotifications: NotificationItem[]) => {
      setNotifications(newNotifications);
  };

  const handleClearNotifications = () => {
      setNotifications([]);
  };

  if (!isAuthenticated) return <Login onLogin={handleLogin} />;

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'trade_history':
        return <TradeTable data={trades} onAddAlert={handleAddAlert} />;
      case 'strategy_builder':
        return <StrategyBuilder initialData={editingStrategy} onSave={handleStrategySave} brokerConfig={brokerConfig} onCancel={() => { setEditingStrategy(null); setCurrentView('my_strategies'); }} />;
      case 'my_strategies':
        return (
            <SavedStrategies 
                strategies={strategies} 
                onToggleStatus={handleToggleStrategy} 
                onDelete={handleDeleteStrategy} 
                onEdit={handleEditStrategy}
                onNavigateToBuilder={() => { setEditingStrategy(null); setCurrentView('strategy_builder'); }}
                isPublished={isPublished}
                isSyncing={isSyncing}
                onPublish={handlePublishAll}
            />
        );
      case 'signals':
      case 'live_signals':
        return <PlaceholderPage title="Live Signals" icon={<Activity size={32} />} description="Signals triggered by your TradingView alerts or broker will appear here in real-time." />;
      case 'broker_configuration':
        return <BrokerConfiguration config={brokerConfig} onChange={handleBrokerChange} onSave={() => {}} />;
      case 'tradingview_integration':
        return <TradingViewIntegration brokerConfig={brokerConfig} />;
      case 'pine_script_logic':
        return <PineScriptManager />;
      case 'broker_response':
        return <ServerLogs isPublished={isPublished} />;
      case 'notifications':
        return <Notifications notifications={notifications} onUpdateNotifications={handleUpdateNotifications} />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} />;
      default:
        return <PlaceholderPage title="Coming Soon" icon={<Zap size={32} />} description="Feature under development." />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        <Header 
            onMenuClick={() => setIsMobileMenuOpen(true)} 
            onProfileClick={() => setCurrentView('profile')}
            onNavigate={setCurrentView}
            user={user}
            notifications={notifications}
            onClearNotifications={handleClearNotifications}
            isPublished={isPublished}
            isSyncing={isSyncing}
        />
        <main className="flex-1 p-4 lg:p-6 mt-16 overflow-y-auto">
          <div className="animate-in fade-in duration-300">
             {renderContent()}
          </div>
        </main>
      </div>
      <AlertModal 
        isOpen={isAlertModalOpen} 
        onClose={() => setIsAlertModalOpen(false)} 
        trade={selectedTrade}
        initialConfig={initialAlertConfig}
        onSave={handleSaveAlert}
      />
    </div>
  );
};

export default App;
