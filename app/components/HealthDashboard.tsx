'use client';

import { useState, useEffect } from 'react';
import { Heart, Droplets, Moon, Activity, Flame, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HealthMetric {
  date: string;
  water: number;
  sleep: number;
  exercise: number;
  steps: number;
}

export default function HealthDashboard({ preview }: { preview: boolean }) {
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [todayMetrics, setTodayMetrics] = useState<HealthMetric>({
    date: new Date().toISOString().split('T')[0],
    water: 0,
    sleep: 0,
    exercise: 0,
    steps: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('healthMetrics');
      if (stored) {
        const data = JSON.parse(stored);
        setMetrics(data);
        const today = data.find((m: HealthMetric) => m.date === new Date().toISOString().split('T')[0]);
        if (today) {
          setTodayMetrics(today);
        }
      }
    }
  }, []);

  const updateMetric = (key: keyof Omit<HealthMetric, 'date'>, value: number) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = { ...todayMetrics, [key]: value, date: today };
    setTodayMetrics(updated);

    const newMetrics = metrics.filter(m => m.date !== today);
    newMetrics.push(updated);
    setMetrics(newMetrics);

    if (typeof window !== 'undefined') {
      localStorage.setItem('healthMetrics', JSON.stringify(newMetrics));
    }
  };

  const getChartData = () => {
    return metrics.slice(-7).map(m => ({
      date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      water: m.water,
      sleep: m.sleep,
      exercise: m.exercise,
    }));
  };

  const calculateStreak = () => {
    let streak = 0;
    const sorted = [...metrics].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    for (const metric of sorted) {
      if (metric.water >= 8 && metric.sleep >= 7 && metric.exercise >= 30) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const goals = {
    water: { target: 8, unit: 'glasses', icon: Droplets, color: 'blue' },
    sleep: { target: 8, unit: 'hours', icon: Moon, color: 'indigo' },
    exercise: { target: 30, unit: 'minutes', icon: Activity, color: 'green' },
    steps: { target: 10000, unit: 'steps', icon: Flame, color: 'orange' },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-600" />
          Health Dashboard
        </h2>
        {!preview && (
          <div className="text-right">
            <p className="text-3xl font-bold text-red-600">{calculateStreak()}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
          </div>
        )}
      </div>

      {!preview && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {Object.entries(goals).map(([key, goal]) => {
            const Icon = goal.icon;
            const value = todayMetrics[key as keyof Omit<HealthMetric, 'date'>];
            const percentage = Math.min((value / goal.target) * 100, 100);

            return (
              <div key={key} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 text-${goal.color}-600`} />
                    <span className="font-medium text-gray-900 dark:text-white capitalize">{key}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {value} / {goal.target} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                  <div
                    className={`bg-${goal.color}-600 h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateMetric(key as any, Math.max(0, value - 1))}
                    className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateMetric(key as any, value + 1)}
                    className={`flex-1 bg-${goal.color}-600 text-white px-3 py-1 rounded hover:bg-${goal.color}-700 transition-colors`}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {metrics.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-600" />
            Weekly Overview
          </h3>
          <ResponsiveContainer width="100%" height={preview ? 150 : 200}>
            <BarChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Bar dataKey="water" fill="#3B82F6" />
              <Bar dataKey="sleep" fill="#6366F1" />
              <Bar dataKey="exercise" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {preview && (
        <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Track your daily health metrics and build healthy habits. Click to view detailed tracking.
          </p>
        </div>
      )}
    </div>
  );
}
