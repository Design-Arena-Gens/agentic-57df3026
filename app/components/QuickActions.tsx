'use client';

import { Clock, Coffee, Dumbbell, BookOpen, Music, Smile } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { icon: Clock, label: 'Focus Session', color: 'purple', action: '25 min' },
    { icon: Coffee, label: 'Break Time', color: 'orange', action: '5 min' },
    { icon: Dumbbell, label: 'Quick Exercise', color: 'green', action: '10 min' },
    { icon: BookOpen, label: 'Reading', color: 'blue', action: '15 min' },
    { icon: Music, label: 'Meditation', color: 'indigo', action: '10 min' },
    { icon: Smile, label: 'Gratitude', color: 'pink', action: 'Log' },
  ];

  const handleAction = (label: string) => {
    // In a real app, this would trigger timers, log activities, etc.
    alert(`Starting: ${label}`);
  };

  const colorClasses: any = {
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
    pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => handleAction(item.label)}
              className={`bg-gradient-to-r ${colorClasses[item.color]} text-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-lg`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium text-center">{item.label}</span>
              <span className="text-xs opacity-90">{item.action}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
