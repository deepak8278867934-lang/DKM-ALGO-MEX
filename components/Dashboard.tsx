
import React, { useState, useEffect } from 'react';
import { Activity, Zap, Server, ShieldCheck, Globe, Wifi, Cpu, Database, ArrowUpRight } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const [load, setLoad] = useState(12);
    const [latency, setLatency] = useState(24);
    const [requests, setRequests] = useState(1240);

    // Simulate live data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLoad(prev => Math.max(8, Math.min(25, prev + (Math.random() * 4 - 2))));
            setLatency(prev => Math.max(15, Math.min(35, prev + (Math.random() * 6 - 3))));
            setRequests(prev => prev + Math.floor(Math.random() * 3));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const stats = [
        { label: 'Engine Status', value: 'Operational', icon: <Server size={20} />, color: 'text-green-500', bg: 'bg-green-50' },
        { label: 'Cloud Latency', value: `${latency.toFixed(0)}ms`, icon: <Wifi size={20} />, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Server Load', value: `${load.toFixed(1)}%`, icon: <Cpu size={20} />, color: 'text-purple-500', bg: 'bg-purple-50' },
        { label: 'Total Handled', value: requests.toLocaleString(), icon: <Database size={20} />, color: 'text-orange-500', bg: 'bg-orange-50' },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Live Status Banner */}
            <div className="bg-gradient-to-r from-[#131722] to-[#1e222d] rounded-2xl p-6 shadow-xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </div>
                        <h2 className="text-white text-xl font-bold tracking-tight">System Live & Published</h2>
                    </div>
                    <p className="text-gray-400 text-sm">Deployment ID: <span className="text-blue-400 font-mono">dashing-crumble-6148a6</span> • Status: Active</p>
                </div>
                <div className="flex items-center gap-4 relative z-10">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Global Endpoint</p>
                        <p className="text-xs text-blue-400 font-mono">ap-south-1.aws.pub</p>
                    </div>
                    <div className="h-12 w-px bg-gray-800 mx-2"></div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                        <ShieldCheck size={18} />
                        Run Diagnostic
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-lg font-black text-gray-800">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Monitor */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <Activity size={18} className="text-blue-500" />
                            Activity Monitor
                        </h3>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Last 60 Minutes</span>
                    </div>
                    <div className="p-6 h-64 flex items-end justify-between gap-1">
                        {[...Array(24)].map((_, i) => {
                            const height = Math.floor(Math.random() * 80) + 20;
                            return (
                                <div key={i} className="flex-1 group relative">
                                    <div 
                                        style={{ height: `${height}%` }} 
                                        className={`w-full rounded-t-sm transition-all duration-500 ${height > 70 ? 'bg-blue-600' : 'bg-blue-400'} hover:bg-blue-500`}
                                    ></div>
                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Req: {height}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="p-3 bg-gray-50 text-center">
                        <button className="text-[10px] font-bold text-blue-600 hover:underline">VIEW FULL TRAFFIC LOGS</button>
                    </div>
                </div>

                {/* Cloud Connectivity */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <Globe size={18} className="text-purple-500" />
                        Live Nodes
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Mumbai (Primary)', status: 'Connected', delay: '12ms' },
                            { name: 'Singapore', status: 'Standby', delay: '48ms' },
                            { name: 'Frankfurt', status: 'Disconnected', delay: '--' },
                        ].map((node, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-50 bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${node.status === 'Connected' ? 'bg-green-500' : node.status === 'Standby' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-800">{node.name}</p>
                                        <p className="text-[10px] text-gray-500">{node.status}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-gray-400">{node.delay}</span>
                            </div>
                        ))}
                    </div>
                    <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-orange-700 font-bold text-xs mb-1">
                            <Zap size={14} />
                            Quick Setup Tip
                        </div>
                        <p className="text-[10px] text-orange-600 leading-relaxed">
                            Your TradingView webhook is ready. Go to Signal Config to copy your unique URL and start receiving alerts.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
