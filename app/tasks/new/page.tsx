'use client';

import { useRouter } from 'next/navigation';
import { useTasks } from '@/hooks/useTasks';
import { useToast } from '@/components/providers/ToastProvider';
import TaskForm from '@/components/tasks/TaskForm';
import { TaskStatus, TaskPriority } from '@/lib/types';
import { useState } from 'react';

export default function NewTaskPage() {
  const router = useRouter();
  const { addTask } = useTasks();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (taskData: { title: string; description?: string; status: TaskStatus; priority: TaskPriority; dueDate?: string }) => {
    setIsLoading(true);
    try {
      addTask({
        title: taskData.title,
        description: taskData.description || '',
        status: taskData.status,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
      });
      showToast('Task created successfully!', 'success');
      router.push('/tasks');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 bg-[var(--background)] text-[var(--text-primary)] px-6 sm:px-8 lg:px-12">
      
      {/* ✅ CENTERING WRAPPER */}
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        
        {/* ✅ COMPACT WIDTH (FIX) */}
        <div className="w-full max-w-lg">
          
          {/* ---------------- Header ---------------- */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Create Task
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Add a new task to your list
            </p>
          </div>

          {/* ---------------- Form Card ---------------- */}
          <div className="rounded-xl bg-[var(--surface-elevated)] 
                          border border-[var(--border)] p-6 sm:p-8 
                          backdrop-blur-sm shadow-lg shadow-indigo-500/10">
            <TaskForm
              onSubmit={handleSubmit}
              onCancel={() => router.back()}
              isLoading={isLoading}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
