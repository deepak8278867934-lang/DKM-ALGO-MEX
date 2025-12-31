import React from 'react';

export interface Trade {
  id: number;
  entryTime: string;
  exitTime: string;
  symbol: string;
  strategy: string;
  entryType: 'BUY ENTRY' | 'SELL ENTRY';
  entryQty: number;
  entryPrice: number;
  exitPrice: number;
  total: number;
}

export enum AlertCondition {
  CROSSING_UP = 'Crossing Up',
  CROSSING_DOWN = 'Crossing Down',
  GREATER_THAN = 'Greater Than',
  LESS_THAN = 'Less Than',
}

export interface AlertConfig {
  symbol: string;
  price: number;
  condition: AlertCondition;
  message: string;
}

export interface SavedAlert extends AlertConfig {
  id: string;
  createdAt: string;
  status: 'Active' | 'Triggered' | 'Stopped';
}

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  subItems?: string[];
  isOpen?: boolean;
}

export interface BrokerConfig {
  broker: string;
  clientId: string;
  twoFA: string;
  brokerToken: string;
  tokenExpiry?: string;
}

export interface StrategyConfig {
  id?: string; // Unique ID for the strategy
  status?: 'Active' | 'Paused' | 'Stopped'; // Current running status
  createdAt?: string;
  name: string;
  symbol: string;
  exchange: string;
  type: string;
  optionType?: string;
  strike: string;
  expiry: string;
  gapRange: number;
  quantity: number;
  signalSource?: string;
  scriptContent?: string;
  productType?: string;
  orderType?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  userId: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  expiryDate: string;
  avatarUrl?: string;
  phone: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'error';
  read: boolean;
  source: string;
}