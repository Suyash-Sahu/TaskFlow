'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Plus, Layers, CheckCircle, Clock, ListTodo } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { calculateStats } from '@/lib/utils';
import Button from '@/components/ui/Button';

/* ---------------- Types ---------------- */
type TaskStatus = 'todo' | 'in-progress' | 'completed';
type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  dueDate?: string;
}

/* ---------------- Badge ---------------- */
function Badge({ type }: { type: TaskStatus | TaskPriority }) {
  const styles: Record<string, string> = {
    completed: 'bg-green-500/20 text-green-400',
    'in-progress': 'bg-sky-500/20 text-sky-400',
    todo: 'bg-zinc-700/40 text-zinc-300',
    high: 'bg-yellow-500/20 text-yellow-400',
    medium: 'bg-blue-500/20 text-blue-400',
    low: 'bg-zinc-600/30 text-zinc-400',
    urgent: 'bg-red-500/20 text-red-400',
  };

  const label =
    type === 'in-progress'
      ? 'In Progress'
      : type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <span className={`text-xs px-2.5 py-1 rounded-full ${styles[type]}`}>
      {label}
    </span>
  );
}

/* ---------------- Dashboard Page ---------------- */
export default function DashboardPage() {
  const { tasks, filteredTasks } = useTasks();
  const stats = calculateStats(tasks);

  const recentTasks: Task[] = useMemo(() => {
    return [...filteredTasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [filteredTasks]);

  const completionRate =
    stats.total > 0
      ? Math.round((stats.completed / stats.total) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] px-6 py-12">
      {/* ✅ GLOBAL VERTICAL SPACING FIX */}
      <div className="flex flex-col gap-16">

        {/* ---------------- Header ---------------- */}
        <section>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-[var(--text-secondary)]">
            Track your tasks and boost your productivity
          </p>
        </section>

        {/* ---------------- Stats ---------------- */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard title="Total Tasks" value={stats.total} icon={<Layers />} />
            <StatCard title="Completed" value={stats.completed} icon={<CheckCircle />} />
            <StatCard title="In Progress" value={stats.inProgress} icon={<Clock />} />
            <StatCard title="To Do" value={stats.pending} icon={<ListTodo />} />
          </div>
        </section>

        {/* ---------------- Main Content ---------------- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          
          {/* Completion Rate */}
          <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-8 flex flex-col items-center justify-center">
            <h3 className="text-[var(--text-secondary)] mb-6">Completion Rate</h3>

            <div className="w-36 h-36 rounded-full border-8 border-zinc-800 flex items-center justify-center">
              <span className="text-3xl font-bold text-teal-400">
                {completionRate}%
              </span>
            </div>

            <p className="text-sm text-[var(--text-tertiary)] mt-6">
              {stats.completed} of {stats.total} tasks completed
            </p>
          </div>

          {/* Recent Tasks */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">Recent Tasks</h2>
              <Link href="/tasks" className="text-indigo-400 hover:underline">
                View all →
              </Link>
            </div>

            {/* ✅ CONSISTENT TASK GAP */}
            <div className="flex flex-col gap-8">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-7 hover:border-indigo-500/40 transition"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Badge type={task.status} />
                    <Badge type={task.priority} />
                  </div>

                  <h3 className="font-semibold text-lg mb-2">
                    {task.title}
                  </h3>

                  <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
                    {task.description || 'No description provided'}
                  </p>

                  <p className="text-xs text-[var(--text-tertiary)]">
                    Due{' '}
                    {task.dueDate
                      ? new Date(task.dueDate).toDateString()
                      : 'No due date'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Empty State ---------------- */}
        {recentTasks.length === 0 && (
          <section className="text-center">
            <Plus className="mx-auto h-12 w-12 text-indigo-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Get started by creating your first task
            </p>
            <Link href="/tasks/new">
              <Button>
                <Plus className="h-4 w-4" />
                Create Task
              </Button>
            </Link>
          </section>
        )}

      </div>
    </main>
  );
}

/* ---------------- Stat Card ---------------- */
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-7 flex items-center justify-between hover:border-indigo-500/40 transition">
      <div>
        <p className="text-[var(--text-secondary)] mb-1">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="p-4 rounded-lg bg-black/40 text-indigo-400">
        {icon}
      </div>
    </div>
  );
}
