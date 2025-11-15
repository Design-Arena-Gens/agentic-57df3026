'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Award, Target, AlertCircle, Lightbulb, Zap } from 'lucide-react';

interface Insight {
  id: string;
  type: 'success' | 'warning' | 'tip' | 'achievement';
  title: string;
  description: string;
  icon: any;
}

export default function InsightsPanel() {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights = () => {
    const generatedInsights: Insight[] = [
      {
        id: '1',
        type: 'achievement',
        title: 'Productivity Champion!',
        description: 'You completed 85% of your tasks this week. Keep up the excellent work!',
        icon: Award,
      },
      {
        id: '2',
        type: 'success',
        title: 'Health Streak Active',
        description: 'You\'ve maintained your health goals for 7 consecutive days. That\'s incredible consistency!',
        icon: TrendingUp,
      },
      {
        id: '3',
        type: 'tip',
        title: 'Peak Performance Time',
        description: 'Your data shows you\'re most productive between 9 AM - 11 AM. Schedule important tasks during this window.',
        icon: Lightbulb,
      },
      {
        id: '4',
        type: 'warning',
        title: 'Sleep Optimization',
        description: 'You averaged 6.2 hours of sleep this week. Aim for 7-8 hours to boost productivity by up to 30%.',
        icon: AlertCircle,
      },
      {
        id: '5',
        type: 'tip',
        title: 'Hydration Boost',
        description: 'On days you drink 8+ glasses of water, you complete 40% more tasks. Stay hydrated!',
        icon: Zap,
      },
      {
        id: '6',
        type: 'success',
        title: 'Weekly Goals Met',
        description: 'You achieved 4 out of 5 weekly goals. Focus on exercise to hit 100% next week!',
        icon: Target,
      },
    ];

    setInsights(generatedInsights);
  };

  const typeStyles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: 'text-green-600 dark:text-green-400',
      title: 'text-green-900 dark:text-green-100',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: 'text-yellow-600 dark:text-yellow-400',
      title: 'text-yellow-900 dark:text-yellow-100',
    },
    tip: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      title: 'text-blue-900 dark:text-blue-100',
    },
    achievement: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      icon: 'text-purple-600 dark:text-purple-400',
      title: 'text-purple-900 dark:text-purple-100',
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
          AI-Powered Insights
        </h2>
        <button
          onClick={generateInsights}
          className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          const styles = typeStyles[insight.type];

          return (
            <div
              key={insight.id}
              className={`${styles.bg} ${styles.border} border rounded-lg p-4 transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <div className={`${styles.icon} flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${styles.title} mb-1`}>
                    {insight.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-600" />
          Quick Stats
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-2xl font-bold text-purple-600">92%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Task Success Rate</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">7</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">24h</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Focus Time/Week</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">A+</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Health Score</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Personalized Recommendations</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-purple-600 mt-1">•</span>
            <span>Consider blocking 2-hour deep work sessions during your peak hours</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-purple-600 mt-1">•</span>
            <span>Add a 15-minute morning exercise routine to boost energy levels</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-purple-600 mt-1">•</span>
            <span>Set phone reminders to drink water every 2 hours</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-purple-600 mt-1">•</span>
            <span>Review and plan tomorrow's tasks 15 minutes before end of day</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
