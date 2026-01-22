'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { useToast } from '@/components/providers/ToastProvider';
import TaskForm from '@/components/tasks/TaskForm';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { tasks, updateTask } = useTasks();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (taskData: Parameters<typeof updateTask>[1]) => {
    setIsLoading(true);
    try {
      updateTask(id, taskData);
      showToast('Task updated successfully!', 'success');
      router.push(`/tasks/${id}`);
    } catch (error) {
      showToast('Failed to update task', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in-0 slide-up duration-500">
      <div className="mb-6">
        <Link href={`/tasks/${id}`}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Task
          </Button>
        </Link>
        <h1 className="text-4xl font-bold text-[var(--text-primary)]">Edit Task</h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Update the task details below
        </p>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
        <TaskForm
          task={task}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

