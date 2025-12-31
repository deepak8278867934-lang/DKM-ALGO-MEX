import React, { useState } from 'react';
import { User, Mail, Phone, Shield, CreditCard, LogOut, Clock, Award, Edit2, Save, X, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
      name: user.name,
      phone: user.phone,
      email: user.email
  });

  const handleSave = () => {
      // Simulate API save
      setIsEditing(false);
      // Here you would typically call an onUpdateUser callback
  };

  const handleCancel = () => {
      setFormData({
          name: user.name,
          phone: user.phone,
          email: user.email
      });
      setIsEditing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="mb-6 text-center md:text-left flex justify-between items-end">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your account details and subscription plan</p>
        </div>
        <button 
            onClick={onLogout}
            className="hidden md:flex bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-bold transition-colors items-center gap-2 border border-red-200"
        >
            <LogOut size={16} />
            Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                  {/* Edit Button */}
                  <div className="absolute top-4 right-4 z-10">
                      {isEditing ? (
                          <div className="flex gap-2">
                             <button 
                                onClick={handleCancel}
                                className="bg-white/90 p-2 rounded-full text-red-500 hover:bg-white shadow-sm transition-colors"
                             >
                                <X size={18} />
                             </button>
                             <button 
                                onClick={handleSave}
                                className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 shadow-sm transition-colors"
                             >
                                <Save size={18} />
                             </button>
                          </div>
                      ) : (
                          <button 
                            onClick={() => setIsEditing(true)}
                            className="bg-white/20 p-2 rounded-full text-white hover:bg-white/30 backdrop-blur-sm transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                      )}
                  </div>

                  <div className="h-32 bg-gradient-to-r from-[#1e222d] to-[#2a2e39] relative">
                      <div className="absolute -bottom-12 left-8 p-1 bg-white rounded-full">
                         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                            {user.avatarUrl ? (
                                <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User size={40} className="text-gray-400" />
                            )}
                         </div>
                      </div>
                  </div>
                  <div className="pt-16 pb-8 px-8">
                      <div className="flex justify-between items-start">
                          <div>
                              {isEditing ? (
                                  <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="text-2xl font-bold text-gray-800 border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                                  />
                              ) : (
                                  <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
                              )}
                              <p className="text-gray-500 font-medium">@{user.userId}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                              user.plan === 'Pro' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                              {user.plan} Plan
                          </span>
                      </div>

                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                              <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                              <div className="flex items-center gap-2 text-gray-700 font-medium">
                                  <Mail size={16} className="text-blue-500" />
                                  {isEditing ? (
                                      <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-full"
                                      />
                                  ) : formData.email}
                              </div>
                          </div>
                          <div className="space-y-1">
                              <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                              <div className="flex items-center gap-2 text-gray-700 font-medium">
                                  <Phone size={16} className="text-blue-500" />
                                  {isEditing ? (
                                      <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-full"
                                      />
                                  ) : formData.phone}
                              </div>
                          </div>
                          <div className="space-y-1">
                              <label className="text-xs font-bold text-gray-400 uppercase">Account ID</label>
                              <div className="flex items-center gap-2 text-gray-700 font-medium">
                                  <Shield size={16} className="text-blue-500" />
                                  DKM-{user.userId}-X99
                              </div>
                          </div>
                           <div className="space-y-1">
                              <label className="text-xs font-bold text-gray-400 uppercase">Member Since</label>
                              <div className="flex items-center gap-2 text-gray-700 font-medium">
                                  <Clock size={16} className="text-blue-500" />
                                  Jan 15, 2024
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Sidebar Info - Subscription */}
          <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                       <Award size={100} />
                   </div>
                   <h3 className="text-lg font-bold mb-1 relative z-10">Current Plan</h3>
                   <div className="text-3xl font-bold mb-4 relative z-10">{user.plan}</div>
                   
                   <div className="space-y-3 relative z-10 text-blue-100 text-sm">
                       <p className="flex items-center gap-2"><CheckCircle /> Real-time Signals</p>
                       <p className="flex items-center gap-2"><CheckCircle /> Unlimited Strategies</p>
                       <p className="flex items-center gap-2"><CheckCircle /> Priority Support</p>
                   </div>
                   
                   <div className="mt-6 pt-4 border-t border-blue-500/30 relative z-10">
                       <p className="text-xs opacity-70 mb-1">Expires On</p>
                       <p className="font-mono font-bold">{user.expiryDate}</p>
                   </div>
                   
                   <button className="mt-4 w-full bg-white text-blue-700 font-bold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                       Upgrade Plan
                   </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Payment Method</h3>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="bg-white p-2 rounded shadow-sm">
                          <CreditCard size={20} className="text-gray-700" />
                      </div>
                      <div>
                          <p className="text-sm font-bold text-gray-800">Visa ending in 4242</p>
                          <p className="text-xs text-gray-500">Expires 12/28</p>
                      </div>
                  </div>
              </div>

               <button 
                onClick={onLogout}
                className="w-full md:hidden bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-red-200"
            >
                <LogOut size={18} />
                Sign Out
            </button>
          </div>
      </div>
    </div>
  );
};