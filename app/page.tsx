'use client';

import { useState, useEffect } from 'react';
import { Activity, Brain, Calendar, TrendingUp, Target, Heart, Moon, Droplets, Flame, Clock } from 'lucide-react';
import ProductivityTracker from './components/ProductivityTracker';
import HealthDashboard from './components/HealthDashboard';
import AIAssistant from './components/AIAssistant';
import InsightsPanel from './components/InsightsPanel';
import QuickActions from './components/QuickActions';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userName, setUserName] = useState('');
  const [productivityData, setProductivityData] = useState<any[]>([]);
  const [healthData, setHealthData] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('userName') || 'User';
      setUserName(storedName);

      const storedProductivity = localStorage.getItem('productivityData');
      if (storedProductivity) {
        setProductivityData(JSON.parse(storedProductivity));
      }

      const storedHealth = localStorage.getItem('healthData');
      if (storedHealth) {
        setHealthData(JSON.parse(storedHealth));
      }
    }
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'productivity', label: 'Productivity', icon: Target },
    { id: 'health', label: 'Health', icon: Heart },
    { id: 'insights', label: 'AI Insights', icon: Brain },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border-b border-purple-200 dark:border-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  LifeFlow
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {userName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <QuickActions />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <StatCard
                    icon={Target}
                    label="Tasks Today"
                    value={productivityData.filter(d => d.date === new Date().toISOString().split('T')[0]).length || 0}
                    color="blue"
                  />
                  <StatCard
                    icon={Flame}
                    label="Streak"
                    value={`${healthData.streak || 0}d`}
                    color="orange"
                  />
                  <StatCard
                    icon={Clock}
                    label="Focus Time"
                    value={`${healthData.focusTime || 0}h`}
                    color="purple"
                  />
                  <StatCard
                    icon={TrendingUp}
                    label="Progress"
                    value={`${healthData.progress || 0}%`}
                    color="green"
                  />
                </div>
              </div>
              <div className="lg:col-span-1">
                <AIAssistant compact={true} />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProductivityTracker preview={true} />
              <HealthDashboard preview={true} />
            </div>
          </div>
        )}

        {activeTab === 'productivity' && (
          <ProductivityTracker preview={false} />
        )}

        {activeTab === 'health' && (
          <HealthDashboard preview={false} />
        )}

        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <InsightsPanel />
            </div>
            <div className="lg:col-span-1">
              <AIAssistant compact={false} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            LifeFlow - Your AI-powered productivity and health companion
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} w-10 h-10 rounded-lg flex items-center justify-center mb-2`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
}
