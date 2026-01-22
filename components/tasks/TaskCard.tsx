'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import { Task } from '@/lib/types';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface TaskCardProps {
  task: Task;
  onDelete?: (id: string) => void;
  viewMode?: 'grid' | 'list';
}

export default function TaskCard({ task, onDelete, viewMode = 'grid' }: TaskCardProps) {
  const router = useRouter();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/tasks/${task.id}/edit`);
  };

  // Enhanced priority and status color mapping
  const priorityColors: Record<string, string> = {
    low: 'bg-zinc-800/50 text-[var(--priority-low)] border-zinc-700',
    medium: 'bg-zinc-800/50 text-[var(--priority-medium)] border-zinc-700',
    high: 'bg-zinc-800/50 text-[var(--priority-high)] border-zinc-700',
    urgent: 'bg-zinc-800/50 text-[var(--priority-urgent)] border-zinc-700',
  };

  const statusColors: Record<string, string> = {
    todo: 'bg-zinc-800/50 text-[var(--status-todo)] border-zinc-700',
    'in-progress': 'bg-zinc-800/50 text-[var(--status-progress)] border-zinc-700',
    completed: 'bg-zinc-800/50 text-[var(--status-completed)] border-zinc-700',
  };

  const statusLabels = {
    todo: 'Todo',
    'in-progress': 'In Progress',
    completed: 'Completed',
  };

  const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/tasks/${task.id}`}>
        <Card className="flex items-center justify-between gap-6 sm:gap-8 p-6 sm:p-8 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 hover:-translate-y-1 border border-zinc-700/50 bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-800/40 backdrop-blur-sm hover:border-indigo-500/50">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${priorityColors[task.priority] || 'bg-gray-100'}`}>
                <div className={`w-2 h-2 rounded-full ${task.priority === 'low' ? 'bg-[var(--priority-low)]' : task.priority === 'medium' ? 'bg-[var(--priority-medium)]' : task.priority === 'high' ? 'bg-[var(--priority-high)]' : 'bg-[var(--priority-urgent)]'}`}></div>
                {priorityLabels[task.priority]}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[task.status] || 'bg-gray-100'}`}>
                {statusLabels[task.status]}
              </span>
            </div>
            
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-1">
              {task.title}
            </h3>
            
            <p className="text-sm sm:text-base text-[var(--text-secondary)] line-clamp-2 mb-4">
              {task.description || 'No description provided'}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-tertiary)]">
              {task.dueDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Due: {formatDate(task.dueDate)}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>Created {formatRelativeTime(task.createdAt)}</span>
              </div>
              {task.tags && task.tags.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span>🏷️</span>
                  <span>{task.tags.length} tags</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button variant="ghost" size="sm" onClick={handleEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-[var(--error)] hover:bg-[var(--error-light)]"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/tasks/${task.id}`}>
      <Card className="h-full flex flex-col p-6 sm:p-7 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-200 hover:-translate-y-2 border border-zinc-700/50 bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-800/40 backdrop-blur-sm hover:border-indigo-500/50 group">
        {/* Header with badges */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${priorityColors[task.priority] || 'bg-gray-100'}`}>
              <div className={`w-2 h-2 rounded-full ${task.priority === 'low' ? 'bg-[var(--priority-low)]' : task.priority === 'medium' ? 'bg-[var(--priority-medium)]' : task.priority === 'high' ? 'bg-[var(--priority-high)]' : 'bg-[var(--priority-urgent)]'}`}></div>
              {priorityLabels[task.priority]}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[task.status] || 'bg-gray-100'}`}>
              {statusLabels[task.status]}
            </span>
          </div>
          
          {/* Action buttons that appear on hover */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button variant="ghost" size="sm" onClick={handleEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-[var(--error)] hover:bg-[var(--error-light)]"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] mb-4 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
          {task.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-[var(--text-secondary)] line-clamp-3 mb-6 flex-1">
          {task.description || 'No description provided for this task.'}
        </p>

        {/* Metadata */}
        <div className="space-y-3 sm:space-y-4 mb-6">
          {task.dueDate && (
            <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Due:</span>
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Created:</span>
            <span>{formatRelativeTime(task.createdAt)}</span>
          </div>
          
          {task.tags && task.tags.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
              <span>🏷️</span>
              <span className="font-medium">Tags:</span>
              <div className="flex flex-wrap gap-1">
                {task.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-0.5 bg-[var(--surface-secondary)] rounded text-xs">
                    {tag}
                  </span>
                ))}
                {task.tags.length > 3 && (
                  <span className="px-2 py-0.5 bg-[var(--surface-secondary)] rounded text-xs">
                    +{task.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer with action button */}
        <div className="pt-5 border-t border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--text-tertiary)]">
              Click to view details
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[var(--primary)] hover:bg-[var(--primary-light)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              View Details →
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}

