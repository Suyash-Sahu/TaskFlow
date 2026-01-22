'use client';

import { Task } from '@/lib/types';
import TaskCard from './TaskCard';
import Skeleton from '@/components/ui/Skeleton';
import { Inbox } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onDelete?: (id: string) => void;
  viewMode?: 'grid' | 'list';
  isLoading?: boolean;
}

export default function TaskList({ tasks, onDelete, viewMode = 'grid', isLoading = false }: TaskListProps) {
  if (isLoading) {
    if (viewMode === 'list') {
      return (
        <div className="space-y-3 w-full max-w-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full max-w-full">
              <Skeleton key={i} variant="rectangular" height={120} />
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full max-w-full">
            <Skeleton key={i} variant="rectangular" height={200} />
          </div>
        ))}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="p-5 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-6 backdrop-blur-sm">
          <Inbox className="h-14 w-14 text-indigo-400" />
        </div>
        <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-3">
          No tasks found
        </h3>
        <p className="text-zinc-400 text-center max-w-md mb-6">
          {viewMode === 'grid'
            ? "No tasks match your filters. Try adjusting your search or filters, or create a new task."
            : "Get started by creating your first task!"}
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-5 sm:space-y-6 w-full max-w-full">
        {tasks.map((task) => (
          <div key={task.id} className="w-full max-w-full">
            <TaskCard key={task.id} task={task} onDelete={onDelete} viewMode="list" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-full">
      {tasks.map((task) => (
        <div key={task.id} className="w-full max-w-full">
          <TaskCard key={task.id} task={task} onDelete={onDelete} viewMode="grid" />
        </div>
      ))}
    </div>
  );
}

