import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldCheck, PhoneCall, Mail, Phone, ChevronLeft } from 'lucide-react';
import { Logo } from './Logo';
import { UserProfile } from '../types';

interface LoginProps {
  onLogin: (userData?: Partial<UserProfile>) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Login States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup States
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        setIsLoading(false);
        // Determine if the input 'email' is actually a phone number or email
        const isEmail = email.includes('@');
        const isPhone = /^[0-9+\-\s]+$/.test(email) && email.length > 6;

        const userData: Partial<UserProfile> = {};
        
        if (isEmail) {
            userData.email = email;
            // userData.userId = '88' + Math.floor(Math.random() * 10000).toString();
        } else if (isPhone) {
            userData.phone = email;
            userData.userId = email.replace(/\D/g, '').slice(-6); // Mock ID from phone
        } else {
            // Assume UserID
            userData.userId = email;
        }

        onLogin(userData);
      } else {
        setIsLoading(false);
        setError('Please enter valid credentials');
      }
    }, 1500);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate Signup API call
    setTimeout(() => {
      if (name && signupEmail && signupPassword && signupPhone) {
        setIsLoading(false);
        // Auto login after signup, passing the new user data
        onLogin({
            name: name,
            email: signupEmail,
            phone: signupPhone,
            userId: Math.floor(100000 + Math.random() * 900000).toString(),
            plan: 'Pro', // Demo default
            expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
        });
      } else {
        setIsLoading(false);
        setError('Please fill in all fields correctly');
      }
    }, 1500);
  };

  const toggleView = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsLoginView(!isLoginView);
      setError('');
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300">
        
        {/* Header */}
        <div className="bg-[#1e222d] p-8 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
           <div className="relative z-10 flex flex-col items-center">
              {/* Main Logo Component */}
              <Logo className="mb-4 scale-125" variant="dark" />
              
              <p className="text-gray-400 text-[10px] font-bold mt-2 uppercase tracking-[0.2em]">Automated Trading Terminal</p>
           </div>
           
           {/* Decorative background elements */}
           <div className="absolute top-[-50%] left-[-20%] w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
           <div className="absolute bottom-[-50%] right-[-20%] w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Form Container */}
        <div className="p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                {isLoginView ? 'Login to Dashboard' : 'Create New Account'}
            </h2>
            
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                    <ShieldCheck size={16} />
                    {error}
                </div>
            )}

            {isLoginView ? (
                /* LOGIN FORM */
                <form onSubmit={handleLoginSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">User ID / Email / Phone</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium text-gray-700 bg-gray-50 focus:bg-white"
                                placeholder="Enter User ID or Phone"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium text-gray-700 bg-gray-50 focus:bg-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center text-gray-600 cursor-pointer">
                            <input type="checkbox" className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-0.5 ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Secure Login <ArrowRight size={16} className="ml-2" />
                            </>
                        )}
                    </button>
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button onClick={toggleView} className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-colors focus:outline-none">
                                Sign Up
                            </button>
                        </p>
                    </div>
                </form>
            ) : (
                /* SIGNUP FORM */
                <form onSubmit={handleSignupSubmit} className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium text-gray-700 bg-gray-50 focus:bg-white"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="email"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium text-gray-700 bg-gray-50 focus:bg-white"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="tel"
                                value={signupPhone}
                                onChange={(e) => setSignupPhone(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium text-gray-700 bg-gray-50 focus:bg-white"
                                placeholder="+91 98765 43210"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium text-gray-700 bg-gray-50 focus:bg-white"
                                placeholder="Create a strong password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-0.5 mt-2 ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Create Account <ArrowRight size={16} className="ml-2" />
                            </>
                        )}
                    </button>
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button onClick={toggleView} className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-colors focus:outline-none flex items-center justify-center w-full gap-1 mt-1">
                                <ChevronLeft size={16} /> Back to Login
                            </button>
                        </p>
                    </div>
                </form>
            )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                <PhoneCall size={14} className="text-blue-600" />
                <span>Help Centre: <span className="font-bold text-gray-800">8278 8679 34</span></span>
            </div>
            
            <div className="text-[11px] text-gray-500 font-bold mb-3">
                © 2025 DKM ALGOMAX. All rights reserved.
            </div>

            <div className="flex justify-center gap-4 text-[10px] text-gray-400">
                <span>Terms of Service</span>
                <span>Privacy Policy</span>
                <span>v2.5.1</span>
            </div>
        </div>
      </div>
    </div>
  );
};