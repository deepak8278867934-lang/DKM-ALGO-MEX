
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Globe, Server, Check, Clock, AlertCircle } from 'lucide-react';

interface LogEntry {
    timestamp: string;
    level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';
    message: string;
    module: string;
}

export const ServerLogs: React.FC<{ isPublished: boolean }> = ({ isPublished }) => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const addLog = (message: string, level: LogEntry['level'] = 'INFO', module: string = 'SYS') => {
        const newLog: LogEntry = {
            timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
            level,
            message,
            module
        };
        setLogs(prev => [...prev.slice(-49), newLog]);
    };

    useEffect(() => {
        if (!isPublished) {
            setLogs([{
                timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
                level: 'WARN',
                message: 'Local changes detected. Cloud engine is out of sync. Please Publish.',
                module: 'CLOUD'
            }]);
            return;
        }

        // Initial setup logs
        const initialLogs: LogEntry[] = [
            { timestamp: '09:00:01', level: 'INFO', message: 'DKMALGOMAX Cloud Engine v2.5.1 initialized', module: 'SYS' },
            { timestamp: '09:00:05', level: 'SUCCESS', message: 'Handshake with Broker (Dhan) verified', module: 'API' },
            { timestamp: '09:00:10', level: 'SUCCESS', message: 'Webhook endpoint listening on port 443', module: 'NET' },
            { timestamp: '09:15:00', level: 'INFO', message: 'Market Open. Listening for strategy signals.', module: 'STRAT' }
        ];
        setLogs(initialLogs);

        const logChoices = [
            { msg: 'Heatbeat check: Cloud node online', level: 'INFO' as const, mod: 'SYS' },
            { msg: 'Pinging NSE data socket... 12ms', level: 'INFO' as const, mod: 'NSE' },
            { msg: 'Strategy "MR100" active and monitoring', level: 'SUCCESS' as const, mod: 'STRAT' },
            { msg: 'Webhook idle: Waiting for TradingView trigger', level: 'INFO' as const, mod: 'NET' },
        ];

        const interval = setInterval(() => {
            const choice = logChoices[Math.floor(Math.random() * logChoices.length)];
            addLog(choice.msg, choice.level, choice.mod);
        }, 8000);

        return () => clearInterval(interval);
    }, [isPublished]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Broker & Cloud Response</h1>
                    <p className="text-gray-500 text-sm mt-1">Real-time status of your published trading environment</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-200 text-xs font-bold">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Engine Online
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Status Panels */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <Shield size={16} />
                            <span className="text-[10px] font-bold uppercase">Security</span>
                        </div>
                        <p className="text-sm font-bold text-gray-800">SSL Encrypted</p>
                        <p className="text-[10px] text-green-600 font-bold mt-1">Verified Node</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <Globe size={16} />
                            <span className="text-[10px] font-bold uppercase">Endpoint</span>
                        </div>
                        <p className="text-xs font-mono text-blue-600 break-all">api.dkmalgomax.com</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <Server size={16} />
                            <span className="text-[10px] font-bold uppercase">Uptime</span>
                        </div>
                        <p className="text-sm font-bold text-gray-800">99.98%</p>
                        <p className="text-[10px] text-gray-400 mt-1">Last 30 Days</p>
                    </div>
                </div>

                {/* Main Console */}
                <div className="lg:col-span-3">
                    <div className="bg-[#0c1017] rounded-xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col h-[500px]">
                        <div className="px-4 py-2 bg-[#1e222d] border-b border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Terminal size={14} className="text-gray-400" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Server Terminal v2.5</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500/30"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/30"></div>
                            </div>
                        </div>
                        
                        <div 
                            ref={scrollRef}
                            className="flex-1 p-4 font-mono text-[11px] overflow-y-auto space-y-1.5 scroll-smooth"
                        >
                            {logs.map((log, i) => (
                                <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-1">
                                    <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
                                    <span className={`font-bold shrink-0 w-12 ${
                                        log.level === 'SUCCESS' ? 'text-green-500' :
                                        log.level === 'WARN' ? 'text-orange-400' :
                                        log.level === 'ERROR' ? 'text-red-500' : 'text-blue-400'
                                    }`}>
                                        {log.level}
                                    </span>
                                    <span className="text-gray-500 shrink-0">[{log.module}]</span>
                                    <span className="text-gray-300">{log.message}</span>
                                </div>
                            ))}
                            <div className="flex gap-2 text-blue-400 animate-pulse-soft">
                                <span>_</span>
                            </div>
                        </div>

                        <div className="px-4 py-2 bg-[#0c1017] border-t border-gray-800 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    <span className="text-[9px] font-bold text-gray-500">API: 200 OK</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    <span className="text-[9px] font-bold text-gray-500">MQTT: ACTIVE</span>
                                </div>
                            </div>
                            <span className="text-[9px] font-bold text-gray-600">CONNECTED TO: AP-SOUTH-1A</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
