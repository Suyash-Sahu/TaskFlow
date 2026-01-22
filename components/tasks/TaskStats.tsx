'use client';

import { CheckCircle, Clock, ListTodo, TrendingUp } from 'lucide-react';
import { TaskStats as Stats } from '@/lib/types';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import Card from '@/components/ui/Card';

interface TaskStatsProps {
  stats: Stats;
}

export default function TaskStats({ stats }: TaskStatsProps) {
  const animatedTotal = useAnimatedCounter(stats.total);
  const animatedCompleted = useAnimatedCounter(stats.completed);
  const animatedInProgress = useAnimatedCounter(stats.inProgress);
  const animatedPending = useAnimatedCounter(stats.pending);

  const statCards = [
    {
      label: 'Total Tasks',
      value: animatedTotal,
      icon: ListTodo,
      color: 'text-indigo-400',
      bgColor: 'bg-purple-500/20',
      trend: null,
    },
    {
      label: 'Completed',
      value: animatedCompleted,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bgColor: 'bg-green-500/20',
      trend: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
    },
    {
      label: 'In Progress',
      value: animatedInProgress,
      icon: Clock,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/20',
      trend: null,
    },
    {
      label: 'To Do',
      value: animatedPending,
      icon: ListTodo,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      trend: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-[var(--text-secondary)] mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                  {stat.value}
                </p>
                {stat.trend !== null && (
                  <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.trend}%</span>
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

