'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, CheckCircle, Calendar, Clock, Tag } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { useToast } from '@/components/providers/ToastProvider';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function TaskDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { tasks, updateTask, deleteTask } = useTasks();
  const { showToast } = useToast();

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Task Not Found</h1>
        <p className="text-[var(--text-secondary)] mb-6">
          The task you're looking for doesn't exist.
        </p>
        <Link href="/tasks">
          <Button>Back to Tasks</Button>
        </Link>
      </div>
    );
  }

  const handleStatusChange = (newStatus: 'todo' | 'in-progress' | 'completed') => {
    updateTask(id, { status: newStatus });
    showToast('Task status updated', 'success');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      showToast('Task deleted successfully', 'success');
      router.push('/tasks');
    }
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

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in-0 slide-up duration-500">
      {/* Breadcrumb */}
      <Link href="/tasks">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tasks
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="priority" type={task.priority}>
              {priorityLabels[task.priority]}
            </Badge>
            <Badge variant="status" type={task.status}>
              {statusLabels[task.status]}
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">{task.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/tasks/${id}/edit`}>
            <Button variant="secondary">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Description</h2>
            <p className="text-[var(--text-secondary)] whitespace-pre-wrap">
              {task.description || 'No description provided.'}
            </p>
          </Card>

          {/* Status Actions */}
          {task.status !== 'completed' && (
            <Card>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-2">
                {task.status !== 'in-progress' && (
                  <Button
                    variant="secondary"
                    onClick={() => handleStatusChange('in-progress')}
                  >
                    Mark as In Progress
                  </Button>
                )}
                <Button
                  variant="primary"
                  onClick={() => handleStatusChange('completed')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Completed
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Details</h2>
            <div className="space-y-4">
              {task.dueDate && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Due Date</span>
                  </div>
                  <p className="text-[var(--text-primary)]">{formatDate(task.dueDate)}</p>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">Created</span>
                </div>
                <p className="text-[var(--text-primary)]">{formatRelativeTime(task.createdAt)}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">Last Updated</span>
                </div>
                <p className="text-[var(--text-primary)]">{formatRelativeTime(task.updatedAt)}</p>
              </div>

              {task.tags && task.tags.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-2">
                    <Tag className="h-4 w-4" />
                    <span className="font-medium">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-[var(--surface-elevated)] text-[var(--text-secondary)] rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

